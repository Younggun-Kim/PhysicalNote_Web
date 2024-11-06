import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TeamNoteType } from "@/types/dashboard";
import Button from "@/components/common/button";
import { getFullDateToString } from "@/utils/dateFormat";
import { useRecoilValue } from "recoil";
import { playerDetailSelector } from "@/recoil/player/playerState";
import Api from "@/api/player";
import { showToast } from "@/utils";

const FeedbackInfo = ({ searchDate }: TeamNoteType) => {
  const router = useRouter();
  const { id } = router.query;
  const playerDetail = useRecoilValue(playerDetailSelector);
  const [note, setNote] = useState<string>("");
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const handleContentChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    setHtmlContent(e.currentTarget.innerHTML);
  };

  const updateFeedback = async () => {
    const params = {
      content: htmlContent,
      recordDate: date,
    };

    await Api.v1UpdateFeedback(Number(id), params).then((res) => {
      const { status } = res;
      if (status === 200) {
        showToast("오늘의 피드백이 정상 등록되었습니다.");
      }
    });
  };

  useEffect(() => {
    setNote(playerDetail?.feedBackInfo?.content || "");
  }, [playerDetail]);

  useEffect(() => {
    if (searchDate) {
      setDate(getFullDateToString(searchDate));
    }
  }, [searchDate]);

  return (
    <div className="w-full flex flex-col rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] py-4 px-8 space-y-2">
      <div className="flex space-x-4">
        <div className="text-[20px] font-[700] space-x-1">오늘의 피드백</div>
      </div>
      <div className="w-full h-[75px] relative border-[1px]">
        <div
          className="w-full h-[75px] overflow-y-scroll bg-transparent border-none resize-none outline-none py-0 focus:border-transparent focus:ring-0"
          contentEditable
          onInput={handleContentChange}
          dangerouslySetInnerHTML={{ __html: note }}
        ></div>
      </div>
      <div className="w-full flex justify-end">
        <Button
          text="저장"
          type="button"
          classnames="text-[12px] h-[25px] text-[#8DBE3D] font-[700]"
          onClick={updateFeedback}
        />
      </div>
    </div>
  );
};

export default FeedbackInfo;
