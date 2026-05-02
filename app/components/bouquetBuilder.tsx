import { useCallback } from "react";
import BouquetCalculator from "../lib/bouquetCalculator";
import { FlowerSource } from "@/app/lib/flowerSrc";
import Counter from "./bouquet-screen/counter";
import SelectedFlower from "./bouquet-screen/selectedFlower";
import FlowerShop from "./bouquet-screen/flowerShop";
import { useFlowerBuilderStore } from "../lib/store";
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
      className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 gap-4 bg-neutral-200 px-3 py-3 sm:px-4 md:px-6 lg:grid-cols-[minmax(24rem,32rem)_minmax(0,1fr)] lg:gap-6 lg:py-5"
      id="BouquetBuilder"
    >
      <div className="flex min-w-0 flex-col gap-4 lg:gap-5">
        <h1 className="max-w-[8ch] text-5xl leading-[0.88] font-bold sm:text-6xl md:text-7xl xl:text-[6.5rem]">
          Your
          <br /> Bouquet
        </h1>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(15rem,1.2fr)_minmax(14rem,1fr)] sm:items-stretch">
          <SelectedFlower className="flex-1" />
          <Counter
            className="min-w-0"
            handleAdd={() => handleFlowerUpdate(true, curFlower)}
            handleRemove={() => handleFlowerUpdate(false, curFlower)}
            count={flowerCount}
          />
        </div>
        <FlowerShop className="flex-1" />
      </div>
      <div className="bg-card flex min-h-[32rem] min-w-0 flex-col gap-3 rounded-[2rem] p-3 sm:min-h-[36rem] sm:p-4 lg:min-h-[calc(100vh-3rem)]">
        <ShowSideBouquet
          height={roseMeasurements.sideSize.height}
          className="min-h-[16rem] flex-1 overflow-hidden rounded-[1.75rem] bg-white/25"
        />
        <ShowTopDownBouquet
          size={roseMeasurements.topDownSize}
          className="min-h-[16rem] flex-1 overflow-hidden rounded-[1.75rem] bg-white/25"
        />
      </div>
    </div>
  );
}
