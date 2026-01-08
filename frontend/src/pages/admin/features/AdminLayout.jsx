import { useState } from "react";
import NavBar from "../../../shared/components/NavBar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [search, setSearch] = useState("");
  return (
    <>
      <NavBar onSearch={setSearch}/>
      <main >
        <Outlet context={{ search }}/>
      </main>
    </>
  );
}
