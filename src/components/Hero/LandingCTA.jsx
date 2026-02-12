import Link from "next/link";
import { ArrowRight } from "lucide-react";

const LandingCTA = () => {
  return (
    <section className="px-4 py-16 ">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md border border-[hsl(214,32%,91%)] p-6 text-center max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[hsl(222,47%,11%)] mb-4">
            Take control of your health history.
          </h2>
          <p className="text-[hsl(215,16%,47%)] mb-8">
            Join thousands of patients and doctors using Agad for secure, 
            consent-driven health record sharing.
          </p>
          <Link href="/Login">
            <button className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[hsl(221,83%,53%)] text-white font-medium hover:bg-[hsl(221,83%,48%)] transition-colors">
              Get Started with Agad
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LandingCTA;