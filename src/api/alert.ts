import { instanceWithToken } from "@/api";
const prefix = "/admin";

const Alert = {
  async v1PushUnregistered(recordDate: string) {
    try {
      const url = `${prefix}/push_unregistered`;
      const result = await instanceWithToken.post(url, null, {
        params: { recordDate },
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1PushSchedule(recordDate: string) {
    try {
      const url = `${prefix}/push_schedule`;
      const result = await instanceWithToken.post(url, null, {
        params: { recordDate },
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export default Alert;
