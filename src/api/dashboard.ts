import { instanceWithToken } from "@/api";

const prefix = "/admin";

const Dashboard = {
  async v1GetDashboard(recordDate: string) {
    try {
      const url = `${prefix}/dash_bord`;
      return await instanceWithToken.get(url, {
        params: { recordDate },
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1GetTeamCaution(recordDate: string, page: number, size: number) {
    try {
      const url = `${prefix}/team_caution`;
      return await instanceWithToken.get(url, {
        params: { recordDate, page, size },
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1GetTeamInjury(page: number, size: number) {
    try {
      const url = `${prefix}/team_injury`;
      return await instanceWithToken.get(url, {
        params: { page, size },
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1UpdateTeamNote(content: string) {
    try {
      const url = `${prefix}/note`;
      return await instanceWithToken.post(url, { content });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v2PostPushUnregisteredPlayers(
    recordDate: string,
    userIds: number[],
    workoutTime: string,
    workoutType: string,
  ) {
    try {
      const url = `${prefix}/push/unregistered-players`;
      return await instanceWithToken.post(url, {
        recordDate,
        userIds,
        workoutTime,
        workoutType,
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export default Dashboard;
