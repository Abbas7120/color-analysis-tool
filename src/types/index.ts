export interface Color {
  hex: string;
  name: string;
}

export interface ColorSelection {
  skin: Color;
  eyes: Color;
  hair: Color;
}

export interface RecommendedColor {
  hex: string;
  name: string;
  type: 'main' | 'accent' | 'neutral';
  description: string;
}

export interface AvoidColor {
  hex: string;
  name: string;
  reason: string;
}

export interface PaletteResponse {
  name: string;
  description: string;
  recommendedColors: RecommendedColor[];
  colorsToAvoid: AvoidColor[];
}