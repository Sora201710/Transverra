//import NovelPage from "./pages/NovelPage";
import { Outlet } from "react-router";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({});

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Outlet></Outlet>
    </MantineProvider>
  );
}
