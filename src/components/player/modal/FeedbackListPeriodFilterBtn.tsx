export const FeedbackPeriod = {
  all: "all",
  today: "today",
  thisWeek: "thisWeek",
  lastWeek: "lastWeek",
} as const;

export const FeedbackPeriodValues = Object.values(FeedbackPeriod);

export type FeedbackListPeriodType =
  (typeof FeedbackPeriod)[keyof typeof FeedbackPeriod];

const PeriodStringMap: Record<FeedbackListPeriodType, string> = {
  all: "전체",
  today: "오늘",
  thisWeek: "이번주",
  lastWeek: "지난주",
};

interface Props {
  type: FeedbackListPeriodType;
  currentType: FeedbackListPeriodType;
  onClick: (type: FeedbackListPeriodType) => void;
}

const FeedbackListPeriodFilterBtn = ({ type, currentType, onClick }: Props) => {
  const isSelected = type == currentType;
  const bgColor = isSelected ? "bg-primary" : "bg-white";
  const textColor = isSelected ? "text-white" : "text-gray-1";
  return (
    <button
      className={[
        "border-tertiary border-[1px] rounded-full py-1 px-3",
        "text-xs font-inter font-bold",
        bgColor,
        textColor,
      ].join(" ")}
      onClick={() => onClick(type)}
    >
      {PeriodStringMap[type]}
    </button>
  );
};

export default FeedbackListPeriodFilterBtn;
