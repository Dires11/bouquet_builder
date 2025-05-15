export const flowerSrcs = {
  rose: {
    red: {
      topDown: "/rose/red-top-down.svg",
      side: "/rose/red-side.svg",
      rgb: [233, 29, 38],
    },
    orange: {
      topDown: "/rose/orange-top-down.svg",
      side: "/rose/orange-side.svg",
      rgb: [235, 226, 74],
    },
    yellow: {
      topDown: "/rose/yellow-top-down.svg",
      side: "/rose/yellow-side.svg",
      rgb: [235, 226, 74],
    },
    pink: {
      topDown: "/rose/pink-top-down.svg",
      side: "/rose/pink-side.svg",
      rgb: [233, 100, 64],
    },
    lightpink: {
      topDown: "/rose/lightpink-top-down.svg",
      side: "/rose/lightpink-side.svg",
      rgb: [233, 100, 64],
    },
    white: {
      topDown: "/rose/white-top-down.svg",
      side: "/rose/white-side.svg",
      rgb: [255, 255, 255],
    },
  },
} as const;

export type FlowerTypes = keyof typeof flowerSrcs;
export type FlowerColors = keyof (typeof flowerSrcs)[keyof typeof flowerSrcs];
export type FlowerSource = {
  topDown: string;
  side: string;
  rgb: readonly [number, number, number];
};

export function getFlowerSrc(
  flower: FlowerTypes,
  color: FlowerColors,
): FlowerSource {
  if (!(flower in flowerSrcs)) {
    throw new Error("Invalid flower type");
  }
  if (!flowerSrcs[flower][color]) {
    throw new Error("Invalid flower color");
  }
  return flowerSrcs[flower][color];
}
