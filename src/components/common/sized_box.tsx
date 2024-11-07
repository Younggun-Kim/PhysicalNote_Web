interface SizedBoxProps {
  width?: number;
  height?: number;
}

export const SizedBox = ({ width, height }: SizedBoxProps) => {
  return <div className={`block w-[${width}px] h-[${height}px]`}></div>;
};
