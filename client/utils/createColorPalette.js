function createColorPalette(set) {
  return new Map(
    [...set].map((fileExtension, index) => [
      fileExtension,
      `hsl(${index * 360 / set.size}, 50%, 50%)`,
    ]),
  );
}

export default createColorPalette;



