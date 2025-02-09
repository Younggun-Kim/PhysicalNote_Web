import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import AxisWithComposition from "@/components/common/axisWithComposition";
import {
  trainingDurationGraphSelector,
  trainingLoadGraphSelector,
} from "@/recoil/dashboard/dashboardState";
import { getSeriesDataMaxvalue, SeriesDataType } from "@/types/chart";
import { yAxisIds } from "@/constants/mock/dashboard";
import EnabledTextBtn from "@/components/dashboard/enabledTextBtn";

const TrainingLoadGraph = () => {
  const trainingLoadGraphInfo = useRecoilValue(trainingLoadGraphSelector);
  const trainingDurationGraphInfo = useRecoilValue(
    trainingDurationGraphSelector,
  );
  const [progressData, setProgressData] = useState<SeriesDataType[]>([]); // trainingLoad
  const [progressData2, setProgressData2] = useState<SeriesDataType[]>([]); // trainingDuration
  const [xAxis, setXAxis] = useState<Array<string>>([]);
  const [xAxis2, setXAxis2] = useState<Array<string>>([]);
  const [trainingType, setTrainingType] = useState<string>("load");

  const init = () => {
    setTrainingType("load");
    setProgressData([]);
    setProgressData2([]);
    setXAxis([]);
    setXAxis2([]);
  };

  useEffect(() => {
    init();

    if (trainingLoadGraphInfo.length > 0) {
      const tempLoadValue: Array<number> = [];
      const tempTotalCount: Array<number> = [];
      const xAxisList: Array<string> = [];

      trainingLoadGraphInfo.map((info) => {
        const { weeklyGraphInfo } = info;
        weeklyGraphInfo?.map((item) => {
          tempLoadValue.push(item.value);
          tempTotalCount.push(item.hooperIndex);
          xAxisList.push(`${item.xvalue}`);
        });
      });

      setProgressData([
        {
          type: "bar",
          yAxisKey: "loadValue",
          data: tempLoadValue,
          color: "#C6E19B",
        },
        {
          type: "line",
          curve: "linear",
          yAxisKey: "totalCount",
          data: tempTotalCount,
          color: "#7d7d7d",
        },
      ]);
      setXAxis(xAxisList);
    }

    if (trainingDurationGraphInfo.length > 0) {
      const tempLoadValue: Array<number> = [];
      const tempTotalCount: Array<number> = [];
      const xAxisList: Array<string> = [];

      trainingDurationGraphInfo.map((info) => {
        const { weeklyGraphInfo } = info;
        weeklyGraphInfo?.map((item) => {
          tempLoadValue.push(item.value);
          tempTotalCount.push(item.intensityLevel);
          xAxisList.push(`${item.xvalue}`);
        });
      });

      setProgressData2([
        {
          type: "bar",
          yAxisKey: "loadValue",
          data: tempLoadValue,
          color: "#C6E19B",
        },
        {
          type: "line",
          curve: "linear",
          yAxisKey: "totalCount",
          data: tempTotalCount,
          color: "#7d7d7d",
        },
      ]);
      setXAxis2(xAxisList);
    }
  }, [trainingLoadGraphInfo, trainingDurationGraphInfo]);

  return (
    <div className="grid grid-cols-12 space-x-10">
      <div className="flex flex-col col-span-12 space-y-4">
        <div className="flex justify-between">
          <span className="text-[15px] font-[400] space-x-2">
            ■ 월간 트레이닝 부하
          </span>
          <div className="flex ml-4 text-[15px] font-[700] space-x-4">
            <EnabledTextBtn
              text={"TSB Training Load & HI"}
              isEnabled={trainingType === "load"}
              onClick={() => setTrainingType("load")}
            />
            <EnabledTextBtn
              text={"TSB Training Duration & RPE"}
              isEnabled={trainingType === "duration"}
              onClick={() => setTrainingType("duration")}
            />
          </div>
        </div>
        <div className="space-y-3">
          <div className="rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
            {(trainingType === "load" && progressData.length !== 0) ||
            (trainingType === "duration" && progressData2.length !== 0) ? (
              <AxisWithComposition
                xAxisData={trainingType === "load" ? xAxis : xAxis2}
                seriesData={
                  trainingType === "load" ? progressData : progressData2
                }
                yAxisIds={[
                  {
                    ...yAxisIds[0],
                    min: 0,
                    max: getSeriesDataMaxvalue(
                      trainingType === "load"
                        ? progressData[0]
                        : progressData2[0],
                    ),
                  },
                  {
                    ...yAxisIds[1],
                    min: 0,
                    max: trainingType === "load" ? 28 : 10,
                  },
                ]}
                height={260}
                margin={{ left: 60, right: 60 }}
                yAxisInterval={
                  trainingType === "load" ? [0, 7, 14, 21, 28] : [0, 5, 10]
                }
              />
            ) : (
              <div className="min-h-[260px] flex items-center justify-center w-full py-10 font-bold">
                데이터가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingLoadGraph;
