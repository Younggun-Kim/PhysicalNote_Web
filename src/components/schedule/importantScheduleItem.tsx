import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ImportantScheduleProps } from "@/types/schedule";
import { getDetailSchedulePath } from "@/pages/schedule/detail";

const ImportantScheduleItem = ({
  id,
  name,
  address,
  recordDate,
  workoutTime,
}: ImportantScheduleProps) => {
  const router = useRouter();
  const [isImportant, setIsImportant] = useState<boolean>(true);

  const goEdit = () => {
    if (id) {
      router.push(getDetailSchedulePath(id));
    }
  };

  /*
  const updateImportantSchedule = async () => {
    await Api.v1UpdateImportantSchedule(id).then((res) => {
      const { importantYn } = res.data;

      setIsImportant(importantYn);
      if (importantYn) {
        showToast("즐겨찾기로 등록되었습니다.");
      } else {
        showToast("즐겨찾기가 해제되었습니다.");
      }
    });
  };*/

  return (
    <div className="cursor-pointer shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] rounded-[20px] w-full h-[118px] flex flex-col space-y-1 py-3 px-5">
      <div className="w-full flex justify-around items-center">
        <div className="w-full flex justify-start items-center space-x-1">
          <Image
            src={
              isImportant
                ? "/images/star_checked.svg"
                : "/images/star_unchecked.svg"
            }
            width={0}
            height={0}
            alt="important icon"
            style={{ width: "22px", height: "auto" }}
            // onClick={updateImportantSchedule}
          />
          <span className="text-[16px] font-[700]">{name}</span>
        </div>
        <div onClick={goEdit}>
          <Image
            src="/icons/edit_gray.svg"
            width={0}
            height={0}
            alt="important icon"
            style={{ width: "15px", height: "auto" }}
          />
        </div>
      </div>
      <div className="flex flex-col text-[15px]">
        <span>기간 - {recordDate}</span>
        <span>시간 - {workoutTime}</span>
        <div className="flex">
          <div>장소 -&nbsp;</div>
          <div className="w-full truncate">{address}</div>
        </div>
      </div>
    </div>
  );
};

export default ImportantScheduleItem;
