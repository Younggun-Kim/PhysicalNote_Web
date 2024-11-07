import { searchCategoryList } from "@/constants/mock/searchCategoryList";
import { TableRowType } from "@/types/common";
import { injuryListItemResponseType } from "@/types/injuryProgress";
import { cls } from "@/utils";
import { ReactElement } from "react";

const columnData = [
  {
    Header: "No",
    accessor: "no",
  },
  {
    Header: "선수이름",
    accessor: "name",
  },
  {
    Header: "소속",
    accessor: "belongto",
  },
  {
    Header: "포지션",
    accessor: "position",
  },
  {
    Header: "부상위치",
    accessor: "injury",
  },
  {
    Header: "부상현황",
    accessor: "isRecovered",
  },
  {
    Header: "",
    accessor: "",
  },
  {
    Header: "",
    accessor: "",
  },
];

interface InjuryHistoryModalTableProps {
  data?: injuryListItemResponseType[];
}

const InjuryHistoryModalTable = ({ data }: InjuryHistoryModalTableProps) => {
  const getGrade = (grade: string): string => {
    return searchCategoryList.find((item) => item.key == grade)?.value ?? "";
  };
  return (
    <>
      <table className="w-full">
        <thead>
          <tr>
            {columnData.map((column, idx) => (
              <th
                key={`column${idx}`}
                className={cls("min-w-[110px] py-[20px] text-[14px]")}
              >
                <div className="flex items-center justify-center">
                  <span className="text-body-md text-gray-1">
                    {column.Header?.toString()}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data?.map((item: injuryListItemResponseType, idx: any) => {
            return (
              <tr>
                <CustomTableRow key={`rowData${idx}0`} value={idx + 1} />
                <CustomTableRow key={`rowData${idx}1`} value={item.name} />
                <CustomTableRow
                  key={`rowData${idx}2`}
                  value={getGrade(item.playerGrade)}
                />
                <CustomTableRow
                  key={`rowData${idx}3`}
                  value={item.positions.join("/")}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

interface CustomTableRowProps {
  value: string | ReactElement;
}
const CustomTableRow = ({ value }: CustomTableRowProps) => {
  return (
    <td className="py-[20px] text-body-md text-center whitespace-normal">
      <div>
        <span>{value}</span>
      </div>
    </td>
  );
};
export default InjuryHistoryModalTable;
