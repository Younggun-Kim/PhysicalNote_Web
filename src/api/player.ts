import { instanceWithToken } from "@/api";
import { TeamNoteInfoType } from "@/types/dashboard";
import {
  ApprovePlayerRequestType,
  FeedBackInfoType,
  PlayerChangeRequestType,
} from "@/types/player";
import { PlayersRequestType } from "@/types/privateData";
import {
  ErrorResponseDto,
  ErrorResponseType,
} from "@/api/common/errorResponse";
import axios from "axios";
import { FeedbackListPeriodValueType } from "@/components/player/modal/FeedbackListPeriodFilterBtn";

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
      return await instanceWithToken.post(url, {
        ...data,
      });
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
  async v1PostFeedback(playerId: number, data: TeamNoteInfoType) {
    try {
      const url = `${prefix}/feed_back/${playerId}`;
      return await instanceWithToken.post<FeedBackInfoType>(url, { ...data });
    } catch (err) {
      if (axios.isAxiosError<ErrorResponseDto>(err)) {
        return Promise.reject(err.response?.data.message);
      }
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
  /**
   * 선수의 피드백 목록 리스트 조회
   * @param period ALL | TODAY | THIS_WEEK | LAST_WEEK
   * @param playerId 선수번호
   * @returns
   */
  async v2GetFeedbackList(
    period: FeedbackListPeriodValueType,
    playerId: number,
  ) {
    try {
      const url = `${prefix}/feed_backs/${playerId}?period=${period}&sortDirection=DESC`;
      return await instanceWithToken.get(url);
    } catch (err) {
      return Promise.reject(err);
    }
  },

  /**
   * 피드백 수정
   * @param feedbackId
   * @param data
   */
  async v2UpdateFeedback(feedbackId: number, data: TeamNoteInfoType) {
    try {
      const url = `${prefix}/feed_back/${feedbackId}`;
      return await instanceWithToken.put<FeedBackInfoType>(url, { ...data });
    } catch (err) {
      if (axios.isAxiosError<ErrorResponseDto>(err)) {
        return Promise.reject(err.response?.data.message);
      }
      return Promise.reject(err);
    }
  },
};

export default Player;
