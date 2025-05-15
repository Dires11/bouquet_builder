import Image from "next/image";
import { useFlowerBuilderStore } from "@/app/lib/store";

type SelectedFlowerProps = {
  className?: string;
};

export default function SelectedFlower({ className }: SelectedFlowerProps) {
  const selectedFlower = useFlowerBuilderStore(
    (state) => state.selectedFlower.flowerSrc,
  );
  return (
    <div
      className={`bg-card flex items-center gap-5 rounded-2xl p-3 ${className}`}
    >
      <p className="text-4xl">Selected: </p>
      <Image
        className="size-3/4"
        src={selectedFlower.topDown}
        alt="selected flower"
        width={100}
        height={100}
        title="Selected Flower"
      />
    </div>
  );
}
