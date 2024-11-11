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
}
