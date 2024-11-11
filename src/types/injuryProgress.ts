export interface injuryProgressResponseType {
  contactCnt: number;
  diseaseCnt: number;
  nonContactCnt: number;
  totalCount: number;
  xvalue: string;
}

/// [관리자 - 감독] 선수 부상자 현황 목록 조회
export interface injuryListItemResponseType {
  id: number;
  gradeDisplayName: string;
  name: string;
  playerGrade: string;
  positions: string[];
  injuries: [
    {
      injuryId: number;
      description: string;
      isRecovered: boolean;
      level: number;
      location: string;
      recordDate: string;
      type: string;
    },
  ];
}

/** 선수 부상 완치 응답 모델 */
export interface PostInjuryRecoveryResponseType {
  id: number;
  status: boolean;
  message: string;
}
