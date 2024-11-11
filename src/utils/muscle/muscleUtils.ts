import { findMuscleKeyByValue, formatMuscleName, MuscleTypeKey } from "@/types";

/** 근육 타입 유틸들 */
export class MuscleUtils {
  /** 근육이름 가져오기, 없을 경우 '-' */
  static getMuscleName = (muscle: MuscleTypeKey): string => {
    return formatMuscleName(muscle);
  };

  /** 근육 이름으로 근육 타입 가져오기 */
  static findMuscleBy(value: string): MuscleTypeKey | undefined {
    return findMuscleKeyByValue[value];
  }

  /** 부상 레벨을 배경 색상으로 */
  static levelToBgColor = (level: number): string => {
    const clamp = (num: number): number => (num < 0 ? 0 : num > 5 ? 5 : num);

    return (
      {
        0: "#8DBE3D",
        1: "#B7d487",
        2: "#FBDD73",
        3: "#FFC808",
        4: "#F27C21",
        5: "#FF0000",
      }[clamp(level)] ?? "#7d7d7d"
    );
  };
}
