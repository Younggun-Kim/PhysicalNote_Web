import React from "react";
import FeedbackListModal from "@/components/player/modal/FeedbackListModal";

interface Props {
  playerId: number;
}

/**
 * 활동 내역 버튼
 *
 * 피드백 모달을 여는 역할
 */
const FeedbackListBtn = ({ playerId }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <button
        className={[
          "underline font-inter font-normal text-base text-black",
        ].join(" ")}
        onClick={() => setIsOpen(true)}
      >
        활동 내역
      </button>
      {isOpen && (
        <FeedbackListModal
          playerId={playerId}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default FeedbackListBtn;
