import {
  ITodo,
  useDeleteTodo,
  useUpdateStatusTodo,
  useUpdateTitleTodo,
} from "@apis/todo";
import { Checkbox } from "@components/Checkbox/Checkbox";
import { Dropdown } from "@components/Dropdown/Dropdown";
import { useTaskContext } from "@providers/TasksProvider";
import { useState } from "react";

interface ITodoComponent {
  todo: ITodo;
  index: number;
}

export const TodoComponent = (props: ITodoComponent) => {
  const { todo, index } = props;

  const [isUpdate, setIsUpdate] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const { refetch, checkboxs, setCheckboxs } = useTaskContext();

  const { mutate: mutateUpdateStatusTodo } = useUpdateStatusTodo();
  const { mutate: mutateDeleteTodo } = useDeleteTodo({
    onSuccess: () => {
      void refetch();
    },
  });
  const { mutate: mutateUpdateTitleTodo } = useUpdateTitleTodo({
    onSuccess: () => {
      setIsUpdate(false);
      void refetch();
    },
  });

  let isCheck = todo.completed;
  if (checkboxs.length > 0) {
    isCheck = checkboxs[index];
  }

  const onCheck = (isCheck: boolean, index: number, id: string) => {
    mutateUpdateStatusTodo({
      id: id,
      completed: isCheck,
    });
    setCheckboxs((d) => {
      const newData = [...d];
      newData[index] = isCheck;
      return newData;
    });
  };

  const onDeleteTodo = (id: string) => {
    mutateDeleteTodo(id);
  };

  const onUpdate = () => {
    mutateUpdateTitleTodo({
      id: todo.id,
      title: title,
    });
  };

  return (
    <div className="bg-white rounded-4 px-5 py-4 d-flex justify-content-between">
      {isUpdate ? (
        <>
          <input
            id="new-task"
            type="text"
            className="w-100"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <button onClick={onUpdate}>Save</button>
        </>
      ) : (
        <>
          <div className="d-flex align-item-center">
            <Checkbox
              className="pr-4"
              checked={isCheck}
              onTicker={(e) => {
                onCheck(e.target.checked, index, todo.id);
              }}
            />
            <p
              className={`body ${
                isCheck && "text-decoration-line-through text-darkgray"
              }`}
            >
              {todo.title}
            </p>
          </div>
          <Dropdown
            items={[
              {
                label: "Edit",
                color: "primary",
                onClick: () => {
                  setIsUpdate(true);
                },
              },
              {
                label: "Delete",
                color: "danger",
                onClick: () => {
                  onDeleteTodo(todo.id);
                },
              },
            ]}
          />
        </>
      )}
    </div>
  );
};
