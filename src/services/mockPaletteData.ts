import { PaletteResponse } from '../types';

export const generateMockPalette = (colors: { skin: { hex: string }, eyes: { hex: string }, hair: { hex: string } }): PaletteResponse => {
  return {
    name: "Autumn Harmony",
    description: "A warm, earthy palette that complements your skin's warm undertones, emphasizes the depth of darker hair, and enhances the richness of brown eyes.",
    recommendedColors: [
      {
        hex: "#2F5233",
        name: "Forest Green",
        type: "main",
        description: "A rich green that harmonizes with the warm undertones of autumn."
      },
      {
        hex: "#8B4513",
        name: "Rust",
        type: "main",
        description: "A warm, earthy red-brown that brings out the natural warmth in the skin tone."
      },
      {
        hex: "#CD853F",
        name: "Peru",
        type: "accent",
        description: "A golden brown that complements both skin and hair colors."
      },
      {
        hex: "#556B2F",
        name: "Olive",
        type: "neutral",
        description: "A muted green that provides balance to the palette."
      }
    ],
    colorsToAvoid: [
      {
        hex: "#FF1493",
        name: "Deep Pink",
        reason: "Too vibrant and cool-toned for your warm undertones."
      },
      {
        hex: "#00FFFF",
        name: "Cyan",
        reason: "Creates harsh contrast with your natural coloring."
      },
      {
        hex: "#00FFFF",
        name: "Cyan",
        reason: "Creates harsh contrast with your natural coloring."
      },
      {
        hex: "#00FFFF",
        name: "Cyan",
        reason: "Creates harsh contrast with your natural coloring."
      }
    ]
  };
};