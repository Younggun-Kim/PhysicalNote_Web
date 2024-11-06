import { PlayerInfoType } from "@/types/dashboard";
import React, { useState, useEffect } from "react";

interface PropsType {
  children: React.ReactNode;
  content: Array<PlayerInfoType>;
  type: "등록" | "미등록";
}

interface ISeparatedData {
  [key: string]: Array<string>;
}

const GroupByFirstLetterForm = ({ data }: ISeparatedData) => {
  const groupByFirstLetter = (arr: string[]) => {
    const groups: ISeparatedData = {};
    arr.forEach((item) => {
      const firstLetter = item[0];
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(item);
    });
    return groups;
  };

  const groupData = groupByFirstLetter(data);

  return (
    <div className="space-y-2">
      {Object.keys(groupData).map((key, index) => (
        <div key={index} className="space-y-1">
          {groupData[key].map(
            (item, subIndex) =>
              subIndex % 2 === 0 && (
                <div key={subIndex / 2} className="flex space-x-4">
                  {groupData[key]
                    .slice(subIndex, subIndex + 2)
                    .map((subItem, nestedIndex) => (
                      <div key={nestedIndex} className="">
                        {subItem}
                      </div>
                    ))}
                </div>
              )
          )}
        </div>
      ))}
    </div>
  );
};

const PlayerTooltip = ({ children, content, type }: PropsType) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [playerData, setPlayerData] = useState<ISeparatedData>({
    first: [],
    second: [],
    injured: [],
  });

  useEffect(() => {
    if (content) {
      const separatedData: ISeparatedData = content.reduce<ISeparatedData>(
        (acc, item) => {
          const key = item.playerGrade.toLowerCase();
          const positions = item.positions.join("/");
          const val = `${positions}_${item.name}`;

          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(val);

          return acc;
        },
        {}
      );

      const sortedPlayerData = {
        first: separatedData.first ? [...separatedData.first].sort() : [],
        second: separatedData.second ? [...separatedData.second].sort() : [],
        injured: separatedData.injured ? [...separatedData.injured].sort() : [],
      };

      setPlayerData(sortedPlayerData);
    }
  }, [content]);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {content.length > 0 && isHovered && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-max px-[18px] py-[16px] bg-[#EDFBD5] text-[#000] text-sm shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] rounded-[20px] w-[361px] z-50">
          <div className="text-[14px] font-[700]">{`${type} 선수 : ${content?.length < 10 ? `0${content?.length}` : content?.length}`}</div>
          <>
            {playerData.first?.length > 0 && (
              <div className="flex text-[12px] px-[35px] py-[10px]">
                <div className="w-[50px]">1군</div>
                <GroupByFirstLetterForm data={playerData.first} />
              </div>
            )}
            {playerData.second?.length > 0 && (
              <div className="flex text-[12px] px-[35px] py-[10px] border-t border-t-[#D9D9D9]">
                <div className="w-[50px]">2군</div>
                <GroupByFirstLetterForm data={playerData.second} />
              </div>
            )}
            {playerData.injured?.length > 0 && (
              <div className="flex text-[12px] px-[35px] py-[10px] border-t border-t-[#D9D9D9]">
                <div className="w-[50px]">부상자</div>
                <GroupByFirstLetterForm data={playerData.injured} />
              </div>
            )}
          </>
        </div>
      )}
    </div>
  );
};

export default PlayerTooltip;
