import { AxiosError } from "axios";

/**
 * 서버 에러 응답
 */
export interface ErrorResponseDto {
  status: number;
  error: string;
  message: string;
  devMessage: string;
  engMessage: string;
}

export type ErrorResponseType = AxiosError<ErrorResponseDto>;
