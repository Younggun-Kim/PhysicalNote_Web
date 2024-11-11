import { instanceWithToken } from "@/api";
const prefix = "/admin";

const InjuryProgress = {
  async v1GetInjuryProgress(year: string) {
    try {
      const url = `${prefix}/injury/graph?year=${year}`;
      return await instanceWithToken.get(url);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  /** 선수 부상자 현황 목록 */
  async v2GetInjuryList(
    injuryType: string,
    yearMonth: string,
    playerGrade?: string,
  ) {
    try {
      let url = `${prefix}/injury/list?injuryType=${injuryType}&yearMonth=${yearMonth}`;
      if (playerGrade) {
        url += `&playerGrade=${playerGrade}`;
      }
      return await instanceWithToken.get(url);
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export default InjuryProgress;
