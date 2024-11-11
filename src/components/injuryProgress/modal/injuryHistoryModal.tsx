/**
 * 부상자 현황 모달
 */

import ModalForm from "@/components/common/modal/modalForm";
import { RoundButtonFactory } from "@/components/common/button_round";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SearchCategoryType } from "@/types/common";
import DropDownUnderLine from "@/components/common/dropdown_underline";
import InjuryHistoryModalTable from "./injuryHistoryModalTable";
import Api from "@/api/injuryProgress";
import {
  injuryListItemResponseType,
  PostInjuryRecoveryResponseType,
} from "@/types/injuryProgress";
import { formatInjuryType, InjuryEnum } from "@/types";

export interface InjuryHistoryModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  injuryType: InjuryEnum;
  recordDate: string;
}

export const InjuryHistoryModal = ({
  visible,
  setVisible,
  injuryType,
  recordDate,
}: InjuryHistoryModalProps) => {
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [data, setData] = useState<injuryListItemResponseType[]>([]);
  useEffect(() => {
    if (visible) {
      document.body.classList.add("modal-open");
      getInjuryList();
    } else {
      document.body.classList.remove("modal-open");
    }

    // 컴포넌트 언마운트 시 클래스 제거
    return () => {
      setSelectedFilter(filterList[0].key);
      document.body.classList.remove("modal-open");
    };
  }, [visible]);

  // 필터 변경 시 리스트 다시 불러오기
  useEffect(() => {
    if (!visible) {
      return;
    }
    getInjuryList();
  }, [selectedFilter]);

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
      key: "INJURED",
      value: "부상자",
    },
  ];

  const getSelectedFilterValue = (): string => {
    return (
      filterList.find((filter) => filter.key == selectedFilter)?.value ?? ""
    );
  };

  /** API: 선수 부상자 현황 목록 */
  const getInjuryList = async () => {
    await Api.v2GetInjuryList(injuryType, recordDate, selectedFilter).then(
      (res) => {
        setData(res.data);
      },
    );
  };

  /** API: 선수 부상 완치하기 */
  const postInjuryRecovery = async (userId: number, injuryId: number) => {
    await Api.v2PostInjuryRecovery(userId, injuryId).then((res) => {
      const { data } = res;
      if (data as PostInjuryRecoveryResponseType) {
        const { status, message } = data;
        if (status) {
          getInjuryList();
        } else {
          alert(message);
        }
      }
    });
  };

  /** 모달 닫기 Handler */
  const handleClose = () => {
    setVisible(false);
  };

  /** 필터 변경 */
  const handleFilterChanged = (category: string) => {
    setSelectedFilter(category);
  };

  const injuryTypeTitle: string = formatInjuryType(injuryType);

  return (
    <ModalForm onClickEvent={handleClose}>
      <div className="px-[1rem] w-[1000px]">
        <div className="flex size-full justify-between items-center  mb-[3.625rem]">
          <h2 className="text-h2-b">부상자현황_{injuryTypeTitle}</h2>
          <DropDownUnderLine
            dropDownList={filterList}
            defaultText={getSelectedFilterValue()}
            isSize="small"
            changeText={handleFilterChanged}
          />
        </div>
        <div className="mb-[2rem]">
          <InjuryHistoryModalTable
            data={data}
            onRecovery={postInjuryRecovery}
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
