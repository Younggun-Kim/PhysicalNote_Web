export const FeedbackPeriod = {
  all: "ALL",
  today: "TODAY",
  thisWeek: "THIS_WEEK",
  lastWeek: "LAST_WEEK",
} as const;

export const FeedbackPeriodKeys = Object.keys(
  FeedbackPeriod,
) as (keyof typeof FeedbackPeriod)[];

export type FeedbackListPeriodType = keyof typeof FeedbackPeriod;

export type FeedbackListPeriodValueType =
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
        "border-tertiary border-[1px] rounded-full h-[30px] px-3",
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
