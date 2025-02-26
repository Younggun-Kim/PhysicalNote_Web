import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { teamNoteSelector } from "@/recoil/dashboard/dashboardState";
import { TeamNoteInfoType, TeamNoteType } from "@/types/dashboard";
import Api from "@/api/dashboard";
import { showToast } from "@/utils";
import useDebounce from "@/utils/hooks/useDebounce";

const TeamNote = () => {
  const teamNote = useRecoilValue(teamNoteSelector);
  const [note, setNote] = useState<TeamNoteInfoType>({
    content: "",
    recordDate: "",
  });
  const [htmlContent, setHtmlContent] = useState<string>(""); // text -> html

  const debounceQuery = useDebounce(htmlContent, 500);

  const handleClick = () => {
    updateTeamNote();
  };

  useEffect(() => {
    if (debounceQuery) handleClick();
  }, [debounceQuery]);

  const updateTeamNote = async () => {
    await Api.v1UpdateTeamNote(htmlContent).then((res) => {
      const { status } = res;
      if (status === 200) {
        showToast("비고가 저장되었습니다.");
      }
    });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    setHtmlContent(e.currentTarget.innerHTML);
  };

  useEffect(() => {
    if (teamNote) {
      setNote(teamNote);
    }
  }, [teamNote]);

  return (
    <div className="w-full h-full flex flex-col gap-2.5">
      <span className="text-[15px] font-[700]">■ 비고</span>
      <div className="flex flex-col justify-between w-full p-5 min-h-[260px] h-full rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] text-[15px] font-[400]">
        <div
          className="w-full h-[560px] overflow-y-scroll bg-transparent border-none resize-none outline-none p-0 focus:border-transparent focus:ring-0"
          contentEditable
          onInput={handleContentChange}
          dangerouslySetInnerHTML={{ __html: note.content }}
        ></div>
        {/*<textarea
            className="block w-full bg-transparent border-none resize-none outline-none p-0 focus:border-transparent focus:ring-0"
            value={text}
            onChange={handleChange}
            placeholder="Type something..."
            rows={7}
            cols={33}
          />*/}
        <div className="text-right">
          <button
            className="shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] py-1 px-3 rounded-[5px] text-[12px] text-[#8DBE3D] font-[700]"
            type="button"
            onClick={handleClick}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamNote;
