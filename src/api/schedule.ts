import { instanceWithToken } from "@/api";

const prefix = "/admin";
import { CategoryType, ScheduleRequestType } from "@/types/schedule";

const Schedule = {
  async v1GetSchedule(playerGrade: string, recordMonth: string) {
    try {
      const url = `${prefix}/calendar`;
      return await instanceWithToken.get(url, {
        params: { playerGrade, recordMonth },
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1GetCategoryList() {
    try {
      const url = `${prefix}/calendar_category`;
      return await instanceWithToken.get(url);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1GetCategoryColor() {
    try {
      const url = `${prefix}/calendar_category/color`;
      return await instanceWithToken.get(url);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1GetScheduleDaily(
    playerGrade: string,
    recordDate: string,
    page: number,
    size: number,
  ) {
    try {
      const url = `${prefix}/calendar/daily`;
      return await instanceWithToken.get(url, {
        params: { playerGrade, recordDate, page, size },
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1GetImportantSchedule(
    playerGrade: string,
    recordMonth: string,
    page: number,
    size: number,
  ) {
    try {
      const url = `${prefix}/calendar/monthly`;
      return await instanceWithToken.get(url, {
        params: { playerGrade, recordMonth, page, size },
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1GetPlayerList(playerGrade: string, page: number, size: number) {
    try {
      const url = `${prefix}/player/list/simple`;
      return await instanceWithToken.get(url, {
        params: { playerGrade, page, size },
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1AddCategory(category: CategoryType) {
    try {
      const url = `${prefix}/calendar_category`;
      return await instanceWithToken.post(url, { ...category });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1UpdateCategory(categoryId: number, category: CategoryType) {
    try {
      const url = `${prefix}/calendar_category/${categoryId}`;
      return await instanceWithToken.put(url, { ...category });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1AddSchedule(schedule: ScheduleRequestType) {
    try {
      const url = `${prefix}/workout_calendar`;
      return await instanceWithToken.post(url, { ...schedule });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1UpdateImportantSchedule(scheduleId: number) {
    try {
      const url = `${prefix}/workout_calendar/${scheduleId}/important`;
      return await instanceWithToken.post(url);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1UpdateSchedule(id: number, schedule: ScheduleRequestType) {
    try {
      const url = `${prefix}/workout_calendar/${id}`;
      return await instanceWithToken.put(url, { ...schedule });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1GetScheduleDetail(id: number) {
    try {
      const url = `${prefix}/workout_calendar/${id}`;
      return await instanceWithToken.get(url);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1DeleteCategory(categoryId: number) {
    try {
      const url = `${prefix}/calendar_category/${categoryId}`;
      return await instanceWithToken.delete(url);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1DeleteSchedule(scheduleId: number) {
    try {
      const url = `${prefix}/workout_calendar/${scheduleId}`;
      return await instanceWithToken.delete(url);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1SearchAddress(query: string) {
    try {
      const url = `${prefix}/search/local`;
      return await instanceWithToken.get(url, {
        params: { query },
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async v1UploadImage(path: string, data: FormData) {
    try {
      const url = `${prefix}/upload/${path}`;
      return await instanceWithToken.post(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export default Schedule;
