//import NovelPage from "./pages/NovelPage";
import { Outlet } from "react-router";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import Header from "./components/Header";

const theme = createTheme({});

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Header></Header>
      <Outlet></Outlet>
    </MantineProvider>
  );
}
