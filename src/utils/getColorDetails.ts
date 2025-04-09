/* eslint-disable @typescript-eslint/no-explicit-any */
import namer from "color-namer";

 export const getColorDetails = (hex : any) => {
  const names = namer(hex);
  const colorName = names.basic[0]?.name || "Unknown"; // Using basic color names
  return {
    colorCode: hex.toUpperCase(),
    colorName: colorName,
  };
};
