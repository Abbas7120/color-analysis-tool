import React, { useRef, useState } from 'react';
import { Upload, Pipette, ArrowRight } from 'lucide-react';
import { Color, ColorSelection, PaletteResponse } from '../types';
import PaletteDisplay from './PaletteDisplay';
import { generateMockPalette } from '../services/mockPaletteData';

export default function ColorPicker() {
  const [step, setStep] = useState<'picker' | 'palette'>('picker');
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<ColorSelection>({
    skin: { hex: '', name: 'Skin Color' },
    eyes: { hex: '', name: 'Eye Color' },
    hair: { hex: '', name: 'Hair Color' },
  });
  const [activeColor, setActiveColor] = useState<keyof ColorSelection>('skin');
  const [paletteData, setPaletteData] = useState<PaletteResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setImage(event.target?.result as string);
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hex = `#${pixel[0].toString(16).padStart(2, '0')}${pixel[1].toString(16).padStart(2, '0')}${pixel[2].toString(16).padStart(2, '0')}`;
      
      setColors(prev => ({
        ...prev,
        [activeColor]: { ...prev[activeColor], hex }
      }));
    }
  };

  const handleGeneratePalette = async () => {
    if (!colors.skin.hex || !colors.eyes.hex || !colors.hair.hex) {
      setError('Please select all colors before generating a palette');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const mockResponse = generateMockPalette(colors);
      setPaletteData(mockResponse);
      setStep('palette');
    } catch (error) {
      console.error('Error generating palette:', error);
      setError('Failed to generate palette. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setStep('picker');
    setPaletteData(null);
  };

  if (step === 'palette' && paletteData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <button
              onClick={handleBack}
              className="mb-6 text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2"
            >
              ← Back to Color Picker
            </button>
            <PaletteDisplay palette={paletteData} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Color Picker Tool
          </h1>

          <div className="mb-8">
            <div className="flex justify-center mb-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Upload size={20} />
                Upload Image
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {image && (
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  onClick={handleCanvasClick}
                  className="max-w-full h-auto rounded-lg cursor-crosshair mx-auto"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="flex flex-col gap-3">
                    {(Object.keys(colors) as Array<keyof ColorSelection>).map((key) => (
                      <button
                        key={key}
                        onClick={() => setActiveColor(key)}
                        className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                          activeColor === key ? 'bg-gray-100' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="relative">
                          <div
                            className="w-8 h-8 rounded-full border-2 border-gray-200"
                            style={{ backgroundColor: colors[key].hex || '#ffffff' }}
                          />
                          {activeColor === key && (
                            <Pipette
                              size={16}
                              className="absolute -top-1 -right-1 text-indigo-600"
                            />
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {colors[key].name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {(Object.keys(colors) as Array<keyof ColorSelection>).map((key) => (
              <div
                key={key}
                className="bg-gray-50 p-4 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg shadow-inner"
                    style={{ backgroundColor: colors[key].hex || '#ffffff' }}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {colors[key].name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {colors[key].hex || 'Not selected'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleGeneratePalette}
              disabled={isLoading}
              className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating...' : 'Generate Palette'}
              {!isLoading && <ArrowRight size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}