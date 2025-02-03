import { instanceWithToken } from "@/api";

const prefix = "/admin/team";

const TeamApi = {
  async v2GetTeamCoaches() {
    try {
      const url = `${prefix}/coaches`;
      return await instanceWithToken.get(url);
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export default TeamApi;
