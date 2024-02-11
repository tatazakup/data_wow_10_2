import { Select } from "@components/Select/Select";
import { TodoComponent } from "./TaskComponent";
import { useEffect } from "react";
import { useTaskContext } from "@providers/TasksProvider";

export const TasksSection = () => {
  const { todos, filterOptions, setCheckboxs, filter, setFilter } =
    useTaskContext();

  useEffect(() => {
    if (todos.length > 0) {
      const todoCheck = todos.map((todo) => todo.completed);
      setCheckboxs(todoCheck);
    }
  }, [todos]);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <p className="header-2">Tasks</p>
        <Select
          selected={filter}
          setSelected={setFilter}
          options={filterOptions}
        />
      </div>

      {/* Tasks */}
      <div className="d-flex flex-column gap-4">
        {todos.map((todo, index) => (
          <TodoComponent key={index} todo={todo} index={index} />
        ))}
      </div>
    </div>
  );
};
