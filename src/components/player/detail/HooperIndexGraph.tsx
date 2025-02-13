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
import { GraphValueType, HooperIndexGraphType } from "@/types/player";
import { getHorizontalCoordinates } from "@/utils";

type HooerType = "sleep" | "stress" | "fatigue" | "muscle";
interface Props {
  isDays: boolean;
  hooperType: HooerType;
}

const getHooperTypeData = (
  hooperType: HooerType,
  data: HooperIndexGraphType,
) => {
  switch (hooperType) {
    case "stress":
      return data.stressInfo;
    case "fatigue":
      return data.fatigueInfo;
    case "muscle":
      return data.muscleSorenessInfo;
    case "sleep":
      return data.sleepInfo;
    default:
      return [];
  }
};

/**
 * 후퍼인덱스 그래프
 *
 */
const HooperIndexGraph = ({ isDays, hooperType }: Props) => {
  const { weekHooperIndexGraph, monthHooperIndexGraph } =
    useRecoilValue(playerDetailSelector);
  const [data, setData] = useState<GraphValueType[]>([]);

  useEffect(() => {
    let tempData: HooperIndexGraphType = isDays
      ? weekHooperIndexGraph
      : monthHooperIndexGraph;

    setData(getHooperTypeData(hooperType, tempData));
  }, [isDays, hooperType, weekHooperIndexGraph, monthHooperIndexGraph]);

  if (data.length === 0) {
    return (
      <div className="min-h-[260px] flex items-center justify-center w-full py-10 font-bold text-[16px]">
        데이터가 없습니다.
      </div>
    );
  }

  const yAxisTick = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <div className={"w-full h-[300px]"}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          barCategoryGap={20}
          margin={{ left: 0, right: 0 }}
          className={"translate-x-[-40px]"}
        >
          <CartesianGrid
            vertical={false}
            horizontal={true}
            stroke="#EBE9F1"
            horizontalCoordinatesGenerator={({ height }) =>
              getHorizontalCoordinates(height, yAxisTick.length, 3)
            }
          />
          <XAxis
            dataKey="xvalue"
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
            label={undefined}
            allowDataOverflow={true}
            domain={[yAxisTick[0], 8]}
            ticks={yAxisTick}
            tickCount={yAxisTick.length}
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
          <Bar dataKey="level" fill="#8DBE3D" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HooperIndexGraph;
