import { mergeStyleSets } from "@fluentui/react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components";

const main = mergeStyleSets({
  container: {
    padding: "20px",
    display: "flex",
    width: "100%",
    gap: "20px",
    "@media (max-width: 720px)": {
      flexDirection: "column",
    },
  },
});

export const MainLayout = () => {
  return (
    <div className={main.container}>
      <Navbar />
      <div style={{ width: "100%" }}>
        <Outlet />
      </div>
    </div>
  );
};
