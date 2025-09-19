import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Features from "./components/Features";
import Stats from "./components/Stats";
import Technologies from "./components/Technologies";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="pt-1">
        {" "}
        {/* Add padding top to account for fixed navbar */}
        <Hero />
        <Features />
        <div className="flex justify-center items-start gap-10 my-50 p-10 bg-white">
          <Stats label="Years" value={"03+"} />
          <Stats label="Events" value={"10+"} />
          <Stats label="Community Members" value={"1K+"} />
          <Stats label="Attendees" value={"200+"} />
        </div>

        <Technologies />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
