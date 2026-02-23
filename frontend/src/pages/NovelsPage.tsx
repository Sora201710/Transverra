import { Button, Text } from "@mantine/core";
import { NavLink as RouterLink } from "react-router";
function NoNovels() {
  return <Text>You have no novels translated!</Text>;
}

export default function NovelsPage() {
  let novelIds: string[] = [];
  if (localStorage.getItem("novels")) {
    novelIds = JSON.parse(localStorage.getItem("novels")!);
  }
  let i = 0;
  let novelLinks = novelIds.map((id) => (
    <Button key={i++} component={RouterLink} to={`/novels/${id}`}>
      {id}
    </Button>
  ));
  return (
    <>
      <h1>Novels</h1>
      {novelIds.length > 0 ? novelLinks : <NoNovels />}
    </>
  );
}
