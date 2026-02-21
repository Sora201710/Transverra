import { Box, Group } from "@mantine/core";
import { NavLink as RouterLink } from "react-router";
import { NavLink, ThemeIcon } from "@mantine/core";
import bookOpen from "../assets/book-open.svg";
// TODO: fix broken links

const links = [
  { link: "/", label: "Home" },
  { link: "/translate", label: "Translate" },
  { link: "/novels", label: "Novels" },
];

export default function Header() {
  const items = links.map((link) => (
    <NavLink
      key={link.label}
      label={link.label}
      component={RouterLink}
      to={link.link}
    />
  ));
  return (
    <>
      <Box
        display="flex"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
        mt="xs"
        mb="lg"
      >
        <ThemeIcon size={40}>
          <img src={bookOpen} alt="Logo.svg" />
        </ThemeIcon>
        <Group gap="md" wrap="nowrap">
          {items}
        </Group>
      </Box>
    </>
  );
}
