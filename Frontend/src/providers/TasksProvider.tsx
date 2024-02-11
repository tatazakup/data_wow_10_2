import { ITodo, useTodosInfo } from "@apis/todo";
import { IOption, ISelect } from "@components/Select/Select";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { createContext } from "@utils/CreateContext";
import { ReactNode, useEffect, useState } from "react";

const OPTIONS: ISelect["options"] = [
  {
    key: "All",
    value: undefined,
  },
  {
    key: "Done",
    value: true,
  },
  {
    key: "Undone",
    value: false,
  },
];

interface TaskContext {
  todos: ITodo[];
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ITodo[], unknown>>;

  filterOptions: ISelect["options"];
  filter: IOption;
  setFilter: React.Dispatch<React.SetStateAction<IOption>>;

  checkboxs: boolean[];
  setCheckboxs: React.Dispatch<React.SetStateAction<boolean[]>>;
}

interface TaskProviderProps {
  children: ReactNode;
}

const [Provider, useContext] = createContext<TaskContext>();

const TaskProvider = (props: TaskProviderProps) => {
  const { children } = props;

  const [checkboxs, setCheckboxs] = useState<boolean[]>([]);
  const [filter, setFilter] = useState<IOption>(OPTIONS[0]);

  const { data: todos = [], refetch } = useTodosInfo({
    completed: filter.value,
  });

  useEffect(() => {
    void refetch();
  }, [filter]);

  const TasksValue = {
    todos: todos,
    refetch: refetch,

    filterOptions: OPTIONS,
    filter: filter,
    setFilter: setFilter,

    checkboxs: checkboxs,
    setCheckboxs: setCheckboxs,
  };

  return <Provider value={TasksValue}>{children}</Provider>;
};

export { TaskProvider, useContext as useTaskContext };
