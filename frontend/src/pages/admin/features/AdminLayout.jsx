import { useEffect } from "react";
import NavBar from "../../../shared/components/NavBar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {

  return (
    <>
      <NavBar />
      <main >
        <Outlet />
      </main>
    </>
  );
}
