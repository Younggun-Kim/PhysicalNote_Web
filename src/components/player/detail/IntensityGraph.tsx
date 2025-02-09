import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useRecoilValue } from "recoil";
import { playerDetailSelector } from "@/recoil/player/playerState";
import ChartTooltip from "@/components/common/ChartTooltip";
import React, { useEffect, useState } from "react";
import { IntensityGraphType } from "@/types/player";

interface Props {
  isDays: boolean;
}

interface ChartData {
  name: string;
  sport: number;
  physical: number;
}

const convertIntensityToChartData = (
  workoutTimes: IntensityGraphType[],
): ChartData[] => {
  const groupedByXValue = Object.groupBy(workoutTimes, (item) => item.xvalue);

  return Object.entries(groupedByXValue)
    .map(([xvalue, items]) => {
      if (!items) return null;

      const sportItem = items.find((item) => item.type === "스포츠");
      const physicalItem = items.find((item) => item.type === "피지컬");

      return {
        name: xvalue,
        sport: sportItem ? sportItem.level : 0,
        physical: physicalItem ? physicalItem.level : 0,
      };
    })
    .filter((item): item is ChartData => item !== null); // null 값 제외
};
/**
 * 운동강도 그래프
 *
 */
const IntensityGraph = ({ isDays }: Props) => {
  const { weekIntensityGraph, monthIntensityGraph } =
    useRecoilValue(playerDetailSelector);
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    let tempData: IntensityGraphType[] = isDays
      ? weekIntensityGraph
      : monthIntensityGraph;

    setData(convertIntensityToChartData(tempData));
  }, [isDays]);

  if (data.length === 0) {
    return (
      <div className="min-h-[260px] flex items-center justify-center w-full py-10 font-bold text-[16px]">
        데이터가 없습니다.
      </div>
    );
  }

  const yAxisTick = [0, 2, 4, 6, 8, 10];
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer>
        <BarChart
          data={data}
          barCategoryGap={20}
          margin={{ left: 0, right: 0 }}
          className={"translate-x-[-40px]"}
        >
          <CartesianGrid vertical={false} stroke="#EBE9F1" />
          <XAxis
            dataKey="name"
            tickLine={false}
            stroke={"#CBCCCD"}
            strokeWidth={1}
            tick={({ x, y, payload }) => (
              <text
                x={x}
                y={y + 10}
                textAnchor="middle"
                fill={
                  payload.value.toUpperCase().includes("(MD)")
                    ? "#FF0000"
                    : "#000000"
                }
                fontSize={12}
                fontWeight={400}
              >
                {payload.value}
              </text>
            )}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{
              fontSize: 14,
              fill: "#B9B9C3",
              fontWeight: 500,
            }}
            allowDataOverflow={true}
            domain={[0, 10]}
            ticks={yAxisTick}
          />
          <Tooltip
            cursor={false}
            content={({ active, payload }) => (
              <ChartTooltip
                active={active}
                payload={payload}
                payloadSuffix={""}
              />
            )}
          />
          <Bar dataKey="sport" fill="#C6E19B" radius={[5, 5, 0, 0]} />
          <Bar dataKey="physical" fill="#FFE177" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IntensityGraph;
