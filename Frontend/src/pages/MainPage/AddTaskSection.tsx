import { useCreateTodo } from "@apis/todo";
import { useEffect } from "react";
import $ from "jquery";
import { useTaskContext } from "@providers/TasksProvider";

export const AddTaskSection = () => {
  const { refetch } = useTaskContext();

  const { mutate: mutateCreateTodo } = useCreateTodo({
    onSuccess: () => {
      // Clear Input
      $("#new-task").val("");

      void refetch();
    },
  });

  const onSubmitCreateTodo = (event: JQuery.KeyPressEvent) => {
    const newTaskInput = $(event.currentTarget);

    // Enter Code
    if (event.which === 13) {
      const value: string = newTaskInput.val() as string;
      console.log(value);
      if (value.length > 0) {
        mutateCreateTodo({
          title: value.toString(),
        });
      }
    }
  };

  useEffect(() => {
    const newTaskDom = $("#new-task");
    newTaskDom.on("keypress", onSubmitCreateTodo);

    return () => {
      newTaskDom.off("keypress", onSubmitCreateTodo);
    };
  }, []);

  return (
    <input
      id="new-task"
      type="text"
      className="px-5 py-4 rounded-4"
      placeholder="Add your todo..."
    />
  );
};
