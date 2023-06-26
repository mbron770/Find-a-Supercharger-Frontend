import { Outlet } from "react-router";
import Nav from "../nav";


export default function Root() {
    return (
      <div>
        <Nav />
        <Outlet />
      </div>
    );
  }