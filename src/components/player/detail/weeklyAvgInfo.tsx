import React, { useState, useEffect } from "react";
import { cls } from "@/utils";
import WorkoutTimeGraph from "@/components/player/detail/WorkoutTimeGraph";
import IntensityGraph from "@/components/player/detail/IntensityGraph";
import HooperIndexGraph from "@/components/player/detail/HooperIndexGraph";

const WeeklyAvgInfo = () => {
  const [reportType, setReportType] = useState<"days" | "month">("days");
  const [graphType, setGraphType] = useState<"hooper" | "intensity" | "time">(
    "hooper",
  );
  const [hooperType, setHooperType] = useState<
    "sleep" | "stress" | "fatigue" | "muscle"
  >("sleep");

  const onClickDays = () => setReportType("days");
  const onClickWeeks = () => setReportType("month");

  useEffect(() => {
    setHooperType("sleep");
  }, [graphType]);

  return (
    <div className="w-full min-w-[650px] flex space-x-5 rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] py-4 px-8">
      <div className="w-full text-[20px] font-[700] space-x-1 space-y-2">
        <div className="w-full flex justify-between">
          <div className="flex space-x-8">
            <div
              onClick={() => setGraphType("hooper")}
              className={cls(
                "cursor-pointer",
                graphType === "hooper" ? "text-[#000]" : "text-[#C1C1C1]",
              )}
            >
              후퍼인덱스
            </div>
            <div
              onClick={() => setGraphType("intensity")}
              className={cls(
                "cursor-pointer",
                graphType === "intensity" ? "text-[#000]" : "text-[#C1C1C1]",
              )}
            >
              운동강도
            </div>
            <div
              onClick={() => setGraphType("time")}
              className={cls(
                "cursor-pointer",
                graphType === "time" ? "text-[#000]" : "text-[#C1C1C1]",
              )}
            >
              운동시간
            </div>
          </div>
          <div className="flex w-[184px] h-[33px] rounded-lg shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] overflow-hidden font-[700] text-[16px] mt-[10px]">
            <div
              onClick={onClickDays}
              className={cls(
                "w-1/2 flex items-center justify-center cursor-pointer",
                reportType === "days"
                  ? "bg-[#C6E19B] text-white"
                  : "text-[#8DBE3D]",
              )}
            >
              일간
            </div>
            <div
              onClick={onClickWeeks}
              className={cls(
                "w-1/2 flex items-center justify-center cursor-pointer",
                reportType === "month"
                  ? "bg-[#C6E19B] text-white"
                  : "text-[#8DBE3D]",
              )}
            >
              월간
            </div>
          </div>
        </div>
        {graphType === "hooper" && (
          <div className="flex flex-col text-[12px]">
            <div className="flex space-x-8">
              <div
                onClick={() => setHooperType("sleep")}
                className={cls(
                  "cursor-pointer",
                  hooperType === "sleep" ? "text-[#000]" : "text-[#B9B9C3]",
                )}
              >
                수면의 질
              </div>
              <div
                onClick={() => setHooperType("stress")}
                className={cls(
                  "cursor-pointer",
                  hooperType === "stress" ? "text-[#000]" : "text-[#B9B9C3]",
                )}
              >
                스트레스
              </div>
              <div
                onClick={() => setHooperType("fatigue")}
                className={cls(
                  "cursor-pointer",
                  hooperType === "fatigue" ? "text-[#000]" : "text-[#B9B9C3]",
                )}
              >
                피로
              </div>
              <div
                onClick={() => setHooperType("muscle")}
                className={cls(
                  "cursor-pointer",
                  hooperType === "muscle" ? "text-[#000]" : "text-[#B9B9C3]",
                )}
              >
                근육통
              </div>
            </div>
            <div className="w-full">
              <HooperIndexGraph
                isDays={reportType === "days"}
                hooperType={hooperType}
              />
            </div>
          </div>
        )}
        {graphType === "intensity" && (
          <div className="flex flex-col text-[12px]">
            <div className="flex space-x-4 mb-5">
              <div className="flex items-center space-x-1">
                <div className="text-[#000] text-[12px]">스포츠훈련</div>
                <div className="w-[12px] h-[12px] bg-[#C6E19B] rounded-[50%]"></div>
              </div>
              <div className="flex items-center space-x-1">
                <div className="text-[#000] text-[12px]">피지컬훈련</div>
                <div className="w-[12px] h-[12px] bg-[#F0EA0D] rounded-[50%]"></div>
              </div>
            </div>
            <div className="w-full">
              <IntensityGraph isDays={reportType === "days"} />
            </div>
          </div>
        )}
        {graphType === "time" && (
          <div className="flex flex-col text-[12px]">
            <div className="flex space-x-4 mb-5">
              <div className="flex items-center space-x-1">
                <div className="text-[#000] text-[12px]">스포츠훈련</div>
                <div className="w-[12px] h-[12px] bg-[#C6E19B] rounded-[50%]"></div>
              </div>
              <div className="flex items-center space-x-1">
                <div className="text-[#000] text-[12px]">피지컬훈련</div>
                <div className="w-[12px] h-[12px] bg-[#F0EA0D] rounded-[50%]"></div>
              </div>
              <div className="flex-1"></div>
              <div className="text-[#000] text-[12px]\">단위 : 시간</div>
            </div>

            <div className="w-full">
              <WorkoutTimeGraph isDays={reportType === "days"} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyAvgInfo;
