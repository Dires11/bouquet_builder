import Image from "next/image";
import { useFlowerBuilderStore } from "@/app/lib/store";

type ShowTopDownBouquetProps = {
  size: number;
  className?: string;
};

export default function ShowTopDownBouquet({
  size,
  className,
}: ShowTopDownBouquetProps) {
  const flowers = useFlowerBuilderStore((state) => state.flowers);
  return (
    <div className={`relative ${className}`}>
      {flowers.topDown.map((flower, index) => (
        <Image
          key={index}
          className="absolute"
          src={flowers.flowerSrcs[flower.index].topDown}
          width={50}
          height={50}
          style={{
            top: `calc(50% + ${size * flower.y}px)`,
            left: `calc(50% + ${size * flower.x}px)`,
            transform: `translate(-50%, -50%)`,
            transition: "all 0.5s",
            width: `${size}px`,
            height: "auto",
            zIndex: 200 - flower.radiusIndex,
          }}
          alt="A flower"
        />
      ))}
    </div>
  );
}
