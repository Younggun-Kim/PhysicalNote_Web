import React from "react";
import ModalForm from "@/components/common/modal/modalForm";
import FeedbackListPeriodFilterBtn, {
  FeedbackListPeriodType,
  FeedbackPeriodValues,
} from "@/components/player/modal/FeedbackListPeriodFilterBtn";

interface Props {
  playerId: number;
  onClose: () => void;
}

/**
 * 피드백 목록 모달
 * */
const FeedbackListModal = ({ playerId, onClose }: Props) => {
  const [periodFilter, setPeriodFilter] =
    React.useState<FeedbackListPeriodType>("all");

  const handleClickFilter = (type: FeedbackListPeriodType) => {
    setPeriodFilter(type);
  };

  return (
    <ModalForm onClickEvent={onClose}>
      <div className="w-[800px] px-5">
        <div className="flex justify-between gap-2.5 mb-7">
          <span className="font-inter font-bold text-xl text-black">
            피드백
          </span>
          <div className="flex-1"></div>
          {FeedbackPeriodValues.map((type) => (
            <FeedbackListPeriodFilterBtn
              type={type}
              currentType={periodFilter}
              onClick={handleClickFilter}
            />
          )).reverse()}
        </div>
      </div>
    </ModalForm>
  );
};

export default FeedbackListModal;
