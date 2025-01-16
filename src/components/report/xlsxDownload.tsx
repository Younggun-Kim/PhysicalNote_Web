import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Button from "../common/button";
import { getFullSimpleDateToString } from "@/utils";
import { DailyReportDataType, WeeklyReportDataType } from "@/types/report";
import { dailyColumnData, weeklyColumnData } from "@/constants/mock/report";

interface Props {
  recordDate: Date;
  isWeekly: boolean;
  dailyData: DailyReportDataType[];
  weeklyData: WeeklyReportDataType[];
}

const XlsxDownload = ({
  recordDate,
  isWeekly,
  dailyData,
  weeklyData,
}: Props) => {
  const convertDailyToXlsxRow = () => {
    return dailyData.map((d) => [
      d.userName,
      d.position,
      d.bodyFat,
      d.weight,
      d.compareWeight,
      d.urine,
      d.sleep,
      d.stress,
      d.fatigue,
      d.muscleSoreness,
      d.hooperIndex,
      d.sportIntensity,
      d.physicalIntensity,
    ]);
  };

  const convertWeeklyToXlsxRow = () => {
    return weeklyData.map((d) => [
      d.userName,
      d.position,
      d.weight,
      d.bodyFat,
      d.hooperIndex,
      d.muscleSoreness,
      d.workoutLoad,
    ]);
  };

  const makeXlsxFile = (filename: string) => {
    const workbook = XLSX.utils.book_new();
    const columnData = isWeekly ? weeklyColumnData : dailyColumnData;
    const columnHeader = columnData.map((c) => c.Header);
    const data = isWeekly ? convertWeeklyToXlsxRow() : convertDailyToXlsxRow();

    const worksheet = XLSX.utils.aoa_to_sheet([columnHeader, ...data]);
    const excelFileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    return new Blob([excelBuffer], { type: excelFileType });
  };

  const handleClick = () => {
    const excelFileExtension = ".xlsx";
    const excelFileName = isWeekly ? "주간" : "일간";
    const fullFileName = `${getFullSimpleDateToString(recordDate)}_${excelFileName}_레포트${excelFileExtension}`;
    const xlsxFile = makeXlsxFile(fullFileName);

    FileSaver.saveAs(xlsxFile, fullFileName);
  };
  return (
    <Button
      type="button"
      text="엑셀 다운로드"
      classnames="bg-tertiary py-[11px] px-[28px] text-gray-1 !rounded-[10px] font-bold font-sans"
      onClick={handleClick}
    />
  );
};

export default XlsxDownload;
