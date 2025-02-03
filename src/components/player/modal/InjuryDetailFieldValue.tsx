import React from "react";

interface Props {
  text: string;
}

const InjuryDetailFieldValue = ({ text }: Props) => {
  return <span className="font-normal text-base text-start">{text}</span>;
};

export default InjuryDetailFieldValue;
