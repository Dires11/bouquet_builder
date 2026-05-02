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
      className={`bg-card flex min-h-24 min-w-0 items-center justify-between gap-2 overflow-hidden rounded-[1.75rem] px-4 py-4 sm:px-5 ${className}`}
    >
      <p className="min-w-0 shrink text-2xl leading-none sm:text-[2rem]">
        Selected:
      </p>
      <Image
        className="h-12 w-12 shrink-0 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
        src={selectedFlower.topDown}
        alt="selected flower"
        width={100}
        height={100}
        title="Selected Flower"
      />
    </div>
  );
}
