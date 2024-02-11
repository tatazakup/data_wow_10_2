import { AddTaskSection } from "./AddTaskSection";
import { ProgressSection } from "./ProgressSection";
import { TasksSection } from "./TasksSection";
import { TaskProvider } from "@providers/TasksProvider";

const App = () => {
  return (
    <TaskProvider>
      <div className="d-flex flex-column gap-6">
        <ProgressSection />
        <TasksSection />
        <AddTaskSection />
      </div>
    </TaskProvider>
  );
};

export default App;
