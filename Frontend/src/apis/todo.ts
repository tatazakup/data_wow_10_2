import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { createQueryFn } from "./utils";
import { MainAxios } from "@configs/apis/MainAxios";
import { AxiosRequestConfig } from "axios";

const mappingTodoKeys = {
  todos: (params?: { completed?: boolean }) => ["todos", params] as const,
};

export interface ITodo {
  completed: boolean;
  id: string;
  title: string;
}

export const useTodosInfo = (
  params?: {
    completed?: boolean;
  },
  options?: UseQueryOptions<unknown, unknown, ITodo[]>
) => {
  return useQuery({
    queryKey: mappingTodoKeys.todos(params),
    queryFn: ({ queryKey }) => {
      return createQueryFn(MainAxios, queryKey).then((res) => res);
    },
    ...options,
  });
};

export const useCreateTodo = (
  options?: UseMutationOptions<
    unknown,
    unknown,
    {
      title: string;
    }
  >
) => {
  return useMutation({
    mutationFn: async ({ title }) => {
      const config: AxiosRequestConfig = {
        method: "post",
        url: `todos`,
        data: {
          title: title,
          completed: false,
        },
      };
      return await MainAxios(config);
    },
    ...options,
  });
};

export const useDeleteTodo = (
  options?: UseMutationOptions<unknown, unknown, string>
) => {
  return useMutation({
    mutationFn: async (id) => {
      const config: AxiosRequestConfig = {
        method: "delete",
        url: `todos/${id}`,
      };
      return await MainAxios(config);
    },
    ...options,
  });
};

export const useUpdateTitleTodo = (
  options?: UseMutationOptions<
    unknown,
    unknown,
    {
      id: string;
      title: string;
    }
  >
) => {
  return useMutation({
    mutationFn: async ({ id, title }) => {
      const config: AxiosRequestConfig = {
        method: "patch",
        url: `todos/${id}`,
        data: {
          title: title,
        },
      };
      return await MainAxios(config);
    },
    ...options,
  });
};

export const useUpdateStatusTodo = (
  options?: UseMutationOptions<
    unknown,
    unknown,
    {
      id: string;
      completed: boolean;
    }
  >
) => {
  return useMutation({
    mutationFn: async ({ id, completed }) => {
      const config: AxiosRequestConfig = {
        method: "patch",
        url: `todos/${id}`,
        data: {
          completed: completed,
        },
      };
      return await MainAxios(config);
    },
    ...options,
  });
};
