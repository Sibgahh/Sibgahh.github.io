import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Services from "./components/Services";
import SkillsShowcase from "./components/SkillsShowcase";
import Education from "./components/Education";
import Contact from "./components/Contact";
import ProjectDetail from "./components/ProjectDetail";
import Portfolio from "./components/Portfolio";
import CreativeGallery from "./components/CreativeGallery";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <SkillsShowcase />
      <Projects />
      <Experience />
      <Services />
      <Education />
      <Contact />
    </>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const isCreativePage = pathname.startsWith("/creative");

  return (
    <div>
      <CustomCursor />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/creative" element={<CreativeGallery />} />
          <Route path="/creative/:brandId" element={<CreativeGallery />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </main>
      {!isCreativePage && <Footer />}
    </div>
  );
}
