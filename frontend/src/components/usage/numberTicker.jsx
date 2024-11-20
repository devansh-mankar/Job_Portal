import NumberTicker from "@/components/ui/number-ticker";

export function NumberTickerDemo() {
  return (
    <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
      <NumberTicker value={17543} />
    </p>
  );
}
