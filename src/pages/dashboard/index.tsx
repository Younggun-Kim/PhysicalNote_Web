import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import Layout from "@/components/layout";
import DatePickerComponent from "@/components/common/datepicker";
import TeamCondition from "@/components/dashboard/teamCondition";
import TeamHooperIndex from "@/components/dashboard/teamHooperIndex";
import TeamInjury from "@/components/dashboard/teamInjury";
import TodayTrainingPlan from "@/components/dashboard/todayTrainingPlan";
import WeeklyWorkLoad from "@/components/dashboard/weeklyWorkLoad";
import TrainingBalance from "@/components/dashboard/trainingBalance";
import TeamNote from "@/components/dashboard/teamNote";
import TrainingLoadGraph from "@/components/dashboard/trainingLoadGraph";
import { useSetRecoilState } from "recoil";
import {
  teamConditionSelector,
  teamHooperIndexSelector,
  teamInjurySelector,
  todayTrainingPlanSelector,
  weeklyWorkloadSelector,
  trainingBalanceSelector,
  trainingLoadGraphSelector,
  teamNoteSelector,
  trainingDurationGraphSelector,
  weeklyRpeSelector,
} from "@/recoil/dashboard/dashboardState";
import Api from "@/api/dashboard";
import { getFullDateToString } from "@/utils/dateFormat";
import { DashboardResponseType } from "@/types/dashboard";
import AuthLayout from "@/components/layout/authLayout";
import { RoundButtonFactory, Button } from "@/components/common";
import { SendWorkoutTimeModal } from "@/components/dashboard/modal/sendWorkoutTimeModal";

const Dashboard: NextPage = () => {
  const [initDate, setInitDate] = useState<Date>(new Date());
  const [searchDate, setSearchDate] = useState<Date>(new Date());
  const [isOpenSendWorkoutTimeModal, setIsOpenSendWorkoutTimeModal] =
    useState<boolean>(false);

  const setTeamCondition = useSetRecoilState(teamConditionSelector);
  const setTeamCaution = useSetRecoilState(teamHooperIndexSelector);
  const setTeamInjury = useSetRecoilState(teamInjurySelector);
  const setTodayTrainingPlan = useSetRecoilState(todayTrainingPlanSelector);
  const setWeeklyWorkload = useSetRecoilState(weeklyWorkloadSelector);
  const setWeeklyRpe = useSetRecoilState(weeklyRpeSelector);
  const setTrainingBalance = useSetRecoilState(trainingBalanceSelector);
  const setTrainingLoadGraph = useSetRecoilState(trainingLoadGraphSelector);
  const setTrainingDurationGraph = useSetRecoilState(
    trainingDurationGraphSelector,
  );
  const setTeamNote = useSetRecoilState(teamNoteSelector);

  const toggleDate = (type: string) => {
    const today = new Date();

    if (type === "lastWeek2") {
      const lastWeek2 = today.setDate(today.getDate() - 14);
      setInitDate(new Date(lastWeek2));
    }

    if (type === "lastWeek") {
      const lastWeek = today.setDate(today.getDate() - 7);
      setInitDate(new Date(lastWeek));
    }

    if (type === "today") {
      setInitDate(today);
    }
  };

  const getDashboardInfo = async () => {
    await Api.v1GetDashboard(getFullDateToString(searchDate)).then((res) => {
      const result: DashboardResponseType = res.data;

      setTeamCondition({ ...result.teamConditionInfo });
      setTodayTrainingPlan([...result.todayTrainingPlanInfo]);
      setWeeklyWorkload(result.weeklyWorkloadInfo);
      setWeeklyRpe(result.weeklyWorkoutAnalysisInfo);
      setTrainingBalance({ ...result.trainingBalanceInfo });
      setTeamNote({ ...result.teamNoteInfo });
      setTrainingLoadGraph([...result.trainingLoadGraphInfo]);
      setTrainingDurationGraph([...result.trainingDurationGraphInfo]);
    });
  };

  const getTeamCautionInfo = async (page: number = 0) => {
    await Api.v1GetTeamCaution(getFullDateToString(searchDate), page, 6).then(
      (res) => {
        const { content, totalElements } = res.data;
        setTeamCaution({
          content,
          totalElements,
        });
      },
    );
  };

  const getTeamInjuryInfo = async (page: number = 0) => {
    await Api.v1GetTeamInjury(page, 4).then((res) => {
      const { teamInjuryCnt, userInjuryInfoList } = res.data;
      setTeamInjury({
        teamInjuryCnt,
        injuryInfoList: userInjuryInfoList.content,
      });
    });
  };

  const init = () => {
    setInitDate(new Date());
  };

  useEffect(() => {
    getDashboardInfo();
    getTeamCautionInfo();
    getTeamInjuryInfo();
  }, [searchDate]);

  return (
    <AuthLayout>
      <div className="min-w-[2050px]">
        <Layout>
          <div className="flex items-center space-x-[30px]">
            <h1 className="text-[28px] font-[700]">대시보드</h1>
            <RoundButtonFactory.md
              type="button"
              text="운동시간 전송"
              onClick={() => setIsOpenSendWorkoutTimeModal(true)}
            />
          </div>
          <div className="flex items-center justify-end space-x-2">
            <Button
              type="button"
              text="2주전"
              classnames="h-[36px] px-4 text-[#8DBE3D] text-[13px] font-[700]"
              onClick={() => toggleDate("lastWeek2")}
            />
            <Button
              type="button"
              text="지난주"
              classnames="h-[36px] px-4 text-[#8DBE3D] text-[13px] font-[700]"
              onClick={() => toggleDate("lastWeek")}
            />
            <Button
              type="button"
              text="오늘"
              classnames="h-[36px] px-4 text-[#8DBE3D] text-[13px] font-[700]"
              onClick={() => toggleDate("today")}
            />
            <DatePickerComponent
              calendarType="free"
              initDate={initDate}
              changeDate={setSearchDate}
            />
            <Button
              type="button"
              text="초기화"
              classnames="h-[36px] px-4 text-[#000] text-[13px] font-[700]"
              onClick={init}
            />
          </div>
          <div className="space-y-8">
            <div className="flex flex-col space-y-2">
              <h2 className="text-[20px] font-[500]">팀 컨디션</h2>
              <div className="grid grid-cols-12 space-x-10">
                <TeamCondition searchDate={searchDate} />
                <TeamHooperIndex
                  initPage={searchDate}
                  getData={getTeamCautionInfo}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="grid grid-cols-12 space-x-10">
                <TeamInjury initPage={searchDate} getData={getTeamInjuryInfo} />
                <TodayTrainingPlan searchDate={searchDate} />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <h2 className="text-[20px] font-[500]">운동부하 밸런스</h2>
              <div className="grid grid-cols-12 gap-10">
                <div className="col-span-5 row-span-1">
                  <WeeklyWorkLoad />
                </div>
                <div className="col-span-4 row-span-1">
                  <TrainingBalance />
                </div>
                <div className="col-span-3 row-span-2">
                  <TeamNote />
                </div>

                <div className="flex flex-col col-span-9 row-span-1">
                  <TrainingLoadGraph />
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </div>

      {isOpenSendWorkoutTimeModal && (
        <SendWorkoutTimeModal
          isOpen={isOpenSendWorkoutTimeModal}
          setIsOpen={setIsOpenSendWorkoutTimeModal}
        />
      )}
    </AuthLayout>
  );
};

export default Dashboard;
