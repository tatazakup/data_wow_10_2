import { AxiosInstance, AxiosRequestConfig } from "axios";

/* eslint-disable */

export const createQueryFn = <T = any>(
  AxiosInstance: AxiosInstance,
  queryKey: ReadonlyArray<any>,
  config?: AxiosRequestConfig
) => {
  const { url, params } = queryKey.reduce(
    (acc, val) => {
      if (typeof val === "string") {
        acc.url = `${acc.url}/${val}`;
      } else if (typeof val === "object") {
        const newObj = Object.fromEntries(
          Object.entries(val).map(([k, v]) => [k, v])
        );

        acc.params = { ...acc.params, ...newObj };
      }
      return acc;
    },
    { url: "", params: {} } as { url: string; params: Record<string, unknown> }
  );

  return AxiosInstance.get<T>(url, { params: params, ...config });
};
