export interface DashboardResponseType {
  teamConditionInfo: TeamConditionInfoType;
  todayTrainingPlanInfo: TodayTrainingPlanInfoType[];
  weeklyWorkloadInfo: WeeklyWorkLoadInfoType;
  weeklyWorkoutAnalysisInfo: WeeklyWorkAnalysisInfoType;
  trainingBalanceInfo: TrainingBalanceInfoType;
  trainingLoadGraphInfo: TrainingLoadGraphInfoType[];
  trainingDurationGraphInfo: TrainingDurationGraphInfoType[];
  teamNoteInfo: TeamNoteInfoType;
}

// 팀 컨디션 정보
export interface TeamConditionInfoType {
  hooperIndexValue: number;
  hooperIndexString: string;
  urineValue: number;
  registeredPlayerIds: Array<number>;
  registeredPlayerCnt: number;
  registeredPlayerInfo: Array<PlayerInfoType>;
  unRegisteredPlayerIds: Array<number>;
  unRegisteredPlayerCnt: number;
  unRegisteredPlayerInfo: Array<PlayerInfoType>;
}

// 선수 정보
export interface PlayerInfoType {
  id: number;
  name: string;
  playerGrade: string;
  positions: Array<string>;
}

// 관찰대상 정보
export interface TeamHooperIndexInfoType {
  userInfo: UserInfoType;
  hooperIndexInfo: HooperIndexInfoType | null;
}

export interface TeamCautionPageType {
  content: TeamHooperIndexInfoType[];
  totalElements: number;
}

export interface UserInfoType {
  userId: number;
  profile: string | null;
  name: string;
  positions: Array<string>;
  playerGrade: string;
}

export interface HooperIndexInfoType {
  id: number;
  sleep: string;
  stress: string;
  fatigue: string;
  muscleSoreness: string;
  recordDate: string;
}

// 부상 정보
export interface TeamInjuryInfoType {
  teamInjuryCnt: number;
  injuryInfoList: InjuryInfoListType[];
}

export interface InjuryInfoListType {
  injuryInfo: InjuryInfoType[];
  userInfo: UserInfoType;
}

export interface InjuryInfoType {
  injuryOfString: string;
  injuryDetails: string;
}

// 훈련계획 정보
export interface TodayTrainingPlanInfoType {
  id: number;
  categoryName: string;
  startTime: string;
  endTime: string;
  address: string;
  content: string;
}

// 주간 트레이닝 부하 정보
export interface WeeklyWorkLoadInfoType {
  stringOfWeekly: string;
  workloadInfoList: WorkLoadInfoType[];
}

export interface WorkLoadInfoType {
  hooperIndex: number;
  value: number;
  xvalue: string;
}

// 주간 트레이닝 - RPE -  부하 정보
export interface WeeklyWorkAnalysisInfoType {
  stringOfWeekly: string;
  workoutInfoList: WorkAnalysisInfoType[];
}

export interface WorkAnalysisInfoType {
  intensityLevel: number;
  workoutMinutes: number;
  xvalue: string;
}

export const workoutAnalysisToLoad = (
  analysis: WeeklyWorkAnalysisInfoType,
): WeeklyWorkLoadInfoType => {
  return {
    stringOfWeekly: analysis.stringOfWeekly,
    workloadInfoList: analysis.workoutInfoList.map(
      ({ xvalue, workoutMinutes: value, intensityLevel: hooperIndex }) => {
        return {
          xvalue,
          value,
          hooperIndex,
        };
      },
    ),
  };
};

// 트레이닝 밸런스 정보
export interface TrainingBalanceInfoType {
  thisWeekValue: number; // 이번주
  lastTwoWeekValue: number; // 지난 2주
  lastTwoWeekBalanceValue: number; // 지난 2주 밸런스 값
  lastTwoWeekValueOfString: string; // 지난 2주 문자열 값
  lastFourWeekValue: number;
  lastFourWeekBalanceValue: number;
  lastFourWeekValueOfString: string;
  lastSixWeekValue: number;
  lastSixWeekBalanceValue: number;
  lastSixWeekOfString: string;
  lastEightWeekValue: number;
  lastEightWeekBalanceValue: number;
  lastEightWeekValueOfString: string;
}

// 훈련 부하 모니터링 정보
export interface TrainingLoadGraphInfoType {
  monthOfString: string;
  weeklyGraphInfo: WorkLoadInfoType[];
}

export interface TrainingDurationGraphInfoType {
  monthOfString: string;
  weeklyGraphInfo: {
    value: number;
    xvalue: string;
    intensityLevel: number;
  }[];
}

// 비고 정보
export interface TeamNoteInfoType {
  content: string;
  recordDate: string;
}

export interface LevelCircleType {
  level: string | undefined;
}

export interface TeamConditionType {
  searchDate: Date;
}

export interface TodayTrainingPlanType {
  searchDate: Date;
}

export interface TeamNoteType {
  searchDate: Date;
}

export interface PaginationProps {
  initPage: Date;
  getData: (page?: number) => Promise<void>;
}
