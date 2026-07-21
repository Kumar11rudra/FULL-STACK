import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Exp11 from "./pages/Exp11";
import Exp111 from "./pages/Exp11/Exp111";
import Exp112 from "./pages/Exp11/Exp112";
import Exp12 from "./pages/Exp12";
import Exp121 from "./pages/Exp12/Exp121";
import Exp122 from "./pages/Exp12/Exp122";
import Exp13 from "./pages/Exp13";
import Exp131 from "./pages/Exp13/Exp131";
import Exp132 from "./pages/Exp13/Exp132";
import Exp14 from "./pages/Exp14";
import Exp141 from "./pages/Exp14/Exp141";
import Exp142 from "./pages/Exp14/Exp142";


import "./App.css";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exp11" element={<Exp11 />} />
        <Route path="/exp11/exp111" element={<Exp111 />} />
        <Route path="/exp11/exp112" element={<Exp112 />} />
        <Route path="/exp12" element={<Exp12 />} />
        <Route path="/exp12/exp121" element={<Exp121 />} />
        <Route path="/exp12/exp122" element={<Exp122 />} />
        <Route path="/exp13" element={<Exp13 />} />
        <Route path="/exp13/exp131" element={<Exp131 />} />
        <Route path="/exp13/exp132" element={<Exp132 />} />
        <Route path="/exp14" element={<Exp14 />} />
        <Route path="/exp14/exp141" element={<Exp141 />} />
        <Route path="/exp14/exp142" element={<Exp142 />} />
      </Routes>
    </>
  );
}