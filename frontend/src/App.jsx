import { VStack } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbaradm from "./admin/navbaradm";
import Register from "./pages/register";
import Admin from "./pages/admin";
import Homeadmin from "./admin/homeadm";
import Footer from './component/footer';
import SurketForm from './pages/surketform'; 
import ProtectedRoute from './ProtectedRoute';
import SurketList from './admin/allsurket';
import OrdersList from './admin/allorder';
import Createpesan from './admin/createpesan';
import Warga from './admin/allwarga';
import Pesan from './pages/pesan';

const AppContent = () => {
  const location = useLocation();

  // List of routes where the Navbar should be hidden
  const hideNavbarRoutes = ["/admin"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbaradm />} {/* Conditionally render Navbar */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/homeadmin" element={<ProtectedRoute><Homeadmin /></ProtectedRoute>} />
        <Route path="/" element={<Admin />} />
        <Route path="/orderlist" element={<OrdersList />} />
        <Route path="/surketlist" element={<SurketList />} />
        <Route path="/createpesan" element={<Createpesan />} />
        <Route path="/warga" element={<Warga />} />
        <Route path="/pesan" element={<Pesan />} />
        <Route path="/suket" element={<ProtectedRoute><SurketForm /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <VStack minH="100vh" minW="100vw" bgColor="gray.100">
      <Router>
        <AppContent />
        <Footer />
      </Router>
    </VStack>
  );
}

export default App;
