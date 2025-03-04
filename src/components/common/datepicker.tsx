import React, { useState, useEffect } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";

type ChangeDateType = (date: Date) => void;

interface CalendarProps {
  calendarType?: string;
  initDate?: Date;
  changeDate?:
    | React.Dispatch<React.SetStateAction<Date>>
    | ChangeDateType
    | undefined;
  changeYear?: React.Dispatch<React.SetStateAction<Date | null>> | undefined;
  onClick?: () => void;
}

const DatePickerComponent = ({
  calendarType,
  initDate,
  changeDate,
  changeYear,
  onClick,
}: CalendarProps) => {
  const [startDate, setStartDate] = useState<Date>(initDate || new Date());
  const [year, setYear] = useState<Date | null>(new Date());

  const today = new Date();

  useEffect(() => {
    if (changeDate) changeDate(startDate);
  }, [changeDate, startDate]);

  useEffect(() => {
    if (changeYear) changeYear(year);
    if (onClick) onClick();
  }, [changeYear, year]);

  useEffect(() => {
    if (initDate) setStartDate(initDate);
  }, [initDate]);

  if (calendarType === "yearMonth") {
    return (
      <div className="calendar-wrapper">
        <DatePicker
          showIcon
          // toggleCalendarOnIconClick={true}
          icon={
            <Image
              src="/images/arrow_down.svg"
              width={0}
              height={0}
              alt="Clock Icon"
              className="calendar-icon"
              style={{ width: "100%", height: "auto" }}
            />
          }
          locale={ko}
          // minDate={startDate}
          maxDate={today}
          selected={year}
          dateFormat="yyyy년 MM월"
          onChange={(date) => {
            console.log(date);
            setYear(date);
          }}
          shouldCloseOnSelect={true}
          showMonthYearPicker={true}
          showMonthYearDropdown={undefined}
        />
      </div>
    );
  }

  if (calendarType === "year") {
    return (
      <div className="calendar-wrapper">
        <DatePicker
          showIcon
          // toggleCalendarOnIconClick
          icon={
            <Image
              src="/images/arrow_down.svg"
              width={0}
              height={0}
              alt="Clock Icon"
              className="calendar-icon"
              style={{ width: "100%", height: "auto" }}
            />
          }
          showYearPicker
          locale={ko}
          maxDate={today}
          selected={year}
          dateFormat="yyyy"
          onChange={(date) => {
            setYear(date);
          }}
          placeholderText="연도 입력"
          shouldCloseOnSelect={true}
          showMonthYearDropdown={undefined}
        />
      </div>
    );
  }

  if (calendarType === "free") {
    return (
      <div className="calendar-wrapper">
        <DatePicker
          showIcon
          // toggleCalendarOnIconClick
          icon={
            <Image
              src="/images/arrow_down.svg"
              width={10}
              height={10}
              alt="Clock Icon"
              className="calendar-icon"
            />
          }
          locale={ko}
          selected={startDate}
          dateFormat="yy년 MM월 dd일"
          onChange={(date) => {
            if (date) setStartDate(date);
          }}
          shouldCloseOnSelect={true}
          showMonthYearDropdown={undefined}
        />
      </div>
    );
  }

  return (
    <div className="calendar-wrapper">
      <DatePicker
        showIcon
        // toggleCalendarOnIconClick
        icon={
          <Image
            src="/images/arrow_down.svg"
            width={10}
            height={10}
            alt="Clock Icon"
            className="calendar-icon"
          />
        }
        locale={ko}
        selected={startDate}
        maxDate={today}
        dateFormat="yy년 MM월 dd일"
        onChange={(date) => {
          if (date) setStartDate(date);
        }}
        shouldCloseOnSelect={true}
        showMonthYearDropdown={undefined}
      />
    </div>
  );
};

export default DatePickerComponent;
