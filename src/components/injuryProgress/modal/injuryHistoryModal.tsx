/**
 * 부상 추이 모달
 */

import ModalForm from "@/components/common/modal/modalForm";
import { RoundButtonFactory } from "@/components/common/button_round";
import { Dispatch, SetStateAction, useState } from "react";
import { SearchCategoryType } from "@/types/common";
import DropDownUnderLine from "@/components/common/dropdown_underline";

interface InjuryHistoryModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export const InjuryHistoryModal = ({
  visible,
  setVisible,
}: InjuryHistoryModalProps) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  //   useEffect(() => {
  //     if (visible) {
  //       document.body.classList.add("modal-open");
  //       //   getPlayerSimple();
  //     } else {
  //       document.body.classList.remove("modal-open");
  //     }

  //     // 컴포넌트 언마운트 시 클래스 제거
  //     return () => {
  //       document.body.classList.remove("modal-open");
  //     };
  //   }, [visible]);

  const filterList: Array<SearchCategoryType> = [
    {
      key: "ALL",
      value: "전체",
    },
    {
      key: "FIRST",
      value: "1군",
    },
    {
      key: "SECOND",
      value: "2군",
    },
    {
      key: "INJURY",
      value: "부상자",
    },
  ];

  const getSelectedFilterValue = (): string => {
    return (
      filterList.find((filter) => filter.key == selectedFilter)?.value ?? ""
    );
  };

  /** 모달 닫기 Handler */
  const handleClose = () => {
    setVisible(false);
  };

  /** 필터 변경 */
  const handleFilterChanged = (category: string) => {
    setSelectedFilter(category);
  };

  return (
    <ModalForm onClickEvent={handleClose}>
      <div className="px-[1rem] w-[800px]">
        <div className="flex size-full justify-between items-center  mb-[3.625rem]">
          <h2 className="text-h2-b">부상자현황_접촉(contract)부상</h2>
          <DropDownUnderLine
            dropDownList={filterList}
            defaultText={getSelectedFilterValue()}
            isSize="small"
            changeText={handleFilterChanged}
          />
        </div>
        <div className="flex items-center justify-end space-x-2">
          <RoundButtonFactory.md
            type="button"
            text="취소"
            classnames="rounded-lg border-tertiary border-2 bg-white shadow-none !text-gray-1"
            onClick={handleClose}
          />
          <RoundButtonFactory.md
            type="button"
            text="확인"
            classnames="rounded-lg shadow-none"
            onClick={() => {}}
          />
        </div>
      </div>
    </ModalForm>
  );
};
function useEffect(arg0: () => void, arg1: boolean[]) {
  throw new Error("Function not implemented.");
}
