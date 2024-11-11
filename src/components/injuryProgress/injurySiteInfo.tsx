/**
 * 부상 부위 정보
 */

import { MuscleTypeKey } from "@/types";
import { cls, MuscleImgMap, MuscleUtils } from "@/utils";
import { FrontBodyExternalOblique } from "@/components/muscleSvg/front/body/external_oblique";
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
}: InjurySiteInfoProps) => {
  const muscleName: string = MuscleUtils.getMuscleName(muscle);

  const MuscleImage = MuscleImgMap[bodyPart][muscle] || EmptyImageView;
  return (
    <div className="flex justify-center items-center py-4">
      <div className="w-20 h-20 overflow-hidden mr-3">
        {/*<img src="https://picsum.photos/200/300" alt={muscleName} />*/}
        <MuscleImage color={MuscleUtils.levelToBgColor(injuryLevel)} />
      </div>
      <div className="flex flex-col">
        <div className={"flex gap-1"}>
          <span className="text-body-md-b">{muscleName}</span>
          <InjuryLevelBadge level={injuryLevel} />
        </div>
        <span className="text-body-sm">{injuryType}</span>
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
  return (
    <div
      className={cls(
        "py-[2px] px-[6.5px] text-body-sm rounded-full text-center",
        textColor,
        `bg-[${MuscleUtils.levelToBgColor(level)}]`,
      )}
    >
      {level}단계
    </div>
  );
};
