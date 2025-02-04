import { instanceWithToken } from "@/api";
import { TeamNoteInfoType } from "@/types/dashboard";
import {
  ApprovePlayerRequestType,
  CoachInfoType,
  FeedBackInfoType,
  PlayerChangeRequestType,
} from "@/types/player";
import { PlayersRequestType } from "@/types/privateData";
import { ErrorResponseDto } from "@/api/common/errorResponse";
import axios from "axios";
import { FeedbackListPeriodValueType } from "@/components/player/modal/FeedbackListPeriodFilterBtn";

const prefix = "/admin";

const Player = {
  async v1GetPlayers(data: PlayersRequestType, page: number, size: number) {
    try {
      const url = `${prefix}/player`;
      return await instanceWithToken.get(url, {
        params: { ...data, page, size },
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1DeletePlayers(userIds: Array<number>) {
    try {
      const url = `${prefix}/player/delete`;
      return await instanceWithToken.delete(url, {
        data: {
          userIds,
        },
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1ChangePlayerGrade(data: PlayerChangeRequestType) {
    try {
      const url = `${prefix}/player/change/play_grade`;
      return await instanceWithToken.put(url, data);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1GetPlayerRequests(page: number, size: number) {
    try {
      const url = `${prefix}/team/request`;
      return await instanceWithToken.get(url, {
        params: { page, size },
      });
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
      return await instanceWithToken.get(url, {
        params: { recordDate },
      });
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
      return await instanceWithToken.get(url, {
        params: { name },
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  /**
   * 선수의 피드백 목록 리스트 조회
   * @param period ALL | TODAY | THIS_WEEK | LAST_WEEK
   * @param playerId 선수번호
   * @param sortDirection 'ASC' | 'DESC'
   * @returns
   */
  async v2GetFeedbackList(
    period: FeedbackListPeriodValueType,
    playerId: number,
    sortDirection: "ASC" | "DESC",
  ) {
    try {
      const url = `${prefix}/feed_backs/${playerId}?period=${period}&sortDirection=${sortDirection}`;
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

  /**
   * 선수의 담당 코치 변경
   * @param userId
   * @param coachId
   */
  async v2UpdatePlayerCoach(userId: number, coachId: number) {
    try {
      const url = `${prefix}/player/${userId}/coach/${coachId}`;
      return await instanceWithToken.put<CoachInfoType>(url);
    } catch (err) {
      if (axios.isAxiosError<ErrorResponseDto>(err)) {
        return Promise.reject(err.response?.data.message);
      }
      return Promise.reject(err);
    }
  },
};

export default Player;
