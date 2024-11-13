import React from 'react';
import { PaletteResponse } from '../types';

interface PaletteDisplayProps {
  palette: PaletteResponse;
}

export default function PaletteDisplay({ palette }: PaletteDisplayProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{palette.name}</h2>
        <p className="text-gray-600">{palette.description}</p>
      </div>

      <div className="mb-12">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommended Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {palette.recommendedColors.map((color, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
              <div
                className="w-full h-24 rounded-lg mb-4"
                style={{ backgroundColor: color.hex }}
              />
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900">{color.name}</h4>
                  <span className="text-sm px-2 py-1 bg-gray-100 rounded text-gray-600">
                    {color.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{color.description}</p>
                <p className="text-sm font-mono text-gray-500 mt-2">{color.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {palette.colorsToAvoid.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Colors to Avoid</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {palette.colorsToAvoid.map((color, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-lg flex-shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">{color.name}</h4>
                    <p className="text-sm text-gray-600">{color.reason}</p>
                    <p className="text-sm font-mono text-gray-500 mt-1">{color.hex}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}