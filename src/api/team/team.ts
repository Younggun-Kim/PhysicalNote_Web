import { instanceWithToken } from "@/api";

const prefix = "/admin/team";

const TeamApi = {
  async v2GetTeamCoaches(playerId: number) {
    try {
      const url = `${prefix}/coaches/${playerId}`;
      return await instanceWithToken.get(url);
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export default TeamApi;
