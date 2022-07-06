export const rgbToHsl = ([r, g, b]: Array<number>) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
        ? l === r
            ? (g - b) / s
            : l === g
                ? 2 + (b - r) / s
                : 4 + (r - g) / s
        : 0;
    return [
        60 * h < 0 ? 60 * h + 360 : 60 * h,
        100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
        (100 * (2 * l - s)) / 2,
    ];
};

export const brightenHSLIfDark = ([h, s, l]: Array<number>) => {
    if (l < 75) {
        return [h, s, 75];
    }
    return [h, s, l];
};


export const hslArrToString = ([h, s, l]: Array<number>) => {
    return `hsl(${h.toFixed(2)}, ${s.toFixed(2)}%, ${l.toFixed(2)}%)`;
};


export const sortPaletteByLightness = (arr: Array<Array<number>>) => {
    return arr.sort((a, b) => {
        const [aH, aS, aL] = rgbToHsl(a);
        const [bH, bS, bL] = rgbToHsl(b);
        return aL - bL;
    }).reverse();
};

export const sortPaletteBySaturation = (arr: Array<Array<number>>) => {
    return arr.sort((a, b) => {
        const [aH, aS, aL] = a;
        const [bH, bS, bL] = b;
        return aS - bS;
    }).reverse();
};