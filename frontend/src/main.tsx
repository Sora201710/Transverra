import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import TranslatePage from "./pages/TranslatePage";
import NovelPage from "./pages/NovelPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import NovelsPage from "./pages/NovelsPage.tsx";

// TODO: add middleware for auth, error handling and data loading
// TODO: add middleware for handling 404 errors

let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/translate",
        Component: TranslatePage,
      },
      {
        path: "/novels",
        Component: NovelsPage,
        children: [
          {
            path: ":novelId",
            Component: NovelPage,
            loader: async ({ params }) => {
              const novel = await fetch(
                `${import.meta.env.VITE_API_URL}/api/get_novel/${params.novelId}`,
              );
              return novel;
            },
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
