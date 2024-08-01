import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLayout from "./components/PageLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppLayout from "./pages/AppLayout";
import Onboarding from "./pages/Onboarding";
import Login from "./components/Login";
import Register from "./components/Register";
import { ConversationProvider } from "./context/ConversationContext";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ConversationProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<AppLayout />} />

            <Route element={<Onboarding />}>
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
            </Route>

            <Route
              path="/home"
              element={<div className="btn btn-danger">App</div>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
      </ConversationProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "whitesmoke",
            color: "green",
          },
        }}
      />
    </QueryClientProvider>
  );
}
