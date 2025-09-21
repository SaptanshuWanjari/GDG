import Hero from "./components/core/Hero";
import Navbar from "./components/core/Navbar";
import Footer from "./components/core/Footer";
import Features from "./components/core/Features";
import Stats from "./components/Stats";
import Technologies from "./components/core/Technologies";
import Faq from "./components/core/Faq";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="pt-8">
        {/* Add padding top to account for fixed navbar */}
        <section className="mb-20">
          <Hero />
        </section>

        <section className="mb-20">
          <Features />
        </section>

        <section className="mb-20">
          <div className="flex flex-wrap justify-center items-start gap-8 md:gap-10 py-10 md:py-16 bg-background px-4">
            <Stats label="Years" value={"03+"} />
            <Stats label="Events" value={"10+"} />
            <Stats label="Community Members" value={"1K+"} />
            <Stats label="Attendees" value={"200+"} />
          </div>
        </section>

        <section className="">
          <Technologies />
        </section>

        <section className="mb-20">
          <Faq />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
