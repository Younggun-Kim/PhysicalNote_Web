import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import {
  weeklyRpeSelector,
  weeklyWorkloadSelector,
} from "@/recoil/dashboard/dashboardState";
import EnabledTextBtn from "@/components/dashboard/enabledTextBtn";
import AxisWithComposition from "@/components/common/axisWithComposition";
import { getSeriesDataMaxvalue, SeriesDataType } from "@/types/chart";
import {
  WeeklyWorkLoadInfoType,
  workoutAnalysisToLoad,
} from "@/types/dashboard";
import { yAxisIds } from "@/constants/mock/dashboard";

const WeeklyWorkLoad = () => {
  const [chartType, setChartType] = useState<"LH" | "DR">("LH");
  const weeklyWorkLoad = useRecoilValue(weeklyWorkloadSelector);
  const weeklyRpe = useRecoilValue(weeklyRpeSelector);
  const [xvalue, setXvalue] = useState<Array<string>>([]);
  const [chartData, setChartData] = useState<
    WeeklyWorkLoadInfoType | undefined
  >();
  const [seriesData, setSeriesData] = useState<SeriesDataType[]>([]);
  const [yAxisInterval, setYAxisInterval] = useState<Array<number>>([]);

  useEffect(() => {
    if (chartData) {
      const tempXvalue: Array<string> = [];
      const tempValue: Array<number> = [];
      const tempLineValue: Array<number> = [];

      chartData.workloadInfoList.map((item) => {
        tempXvalue.push(item.xvalue);
        tempValue.push(item.value);
        tempLineValue.push(item.hooperIndex);
      });

      setXvalue(tempXvalue);
      setSeriesData([
        {
          type: "bar",
          yAxisKey: yAxisIds[0].id,
          data: tempValue,
          color: "#C6E19B",
        },
        {
          type: "line",
          curve: "linear",
          yAxisKey: yAxisIds[1].id,
          data: tempLineValue,
          color: "#7d7d7d",
        },
      ]);
    }
  }, [weeklyWorkLoad, chartData]);

  useEffect(() => {
    let tempYAxisInterval = [0, 7, 14, 21, 28];
    let tempData: WeeklyWorkLoadInfoType = weeklyWorkLoad;
    if (chartType == "DR") {
      tempData = workoutAnalysisToLoad(weeklyRpe);
      tempYAxisInterval = [0, 5, 10];
    }

    setChartData(tempData);
    setYAxisInterval(tempYAxisInterval);
  }, [weeklyRpe, chartType]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center text-[15px] font-[700] space-x-2">
        <div>
          <span>■ 주간 트레이닝 부하</span>
        </div>
        <div className="flex items-center gap-2.5">
          <EnabledTextBtn
            text="Load&HI"
            isEnabled={chartType === "LH"}
            onClick={() => setChartType("LH")}
          />
          <EnabledTextBtn
            text="Duration & RPE(team average)"
            isEnabled={chartType === "DR"}
            onClick={() => setChartType("DR")}
          />
        </div>
      </div>
      <div className="flex flex-col items-end space-y-1">
        <span className="text-[12px] font-[400] mr-4">
          [{chartData?.stringOfWeekly}]
        </span>
        <div className="w-full rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
          {seriesData.length !== 0 ? (
            <AxisWithComposition
              height={260}
              xAxisData={xvalue}
              seriesData={seriesData}
              yAxisIds={[
                {
                  ...yAxisIds[0],
                  min: 0,
                  max: getSeriesDataMaxvalue(seriesData[0]),
                },
                {
                  ...yAxisIds[1],
                  min: 0,
                  max: chartType == "LH" ? 28 : 10,
                },
              ]}
              yAxisInterval={yAxisInterval}
            />
          ) : (
            <div className="min-h-[260px] flex items-center justify-center w-full py-10 font-bold">
              데이터가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeeklyWorkLoad;
