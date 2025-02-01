import ModalForm from "@/components/common/modal/modalForm";
import React, { ChangeEvent, useState } from "react";
import Button from "@/components/common/button";
import Api from "@/api/player";
import { getFullDateToString, showToast } from "@/utils";
import { TeamNoteInfoType } from "@/types/dashboard";

interface Props {
  playerId: number;
  onClose: () => void;
}

const SendFeedbackModal = ({ playerId, onClose }: Props) => {
  const [feedback, setFeedback] = useState("");

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;

    setFeedback(value.slice(0, 300));
  };

  const sendFeedback = async () => {
    if (!feedback) {
      showToast("피드백을 입력해주세요.");
      return;
    }
    const params: TeamNoteInfoType = {
      content: feedback,
      recordDate: getFullDateToString(new Date()),
    };

    await Api.v1PostFeedback(playerId, params)
      .then((res) => {
        const { status } = res;
        if (status === 200) {
          showToast("피드백이 정상 등록되었습니다.");
          onClose();
        }
      })
      .catch((error) => {
        showToast(error);
      });
  };

  return (
    <ModalForm onClickEvent={onClose}>
      <div className="w-[600px] px-5">
        <div className="mb-7">
          <span className="font-inter font-bold text-xl text-black">
            오늘의 피드백
          </span>
        </div>
        <textarea
          className={[
            "w-full h-[171px] rounded-[10px] shadow-md resize-none border-[1px] border-tertiary bg-white",
            "font-inter font-normal text-sm p-5",
          ].join(" ")}
          value={feedback}
          onChange={handleInput}
          placeholder={"피드백을 입력해주세요.(300자 이내)"}
        />
        <div className="w-full flex justify-end items-center gap-5 mt-5">
          <Button
            type="button"
            text="취소"
            classnames="text-gray-1 text-base font-bold py-2.5 px-8"
            onClick={onClose}
          />
          <Button
            type="button"
            text="보내기"
            classnames="bg-primary text-white text-base font-bold py-2.5 px-8"
            onClick={sendFeedback}
          />
        </div>
      </div>
    </ModalForm>
  );
};

export default SendFeedbackModal;
