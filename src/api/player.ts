import { instanceWithToken } from "@/api";
import { TeamNoteInfoType } from "@/types/dashboard";
import {
  ApprovePlayerRequestType,
  PlayerChangeRequestType,
} from "@/types/player";
import { PlayersRequestType } from "@/types/privateData";
const prefix = "/admin";

const Player = {
  async v1GetPlayers(data: PlayersRequestType, page: number, size: number) {
    try {
      const url = `${prefix}/player`;
      const result = await instanceWithToken.get(url, {
        params: { ...data, page, size },
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1DeletePlayers(userIds: Array<number>) {
    try {
      const url = `${prefix}/player/delete`;
      const result = await instanceWithToken.delete(url, {
        data: {
          userIds,
        },
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1ChangePlayerGrade(data: PlayerChangeRequestType) {
    try {
      const url = `${prefix}/player/change/play_grade`;
      const result = await instanceWithToken.put(url, data);
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1GetPlayerRequests(page: number, size: number) {
    try {
      const url = `${prefix}/team/request`;
      const result = await instanceWithToken.get(url, {
        params: { page, size },
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1ApprovePlayerRequests(data: ApprovePlayerRequestType) {
    try {
      const url = `${prefix}/team/request`;
      const result = await instanceWithToken.post(url, {
        ...data,
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1GetPlayerDetail(playerId: number, recordDate: string) {
    try {
      const url = `${prefix}/player/${playerId}`;
      const result = await instanceWithToken.get(url, {
        params: { recordDate },
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1UpdateFeedback(playerId: number, data: TeamNoteInfoType) {
    try {
      const url = `${prefix}/feed_back/${playerId}`;
      const result = await instanceWithToken.post(url, { ...data });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  /**
   * 선수 간단 리스트 조회
   * @param name 선수이름
   * @returns 팀에 등록된 선수 목록
   */
  async v2GetPlayerSimple(name: string) {
    try {
      const url = `${prefix}/player/simple`;
      const result = await instanceWithToken.get(url, {
        params: { name },
      });
      return result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export default Player;
