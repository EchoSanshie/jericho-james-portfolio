"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import ProfileCard from "./components/ProfileID";
import ImageCarousel, { CarouselItem } from "./components/ImageCarousel";
import { ProjectGallery, Project } from "./components/ProjectGallery";
import { SkillCarousel, Skill } from "./components/SkillCarousel";
import {
  CertificateGallery,
  Certificate,
} from "./components/CertificateGallery";
import FeaturePanel from "./components/FeaturePanel";

export default function Home() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [formError, setFormError] = useState("");
  const [copied, setCopied] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const myProjects: CarouselItem[] = [
    {
      id: 1,
      image: "Alloc Logo.jpg",
      name: "Alloc Application",
      description:
        "Alloc is a mobile e-wallet that automatically distributes funds and helps users track their finances.",
      exploreMedia: {
        type: "image",
        src: "./Image Resources/Alloc Applicatoin.jpg",
      },
    },
    {
      id: 2,
      image: "Tailwind Article.png",
      name: "Web Tailwind Article",
      description:
        "A simple web article built for learning basic fundamentals of Tailwind CSS.",
      exploreMedia: {
        type: "video",
        src: "./Video Resources/Tailwind CSS Article.mp4",
      },
    },
    {
      id: 3,
      image: "Age Checker.png",
      name: "Simple Age Checker",
      description:
        "Compare and checks the age gap of your favorite artist to google.",
      exploreMedia: {
        type: "video",
        src: "./Video Resources/Simple Age Checker.mp4",
      },
    },
    {
      id: 4,
      image: "MemoryExe.png",
      name: "Memory Exe",
      description:
        "Players flip cards to find matching pairs using memory and concentration.",
      exploreMedia: {
        type: "video",
        src: "./Video Resources/Memory Exe.mp4",
      },
    },
  ];

  const myDesigns: CarouselItem[] = [
    {
      id: 1,
      image: "Vogue.png",
      name: "Vogue Editorial",
      description:
        "Minimalist layout balancing soft photography with modern, clean spacing.",
      exploreMedia: {
        type: "image",
        src: "./Image Resources/Vogue Editorial.png",
      },
    },
    {
      id: 2,
      image: "Business Flyer.png",
      name: "Business Flyer",
      description:
        "High-energy promotional layout designed for retail impact and brand visibility.",
      exploreMedia: {
        type: "image",
        src: "./Image Resources/Business_Flyer.png",
      },
    },
    {
      id: 3,
      image: "Mecha Uprising.png",
      name: "Mecha Uprising",
      description:
        "Action-oriented composition using scale and motion to capture film energy.",
      exploreMedia: {
        type: "image",
        src: "./Image Resources/Mecha_Uprising.png",
      },
    },
    {
      id: 4,
      image: "Godzilla.png",
      name: "Shadow of the Beast",
      description:
        "Atmospheric silhouette design focused on scale and cinematic tension.",
      exploreMedia: {
        type: "image",
        src: "./Image Resources/Shadow of the Beast.png",
      },
    },
    {
      id: 5,
      image: "Kill Bill.png",
      name: "Vengeance Silhouette",
      description:
        "High-contrast graphic focusing on sharp silhouettes and iconic color schemes.",
      exploreMedia: {
        type: "image",
        src: "./Image Resources/Vengeance Silhouette.png",
      },
    },
    {
      id: 6,
      image: "Avatar.png",
      name: "Elemental Type",
      description:
        "A layered layout merging symbolic art with atmospheric typography.",
      exploreMedia: {
        type: "image",
        src: "./Image Resources/Elemental Type.png",
      },
    },
    {
      id: 7,
      image: "Nature.png",
      name: "Terra Vision",
      description:
        "Vibrant illustrative design promoting sustainability through rich, organic feel.",
      exploreMedia: {
        type: "image",
        src: "./Image Resources/Terra Vision.png",
      },
    },
  ];

  const frontendSkills: Skill[] = [
    { name: "HTML", image: "ic_HTML.svg" },
    { name: "CSS", image: "ic_CSS.svg" },
    { name: "JavaScript", image: "ic_JavaScript.svg" },
    { name: "TypeScript", image: "ic_TypeScript.svg" },
    { name: "React", image: "ic_React.svg" },
    { name: "Tailwind", image: "ic_Tailwind.svg" },
    { name: "Bootstrap", image: "ic_Bootstrap.svg" },
    { name: "Next.js", image: "ic_NextJS.svg" },
  ];

  const mobileSkills: Skill[] = [
    { name: "XML", image: "ic_XML.svg" },
    { name: "Java", image: "ic_Java.svg" },
    { name: "SQLite", image: "ic_SQLite.svg" },
    { name: "Android Studio", image: "ic_Android.svg" },
    { name: "Material Design 3", image: "ic_Material.svg" },
  ];

  const designSkills: Skill[] = [
    { name: "Canva", image: "ic_Canva.svg" },
    { name: "Figma", image: "ic_Figma.svg" },
    { name: "Blender", image: "ic_Blender.svg" },
    { name: "CapCut", image: "ic_Capcut.svg" },
  ];

  const miscSkills: Skill[] = [
    { name: "Python", image: "ic_Python.svg" },
    { name: "C", image: "ic_C.svg" },
    { name: "C#", image: "ic_CSharp.svg" },
    { name: "SQL", image: "ic_SQL.svg" },
    { name: "MongoDB", image: "ic_MongoDB.svg" },
  ];

  const myUIUX: Project[] = [
    {
      id: 1,
      name: "Web Portfolio",
      description:
        "A modern and responsive web portfolio designed to showcase my projects, technical skills, and creative work. Featuring smooth animations, interactive elements, and a clean user interface, it provides visitors with an engaging experience.",
      image: "Portfolio.png",
      exploreMedia: {
        type: "url",
        src: "https://www.figma.com/proto/VCGbAnupCtF5YRAQ2jykTb/Portfolio?node-id=120-189&starting-point-node-id=120%3A189&t=Adyia7vi5ptkqP1L-1",
      },
    },
    {
      id: 2,
      name: "Valorant Mobile Concept (Professional)",
      description:
        "A mobile adaptation concept of Valorant, designed to translate the game's iconic interface and visual identity into a touch-friendly experience. The design reimagines agent selection, navigation, and player information while maintaining the competitive and futuristic aesthetic of the original game.",
      image: "Valorant.png",
      exploreMedia: {
        type: "image",
        src: "./Image Resources/Valorant_Mobile.png",
      },
    },
  ];

  const myVideos: Project[] = [
    {
      id: 1,
      name: "Instrumental Drama",
      description:
        "An instrumental video cover expressing regret, misunderstanding, and reflection. It uses emotive visuals to convey lingering feelings of disconnect and the quiet longing to reconnect after a fractured moment.",
      image: "Drama.png",
      exploreMedia: {
        type: "video",
        src: "./Video Resources/Instrumental Drama.mp4",
      },
    },
    {
      id: 2,
      name: "Music Cinematic Cover",
      description:
        "A cinematic shoot paired with music covers that explores modern societal issues through expressive visuals and sound, highlighting real-world themes and emotional perspectives.",
      image: "Cinematic.png",
      exploreMedia: {
        type: "video",
        src: "./Video Resources/Music Cinematic Cover.mp4",
      },
    },
  ];

  const myCertificates: Certificate[] = [
    {
      id: 1,
      title: "Java Fundamentals",
      institution: "STI College Lipa",
      date: "June 19, 2024",
      image: "Java Certificate.png",
    },
    {
      id: 2,
      title: "Responsive Web Design",
      institution: "freeCodeCamp",
      date: "May 29, 2026",
      image: "freeCodeCamp Certificate.png",
    },
  ];

  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setFormError("All fields are required.");
      return;
    }
    if (!validateEmail(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          name: name,
          email: email,
          message: message,
          subject: `New Portfolio Message from ${name}`,
          from_name: "Portfolio Notification",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        setName("");
        setEmail("");
        setMessage("");

        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setFormError(
          result.message || "Something went wrong. Please try again later.",
        );
      }
    } catch {
      setFormError("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("jerichojamespanganiban@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="w-full flex flex-col items-center overflow-x-hidden text-[var(--foreground)] selection:bg-[var(--selection-bg)] selection:text-[var(--selection-fg)]">
      <Navbar />

      {/* --- HOME SECTION --- */}
      <section
        id="home"
        className="w-full flex flex-col items-center font-inter relative z-10"
      >
        <div className="min-h-screen w-full max-w-7xl flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-24 pt-24 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full flex-1 flex flex-col justify-center my-auto"
          >
            <p className="font-medium text-xs md:text-sm tracking-widest mb-4 md:ml-[10%] uppercase text-gold-gradient">
              Welcome to my Web Portfolio!
            </p>
            <div className="flex gap-3 md:gap-4 items-center mb-6 md:ml-[10%]">
              <div className="w-8 md:w-20 h-[2px] bg-gradient-to-r from-[var(--accent)] to-transparent"></div>
              <p className="text-lg md:text-2xl font-light text-[var(--muted)]">
                I&apos;m{" "}
                <span className="font-semibold text-gold-gradient">
                  Jericho
                </span>
              </p>
            </div>
            <div className="md:ml-[10%]">
              <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[var(--headline-gradient-start)] via-[var(--headline-gradient-mid)] to-[var(--headline-gradient-end)] leading-tight md:leading-none tracking-tight break-words">
                Front-end Web & <br className="hidden sm:inline" />
                <span className="text-gold-gradient">Mobile Developer</span>
              </h1>
              <p className="text-base md:text-xl text-[var(--muted)] mt-4 md:mt-6 max-w-2xl font-light leading-relaxed">
                Blending a passion for learning with a commitment to growth
                through every line of code.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-10">
                <a
                  href="#projects"
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("nav-click", { detail: "projects" }),
                    )
                  }
                  className="btn-gold text-center w-full sm:w-auto text-sm md:text-base font-semibold px-8 py-3.5 md:py-4 rounded-full transition-all duration-300 hover:scale-105"
                >
                  Explore My Work ➘
                </a>

                <a
                  href="/Resume/Jericho Panganiban CV.pdf"
                  download="Jericho Panganiban CV.pdf"
                  className="text-center w-full sm:w-auto text-sm md:text-base font-medium text-[var(--foreground)] glass-panel px-8 py-3.5 md:py-4 rounded-full transition-all duration-300 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-card)] hover:-translate-y-1"
                >
                  Download CV
                </a>
              </div>
            </div>
          </motion.div>

          <FeaturePanel />
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section
        id="about"
        className="scroll-mt-32 w-full bg-[var(--band)] py-16 md:py-28 border-y border-[var(--border-color)] flex flex-col items-center"
      >
        <div className="min-h-screen w-full max-w-7xl px-4 sm:px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center">
          <div className="w-full">
            <h2 className="text-[var(--accent-text)] text-xs uppercase tracking-widest font-bold mb-6 md:mb-8 font-mono">
              01 | Background Check
            </h2>

            <div className="relative w-full overflow-hidden rounded-[2rem] md:rounded-[2.5rem] p-[2px] shadow-[var(--shadow-card)]">
              <div
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 h-[250%] w-[250%] -translate-x-1/2 -translate-y-1/2 animate-[spin_8s_linear_infinite] pointer-events-none"
                style={{
                  backgroundImage:
                    "conic-gradient(transparent 0deg 150deg, var(--spinner-gold) 180deg, transparent 180deg 330deg, var(--spinner-gold) 360deg)",
                }}
              />

              <div
                className="relative z-10 flex flex-col lg:flex-row w-full min-w-0 rounded-[calc(2rem-2px)] md:rounded-[calc(2.5rem-2px)] p-6 sm:p-8 md:p-12 lg:p-16 gap-10 lg:gap-12 transition-colors duration-300"
                style={{
                  background: "var(--card-surface)",
                }}
              >
                <article className="flex-1 min-w-0 text-justify border-b lg:border-b-0 lg:border-r border-[var(--border-color)] pb-8 lg:pb-0 lg:pr-12 space-y-4 md:space-y-6">
                  <h3 className="text-2xl md:text-4xl font-bold text-left text-[var(--foreground)] tracking-tight break-words">
                    My Passion & Philosophy
                  </h3>
                  <p className="text-sm md:text-lg text-[var(--muted)] leading-relaxed font-light">
                    An aspiring and dedicated developer with a growing expertise
                    in building functional, modern digital solutions.
                  </p>
                  <p className="text-sm md:text-lg text-[var(--muted)] leading-relaxed font-light">
                    Currently focused on sharpening skills within the front-end
                    web and Android mobile ecosystems, I find joy in the clean
                    process of turning logic structures into stunning,
                    user-centric interfaces.
                  </p>
                  <p className="text-sm md:text-lg text-[var(--muted)] leading-relaxed font-light">
                    Driven by a love for exploring new technologies and patterns
                    in engineering, every single build serves as a conscious
                    milestone toward mastering complex software scales.
                  </p>
                </article>

                <aside className="flex-1 min-w-0 flex flex-col items-center justify-center space-y-8 md:space-y-10">
                  <ProfileCard />

                  <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:gap-x-12 sm:gap-y-8 w-full max-w-sm border-t border-[var(--border-color)] pt-8">
                    <div>
                      <p className="text-3xl md:text-4xl font-bold text-[var(--foreground)] tracking-tight">
                        4
                        <span className="text-[var(--color-gold)] font-light">
                          +
                        </span>
                      </p>
                      <p className="text-[9px] md:text-[10px] text-[var(--muted)] font-bold uppercase tracking-wider mt-1 font-mono">
                        Completed Projects
                      </p>
                    </div>
                    <div>
                      <p className="text-3xl md:text-4xl font-bold text-[var(--foreground)] tracking-tight">
                        10
                        <span className="text-[var(--color-gold)] font-light">
                          +
                        </span>
                      </p>
                      <p className="text-[9px] md:text-[10px] text-[var(--muted)] font-bold uppercase tracking-wider mt-1 font-mono">
                        Digital Designs
                      </p>
                    </div>
                    <div>
                      <p className="text-3xl md:text-4xl font-bold text-[var(--foreground)] tracking-tight">
                        2
                        <span className="text-[var(--color-gold)] font-light">
                          +
                        </span>
                      </p>
                      <p className="text-[9px] md:text-[10px] text-[var(--muted)] font-bold uppercase tracking-wider mt-1 font-mono">
                        Years Experience
                      </p>
                    </div>
                    <div>
                      <p className="text-3xl md:text-4xl font-bold text-[var(--foreground)] tracking-tight">
                        2
                        <span className="text-[var(--color-gold)] font-light">
                          +
                        </span>
                      </p>
                      <p className="text-[9px] md:text-[10px] text-[var(--muted)] font-bold uppercase tracking-wider mt-1 font-mono">
                        Certifications
                      </p>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section
        id="projects"
        className="scroll-mt-32 w-full py-16 md:py-24 flex flex-col items-center"
      >
        <div className="w-full max-w-7xl px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="w-full text-left mb-10 md:mb-16">
            <h2 className="text-[var(--accent-text)] text-xs uppercase tracking-widest font-bold mb-2 font-mono">
              02 | Work Portfolio
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-[var(--foreground)] tracking-tight">
              My Architecture & Art
            </h3>
            <p className="text-[var(--muted)] mt-3 text-sm md:text-lg font-light max-w-xl">
              A diverse curation of interactive applications, design languages,
              and digital creative layouts.
            </p>
          </div>

          <div className="w-full space-y-12 md:space-y-16">
            {/* Web & Mobile Applications Container */}
            <div className="content-card p-6 sm:p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] space-y-4 md:space-y-6 transition-all duration-300">
              <h4 className="text-center text-[var(--muted)] font-mono tracking-widest text-xs md:text-sm uppercase">
                {"// Web & Mobile Applications"}
              </h4>
              <div className="w-full max-w-5xl mx-auto">
                <ImageCarousel items={myProjects} />
              </div>
            </div>

            {/* Graphic Concepts & Prints Container */}
            <div className="content-card p-6 sm:p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] space-y-4 md:space-y-6 transition-all duration-300">
              <h4 className="text-center text-[var(--muted)] font-mono tracking-widest text-xs md:text-sm uppercase">
                {"// Graphic Concepts & Prints"}
              </h4>
              <div className="w-full max-w-5xl mx-auto">
                <ImageCarousel items={myDesigns} />
              </div>
            </div>

            {/* UI/UX Concept Interfaces Container */}
            <div className="content-card p-6 sm:p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] space-y-4 transition-all duration-300">
              <h4 className="text-center text-[var(--muted)] font-mono tracking-widest text-xs md:text-sm uppercase">
                {"// UI/UX Concept Interfaces"}
              </h4>
              <ProjectGallery projects={myUIUX} />
            </div>

            {/* Videography & Cinematic Edits Container */}
            <div className="content-card p-6 sm:p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] space-y-4 transition-all duration-300">
              <h4 className="text-center text-[var(--muted)] font-mono tracking-widest text-xs md:text-sm uppercase">
                {"// Videography & Cinematic Edits"}
              </h4>
              <ProjectGallery projects={myVideos} />
            </div>
          </div>
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section
        id="skills"
        className="scroll-mt-32 w-full bg-[var(--band)] py-16 md:py-28 border-y border-[var(--border-color)] flex flex-col items-center"
      >
        <div className="w-full max-w-7xl px-4 sm:px-6 md:px-12 lg:px-24 flex flex-col items-center">
          <h2 className="text-[var(--accent-text)] text-xs uppercase tracking-widest font-bold mb-10 md:mb-14 font-mono">
            03 | Development Toolkit
          </h2>

          <div className="w-full space-y-10 md:space-y-12 border-y border-[var(--border-color)] py-10 md:py-14 bg-[var(--panel)] rounded-[2rem] md:rounded-3xl px-2 sm:px-4 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <h3 className="text-[var(--muted)] font-mono text-[10px] md:text-[11px] mb-4 tracking-widest uppercase">
                {"// Front-end Ecosystem"}
              </h3>
              <SkillCarousel
                skills={frontendSkills}
                direction="left"
                speed={40}
              />
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-[var(--muted)] font-mono text-[10px] md:text-[11px] mb-4 tracking-widest uppercase">
                {"// Native Mobile Engine"}
              </h3>
              <SkillCarousel
                skills={mobileSkills}
                direction="right"
                speed={40}
              />
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-[var(--muted)] font-mono text-[10px] md:text-[11px] mb-4 tracking-widest uppercase">
                {"// Miscellaneous Languages"}
              </h3>
              <SkillCarousel skills={miscSkills} direction="left" speed={40} />
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-[var(--muted)] font-mono text-[10px] md:text-[11px] mb-4 tracking-widest uppercase">
                {"// Production & Mockup Tools"}
              </h3>
              <SkillCarousel
                skills={designSkills}
                direction="right"
                speed={40}
              />
            </div>
          </div>

          <div className="text-center mt-16 md:mt-28 mb-4">
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--headline-gradient-start)] to-[var(--headline-gradient-end)] text-2xl md:text-3xl font-bold tracking-tight">
              Verified Certifications
            </h2>
          </div>
          <CertificateGallery certificates={myCertificates} />
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section
        id="contact"
        className="scroll-mt-32 w-full py-16 md:py-28 flex flex-col items-center relative z-10"
      >
        <div className="min-h-screen w-full max-w-7xl px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center">
          <div className="max-w-3xl w-full">
            <h2 className="text-[var(--accent-text)] text-xs uppercase tracking-widest font-bold mb-6 md:mb-8 text-center font-mono">
              04 | Establish Connection
            </h2>

            <form
              onSubmit={handleContactSubmit}
              className="relative w-full overflow-hidden rounded-[2rem] md:rounded-[2.5rem] p-[2px] shadow-[var(--shadow-card)]"
            >
              {/* Spinning border accent */}
              <div
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 animate-[spin_6s_linear_infinite] pointer-events-none"
                style={{
                  backgroundImage:
                    "conic-gradient(transparent 0deg 150deg, var(--spinner-gold) 180deg, transparent 180deg 330deg, var(--spinner-gold) 360deg)",
                }}
              />

              {/* Inner container */}
              <div
                className="relative z-10 w-full min-w-0 rounded-[calc(2rem-2px)] md:rounded-[calc(2.5rem-2px)] p-6 sm:p-8 md:p-12 flex flex-col gap-5 md:gap-6 transition-colors duration-300"
                style={{ background: "var(--card-surface)" }}
              >
                <div className="text-center mb-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] tracking-tight">
                    Get In Touch
                  </h3>
                  <p className="text-[var(--muted)] font-light text-xs md:text-sm mt-2">
                    Have an idea or application layout you want realized? Let’s
                    talk.
                  </p>
                </div>

                {formError && (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-red-600 dark:text-red-400 text-xs md:text-sm text-center bg-red-50 dark:bg-red-500/10 py-3 rounded-xl border border-red-200 dark:border-red-500/20 font-mono"
                  >
                    {formError}
                  </motion.p>
                )}

                {submitSuccess && (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-green-700 dark:text-green-400 text-xs md:text-sm text-center bg-green-50 dark:bg-green-500/10 py-3 rounded-xl border border-green-200 dark:border-green-500/20 font-mono"
                  >
                    Message dispatched successfully! I&apos;ll get back to you soon.
                  </motion.p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 w-full">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="fullName"
                      className="text-[10px] md:text-xs text-[var(--muted)] font-mono uppercase tracking-wider ml-1"
                    >
                      Your Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      name="name"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., John Doe"
                      disabled={isSubmitting}
                      className="w-full bg-[var(--panel)] border border-[var(--input-border)] rounded-xl px-4 py-3 md:py-3.5 text-sm md:text-base text-[var(--foreground)] outline-none focus:border-[var(--accent)] focus:bg-[var(--surface)] transition-all font-light disabled:opacity-50"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="emailAddr"
                      className="text-[10px] md:text-xs text-[var(--muted)] font-mono uppercase tracking-wider ml-1"
                    >
                      Email Address
                    </label>
                    <input
                      id="emailAddr"
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g., mail@domain.com"
                      disabled={isSubmitting}
                      className="w-full bg-[var(--panel)] border border-[var(--input-border)] rounded-xl px-4 py-3 md:py-3.5 text-sm md:text-base text-[var(--foreground)] outline-none focus:border-[var(--accent)] focus:bg-[var(--surface)] transition-all font-light disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="msgText"
                    className="text-[10px] md:text-xs text-[var(--muted)] font-mono uppercase tracking-wider ml-1"
                  >
                    Project Details
                  </label>
                  <textarea
                    id="msgText"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your goals, requirements, timelines..."
                    rows={5}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-[var(--panel)] border border-[var(--input-border)] rounded-xl px-4 py-3 md:py-3.5 text-sm md:text-base text-[var(--foreground)] outline-none focus:border-[var(--accent)] focus:bg-[var(--surface)] transition-all font-light resize-none leading-relaxed disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full font-bold rounded-xl py-3.5 md:py-4 mt-2 transition-all duration-300 hover:scale-[1.01] cursor-pointer tracking-wider uppercase text-xs md:text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Transmitting..." : "Dispatch Message \u2192"}
                </button>

                <div className="w-full h-px bg-[var(--border-color)] my-2 md:my-4"></div>

                <div className="flex flex-col sm:flex-row justify-between items-center w-full bg-[var(--panel)] border border-[var(--border-color)] rounded-xl py-3 px-4 md:px-5 gap-3 sm:gap-0 group hover:border-[var(--accent)] transition-colors duration-300">
                  <div className="flex items-center gap-3 text-center sm:text-left min-w-0 w-full sm:w-auto">
                    <img
                      src="ic_Email.svg"
                      alt=""
                      aria-hidden="true"
                      className="icon-adaptive w-4 h-4 opacity-80 hidden sm:block"
                    />
                    <p className="text-[11px] md:text-sm text-[var(--muted)] font-mono tracking-tight break-all">
                      <span className="sm:hidden block text-[var(--muted)] font-semibold uppercase mb-0.5">
                        Direct Line:
                      </span>
                      jerichojamespanganiban@gmail.com
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 text-xs text-[var(--accent-text)] hover:text-[var(--foreground)] transition-colors cursor-pointer font-mono px-3 py-1.5 rounded-md hover:bg-[var(--glass)] border border-[var(--border-color)] sm:border-none"
                  >
                    {copied ? "[ Copied ]" : "Copy Email"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
