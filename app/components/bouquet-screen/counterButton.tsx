import { motion } from "motion/react";
import Image from "next/image";
type CounterButtonProps = {
  handleClick: () => void;
  className?: string;
  icon: string;
  color: string;
};

export default function CounterButton({
  handleClick,
  icon,
  color,
  className,
}: CounterButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, filter: "brightness(1.05)" }}
      whileTap={{ scale: 0.95 }}
      className={`${className} ${color} flex items-center justify-center rounded-xl hover:cursor-pointer hover:brightness-95`}
      onClick={() => {
        handleClick();
      }}
    >
      <Image
        className="size-3/4"
        src={`/component-assets/${icon}.svg`}
        alt="remove a flower"
        width={100}
        height={100}
      />
    </motion.button>
  );
}
