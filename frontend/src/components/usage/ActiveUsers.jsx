import { NumberTickerDemo } from "./numberTicker";

export default function ActiveUsers() {
  return (
    <div className="flex gap-20 items-center justify-center m-10">
      <div className="flex-row">
        <h3>Active openings</h3>
        <NumberTickerDemo />
      </div>
      <div className="flex-row">
        <h3>Monthly Visits</h3>
        <NumberTickerDemo />
      </div>
    </div>
  );
}
