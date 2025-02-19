export interface SeriesDataType {
  type: "line" | "bar" | "pie" | "scatter";
  curve?: string;
  yAxisKey: string;
  data: number[];
  color: string;
}

export const isSeriesDataType = (data: any): data is SeriesDataType => {
  return (
    data !== null &&
    typeof data === "object" &&
    "type" in data &&
    "data" in data &&
    Array.isArray(data.data)
  );
};

export const getSeriesDataMaxvalue = (series: SeriesDataType) => {
  return [...series.data].sort((a, b) => b - a).at(0);
};

export interface YAxisIds {
  id: string;
  min?: number | Date;
  max?: number | Date;
}

export interface AxisWithCompositionProps {
  xAxisData: string[];
  seriesData: any;
  height?: number;
  margin?: { left: number; right: number };
  yAxisIds: YAxisIds[];
  yAxisInterval?: any[] | "auto";
}
