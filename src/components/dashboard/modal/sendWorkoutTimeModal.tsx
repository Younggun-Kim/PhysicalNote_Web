import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ModalForm from "@/components/common/modal/modalForm";
import { RoundButtonFactory, Button } from "@/components/common";
import Image from "next/image";
import Api from "@/api/player";
import { PlayerSimpleTable } from "./playerSImpleTable";
import { useSetRecoilState } from "recoil";
import { playerCheckSelector } from "@/recoil/schedule/scheduleState";
import { CheckboxType } from "@/types/schedule";

interface SendWorkoutTimeModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface PlayerSimpleInfoType {
  id: number;
  name: string;
  phone: string;
  playerGrade: string;
  positions: string[];
}

export interface PlayerSimpleListData {
  id: number;
  name: string;
  phone: string;
  belongto: string;
  position: string;
}

export const SendWorkoutTimeModal = ({
  isOpen,
  setIsOpen,
}: SendWorkoutTimeModalProps) => {
  const [isSports, setIsSports] = useState(true);
  const [hour, setHour] = useState<number>();
  const [minute, setMinute] = useState<number>();
  const [data, setData] = useState<PlayerSimpleListData[]>();
  const setCheckbox = useSetRecoilState(playerCheckSelector);
  const [checkPlayer, setCheckPlayer] = useState<CheckboxType[]>([]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
      getPlayerSimple();
    } else {
      document.body.classList.remove("modal-open");
    }

    // 컴포넌트 언마운트 시 클래스 제거
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  const onClickClose = () => {
    document.body.style.overflow = "unset";
    setIsOpen(false);
  };

  /** API : 선수 목록 조회 */
  const getPlayerSimple = async () => {
    await Api.v2GetPlayerSimple("").then((res) => {
      const { data } = res;
      const tempData: PlayerSimpleListData[] = [];
      const initCheckbox: CheckboxType[] = [];

      if (data) {
        data.forEach((item: PlayerSimpleInfoType) => {
          const grade =
            item.playerGrade === "FIRST"
              ? "1군"
              : item.playerGrade === "SECOND"
                ? "2군"
                : "부상자";

          tempData.push({
            id: item.id,
            name: item.name,
            phone: item.phone,
            belongto: grade,
            position: item.positions.join(","),
          });

          initCheckbox.push({
            id: item.id,
            name: item.name,
            check: false,
          });
        });
        setCheckbox(initCheckbox);
        setData(tempData);
      }
    });
  };

  return (
    <ModalForm onClickEvent={onClickClose}>
      <div className="px-[1rem] w-[800px]">
        <h2 className="text-h2-b mb-[27px]">오늘의 운동시간</h2>
        <div className="flex gap-[60px] mb-[50px]">
          <div className="flex items-center gap-[12px]">
            <span className="text-body-b mr-[6px]">훈련종류</span>
            <RoundButtonFactory.wide
              text="스포츠"
              classnames="shadow-[0_2px_8px_0px_rgba(0,0,0,0.1)]"
              isSelected={isSports}
              onClick={() => setIsSports(true)}
            />
            <RoundButtonFactory.wide
              text="피지컬"
              classnames="shadow-[0_2px_8px_0px_rgba(0,0,0,0.1)]"
              isSelected={!isSports}
              onClick={() => setIsSports(false)}
            />
          </div>
          <div className="flex items-center gap-[12px]">
            <span className="text-body-md-b mr-[6px]">운동시간</span>
            <div className="w-[5rem] h-[3rem] flex justify-center items-center shadow-[0_2px_8px_0px_rgba(0,0,0,0.1)] rounded-full overflow-hidden">
              <input
                type="text"
                className="w-100 h-100 border-none outline-none text-center focus:ring-0"
                value={`${hour ?? ""}`}
                placeholder="시간"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const { value } = e.target;
                  if (value === "") {
                    setHour(undefined);
                    return;
                  }
                  const hour = parseInt(value);
                  if (!isNaN(hour)) {
                    setHour(hour);
                  }
                }}
              />
            </div>
            <div className="w-[5rem] h-[3rem] flex justify-center items-center shadow-[0_2px_8px_0px_rgba(0,0,0,0.1)] rounded-full overflow-hidden">
              <input
                type="text"
                className="w-100 h-100 border-none outline-none text-center focus:ring-0"
                value={`${minute ?? ""}`}
                placeholder="분"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const { value } = e.target;
                  if (value === "") {
                    setMinute(undefined);
                    return;
                  }
                  const minute = parseInt(value);
                  if (!isNaN(minute)) {
                    setMinute(minute);
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between  mb-[12px]">
          <span>알림을 전송할 선수들을 선택하세요.</span>
          <div className="border-b border-black flex items-center">
            <input
              type="text"
              className="w-44 outline-none border-none focus:ring-0 text-center"
              placeholder="이름을 입력하세요."
            />
            <button onClick={() => setIsOpen((open) => !open)}>
              <Image
                src={"/icons/search.svg"}
                width={24}
                height={24}
                alt="Search Button"
                priority
              />
            </button>
          </div>
        </div>

        <div className="max-h-[50vh] overflow-y-scroll mb-[40px]">
          <PlayerSimpleTable data={data} checkPlayer={setCheckPlayer} />
        </div>

        <div className="flex items-center justify-end space-x-2">
          <RoundButtonFactory.md
            type="button"
            text="취소"
            classnames="rounded-lg border-tertiary border-2 bg-white shadow-none !text-gray-1"
            onClick={onClickClose}
          />
          <RoundButtonFactory.md
            type="button"
            text="확인"
            classnames="rounded-lg shadow-none"
          />
        </div>
      </div>
    </ModalForm>
  );
};
