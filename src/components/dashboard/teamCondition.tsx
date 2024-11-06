import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Box, Slider, styled } from "@mui/material";
import { useRecoilValue } from "recoil";
import { TeamConditionInfoType, TeamConditionType } from "@/types/dashboard";
import { teamConditionSelector } from "@/recoil/dashboard/dashboardState";
import { marks2 } from "@/constants/mock/dashboard";
import PlayerTooltip from "@/components/dashboard/tooltip/playerTooltip";
import Api from "@/api/alert";
import { showToast } from "@/utils";
import { getFullDateToString } from "@/utils/dateFormat";

const TeamCondition = ({ searchDate }: TeamConditionType) => {
  const [condition, setCondition] = useState<TeamConditionInfoType>({
    hooperIndexValue: 0,
    hooperIndexString: "",
    urineValue: 0,
    registeredPlayerIds: [],
    registeredPlayerCnt: 0,
    registeredPlayerInfo: [],
    unRegisteredPlayerIds: [],
    unRegisteredPlayerCnt: 0,
    unRegisteredPlayerInfo: [],
  });
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [previewText, setPreviewText] = useState<string>("");
  const [switchColor, setSwitchColor] = useState<string>("");
  const [switchLeft, setSwitchLeft] = useState<string>("");
  const teamCondition = useRecoilValue(teamConditionSelector);

  const PrettoSlider = styled(Slider)({
    color: "#4D73BA",
    height: 8,
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&:before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      fontSize: 12,
      fontWeight: "normal",
      top: 23,
      backgroundColor: "unset",
      color: "#4D73BA",
      "&:before": {
        display: "none",
      },
      "& *": {
        background: "transparent",
        color: "#000",
        fontWeight: 700,
      },
    },
    "&.Mui-disabled": {
      color: "#4D73BA",
    },
  });
  const PrettoSlider2 = styled(Slider)({
    color: "#E6E68C",
    height: 8,
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&:before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      fontSize: 12,
      fontWeight: "normal",
      top: 23,
      backgroundColor: "unset",
      color: "#E6E68C",
      "&:before": {
        display: "none",
      },
      "& *": {
        background: "transparent",
        color: "#000",
        fontWeight: 700,
      },
    },
    "&.Mui-disabled": {
      color: "#E6E68C",
    },
  });

  function valuetext(value: number) {
    return `${value}`;
  }

  const rangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(e.target.value));
    getLeftColor(sliderValue);
    getPreviewPosition(sliderValue);
  };

  const getLeftColor = useCallback((value: number) => {
    const primaryColor = "#4D73BA";
    const secondaryColor = "#BBCAE5";
    const percentage = ((value - 4) / (21 - 4)) * 100;
    setSwitchColor(`linear-gradient(to right,
                    ${primaryColor} 0%, ${primaryColor} ${percentage}%,
                    ${secondaryColor} ${percentage}%, ${secondaryColor} 100%)`);
  }, []);

  const getPreviewPosition = useCallback((value: number) => {
    const newVal = ((value - 4) * 100) / (21 - 4);
    if (value <= 4) setSwitchLeft("0.75rem");
    else if (value >= 21) {
      setSwitchLeft("calc(100% - 0.75rem)");
    } else {
      const tempVal = value < 10 ? 11 : value < 14 ? 8 : value < 17 ? 6 : 4;
      setSwitchLeft(`calc(${newVal}% + (${tempVal - newVal * 0.15}px))`);
    }
  }, []);

  const pushAlert = async () => {
    await Api.v1PushUnregistered(getFullDateToString(searchDate)).then(
      (res) => {
        const { status } = res;
        if (status === 200) {
          showToast("미등록 선수 알림을 보냈습니다.");
        }
      }
    );
  };

  useEffect(() => {
    setCondition(teamCondition);
    const newValue = Math.ceil(teamCondition.hooperIndexValue);
    if (teamCondition) {
      setPreviewText(`${newValue}`);
      getLeftColor(newValue);
      getPreviewPosition(newValue);
    }
  }, [teamCondition]);

  return (
    <div className="flex flex-col col-span-5 space-y-4">
      <div className="flex items-center space-x-24">
        <div className="flex flex-col space-y-2">
          <span className="text-[15px] font-[700]">■ 훈련준비 상태</span>
          <div className="w-full">
            <Box sx={{ width: 300 }}>
              {condition.hooperIndexValue !== 0 ? (
                <>
                  <div className="w-full flex flex-col items-center relative mt-[1rem] mb-[0.5rem]">
                    <span
                      className="absolute text-[#000] mx-0 mt-0 mb-1 left-5 top-3 -translate-x-1/2 -translate-y-4 whitespace-nowrap font-[700] text-[11px] leading-tight tracking-wider"
                      style={{ left: switchLeft }}
                    >
                      {previewText}
                    </span>
                    <input
                      type="range"
                      min="4"
                      max="21"
                      step="1"
                      value={Math.ceil(condition.hooperIndexValue)}
                      onChange={rangeEvent}
                      className="slider w-full m-0 appearance-none outline-none cursor-pointer rounded-md bg-[#778da9]"
                      style={{ background: switchColor }}
                      disabled
                    />
                    <div className="flex w-full items-center justify-between mt-[0.5rem]">
                      <div className="font-[500] text-[14px] tracking-wide ml-[-5px] text-[#2A2A2A]">
                        4
                      </div>
                      <div className="font-[500] text-[14px] tracking-wide mr-[-15px] text-[#2A2A2A]">
                        21이상
                      </div>
                    </div>
                  </div>
                  <em className="text-[12px] text-[#000] font-[700] not-italic">{`Hooper Index(평균값) : ${Math.ceil(condition.hooperIndexValue)} (${condition.hooperIndexString})`}</em>
                </>
              ) : (
                <PrettoSlider disabled />
              )}
            </Box>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col items-center divide-dotted divide-y-2">
            <PlayerTooltip content={condition.registeredPlayerInfo} type="등록">
              <div className="py-2 text-[12px] font-[400] space-x-4 cursor-pointer hover:font-[700]">
                <span>등록선수</span>
                <span>:</span>
                <span>
                  {condition.registeredPlayerCnt < 10
                    ? `0${condition.registeredPlayerCnt}`
                    : condition.registeredPlayerCnt}
                  명
                </span>
              </div>
            </PlayerTooltip>
            <PlayerTooltip
              content={condition.unRegisteredPlayerInfo}
              type="미등록"
            >
              <div className="py-2 text-[12px] font-[400] space-x-4 cursor-pointer hover:font-[700]">
                <span>미등록선수</span>
                <span>:</span>
                <span>
                  {condition.unRegisteredPlayerCnt < 10
                    ? `0${condition.unRegisteredPlayerCnt}`
                    : condition.unRegisteredPlayerCnt}
                  명
                </span>
              </div>
            </PlayerTooltip>
          </div>
          {condition.unRegisteredPlayerCnt !== 0 && (
            <button
              className="bg-white shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] rounded-[5px] w-[170px] h-[25px] flex justify-center items-center space-x-2"
              onClick={() => pushAlert()}
            >
              <span className="text-[12px] text-[#8DBE3D] font-[400]">
                미등록 선수({condition.unRegisteredPlayerCnt}명) 알림
              </span>
              <span>
                <Image
                  src="/images/alert.svg"
                  width={17}
                  height={17}
                  alt="alert icon"
                />
              </span>
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-24">
        <div className="flex flex-col space-y-2">
          <span className="text-[15px] font-[700]">■ 수분섭취 상태</span>
          <div className="w-full">
            <Box sx={{ width: 300 }}>
              {condition.urineValue !== 0 ? (
                <PrettoSlider2
                  defaultValue={Math.ceil(condition.urineValue)}
                  getAriaValueText={valuetext}
                  valueLabelDisplay="on"
                  step={1}
                  marks={marks2}
                  min={1}
                  max={7}
                  disabled
                />
              ) : (
                <PrettoSlider2 disabled />
              )}
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCondition;
