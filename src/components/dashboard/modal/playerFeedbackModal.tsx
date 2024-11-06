import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import ModalForm from "@/components/common/modal/modalForm";
import Api from "@/api/player";
import { showToast } from "@/utils";
import { TeamHooperIndexInfoType } from "@/types/dashboard";
import { LevelCircle } from "@/components/dashboard/teamHooperIndex";
import Button from "@/components/common/button";
import { getFullDateToString } from "@/utils/dateFormat";

interface FeedbackModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data: TeamHooperIndexInfoType;
  searchDate: Date;
}

const PlayerFeedbackModal = ({
  setIsOpen,
  data,
  searchDate,
}: FeedbackModalProps) => {
  const [note, setNote] = useState<string>("");
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const onClickClose = () => {
    document.body.style.overflow = "unset";
    setIsOpen(false);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    setHtmlContent(e.currentTarget.innerHTML);
  };

  const sendFeedback = async () => {
    const params = {
      content: htmlContent,
      recordDate: date,
    };

    await Api.v1UpdateFeedback(Number(data.userInfo!.userId), params).then(
      (res) => {
        const { status } = res;
        if (status === 200) {
          showToast("피드백이 정상 등록되었습니다.");
          onClickClose();
        }
      }
    );
  };

  useEffect(() => {
    setNote("");
    if (searchDate) {
      setDate(getFullDateToString(searchDate));
    }
  }, [searchDate]);

  return (
    <ModalForm onClickEvent={onClickClose}>
      <div>
        <div className="relative">
          <div className="flex text-[19px] font-[700] items-center absolute top-[-30px] left-[0px]">
            <div className="bg-[#C7DF9F] px-[15px] py-[2px] mr-[10px] rounded-[5px]">
              {data.userInfo.playerGrade === "FR"
                ? "1군"
                : data.userInfo.playerGrade === "SE"
                  ? "2군"
                  : "부상자"}
            </div>
            <div className="max-w-[370px] line-clamp-1">{`${data.userInfo.positions.join("/")} ${data.userInfo.name}`}</div>
          </div>
        </div>
        <div className="px-[68px] py-[15px]">
          <div className="flex space-x-12">
            <div className="w-full flex justify-between text-[12px]">
              <div className="text-[14px]">수면의 질</div>
              <LevelCircle level={data.hooperIndexInfo?.sleep} />
            </div>
            <div className="w-full flex justify-between text-[12px]">
              <div className="text-[14px]">피로</div>
              <LevelCircle level={data.hooperIndexInfo?.fatigue} />
            </div>
          </div>
          <div className="flex space-x-12">
            <div className="w-full flex justify-between text-[12px]">
              <div className="text-[14px]">스트레스</div>
              <LevelCircle level={data.hooperIndexInfo?.stress} />
            </div>
            <div className="w-full flex justify-between text-[12px]">
              <div className="text-[14px]">근육통</div>
              <LevelCircle level={data.hooperIndexInfo?.muscleSoreness} />
            </div>
          </div>
        </div>
        <div className="w-[450px] h-[95px] relative border-[1px] mb-[17px]">
          <div
            className="w-full h-[95px] overflow-y-scroll bg-transparent border-none resize-none outline-none py-0 focus:border-transparent focus:ring-0"
            contentEditable
            onInput={handleContentChange}
            dangerouslySetInnerHTML={{ __html: note }}
          ></div>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <Button
            type="button"
            text="보내기"
            classnames="text-[#8DBE3D] text-[13px] font-[700]"
            onClick={sendFeedback}
          />
          <Button
            type="button"
            text="취소"
            classnames="text-[#B9B9C3] text-[13px] font-[700]"
            onClick={onClickClose}
          />
        </div>
      </div>
    </ModalForm>
  );
};

export default PlayerFeedbackModal;
