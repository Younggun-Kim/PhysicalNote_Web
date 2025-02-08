import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { trainingBalanceSelector } from "@/recoil/dashboard/dashboardState";
import { TrainingBalanceInfoType } from "@/types/dashboard";
import { Bar, LabelList, XAxis } from "recharts";
import { BarChart, Tooltip } from "recharts";
import ChartTooltip from "@/components/common/ChartTooltip";

interface BalanceChartType {
  name: string;
  value: number;
  fill: string;
  labelColor: string;
}

const balanceToString = (value: number): string => {
  if (value < 0.8) {
    return "낮습니다.";
  } else if (value < 1.5) {
    return "보통입니다.";
  } else {
    return "높습니다.";
  }
};

const balanceToColor = (value: number): string => {
  if (value < 0.8) {
    return "bg-tb-less";
  } else if (value < 1.5) {
    return "bg-tb-base";
  } else {
    return "bg-tb-over";
  }
};

interface BalanceItemProps {
  title: string;
  value: number;
}

const BalanceItem = ({ title, value }: BalanceItemProps) => {
  const bgColor = balanceToColor(value);

  return (
    <div className="flex items-center gap-2.5">
      <span className="font-sans font-normal text-sm text-black">{title}</span>
      <div
        className={[
          `w-[63px] h-[22px] flex justify-center items-center rounded-full`,
          bgColor,
        ].join(" ")}
      >
        {value.toFixed(1)}
      </div>
      <p className="font-sans font-normal text-xs text-black">
        <span>부상위험이</span>
        <span className="text-primary">{balanceToString(value)}</span>
      </p>
    </div>
  );
};

const TrainingBalance = () => {
  const trainingBalanceInfo = useRecoilValue(trainingBalanceSelector);
  const [trainingBalance, setTrainingBalance] =
    useState<TrainingBalanceInfoType>(trainingBalanceInfo);

  const [data, setData] = useState<BalanceChartType[]>([]);

  useEffect(() => {
    if (trainingBalanceInfo) {
      setTrainingBalance(trainingBalanceInfo);
      const {
        thisWeekValue,
        lastTwoWeekValue,
        lastFourWeekValue,
        lastEightWeekValue,
      } = trainingBalanceInfo;

      setData([
        {
          name: "이번주",
          value: thisWeekValue,
          fill: "#C6E19B",
          labelColor: "#000",
        },
        {
          name: "지난주",
          value: lastTwoWeekValue,
          fill: "#EDFBD5",
          labelColor: "#7d7d7d",
        },
        {
          name: "지난4주",
          value: lastFourWeekValue,
          fill: "#EDFBD5",
          labelColor: "#7d7d7d",
        },
        {
          name: "지난8주",
          value: lastEightWeekValue,
          fill: "#EDFBD5",
          labelColor: "#7d7d7d",
        },
      ]);
    }
  }, [trainingBalanceInfo]);

  return (
    <div className="flex flex-col gap-2.5 min-w-[475px]">
      <div className="flex justify-between items-center space-x-8">
        <span className="text-[15px] font-[700]">■ 트레이닝 밸런스</span>
        <span className="font-sans font-normal text-primary text-sm">
          시즌 Peak Load(해당 wk넘버) :{" "}
          {trainingBalance?.peekLoadValue?.toFixed(1)}
        </span>
      </div>
      <div className="w-full flex justify-center">
        <BarChart width={460} height={200} data={data} margin={{ top: 20 }}>
          {/*<CartesianGrid strokeDasharray="3 3" />*/}
          <XAxis dataKey="name" tickSize={0} tickMargin={10} />
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
          <Bar
            dataKey="value"
            fill={"#C6E19B"}
            background={false}
            focusable={false}
            barSize={30}
            radius={[4, 4, 0, 0]}
          >
            <LabelList dataKey="value" position="top" fill="#7d7d7d" />
          </Bar>
        </BarChart>
      </div>
      <div className="w-full flex justify-center items-center gap-6">
        <span className="font-sans font-bold text-lg text-black">
          sRPE Load
        </span>
        <div className="flex flex-col gap-5">
          <BalanceItem
            title={"With Av4"}
            value={trainingBalance.lastFourWeekBalanceValue}
          />
          <BalanceItem
            title={"With Av8"}
            value={trainingBalance.lastEightWeekBalanceValue}
          />
        </div>
      </div>
    </div>
  );
};

export default TrainingBalance;
