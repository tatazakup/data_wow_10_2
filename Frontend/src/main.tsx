import React from "react";
import ReactDOM from "react-dom/client";
import App from "@pages/MainPage/MainPage";
import { AppLayout } from "@layouts/AppLayout/AppLayout";
import "./styles/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const CoreProvider: React.FC = () => {
  const [queryClient] = React.useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
    });
  });

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AppLayout>
          <App />
        </AppLayout>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<CoreProvider />);
} else {
  console.error("Element with ID 'root' not found in the DOM.");
}
