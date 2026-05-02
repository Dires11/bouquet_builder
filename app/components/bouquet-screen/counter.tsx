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
    <div
      className={`${className} bg-card flex min-h-24 items-center justify-between gap-3 rounded-[1.75rem] p-3 sm:px-4 sm:py-4`}
    >
      <CounterButton
        className="h-14 w-14 shrink-0 sm:h-[4.25rem] sm:w-[4.25rem]"
        handleClick={handleRemove}
        icon="minus"
        color="bg-red-300"
      />
      <div className="flex min-w-12 flex-1 items-center justify-center">
        <span className="rounded-xl bg-white px-4 py-2 text-lg leading-none">
          {count}
        </span>
      </div>
      <CounterButton
        handleClick={handleAdd}
        className="h-14 w-14 shrink-0 sm:h-[4.25rem] sm:w-[4.25rem]"
        icon="plus"
        color="bg-green-300"
      />
    </div>
  );
}
