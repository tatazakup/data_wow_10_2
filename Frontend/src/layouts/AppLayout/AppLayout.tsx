import { ReactNode } from "react";

export const AppLayout = ({ children }: { children?: ReactNode }) => {
  return <div id="app-wrapper">{children}</div>;
};
