import Image from "next/image";
import { useFlowerBuilderStore } from "@/app/lib/store";

type ShowSideBouquetProps = {
  className?: string;
  height: number;
  width?: number | "auto";
};

export default function ShowSideBouquet({
  height,
  width,
  className,
}: ShowSideBouquetProps) {
  const flowers = useFlowerBuilderStore((state) => state.flowers);
  return (
    <div className={`relative ${className}`}>
      {flowers.fromSide.map((flower, index) => (
        <Image
          key={index}
          className="absolute"
          src={flowers.flowerSrcs[flower.index].side}
          width={77.5}
          height={250}
          style={{
            height: `${height}px`,
            width: "auto",
            top: `calc(50% - ${flower.yDisplacment * height}px)`,
            left: "50%",
            transform: `translate(-50%, -50%) rotate(${flower.angle}rad)`,
            transformOrigin: `50% calc(75% + ${flower.yDisplacment * height}px)`,
            zIndex: 100 - flower.layer,
            transition: "all 0.5s",
          }}
          alt="A flower"
        />
      ))}
    </div>
  );
}
