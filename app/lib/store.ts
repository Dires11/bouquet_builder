import { create } from "zustand";
import { flowerSrcs, getFlowerSrc } from "./flowerSrc";
import { Flowers } from "./bouquetCalculator";
import { FlowerSource } from "./flowerSrc";
import type { OptionItem } from "./data";
type FlowerBuilderStore = {
  flowers: Flowers;
  selectedFlower: {
    sideAspect: { width: number; height: number };
    flowerSrc: FlowerSource;
  };
  setFlowers: (flowers: Flowers) => void;
  setColor: (flowerSrc: FlowerSource) => void;
  changeAspect: (sideAspect: { width: number; height: number }) => void;
};

export const useFlowerBuilderStore = create<FlowerBuilderStore>((set) => ({
  flowers: {
    fromSide: [],
    topDown: [],
    flowerSrcs: [],
  },
  selectedFlower: {
    sideAspect: { width: 1, height: 3.22 },
    flowerSrc: getFlowerSrc("rose", "red"),
  },

  setFlowers: (flowers) => set({ flowers }),
  setColor: (flowerSrc: FlowerSource) =>
    set((state) => ({
      selectedFlower: { ...state.selectedFlower, flowerSrc },
    })),
  changeAspect: (sideAspect: { width: number; height: number }) =>
    set((state) => ({
      selectedFlower: { ...state.selectedFlower, sideAspect },
    })),
}));
