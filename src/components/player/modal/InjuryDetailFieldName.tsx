import React from "react";

interface Props {
  text: string;
}

const InjuryDetailFieldName = ({ text }: Props) => {
  return <span className="w-[92px] font-bold text-sm text-center">{text}</span>;
};

export default InjuryDetailFieldName;
