import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
import { CompareProvider } from "./hooks/CompareContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
    // theme={{
    //   token: {
    //     // Seed Token
    //     colorPrimary: "#00b96b",
    //     borderRadius: 2,

    //     // Alias Token
    //     colorBgContainer: "#f6ffed",
    //   },
    // }}
    >
      <CompareProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </CompareProvider>
    </ConfigProvider>
  </StrictMode>
);
