import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { playerDetailSelector } from "@/recoil/player/playerState";
import { getInjuryPeriod, InjuryInfoType } from "@/types/player";
import {
  formatInjuryColor,
  formatInjuryLevel,
  formatInjuryType,
  formatMuscleName,
} from "@/types/enum/player";
import { cls } from "@/utils";
import { RecoveryToggleBtn } from "@/components/common";
import InjuryDetailModal from "@/components/player/modal/InjuryDetailModal";

const BodyCheckInfo = () => {
  const [playerDetail, setPlayerDetail] = useRecoilState(playerDetailSelector);
  const [injuryData, setInjuryData] = useState<InjuryInfoType[]>();
  const [isRecovery, setIsRecovery] = useState<boolean>(false);
  const [modalData, setModalData] = useState<InjuryInfoType | undefined>(
    undefined,
  );

  useEffect(() => {
    setFilteredInjuryData();
  }, [playerDetail]);

  /** 필터 변경 시 목록 재설정 */
  useEffect(() => {
    setFilteredInjuryData();
  }, [isRecovery]);

  const handleFilter = (isRecovery: boolean) => {
    setIsRecovery(isRecovery);
  };

  const setFilteredInjuryData = () => {
    if (isRecovery) {
      setInjuryData(playerDetail?.recoveryInjuryInfo);
    } else {
      setInjuryData(playerDetail?.injuryInfo);
    }
  };

  return (
    <div className="w-full min-w-[900px] flex flex-col space-y-5 rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] py-4 px-8">
      <div className="space-x-1 flex">
        <span className="flex-1 text-[20px] font-[700] ">부상체크</span>
        <RecoveryToggleBtn isRecovery={isRecovery} onClick={handleFilter} />
      </div>
      <div className="flex space-x-16">
        <div className="w-full h-[330px] overflow-y-scroll p-3 gap-6 grid grid-cols-2">
          {injuryData?.length !== 0 ? (
            <>
              {injuryData?.map((item, idx) => (
                <div
                  key={`injury${idx}`}
                  onClick={() => setModalData(item)}
                  className="h-fit cursor-pointer shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] space-y-2 rounded-[25px] flex flex-col justify-start py-4 px-7"
                >
                  <div className="w-full flex justify-between mb-[5px]">
                    <div className="flex space-x-3">
                      <div
                        className={cls(
                          "px-3 py-0.5 font-[400] rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]",
                          `bg-[${(item.injuryLevelType && formatInjuryColor(item.injuryLevelType)) || "#8DBE3D"}]`,
                          `text-[${item.injuryLevelType === "INJURED" ? "#fff" : "#000"}]`,
                        )}
                      >
                        {(item.injuryLevelType &&
                          formatInjuryLevel(item.injuryLevelType)) ||
                          "0단계"}
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="font-[700] text-[16px]">
                          {(item.muscleType &&
                            formatMuscleName(item.muscleType)) ||
                            "-"}
                        </div>
                        <div className="text-[12px]">
                          {item ? getInjuryPeriod(item) : "-"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[14px] font-[700]">
                      {(item.injuryType && formatInjuryType(item.injuryType)) ||
                        "-"}
                    </div>
                    <div className="text-[14px] font-[700]">
                      {(item.injuryLevelType &&
                        formatInjuryType(item.injuryLevelType).split("-")[0]) ||
                        "-"}
                    </div>
                    <div className="text-[12px]">
                      :{" "}
                      {item.injuryLevelString ||
                        (item.injuryLevelType &&
                          formatInjuryType(item.injuryLevelType).split("-")[1])}
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="col-span-2 min-h-[260px] flex items-center justify-center w-full py-10 font-bold">
              데이터가 없습니다.
            </div>
          )}
          {modalData && (
            <InjuryDetailModal
              data={modalData}
              onClose={() => setModalData(undefined)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BodyCheckInfo;
