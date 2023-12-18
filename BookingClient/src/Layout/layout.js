import { Outlet } from "react-router-dom";
import { Footer } from "./footer/Footer.js";
import Header from "./header/header.js";
function Layout() {
  return (
    <div>
      <Header type="tenant" />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
}
export default Layout;
