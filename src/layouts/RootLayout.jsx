import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Penyesuaian pada main element untuk lebar konten yang optimal */}
      <main className="flex-grow container mx-auto px-4 py-8 md:py-10 lg:py-12 max-w-7xl">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
