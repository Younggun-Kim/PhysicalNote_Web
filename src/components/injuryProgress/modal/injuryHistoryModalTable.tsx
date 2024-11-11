import { searchCategoryList } from "@/constants/mock/searchCategoryList";
import { injuryListItemResponseType } from "@/types/injuryProgress";
import { cls, MuscleUtils } from "@/utils";
import { Key, ReactElement } from "react";
import { InjurySiteInfo } from "@/components/injuryProgress/injurySiteInfo";

const columnData = [
  {
    Header: "No.",
    accessor: "w-[5%]",
  },
  {
    Header: "선수이름",
    accessor: "w-[10%]",
  },
  {
    Header: "소속",
    accessor: "w-[10%]",
  },
  {
    Header: "포지션",
    accessor: "w-[10%]",
  },
  {
    Header: "부상위치",
    accessor: "w-[35%]",
  },
  {
    Header: "부상현황",
    accessor: "w-[10%]",
  },
  {
    Header: "",
    accessor: "w-[10%]",
  },
  {
    Header: "",
    accessor: "w-[10%]",
  },
];

interface InjuryHistoryModalTableProps {
  data?: injuryListItemResponseType[];
  onRecovery: (userId: number, injuryId: number) => void;
  moveDetail: (userId: number) => void;
}

/** 부상자 현황 테이블 */
const InjuryHistoryModalTable = ({
  data,
  onRecovery,
  moveDetail,
}: InjuryHistoryModalTableProps) => {
  const getGrade = (grade: string): string => {
    return searchCategoryList.find((item) => item.key == grade)?.value ?? "";
  };

  const handleClickDetail = (id: number) => {
    moveDetail(id);
  };

  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="w-full table">
            {columnData.map((column, idx) => (
              <th
                key={`column${idx}`}
                className={cls(
                  "min-w-[50px] py-[20px] text-[14px]",
                  column.accessor,
                )}
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

        <tbody className="w-full block max-h-[60vh] overflow-y-scroll">
          {data?.map((item: injuryListItemResponseType, idx: any) => {
            return (
              <tr key={`${item.id}_${idx}`} className="w-full table">
                <CustomTableRow
                  key={`rowData${idx}0`}
                  value={idx + 1}
                  classNames="w-[5%]"
                />
                <CustomTableRow
                  key={`rowData${idx}1`}
                  value={item.name}
                  classNames="w-[10%]"
                />
                <CustomTableRow
                  key={`rowData${idx}2`}
                  value={getGrade(item.playerGrade)}
                  classNames="w-[10%]"
                />
                <CustomTableRow
                  key={`rowData${idx}3`}
                  value={item.positions.join(" / ")}
                  classNames="w-[10%]"
                />
                <InjuryLocationRow
                  key={`rowData${idx}4`}
                  injuries={item.injuries}
                />
                <RecoveredRow key={`rowData${idx}5`} injuries={item.injuries} />
                <RecoveryBtnRow
                  key={`rowData${idx}6`}
                  data={item}
                  onClick={(injuryId: number) => onRecovery(item.id, injuryId)}
                />
                <DetailBtnRow
                  key={`rowData${idx}7`}
                  data={item}
                  onClick={() => handleClickDetail(item.id)}
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
  classNames?: string | undefined;
}

const CustomTableRow = ({ value, classNames }: CustomTableRowProps) => {
  return (
    <td
      className={cls("whitespace-normal align-top min-w-50", classNames ?? "")}
    >
      <div className="text-body-md text-center h-20 flex items-center justify-center my-4">
        {value}
      </div>
    </td>
  );
};

type InjuriesOnly = Pick<injuryListItemResponseType, "injuries">;

const InjuryLocationRow = ({ injuries }: InjuriesOnly) => {
  return (
    <td className="w-[35%]">
      {injuries.map((injury, index) => {
        const { location } = injury;
        const [bodyPart, body, muscle] = location.split("_");
        const muscleKey = MuscleUtils.findMuscleBy(muscle) || "NONE";

        return (
          <InjurySiteInfo
            key={index}
            bodyPart={`${bodyPart}_${body}`}
            injuryLevel={injury.level}
            isRecovered={injury.isRecovered}
            muscle={muscleKey}
            recordDate={injury.recordDate}
            injuryType={injury.type}
            description={injury.description}
          />
        );
      })}
    </td>
  );
};

const RecoveredRow = ({ injuries }: InjuriesOnly) => {
  return (
    <td className="w-[10%]">
      {injuries.map(({ isRecovered }, index) => (
        <div key={index} className="py-4">
          <div
            className={cls(
              "h-20 flex items-center justify-center text-body-md",
              isRecovered ? "text-primary" : "text-black",
            )}
          >
            {isRecovered ? "완치" : "진행"}
          </div>
        </div>
      ))}
    </td>
  );
};

interface RecoveryBtnRowProps {
  key: Key;
  data: InjuriesOnly;
  onClick: (injuryId: number) => void;
}

const RecoveryBtnRow = ({ key, data, onClick }: RecoveryBtnRowProps) => {
  return (
    <td key={key} className="w-[10%]">
      {data.injuries.map(({ isRecovered, injuryId }, index) => (
        <div key={index} className="py-4">
          <div className="h-20 flex items-center justify-center">
            {isRecovered ? (
              <div></div>
            ) : (
              <div className="border-[1px] border-solid border-tertiary rounded-full py-0.5 px-1.5">
                <button
                  className="text-body-sm text-gray-1"
                  onClick={() => onClick(injuryId)}
                >
                  완치하기
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </td>
  );
};

interface DetailBtnRowProps {
  key: Key;
  data: InjuriesOnly;
  onClick: () => void;
}

const DetailBtnRow = ({ key, data, onClick }: DetailBtnRowProps) => {
  return (
    <td key={key} className="w-[10%]">
      {data.injuries.map(({ isRecovered }, index) => (
        <div key={index} className="py-4">
          <div className="h-20 flex items-center justify-center">
            <div className="border-[1px] border-solid border-tertiary rounded-full py-0.5 px-1.5">
              <button className="text-body-sm text-gray-1" onClick={onClick}>
                상세보기
              </button>
            </div>
          </div>
        </div>
      ))}
    </td>
  );
};

export default InjuryHistoryModalTable;
