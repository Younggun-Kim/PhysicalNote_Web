import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import usePagination from "@/utils/hooks/usePagination";
import Pagination from "@/components/common/pagination";
import { columnData } from "@/constants/mock/schedule";
import { schedulePlayersSelector } from "@/recoil/schedule/scheduleState";
import CheckTable from "@/components/common/CheckTable";

const PlayerForm = () => {
  const [schedulePlayers, setSchedulePlayers] = useRecoilState(
    schedulePlayersSelector,
  );

  const setPage = (page: number) => {
    setSchedulePlayers({
      ...schedulePlayers,
      currentPage: page,
    });
  };

  const { currentPage, totalPages, handlePageChange } = usePagination(
    (page) => setPage(page),
    schedulePlayers.pageLength,
    schedulePlayers.totalLength,
  );

  const next = () => {
    if (currentPage + 1 < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 0) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleChangeCheckIds = (ids: number[]) => {
    const { checkedIds } = schedulePlayers;

    const newCheckedIds = ids.reduce((acc: number[], id: number) => {
      if (checkedIds.includes(id)) {
        return acc.filter((checkedId) => checkedId !== id);
      }

      return [...acc, id];
    }, checkedIds);

    setSchedulePlayers({
      ...schedulePlayers,
      checkedIds: newCheckedIds,
    });
  };

  return (
    <>
      {schedulePlayers.items.length !== 0 ? (
        <div className="w-full mt-32 bg-white py-4 my-4 px-4 rounded-[4px]">
          <CheckTable
            columns={columnData}
            data={schedulePlayers.items || []}
            checkedIds={schedulePlayers.checkedIds}
            onChangeCheckIds={handleChangeCheckIds}
          />
          <Pagination
            currentPage={currentPage}
            totalPage={totalPages}
            onPageChange={handlePageChange}
            setNewPage={setPage}
            next={next}
            prev={prev}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center w-full py-10 font-bold">
          선수 데이터가 없습니다.
        </div>
      )}
    </>
  );
};

export default PlayerForm;
