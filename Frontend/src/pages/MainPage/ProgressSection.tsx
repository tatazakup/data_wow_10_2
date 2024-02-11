import { useEffect, useMemo } from "react";
import $ from "jquery";
import { useTaskContext } from "@providers/TasksProvider";

export const ProgressSection = () => {
  const { checkboxs } = useTaskContext();
  const trueCheckbox = useMemo(() => {
    if (checkboxs.length > 0) return checkboxs.filter((todo) => todo);
    else return [];
  }, [checkboxs]);

  useEffect(() => {
    if (checkboxs.length > 0) {
      $("#progress-width").css(
        "width",
        `${(trueCheckbox.length / checkboxs.length) * 100}%`
      );
    } else {
      $("#progress-width").css("width", "0%");
    }
  }, [checkboxs]);

  return (
    <div className="p-4 bg-red rounded-6">
      <p className="header-1 text-white py-4">Progress</p>
      <div id="progress-bar">
        <div id="progress-width" />
      </div>
      <p className="body text-softpink py-2">{trueCheckbox.length} completed</p>
    </div>
  );
};
