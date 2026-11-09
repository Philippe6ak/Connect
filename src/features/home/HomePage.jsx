import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { homePathForRole } from "../../routes/roles";
import { useState } from "react";

import {
  Globe2,
  ArrowDown,
  ArrowUpRight,
  Play,
  Pause,
  Users,
  GraduationCap,
  Presentation,
  Info,
  MessagesSquare,
  MessageCircle,
  MonitorSmartphone,
  CalendarDays,
  ChevronRight,
} from "lucide-react";
import LoginModal from "../auth/LoginModal";
import Wordmark from "../../ui/Wordmark";
import FeatureCard from "../../ui/FeatureCard";

const WEEKS = [
  {
    title: "This is Me",
    topics: [
      "Self-introduction video",
      "Your name, hometown & daily life",
      "Hobbies, interests & fun facts",
      "Part-time jobs or dream professions",
    ],
  },
  {
    title: "Daily Life & Culture",
    topics: [
      "Food & dining etiquette",
      "Traditional dishes & meal customs",
      "My school life",
      "Education systems & student pressures",
    ],
  },
  {
    title: "Celebrations & Entertainment",
    topics: [
      "Festivals & celebrations",
      "Cultural events & personal stories",
      "My playlist & movies",
      "Favourite music, artists & films",
    ],
  },
  {
    title: "Tours & Hidden Talents",
    topics: [
      "Virtual tours of your city or region",
      "Landmarks & travel tips",
      "Teach us something new",
      "Games, instruments & magic tricks",
    ],
  },
];
import ContactInfo from "./ContactInfo";

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPlaying, setIsPlaying] = useState(true);
  const [loginOpen, setLoginOpen] = useState(Boolean(location.state?.openLogin));
  const { isAuthenticated, role } = useAuthContext();

  function closeLogin() {
    setLoginOpen(false);
    if (location.pathname === "/login") navigate("/", { replace: true });
    if (location.state?.openLogin) navigate("/", { replace: true, state: null });
  }

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900 flex flex-col font-sans selection:bg-orange-600 selection:text-white">
      {/* =========================================================================
          1. NAVIGATION BAR // HEADER
          ========================================================================= */}
      <header className="h-20 border-b border-stone-200 px-4 md:px-8 flex items-center justify-between">
        {/* <Link
          to={isAuthenticated ? homePathForRole(role) : "/login"}
          className="h-10 px-5 inline-flex items-center rounded-md bg-orange-600 text-white font-semibold text-sm hover:bg-orange-700 active:scale-95 transition-all shadow-sm">
          {isAuthenticated ? "My space" : "Log in"}
        </Link> */}
        {isAuthenticated ? (
          <Link
            to={homePathForRole(role)}
            className="h-10 px-5 inline-flex items-center rounded-md bg-orange-600 text-white font-semibold text-sm hover:bg-orange-700 active:scale-95 transition-all shadow-sm">
            My space
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setLoginOpen(true)}
            className="h-10 px-5 rounded-md bg-orange-600 text-white font-semibold text-sm hover:bg-orange-700 active:scale-95 transition-all shadow-sm">
            Log in
          </button>
        )}

        <Link to="/">
          <Wordmark className="text-2xl" />
        </Link>

        <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Globe2 className="w-4 h-4 text-teal-900" />
          <span>Conversations beyond borders</span>
        </div>
      </header>

      {/* =========================================================================
          2. FRAMED MOOD-BOARD HERO SECTION
          ========================================================================= */}
      <section className="relative m-2 md:m-4 rounded-xl overflow-hidden min-h-[500px] h-[calc(100vh-160px)] max-h-[740px] bg-stone-900 shadow-md">
        {/* 6-Cell Mood-Board Grid (Replace these divs with your video/media components) */}
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-[1.05fr_0.85fr_1.1fr] grid-rows-3 md:grid-rows-2 gap-2 p-2 bg-stone-950">
          {/* Tile 1 */}
          <div className="relative rounded bg-teal-900/60 flex items-center justify-center text-teal-200/50 text-xs font-mono">
            {/* [Slot: Video / Image 1] */}
            <span>[Media Slot 01]</span>
            <span className="hidden md:block absolute bottom-3 left-4 text-stone-200/80 text-xs font-sans">
              01 &middot; Familiar face, somewhere new
            </span>
          </div>

          {/* Tile 2 */}
          <div className="relative rounded bg-stone-700 flex items-center justify-center text-stone-400 text-xs font-mono">
            {/* [Slot: Video / Image 2] */}
            <span>[Media Slot 02]</span>
          </div>

          {/* Tile 3 */}
          <div className="relative rounded bg-teal-950 flex items-center justify-center text-teal-300/40 text-xs font-mono">
            {/* [Slot: Video / Image 3] */}
            <span>[Media Slot 03]</span>
            <span className="hidden md:block absolute bottom-3 left-4 text-stone-200/80 text-xs font-sans">
              03 &middot; Stories worth sharing
            </span>
          </div>

          {/* Tile 4 */}
          <div className="relative rounded bg-orange-950/50 flex items-center justify-center text-orange-300/40 text-xs font-mono">
            {/* [Slot: Video / Image 4] */}
            <span>[Media Slot 04]</span>
            <span className="hidden md:block absolute bottom-12 left-4 text-stone-200/80 text-xs font-sans">
              04 &middot; Little everyday moments
            </span>
          </div>

          {/* Tile 5 */}
          <div className="relative rounded bg-stone-800 flex items-center justify-center text-stone-400 text-xs font-mono">
            {/* [Slot: Video / Image 5] */}
            <span>[Media Slot 05]</span>
          </div>

          {/* Tile 6 */}
          <div className="relative rounded bg-teal-900/80 flex items-center justify-center text-teal-200/50 text-xs font-mono">
            {/* [Slot: Video / Image 6] */}
            <span>[Media Slot 06]</span>
            <span className="hidden md:block absolute bottom-12 left-4 text-stone-200/80 text-xs font-sans">
              06 &middot; Your world gets bigger
            </span>
          </div>
        </div>

        {/* Tint & Vignette Overlays (Enhances typography contrast) */}
        <div className="absolute inset-0 bg-teal-950/45 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-950/10 to-teal-950/80 pointer-events-none" />

        {/* Central Hero Typography */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 text-stone-50">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-300 mb-3">
            <Globe2 className="w-4 h-4 text-orange-400" />
            <span>A world of conversations</span>
          </div>

          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tight text-stone-50">
            CONNECT<span className="text-orange-500">.</span>
          </h1>

          <h2 className="font-serif text-2xl md:text-4xl text-stone-100 font-semibold mt-3 max-w-xl">
            Meet the world,
            <br />
            <em className="font-serif italic font-medium text-orange-200">
              one conversation at a time.
            </em>
          </h2>

          <p className="text-sm md:text-base text-stone-300 max-w-md mt-4 leading-relaxed">
            Practise English. Share your culture. Find a connection beyond your campus.
          </p>
        </div>

        {/* Hero Bottom Controls */}
        <div className="absolute bottom-4 inset-x-6 z-20 flex items-center justify-between text-stone-300 text-xs">
          <a href="#intro" className="flex items-center gap-2 hover:text-white transition-colors">
            <span>A little closer to the world</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label="Toggle playback"
            className="w-10 h-10 rounded-full border border-stone-400/40 bg-teal-950/70 hover:bg-teal-900 text-stone-200 flex items-center justify-center transition-colors shadow-sm">
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
        </div>
      </section>

      {/* =========================================================================
          3. SECTION 01: INTRO (BEYOND BORDERS)
          ========================================================================= */}
      <section id="intro" className="max-w-6xl w-full mx-auto px-6 md:px-10 py-12 md:py-20">
        {/* Section Kicker Bar */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-5 text-xs text-teal-900 font-semibold tracking-wider">
          <span>01 / BEYOND BORDERS</span>
          <Globe2 className="w-5 h-5 text-teal-900" />
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 pt-8 items-start">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-teal-900 leading-tight">
            A new perspective.
            <br />
            <em className="text-orange-600 italic">A real connection.</em>
          </h2>

          <div className="space-y-4">
            <p className="text-slate-600 leading-relaxed text-base md:text-lg">
              Every conversation is a chance to see things differently. Meet fellow students,
              exchange everyday stories, and make English part of your world.
            </p>
            <button
              type="button"
              onClick={() => {}}
              className="inline-flex items-center gap-2 text-teal-900 font-semibold hover:text-orange-600 transition-colors pt-2 group">
              <span>Start your next chapter</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. SECTION 02: WHAT IS CONNECT
          ========================================================================= */}
      <section id="about" className="max-w-6xl w-full mx-auto px-6 md:px-10 pb-12 md:pb-20">
        {/* Section Kicker Bar */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-5 text-xs text-teal-900 font-semibold tracking-wider">
          <span>02 / WHAT IS CONNECT?</span>
          <MessagesSquare className="w-5 h-5 text-teal-900" />
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 pt-8 items-start">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-teal-900 leading-tight">
            A short-term
            <br />
            <em className="text-orange-600 italic">virtual exchange.</em>
          </h2>

          <p className="text-slate-600 leading-relaxed text-base md:text-lg">
            <span className="font-serif font-bold tracking-tight text-teal-900">CONNECT</span>{" "}
            brings together university students from diverse cultural and linguistic backgrounds
            for a 4–5 week online exchange. Through daily conversations on Telegram, weekly videos,
            and live meetups, participants practise real-world English, explore other cultures, and
            build genuine global friendships — all without leaving home.
          </p>
        </div>

        {/* Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-8">
          <FeatureCard
            icon={<MessageCircle className="w-5 h-5" />}
            title="English Communication"
            hover={false}>
            Practise real-world English in a safe, supportive environment with peers from around
            the world.
          </FeatureCard>
          <FeatureCard
            icon={<Globe2 className="w-5 h-5" />}
            title="Intercultural Awareness"
            hover={false}>
            Explore diverse cultures while discovering what makes us different — and alike.
          </FeatureCard>
          <FeatureCard
            icon={<MonitorSmartphone className="w-5 h-5" />}
            title="Digital Proficiency"
            hover={false}>
            Develop essential digital skills through multimodal, real-time online interaction.
          </FeatureCard>
        </div>
      </section>

      {/* =========================================================================
          5. SECTION 03: WHO IS IT FOR
          ========================================================================= */}
      <section id="audience" className="max-w-6xl w-full mx-auto px-6 md:px-10 pb-12 md:pb-20">
        {/* Section Kicker Bar */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-5 text-xs text-teal-900 font-semibold tracking-wider">
          <span>03 / WHO IS IT FOR?</span>
          <Users className="w-5 h-5 text-teal-900" />
        </div>

        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-teal-900 leading-tight pt-8">
          Something for <em className="text-orange-600 italic">everyone.</em>
        </h2>

        {/* Audience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-8">
          <Link
            to="/student-guide"
            className="block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-900">
            <FeatureCard
              icon={<GraduationCap className="w-5 h-5" />}
              title="For Students"
              actionLabel="Student Guide"
              className="h-full">
              Join a global Telegram community to chat, share videos, and connect with peers from
              around the world. No perfect English needed — just curiosity, openness, and a
              willingness to communicate. Sign up before the deadline to take part in the
              experience.
            </FeatureCard>
          </Link>
          <FeatureCard
            icon={<Presentation className="w-5 h-5" />}
            title="For Teachers"
            actionLabel="Teacher Notes">
            Join a global community of passionate educators committed to intercultural learning
            and meaningful international collaboration. Bring an international dimension to your
            classroom by encouraging students to connect with peers from around the world.
          </FeatureCard>
        </div>

        {/* Registration Note */}
        <div className="flex items-start gap-3 mt-8 rounded-xl border border-stone-200 bg-white px-6 py-5 text-sm text-slate-600 leading-relaxed">
          <Info className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
          <p>
            <span className="font-semibold text-teal-900">Please note:</span> Students must
            register through a participating teacher or institution. Individual applications are
            not accepted.
          </p>
        </div>
      </section>

      {/* =========================================================================
          6. SECTION 04: HOW IT WORKS
          ========================================================================= */}
      <section id="how-it-works" className="max-w-6xl w-full mx-auto px-6 md:px-10 pb-12 md:pb-20">
        {/* Section Kicker Bar */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-5 text-xs text-teal-900 font-semibold tracking-wider">
          <span>04 / HOW IT WORKS</span>
          <CalendarDays className="w-5 h-5 text-teal-900" />
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 pt-8 items-start">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-teal-900 leading-tight">
            Four weeks. Four themes.
            <br />
            <em className="text-orange-600 italic">Endless conversations.</em>
          </h2>

          <p className="text-slate-600 leading-relaxed text-base md:text-lg">
            Each week has a suggested theme to spark ideas — but you're always free to share
            anything. The goal is connection, not perfection.
          </p>
        </div>

        {/* Week Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          {WEEKS.map((week, index) => (
            <FeatureCard
              key={week.title}
              eyebrow={`Week ${index + 1}`}
              title={week.title}
              titleSize="sm"
              hover={false}>
              <ul className="divide-y divide-dashed divide-stone-200 text-sm">
                {week.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-1.5 py-2">
                    <ChevronRight className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-1" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </FeatureCard>
          ))}
        </div>
      </section>

      {/* =========================================================================
          7. CONTACT & FOOTER
          ========================================================================= */}
      <ContactInfo />
      {loginOpen && !isAuthenticated && <LoginModal onClose={closeLogin} />}
    </div>
  );
}

export default HomePage;
