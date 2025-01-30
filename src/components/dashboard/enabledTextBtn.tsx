import { Button } from "@/components/common";
import React from "react";

interface Props {
  text: string;
  isEnabled: boolean;
  onClick: () => void;
}

const EnabledTextBtn = ({ text, isEnabled, onClick }: Props) => {
  const defaultStyle = "text-gray-1 hover:text-gray-1";
  const enabledStyle = "text-primary hover:text-primary";
  const style = isEnabled ? enabledStyle : defaultStyle;
  return (
    <Button
      type="button"
      classnames={`shadow-none text-base font-normal px-0 hover:bg-white underline ${style}`}
      text={text}
      onClick={onClick}
    />
  );
};

export default EnabledTextBtn;
