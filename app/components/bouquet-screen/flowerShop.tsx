import Image from "next/image";
import { flowerSrcs, FlowerSource } from "@/app/lib/flowerSrc";
import { useFlowerBuilderStore } from "@/app/lib/store";
type FlowerShopProps = {
  className?: string;
};

export default function FlowerShop({ className }: FlowerShopProps) {
  const setColor = useFlowerBuilderStore((state) => state.setColor);
  const curFlower = useFlowerBuilderStore(
    (state) => state.selectedFlower.flowerSrc,
  );

  return (
    <div className={`${className}`}>
      <h1 className="text-4xl">Flower Shop</h1>
      <div className="bg-card rounded-2xl p-3">
        {Object.entries(flowerSrcs).map(([flower, colors]) => (
          <div key={flower} className="flex flex-col">
            <h1 className="text-2xl">
              {flower[0].toUpperCase() + flower.slice(1)}:
            </h1>
            <div className="flex gap-2">
              {Object.entries(colors).map(([color, src]) => (
                <button
                  key={color}
                  className="group hover:cursor-pointer"
                  onClick={() => {
                    setColor(src);
                    console.log(curFlower);
                  }}
                >
                  <Image
                    className="group-hover:drop-shadow-outline transition-all duration-150"
                    key={color}
                    src={src.topDown}
                    alt={color + flower}
                    width={50}
                    height={50}
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
