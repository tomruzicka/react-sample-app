import { mergeStyleSets } from "@fluentui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./layouts";
import { Home, SearchContact } from "./pages";

const css = mergeStyleSets({
  layout: {
    display: "flex",
    alignItems: "flex-start",
  },
});

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/search", element: <SearchContact /> },
      ],
    },
  ]);

  return (
    <div className={css.layout}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
