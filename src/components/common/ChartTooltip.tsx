import { TooltipProps } from "recharts";

const ChartTooltip = ({
  active,
  payload,
  payloadSuffix,
}: {
  active?: boolean;
  payload?: any[];
  payloadSuffix?: string;
}) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-full py-2 px-5 bg-white shadow-md">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.fill }}
          />
          <span className="text-xs font-bold text-black tracking-tighter leading-tight">
            {entry.value}
            {payloadSuffix}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ChartTooltip;
