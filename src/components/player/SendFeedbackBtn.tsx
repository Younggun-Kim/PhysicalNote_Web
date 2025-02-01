import React from "react";
import SendFeedbackModal from "@/components/player/modal/SendFeedbackModal";
import { useParams } from "next/navigation";

interface Props {
  playerId: number;
}

const SendFeedbackBtn = ({ playerId }: Props) => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  return (
    <>
      <button
        className={[
          "rounded-[10px] border-secondary border-[1px] px-8 py-2.5",
          "font-inter font-bold text-base text-gray-1 mx-6",
        ].join(" ")}
        onClick={() => setIsOpenModal(true)}
      >
        피드백 보내기
      </button>
      {isOpenModal && (
        <SendFeedbackModal
          playerId={playerId}
          onClose={() => setIsOpenModal(false)}
        />
      )}
    </>
  );
};

export default SendFeedbackBtn;
