import { cls } from "@/utils";

interface Props {
  isRecovery: boolean;
  onClick: (isRecovery: boolean) => void;
}

/** 진행/완치 토글 버튼 */
export const RecoveryToggleBtn = ({ isRecovery, onClick }: Props) => {
  const textColor = (active: boolean) =>
    active ? "text-white" : "text-primary";
  const bgColor = (active: boolean) => (active ? "bg-secondary" : "bg-white");
  const padding = "px-[30px] py-[5px]";
  return (
    <div className="flex rounded-md shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] overflow-hidden">
      <button
        className={cls(
          "text-body-b",
          textColor(!isRecovery),
          bgColor(!isRecovery),
          padding,
        )}
        onClick={() => onClick(false)}
      >
        진행
      </button>
      <button
        className={cls(
          "text-body-b",
          textColor(isRecovery),
          bgColor(isRecovery),
          padding,
        )}
        onClick={() => onClick(true)}
      >
        완치
      </button>
    </div>
  );
};
