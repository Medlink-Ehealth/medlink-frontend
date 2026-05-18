import { useState, useEffect, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { DOCTORS, SPECIALTIES } from '../data/doctors'
import useInView from '../hooks/useInView'
import StatCounter from '../components/StatCounter'
import StarRating from '../components/StarRating'
import FadeSection from '../components/FadeSection'
import DoctorCard from '../components/DoctorCard'
import BookingModal from '../components/BookingModal'
// import { mockUser } from "../data/mockUser"

// ─── Todo ────────────────────────────────────────────────────────────────────
// User profile


// ─── Types ────────────────────────────────────────────────────────────────────

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  sub: string;
  rating: number;
  reviews: number;
  exp: number;
  location: string;
  nextSlot: string;
  price: number;
  img: string;
  color: string;
  verified: boolean;
  languages: string[];
}

interface Testimonial {
  name: string;
  loc: string;
  text: string;
  rating: number;
  color: string;
}

interface StepItem {
  icon: string;
  step: string;
  title: string;
  desc: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const COLORS: Record<string, string> = {
  primary: "#0A5C45",
  primaryLight: "#12755A",
  primaryPale: "#E8F5F0",
  accent: "#E8A838",
  accentLight: "#FDF3DC",
  dark: "#1A1F2E",
  muted: "#6B7280",
  border: "#E5E9EF",
  surface: "#F8FAFB",
  white: "#FFFFFF",
  danger: "#D94F4F",
  success: "#2DA76A",
};

const Home: FC = () => {
  const navigate = useNavigate();
  const [search,        setSearch]        = useState<string>("");
  const [specialty,     setSpecialty]     = useState<string>("All");
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [heroVisible,   setHeroVisible]   = useState<boolean>(false);
  const [statsRef, statsInView]           = useInView(0.3);

  useEffect(() => { setTimeout(() => setHeroVisible(true), 80); }, []);

  const filtered: Doctor[] = DOCTORS.filter((d) => {
    const matchSpec   = specialty === "All" || d.specialty === specialty;
    const q           = search.toLowerCase();
    const matchSearch = d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q) || d.location.toLowerCase().includes(q);
    return matchSpec && matchSearch;
  });

  const steps: StepItem[] = [
    { icon: "🔍", step: "01", title: "Find Your Doctor",  desc: "Browse verified specialists by specialty, location, or availability. Read reviews from real patients." },
    { icon: "📅", step: "02", title: "Choose a Slot",     desc: "Pick a date and time that works for you. See real-time availability and book instantly." },
    { icon: "✅", step: "03", title: "Get Confirmed",     desc: "Receive instant confirmation via SMS and email. Attend in-person or join a video consultation." },
  ];

  const testimonials: Testimonial[] = [
    { name: "Adaeze M.", loc: "Victoria Island", text: "Booked a cardiologist appointment in under 2 minutes. Dr. Okonkwo was incredibly thorough and made me feel at ease.", rating: 5, color: "#1D6FA4" },
    { name: "Emeka T.",  loc: "Ikeja",           text: "My daughter was sick and I needed a pediatrician fast. Got a same-day appointment with Dr. Al-Hassan. Outstanding service!", rating: 5, color: "#B84A6E" },
    { name: "Kemi O.",   loc: "Lekki",           text: "The video consultation feature is a game-changer. No more Lagos traffic to see my dermatologist. Highly recommended!", rating: 5, color: "#D9824A" },
  ];

  return (
    <>
      {/* <div>
        {mockUser.loggedIn ? (
        <h1>Welcome {mockUser.name}</h1>
        ) : (
        <h1>Welcome Guest</h1>
        )}
      </div> */}

      {/* ── NAV ── */}
      <nav
        className="sticky top-0 z-50 border-b border-[#E5E9EF] bg-white/90 backdrop-blur-xl transition-all duration-500 ease-out"
        style={{
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0)" : "translateY(-16px)",
        }}
      >
        <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-primary shadow-[0_4px_12px_rgba(10,92,69,0.3)]">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2v14M2 9h14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="1.5" />
              </svg>
            </div>
            <span className="text-lg font-black text-[#1A1F2E]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Med<span className="text-primary">Link</span>
            </span>
          </div>

          <div className="flex items-center gap-7">
            <a href="#find" className="nav-link">Find Doctors</a>
            <a href="#how" className="nav-link">How it Works</a>
            <a href="#testimonials" className="nav-link">Reviews</a>
            <button
              className="rounded-[22px] border border-white/30 bg-white/90 px-5 py-2.5 text-sm font-semibold text-primary transition duration-200 hover:bg-white"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
            <button
              className="rounded-[22px] bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(10,92,69,0.25)] transition duration-200 hover:scale-[1.04] hover:bg-primaryLight"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-primary-grad px-6 pb-[88px] pt-[72px]">
        <div className="absolute -right-20 -top-20 h-[380px] w-[380px] rounded-full bg-white/5 animate-blobFloat1" />
        <div className="absolute -bottom-14 -left-14 h-[300px] w-[300px] rounded-full bg-[#E8A838]/10 animate-blobFloat2" />
        <div
          className="absolute left-[15%] top-[30%] h-[160px] w-[160px] rounded-full bg-white/5 animate-blobFloat2"
          style={{ animationDelay: '2s' }}
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <div
            className="hero-badge inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 mb-7 transition-all duration-500"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
            }}
          >
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent animate-pulseRing" />
            <span className="text-xs font-semibold text-white/90">Trusted by 50,000+ patients across Nigeria</span>
          </div>

          <h1
            className="mx-auto max-w-[740px] text-[clamp(34px,5.5vw,56px)] font-black leading-[1.1] text-white transition-all duration-700"
            style={{
              fontFamily: "'Playfair Display', serif",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(24px)',
            }}
          >
            Healthcare that puts<br />
            <span className="text-accent">you first</span>
          </h1>

          <p
            className="mx-auto mb-10 max-w-[520px] text-sm leading-7 text-white/80 transition-all duration-700"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            Book appointments with verified, experienced doctors across Lagos. Same-day slots available.
          </p>

          <div
            className="mx-auto mb-10 flex max-w-[560px] gap-1 rounded-[20px] bg-white p-1 shadow-[0_12px_48px_rgba(0,0,0,0.2)] transition-all duration-700"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
            }}
          >
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke={COLORS.muted} strokeWidth="1.5" />
                <path d="M11 11l3 3" stroke={COLORS.muted} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by doctor, specialty, location..."
                className="w-full rounded-[16px] border-none bg-transparent px-10 py-3 text-sm text-[#1A1F2E] outline-none placeholder:text-[#6B7280]"
              />
            </div>
            <button
              className="rounded-[16px] bg-primary px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:scale-[1.05] hover:bg-primaryLight"
              onClick={() => document.getElementById('find')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Search
            </button>
          </div>

          <div
            ref={statsRef}
            className="mx-auto flex items-center justify-center gap-10 transition-all duration-700"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(12px)',
            }}
          >
            <StatCounter num={500} suffix="+" label="Specialists" inView={statsInView} />
            <div className="h-9 w-px bg-white/20" />
            <StatCounter num={50} suffix="K+" label="Patients Served" inView={statsInView} />
            <div className="h-9 w-px bg-white/20" />
            <StatCounter num={4} suffix=".9★" label="Average Rating" inView={statsInView} />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="bg-white py-[72px] px-6">
        <div className="mx-auto max-w-[1100px]">
          <FadeSection style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-primary">Simple Process</div>
            <h2 className="text-3xl font-black text-[#1A1F2E]" style={{ fontFamily: "'Playfair Display', serif" }}>Book in 3 easy steps</h2>
          </FadeSection>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {steps.map((item, i) => (
              <FadeSection key={item.step} delay={i * 120}>
                <div className="group relative overflow-hidden rounded-[28px] bg-surface p-8 transition duration-300 ease-[cubic-bezier(.34,1.4,.64,1)] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(10,92,69,0.1)]">
                  <div className="absolute right-4 top-4 text-[56px] font-black text-primary/10" style={{ fontFamily: "'Playfair Display', serif" }}>{item.step}</div>
                  <div className="mb-4 text-[34px]">{item.icon}</div>
                  <div className="mb-2 text-base font-extrabold text-[#1A1F2E]">{item.title}</div>
                  <div className="text-sm leading-7 text-[#6B7280]">{item.desc}</div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCTORS ── */}
      <section id="find" className="bg-[#F0F4F1] py-[72px] px-6">
        <div className="mx-auto max-w-[1100px]">
          <FadeSection style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-primary">Our Specialists</div>
              <h2 className="text-3xl font-black text-[#1A1F2E]" style={{ fontFamily: "'Playfair Display', serif" }}>Trusted Doctors Near You</h2>
            </div>
            <div className="text-sm font-medium text-[#6B7280]">{filtered.length} doctor{filtered.length !== 1 ? 's' : ''} available</div>
          </FadeSection>

          <div className="mb-7 flex flex-wrap gap-2 overflow-x-auto pb-2">
            {SPECIALTIES.map((s) => (
              <button
                key={s}
                onClick={() => setSpecialty(s)}
                className={`filter-btn rounded-full px-5 py-2.5 text-xs font-semibold transition-all ${
                  specialty === s
                    ? 'border border-primary bg-primary text-white shadow-[0_4px_14px_rgba(10,92,69,0.25)] scale-[1.05]'
                    : 'border border-[#E5E9EF] bg-white text-[#6B7280]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((doc, i) => (
                <DoctorCard key={doc.id} doctor={doc} onBook={setBookingDoctor} delay={i * 70} />
              ))}
            </div>
          ) : (
            <FadeSection style={{ textAlign: 'center', padding: '56px 24px', color: COLORS.muted }}>
              <div className="mb-3 text-[44px]">🔍</div>
              <div className="mb-2 text-base font-bold text-[#1A1F2E]">No doctors found</div>
              <div className="text-sm">Try adjusting your search or specialty filter</div>
            </FadeSection>
          )}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="bg-white py-[72px] px-6">
        <div className="mx-auto max-w-[1100px]">
          <FadeSection style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.primary, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Patient Stories</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 800, color: COLORS.dark }}>What our patients say</h2>
          </FadeSection>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {testimonials.map((t, i) => (
              <FadeSection key={t.name} delay={i * 100}>
                <div className="group rounded-[28px] bg-surface p-7 transition duration-300 ease-[cubic-bezier(.34,1.4,.64,1)] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
                  <StarRating rating={t.rating} />
                  <p className="my-4 text-sm leading-7 text-[#1A1F2E] italic">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: `${t.color}22`, border: `2px solid ${t.color}44`, color: t.color }}>
                      <span className="font-bold text-sm">{t.name[0]}</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#1A1F2E]">{t.name}</div>
                      <div className="text-xs text-[#6B7280]">{t.loc}</div>
                    </div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-primary-grad-alt py-[64px] px-6 text-center">
        <div className="absolute -right-16 -top-16 h-[260px] w-[260px] rounded-full bg-[#E8A838]/10" style={{ animation: 'blobFloat1 10s ease-in-out infinite' }} />
        <FadeSection>
          <h2 className="mb-3 text-3xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to take control of your health?
          </h2>
          <p className="mb-8 text-sm text-white/80">
            Join thousands of Nigerians getting better healthcare every day.
          </p>
          <button
            className="rounded-[14px] bg-accent px-10 py-4 text-base font-black text-[#1A1F2E] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(232,168,56,0.45)]"
            onClick={() => document.getElementById("find")?.scrollIntoView({ behavior: "smooth" })}
          >
            Find a Doctor Now →
          </button>
        </FadeSection>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1A1F2E] px-6 py-9 text-center">
        <div className="mb-1 text-2xl font-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
          Med<span className="text-accent">Link</span>
        </div>
        <div className="text-sm text-white/50">
          © 2026 MedLink. Connecting Nigerians with trusted healthcare.
        </div>
      </footer>

      {bookingDoctor && <BookingModal doctor={bookingDoctor} onClose={() => setBookingDoctor(null)} />}
    </>
  );
};

export default Home
