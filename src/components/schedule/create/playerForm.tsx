import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import usePagination from "@/utils/hooks/usePagination";
import Pagination from "@/components/common/pagination";
import { columnData } from "@/constants/mock/schedule";
import {
  getPlayerIds,
  schedulePlayersSelector,
} from "@/recoil/schedule/scheduleState";
import CheckTable from "@/components/common/CheckTable";
import { PlayerSimpleDataType } from "@/types/schedule";

const PlayerForm = () => {
  const [checkIds, setCheckIds] = useState<number[]>([]);
  const [schedulePlayers, setSchedulePlayers] = useRecoilState(
    schedulePlayersSelector,
  );

  useEffect(() => {
    setCheckIds(getPlayerIds(schedulePlayers.checkedPlayers));
  }, [schedulePlayers]);

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

  const handleCheckAll = (
    newPlayers: PlayerSimpleDataType[],
    newCheck: boolean,
  ) => {
    const { checkedPlayers } = schedulePlayers;

    const idsSet = new Set(getPlayerIds(newPlayers));
    const filteredPlayers = checkedPlayers.filter((p) => !idsSet.has(p.id));
    const tempPlayers: PlayerSimpleDataType[] = [...filteredPlayers];

    if (newCheck) {
      tempPlayers.push(...newPlayers);
    }

    setSchedulePlayers({
      ...schedulePlayers,
      checkedPlayers: tempPlayers,
    });
  };

  const handleCheck = (newPlayer: PlayerSimpleDataType) => {
    const hasPlayer = getPlayerIds(schedulePlayers.checkedPlayers).includes(
      newPlayer.id,
    );

    let newPlayers: PlayerSimpleDataType[];
    if (hasPlayer) {
      newPlayers = schedulePlayers.checkedPlayers.filter(
        (p) => p.id != newPlayer.id,
      );
    } else {
      newPlayers = [...schedulePlayers.checkedPlayers, newPlayer];
    }

    setSchedulePlayers({
      ...schedulePlayers,
      checkedPlayers: newPlayers,
    });
  };

  const handleChangeCheckIds = (_: number[]) => {};

  return (
    <>
      {schedulePlayers.items.length !== 0 ? (
        <div className="w-full mt-32 bg-white py-4 my-4 px-4 rounded-[4px]">
          <CheckTable
            columns={columnData}
            data={schedulePlayers.items || []}
            checkedIds={checkIds}
            onChangeCheckIds={handleChangeCheckIds}
            onChangeCheckAll={handleCheckAll}
            onChangeCheck={handleCheck}
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
