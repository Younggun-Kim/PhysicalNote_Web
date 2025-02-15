import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { cls } from "@/utils";
import { TableType, TableRowType } from "@/types/common";
import { playerCheckSelector } from "@/recoil/schedule/scheduleState";
import { CheckboxType } from "@/types/schedule";
import Button from "@/components/common/button";

export const TableRow = ({ column, data, onClick }: TableRowType) => {
  const accessor = column?.accessor;
  if (!accessor) return null;

  const formatData = (item: any) => {
    if (typeof item === "number") {
      const roundedNum = parseFloat(item.toFixed(2));
      return roundedNum;
    }
    return item;
  };

  const isNullOrEmpty = (item: any) => {
    const val = formatData(item);
    return val !== 0 && !val;
  };

  return (
    <td className="py-[20px] text-[14px] whitespace-normal" onClick={onClick}>
      <div>
        <span>
          {isNullOrEmpty(data[accessor.toString()])
            ? "-"
            : formatData(data[accessor.toString()])}
        </span>
      </div>
    </td>
  );
};

const Table = ({
  columns,
  data,
  onClickRow,
  isCheckboxUse,
  isSelectedCheckbox,
  isDetail,
  isDelete,
  onSelect,
  onClickDetail,
  onClickDelete,
  onClickAllDelete,
  checkPlayer,
}: TableType) => {
  const initCheckList = useRecoilValue(playerCheckSelector);
  const [checkList, setCheckList] = useState<CheckboxType[]>([]);
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);

  const isCheckImport = (id: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (onSelect) onSelect(id, e);
  };

  const isChecked = (id: number) => {
    return checkList.find((checkItem) => checkItem.id === id)?.check || false;
  };

  const toggleCheck = (id: number) => {
    setCheckList((prevCheckList) => {
      const updateCheckedList = prevCheckList.map((item) => {
        if (item.id === id) {
          return { ...item, check: !item.check };
        }
        return item;
      });
      return updateCheckedList;
    });
  };

  const setAllCheck = () => {
    setIsCheckAll((prevCheck) => {
      const newCheck = !prevCheck;

      setCheckList((prevCheckList) => {
        return prevCheckList.map((item) => {
          return { ...item, check: newCheck };
        });
      });

      return newCheck;
    });
  };

  const isAllChecked = (list: CheckboxType[]) => {
    return list.every((item) => item.check === true);
  };

  useEffect(() => {
    checkPlayer?.([...checkList]);
  }, [checkList]);

  useEffect(() => {
    setCheckList([...initCheckList]);
  }, [initCheckList]);

  useEffect(() => {
    setIsCheckAll(false);
  }, [data]);

  return (
    <>
      {data.length !== 0 ? (
        <table className="w-full">
          <thead>
            <tr>
              {isCheckboxUse ? (
                <th className="w-full h-full py-[20px] flex justify-center items-center cursor-pointer">
                  <Image
                    src={
                      isCheckAll
                        ? "/icons/checkbox_on.svg"
                        : "/icons/checkbox_off.svg"
                    }
                    width={0}
                    height={0}
                    alt="like button"
                    style={{ width: "30px", height: "auto" }}
                    onClick={setAllCheck}
                  />
                </th>
              ) : null}
              {isSelectedCheckbox ? <th></th> : null}
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
              {isDetail ? <th></th> : null}
              {isDelete ? (
                <th>
                  <Button
                    text="일괄삭제"
                    type="button"
                    classnames="text-[12px] h-[25px] text-[#8DBE3D] font-[700] hover:bg-[#000] hover:text-[#fff]"
                    onClick={onClickAllDelete}
                  />
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody className="text-center divide-y-[1px]">
            {data.map((item: any, idx: any) => {
              // const isRowExpanded = expandedRows.includes(row.values.id);
              return (
                <tr
                  key={`data${idx}`}
                  className="cursor-pointer hover:bg-[#eefdd3] transition-colors"
                >
                  {isCheckboxUse ? (
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
                        onClick={() => toggleCheck(item.id)}
                      />
                    </td>
                  ) : null}
                  {isSelectedCheckbox && (
                    <td
                      className="py-[20px] text-[14px] whitespace-normal"
                      onClick={(e) => isCheckImport(item.id, e)}
                    >
                      {item.importantYn ? (
                        <Image
                          src="/images/star_checked.svg"
                          width={0}
                          height={0}
                          alt="like button"
                          style={{ width: "18px", height: "auto" }}
                        />
                      ) : (
                        <Image
                          src="/images/star_unchecked.svg"
                          width={0}
                          height={0}
                          alt="unlike button"
                          style={{ width: "18px", height: "auto" }}
                        />
                      )}
                    </td>
                  )}
                  {columns.map((col, index) => {
                    return (
                      <TableRow
                        key={`rowData${idx}${index}`}
                        column={col}
                        data={item}
                        onClick={onClickRow && onClickRow(Number(item.id))}
                      />
                    );
                  })}
                  {isDetail ? (
                    <td
                      className="w-[100px] py-[20px] cursor-pointer"
                      onClick={() =>
                        onClickDetail && onClickDetail(Number(item.id))
                      }
                    >
                      <Button
                        text="상세보기"
                        type="button"
                        classnames="text-[12px] h-[25px] text-[#8DBE3D] font-[700]"
                      />
                    </td>
                  ) : null}
                  {isDelete ? (
                    <td
                      className="py-[20px] cursor-pointer"
                      onClick={() =>
                        onClickDelete && onClickDelete(Number(item.id))
                      }
                    >
                      <Button
                        text="삭제"
                        type="button"
                        classnames="text-[12px] h-[25px] text-[#8DBE3D] font-[700]"
                      />
                    </td>
                  ) : null}
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

export default Table;
