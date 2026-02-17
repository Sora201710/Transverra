import { Link, NavLink } from "react-router";

export default function HomePage() {
  return (
    <>
      <h1>Welcome to Transverra!</h1>
      <Link to="/translate">Translate</Link>
    </>
  );
}
