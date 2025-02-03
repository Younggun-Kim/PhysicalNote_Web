import { formatInjuryColor, formatInjuryLevel } from "@/types";
import { cls } from "@/utils";
import React from "react";

interface Props {
  injuryLevelType: string;
}

const InjuryLevelBadge = ({ injuryLevelType }: Props) => {
  return (
    <div
      className={cls(
        "px-3 py-0.5 font-[400] rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]",
        `bg-[${(injuryLevelType && formatInjuryColor(injuryLevelType)) || "#8DBE3D"}]`,
        `text-[${injuryLevelType === "INJURED" ? "#fff" : "#000"}]`,
      )}
    >
      {(injuryLevelType && formatInjuryLevel(injuryLevelType)) || "0단계"}
    </div>
  );
};

export default InjuryLevelBadge;
