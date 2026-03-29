import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* 🔥 SCROLL TO TOP */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainLayout() {
  return (
    <>
      <ScrollToTop />

      <Navbar />

      {/* ✅ ACCESSIBILITY FIX */}
      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;