import Table from "@/components/common/table";
import { PlayerSimpleListData } from "./sendWorkoutTimeModal";
import { Dispatch } from "react";
import { CheckboxType } from "@/types/schedule";

const columnData = [
  {
    Header: "선수이름",
    accessor: "name",
  },
  {
    Header: "포지션",
    accessor: "position",
  },
  {
    Header: "소속",
    accessor: "belongto",
  },
];

interface PlayerSimpleTableProps {
  data?: PlayerSimpleListData[];
  checkPlayer?: Dispatch<React.SetStateAction<CheckboxType[]>>;
}
export const PlayerSimpleTable = ({
  data,
  checkPlayer,
}: PlayerSimpleTableProps) => {
  return (
    <Table
      columns={columnData}
      data={data || []}
      isSelectedCheckbox={false}
      isCheckboxUse={true}
      checkPlayer={checkPlayer}
    />
  );
};
