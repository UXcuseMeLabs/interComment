import chroma from "chroma-js";

export function generatePaletteColors(baseColor: string) {
    const scale = chroma.scale([chroma(baseColor).brighten(4), baseColor, chroma(baseColor).darken(2)])
        .mode("lab") // Mejor percepción de color
        .colors(11); // Genera 10 colores

    return {
        50: scale[0],
        100: scale[1],
        200: scale[2],
        300: scale[3],
        400: scale[4],
        500: scale[5], // Base color
        600: scale[6],
        700: scale[7],
        800: scale[8],
        900: scale[9],
        1000: scale[10],
    };
}