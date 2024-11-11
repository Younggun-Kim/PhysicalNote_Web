/**
 * 부상 부위 정보
 */

import { MuscleTypeKey } from "@/types";
import { cls, MuscleImgMap, MuscleUtils } from "@/utils";
import { MuscleSvgProps } from "@/components/muscleSvg/muscleSvgProps";

export interface InjurySiteInfoProps {
  /** 몸 부위 */
  bodyPart: string;
  /** 근육 타입 */
  muscle: MuscleTypeKey;
  /** 부상 레벨 */
  injuryLevel: number;
  /** 부상날짜 */
  recordDate: string;
  /** 완치여부 */
  isRecovered: boolean;
  /** 부상타입 */
  injuryType: string;
  /** 질병 설명 */
  description: string;
}

export const EmptyImageView = ({ color }: MuscleSvgProps) => {
  return <div className="w-20 h-20 bg-gray-1"></div>;
};
export const InjurySiteInfo = ({
  bodyPart,
  muscle,
  injuryLevel,
  recordDate,
  injuryType,
  description,
}: InjurySiteInfoProps) => {
  const muscleName: string = MuscleUtils.getMuscleName(muscle);

  const isDisease = injuryType.includes("질병");
  const MuscleImage = isDisease
    ? EmptyImageView
    : MuscleImgMap[bodyPart][muscle] || EmptyImageView;
  return (
    <div className="flex justify-center items-center py-4">
      <div className="w-20 h-20 overflow-hidden mr-3">
        {isDisease && <img src="/images/pills.fill.svg" alt={muscleName} />}

        {!isDisease && (
          <MuscleImage color={MuscleUtils.levelToBgColor(injuryLevel)} />
        )}
      </div>
      <div className="flex flex-col">
        <div className={"flex gap-1"}>
          <span className="text-body-md-b">
            {isDisease ? injuryType : muscleName}
          </span>
          {!isDisease && <InjuryLevelBadge level={injuryLevel} />}
        </div>
        <span className="text-body-sm">
          {isDisease ? description : injuryType}
        </span>
        <span className="text-body-sm text-gray-1">{recordDate}</span>
      </div>
    </div>
  );
};

interface InjuryLevelBadgeProps {
  level: number;
}

/** 부상 레벨 뱃지 */
export const InjuryLevelBadge = ({ level }: InjuryLevelBadgeProps) => {
  const textColor = level > 2 ? "text-white" : "text-black";
  const bgColors = [
    "bg-level-0",
    "bg-level-1",
    "bg-level-2",
    "bg-level-3",
    "bg-level-4",
    "bg-level-5",
  ];
  const clamp = (num: number): number => (num < 0 ? 0 : num > 5 ? 5 : num);
  return (
    <div
      className={cls(
        "py-[2px] px-[6.5px] text-body-sm rounded-full text-center",
        textColor,
        bgColors[clamp(level)],
      )}
    >
      {level}단계
    </div>
  );
};
