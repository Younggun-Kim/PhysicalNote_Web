import React, { useEffect, useState } from "react";
import ModalForm from "@/components/common/modal/modalForm";
import FeedbackListPeriodFilterBtn, {
  FeedbackListPeriodType,
  FeedbackPeriod,
  FeedbackPeriodKeys,
} from "@/components/player/modal/FeedbackListPeriodFilterBtn";
import Api from "@/api/player";
import { FeedBackInfoType } from "@/types/player";
import FeedbackListItem from "@/components/player/modal/FeedbackListItem";
import Button from "../../common/button";
import FeedbackInfo from "@/components/player/detail/feedbackInfo";

interface Props {
  playerId: number;
  onClose: () => void;
}

/**
 * 피드백 목록 모달
 * */
const FeedbackListModal = ({ playerId, onClose }: Props) => {
  const [periodFilter, setPeriodFilter] =
    useState<FeedbackListPeriodType>("all");
  const [feedbackList, setFeedbackList] = useState<FeedBackInfoType[]>([]);

  const handleClickFilter = (type: FeedbackListPeriodType) => {
    setPeriodFilter(type);
  };

  const updateItem = (newFeedback: FeedBackInfoType) => {
    const newList = feedbackList.map((feedback) => {
      if (newFeedback.id == feedback.id) {
        return newFeedback;
      }

      return feedback;
    });

    setFeedbackList(newList);
  };

  const getFeedbackList = async () => {
    await Api.v2GetFeedbackList(FeedbackPeriod[periodFilter], playerId).then(
      ({ data }) => {
        setFeedbackList(data?.content ?? []);
      },
    );
  };
  useEffect(() => {
    getFeedbackList();
  }, [periodFilter]);

  return (
    <ModalForm onClickEvent={onClose}>
      <div className="w-[800px] px-5">
        <div className="flex justify-between gap-2.5 mb-7">
          <span className="font-inter font-bold text-xl text-black">
            피드백
          </span>
          <div className="flex-1"></div>
          {FeedbackPeriodKeys.map((type) => (
            <FeedbackListPeriodFilterBtn
              type={type}
              currentType={periodFilter}
              onClick={handleClickFilter}
            />
          )).reverse()}
        </div>
        <div className="max-h-[400px] overflow-x-auto">
          {feedbackList.length == 0 && <span>피드백이 존재하지 않습니다.</span>}
          {feedbackList.length > 0 &&
            feedbackList.map((data) => (
              <FeedbackListItem data={data} onUpdate={updateItem} />
            ))}
        </div>
        <div className="w-full flex justify-end items-center gap-5 mt-5">
          <Button
            type="button"
            text="확인"
            classnames="bg-primary text-white text-base font-bold py-2.5 px-8"
            onClick={onClose}
          />
        </div>
      </div>
    </ModalForm>
  );
};

export default FeedbackListModal;
