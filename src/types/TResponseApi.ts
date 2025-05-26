export type TResponseApi = {
  statusCode: number;
  isSuccess: boolean;
  data: any;
  message: string | null;
};