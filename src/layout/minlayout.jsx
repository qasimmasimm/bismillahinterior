import { Outlet } from "react-router-dom";
import Navbarr from "../components/navbar";
import Footer from "../components/footer";

export default function Layout() {
  return (
    <>
      <Navbarr />

      <main style={{ minHeight: "90vh" }}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}