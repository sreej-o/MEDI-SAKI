import { Link } from "react-router-dom";
import {
  Search,
  Bot,
  Bell,
  IndianRupee,
  ShieldCheck,
  Stethoscope,
  FileUp,
  Pill,
  Activity,
} from "lucide-react";

import heroBg from "../assets/medisaki-hero.png";

function Home() {
  return (
    <div className="bg-[#f7fbfa] min-h-screen">

      {/* ================= HERO ================= */}
      <section
  className="relative overflow-hidden"
  style={{
    backgroundImage: `url(${heroBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "contrast(1.08) saturate(1.05)",
  }}
>
  {/* ✅ CORRECT OVERLAY */}
  <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/55 to-white/85"></div>

  <div className="relative max-w-7xl mx-auto px-6 py-36 text-center">
    <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-1 rounded-full text-sm font-medium mb-6">
      <Activity size={16} />
      AI-Powered Healthcare Platform
    </div>

    <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
      Your Trusted Partner for{" "}
      <span className="text-teal-600">Smarter Healthcare</span>
    </h1>

    <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">
      Discover medicines, compare prices, consult doctors, and manage
      your health effortlessly with MediSakhi.
    </p>

    <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
      <div className="flex items-center bg-white shadow-xl rounded-full px-5 py-3 w-full border">
        <Search className="text-slate-400 mr-3" size={18} />
        <input
          placeholder="Search medicines, symptoms, or health topics"
          className="outline-none w-full text-sm"
        />
      </div>

      <Link
        to="/search"
        className="bg-teal-600 text-white px-10 py-3 rounded-full font-medium hover:bg-teal-700 transition"
      >
        Search
      </Link>
    </div>

    <div className="mt-10 flex justify-center gap-4 flex-wrap">
      <Link
        to="/chat"
        className="flex items-center gap-2 bg-white border px-6 py-3 rounded-full text-sm font-medium hover:bg-slate-50"
      >
        <Bot size={16} />
        AI Assistant
      </Link>

      <Link
        to="/prices/Paracetamol"
        className="flex items-center gap-2 bg-white border px-6 py-3 rounded-full text-sm font-medium hover:bg-slate-50"
      >
        <IndianRupee size={16} />
        Compare Prices
      </Link>
    </div>

    <div className="mt-14 flex justify-center gap-10 text-sm text-slate-600 flex-wrap">
      <TrustItem icon={<ShieldCheck size={16} />} text="Verified Medical Data" />
      <TrustItem icon={<Bot size={16} />} text="AI-Driven Insights" />
      <TrustItem icon={<Bell size={16} />} text="Smart Reminders" />
    </div>
  </div>
</section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
          Everything You Need for Better Health
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FileUp size={26} />}
            title="Upload Prescription"
            desc="Upload your doctor’s prescription and let AI explain medicines, dosage, and precautions."
            link="/prescription"
          />

          <FeatureCard
            icon={<Pill size={26} />}
            title="Explore Medicines"
            desc="Search medicines with uses, dosage, side effects, precautions, and alternatives."
            link="/search"
          />

          <FeatureCard
            icon={<IndianRupee size={26} />}
            title="Price Comparison"
            desc="Compare medicine prices across Tata 1mg, PharmEasy, Netmeds, and Apollo."
            link="/prices/Paracetamol"
          />

          <FeatureCard
            icon={<Bot size={26} />}
            title="AI Health Assistant"
            desc="AI-powered assistance for symptoms, medicines, dosage, and health queries."
            link="/chat"
          />

          <FeatureCard
            icon={<Stethoscope size={26} />}
            title="Consult Doctors"
            desc="Book online consultations with verified doctors based on availability."
            link="/doctors"
          />

          <FeatureCard
            icon={<Bell size={26} />}
            title="Medicine Reminders"
            desc="Set smart medicine reminders with alerts and intake tracking."
            link="/reminders"
          />
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="bg-white py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <Stat value="200K+" label="Medicines Listed" />
          <Stat value="50K+" label="Happy Users" />
          <Stat value="24/7" label="AI Support" />
          <Stat value="100+" label="Pharmacy Partners" />
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-900 text-slate-400 text-sm py-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-2">MediSakhi</h3>
            <p>Your trusted AI-powered healthcare companion.</p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li><Link to="/search">Search Medicines</Link></li>
              <li><Link to="/chat">AI Assistant</Link></li>
              <li><Link to="/reminders">Set Reminders</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-2">Support</h4>
            <p>support@medisakhi.com</p>
            <p>India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

const FeatureCard = ({ icon, title, desc, link }) => (
  <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-teal-50 text-teal-600 mb-4">
      {icon}
    </div>
    <h3 className="font-semibold text-lg text-slate-800">{title}</h3>
    <p className="text-slate-600 mt-2 text-sm">{desc}</p>
    <Link
      to={link}
      className="inline-block mt-4 text-teal-600 font-medium hover:underline"
    >
      Learn more →
    </Link>
  </div>
);

const Stat = ({ value, label }) => (
  <div>
    <p className="text-3xl font-bold text-teal-600">{value}</p>
    <p className="text-slate-600 text-sm">{label}</p>
  </div>
);

const TrustItem = ({ icon, text }) => (
  <span className="flex items-center gap-2">
    <span className="text-teal-600">{icon}</span>
    {text}
  </span>
);

export default Home;