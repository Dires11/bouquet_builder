import CounterButton from "./counterButton";

type CounterProps = {
  handleAdd: () => void;
  handleRemove: () => void;
  count: number;
  className?: string;
};
export default function Counter({
  handleAdd,
  handleRemove,
  count,
  className,
}: CounterProps) {
  return (
    <div className={`${className} flex items-center gap-1`}>
      <CounterButton
        className="aspect-square h-full"
        handleClick={handleRemove}
        icon="minus"
        color="bg-red-300"
      />
      <div className="flex size-12 items-center justify-center">
        <span className="bg-card rounded-md px-3 py-1">{count}</span>
      </div>
      <CounterButton
        handleClick={handleAdd}
        className="aspect-square h-full"
        icon="plus"
        color="bg-green-300"
      />
    </div>
  );
}
