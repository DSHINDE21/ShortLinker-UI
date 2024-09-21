/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MyResponse<T = any> {
  success: number;
  message: string;
  data: T;
  // Add more later based on response structure
}
