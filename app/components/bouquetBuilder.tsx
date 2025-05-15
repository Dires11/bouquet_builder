import Image from "next/image";
import { useCallback, useState } from "react";
import BouquetCalculator from "../lib/bouquetCalculator";
import { FlowerSource } from "@/app/lib/flowerSrc";
import Counter from "./bouquet-screen/counter";
import SelectedFlower from "./bouquet-screen/selectedFlower";
import FlowerShop from "./bouquet-screen/flowerShop";
import { useFlowerBuilderStore, useOptionsScreenStore } from "../lib/store";
import ShowSideBouquet from "./bouquet-screen/showSideBouquet";
import ShowTopDownBouquet from "./bouquet-screen/showTopDownBouquet";

const roseMeasurements = {
  topDownSize: 33, //35,
  topDownRadiusStep: 0.8, //28, //26.3
  sideSize: { width: "auto", height: 200 },
  sideAspect: { width: 1, height: 3.22 },
  sideXmargin: 0.005,
  sideYDisplacmentStep: 0.12,
  sideOriginDisplacementFactor: 0.75,
};

const bouquet = new BouquetCalculator(
  roseMeasurements.topDownSize,
  roseMeasurements.topDownRadiusStep,
  roseMeasurements.sideAspect,
  roseMeasurements.sideOriginDisplacementFactor,
  roseMeasurements.sideXmargin,
  roseMeasurements.sideYDisplacmentStep,
);
export default function BouquetBuilder() {
  const curFlower = useFlowerBuilderStore(
    (state) => state.selectedFlower.flowerSrc,
  );
  const flowerCount = useFlowerBuilderStore(
    (state) => state.flowers.topDown.length,
  );
  const setFlowers = useFlowerBuilderStore((state) => state.setFlowers);

  // Using useCallback to prevent unnecessary re-renders
  const handleFlowerUpdate = useCallback(
    (add: boolean, curFlower: FlowerSource) => {
      setFlowers(bouquet.updateFlower(add, curFlower));
    },
    [],
  );

  return (
    <div
      className="mx-auto flex h-screen w-screen gap-3 bg-neutral-200 px-5 py-1 md:w-7/8 lg:w-7/8"
      id="BouquetBuilder"
    >
      <div className="flex flex-4 flex-col gap-3">
        <h1 className="lg:text-title-lg/30 md:text-title-md/30 text-title/30 font-bold">
          Your <br /> Bouquet
        </h1>
        <div className="flex h-1/5 flex-row items-center gap-3">
          <SelectedFlower className="h-3/4 flex-5" />
          <Counter
            className="h-3/4 flex-6"
            handleAdd={() => handleFlowerUpdate(true, curFlower)}
            handleRemove={() => handleFlowerUpdate(false, curFlower)}
            count={flowerCount}
          />
        </div>
        <FlowerShop />
      </div>
      <div className="bg-card my-2 flex flex-3 flex-col gap-3 rounded-2xl">
        <ShowSideBouquet
          height={roseMeasurements.sideSize.height}
          className="flex-1"
        />
        <ShowTopDownBouquet
          size={roseMeasurements.topDownSize}
          className="flex-1"
        />
      </div>
    </div>
  );
}
