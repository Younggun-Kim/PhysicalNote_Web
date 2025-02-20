import React from "react";
import Image from "next/image";
import { cls } from "@/utils";
import { Column } from "react-table";
import { PlayerSimpleDataType } from "@/types/schedule";
import { TableRow } from "@/components/common/table";

interface Props {
  columns: Column[];
  data: PlayerSimpleDataType[];
  checkedIds: number[];
  onChangeCheckIds: (id: number[]) => void;
  onChangeCheckAll?: (
    newPlayers: PlayerSimpleDataType[],
    newCheck: boolean,
  ) => void;
  onChangeCheck?: (id: PlayerSimpleDataType) => void;
}

const CheckTable = ({
  columns,
  data,
  checkedIds,
  onChangeCheckIds,
  onChangeCheckAll,
  onChangeCheck,
}: Props) => {
  const handleCheckALl = () => {
    onChangeCheckIds(getDataIds());
    onChangeCheckAll && onChangeCheckAll(data, !isCheckAll());
  };

  const handleCheck = (id: number) => {
    onChangeCheckIds([id]);

    const player = data.find((p) => p.id == id);
    if (player && onChangeCheck) {
      onChangeCheck(player);
    }
  };

  const getDataIds = (): number[] => data.map((e) => e.id);

  const isCheckAll = (): boolean => {
    const dataIds = getDataIds();

    return dataIds.every((id: number) => checkedIds.includes(id));
  };

  const isChecked = (id: number): boolean => {
    return checkedIds.includes(id);
  };

  return (
    <>
      {data.length !== 0 ? (
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-full h-full py-[20px] flex justify-center items-center cursor-pointer">
                <Image
                  src={
                    isCheckAll()
                      ? "/icons/checkbox_on.svg"
                      : "/icons/checkbox_off.svg"
                  }
                  width={0}
                  height={0}
                  alt="like button"
                  style={{ width: "30px", height: "auto" }}
                  onClick={handleCheckALl}
                />
              </th>
              {columns.map((column, idx) => (
                <th
                  key={`column${idx}`}
                  className={cls("min-w-[110px] py-[20px] text-[14px]")}
                >
                  <div className="flex items-center justify-center">
                    <span>{column.Header?.toString()}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-center divide-y-[1px]">
            {data.map((item: any, idx: any) => {
              return (
                <tr
                  key={`data${idx}`}
                  className="cursor-pointer hover:bg-[#eefdd3] transition-colors"
                >
                  <td className="min-w-[40px] h-full py-[20px] flex justify-center items-center cursor-pointer">
                    <Image
                      src={
                        isChecked(item.id)
                          ? "/icons/checkbox_on.svg"
                          : "/icons/checkbox_off.svg"
                      }
                      width={0}
                      height={0}
                      alt="like button"
                      style={{ width: "30px", height: "auto" }}
                      onClick={() => handleCheck(item.id)}
                    />
                  </td>
                  {columns.map((col, index) => {
                    return (
                      <TableRow
                        key={`rowData${idx}${index}`}
                        column={col}
                        data={item}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="flex items-center justify-center w-full py-10 font-bold">
          데이터가 없습니다.
        </div>
      )}
    </>
  );
};

export default CheckTable;
