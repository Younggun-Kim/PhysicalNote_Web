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
import { useRouter } from "next/router";

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
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [data, setData] = useState<injuryListItemResponseType[]>([]);
  const [selectedInjuryIds, setSelectedInjuryIds] = useState<number[]>([]);

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
  const postInjuryRecovery = async (injuryIds: number[]) => {
    await Api.v2PostInjuryRecovery(injuryIds).then((res) => {
      const { data } = res;
      if (data as PostInjuryRecoveryResponseType) {
        const { status, message } = data;
        if (status) {
          alert("수정 완료 되었습니다.");
          getInjuryList();
        } else {
          alert(message);
        }
      }
    });
  };

  /** 완치하기 클릭 Handler */
  const handleRecovery = (injuryId: number) => {
    setSelectedInjuryIds((prev) => {
      if (prev.includes(injuryId)) {
        return prev.filter((id) => id !== injuryId);
      }
      return [...prev, injuryId];
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

  /** 선수관리 상세 이동 */
  const handleMoveDetail = (userId: number) => {
    handleClose();
    router.push(`/player/${userId}`);
  };

  /** 확인 버튼 클릭 */
  const handleSubmit = async () => {
    if (selectedInjuryIds.length == 0) {
      alert("완치할 부상을 선택해주세요.");
      return;
    }

    if (confirm("선택하신 부상을 완치하시겠습니까?")) {
      await postInjuryRecovery(selectedInjuryIds);
    }
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
            selectedInjuryIds={selectedInjuryIds}
            onRecovery={handleRecovery}
            moveDetail={handleMoveDetail}
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
            onClick={handleSubmit}
          />
        </div>
      </div>
    </ModalForm>
  );
};
