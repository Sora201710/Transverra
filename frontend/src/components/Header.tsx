import { Group } from "@mantine/core";
import classes from "../css/Header.module.css";
import { useState } from "react";

// TODO: fix broken links

const links = [
  { link: "/", label: "Home" },
  { link: "/translate", label: "Translate" },
  { link: "/novels", label: "Novels" },
];

export default function Header() {
  const [active, setActive] = useState(links[0].link);
  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active == link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));
  return (
    <>
      <Group mr="md">{items}</Group>
    </>
  );
}
