"use client";

import React, { useMemo, useState } from "react";

function cx(...c) {
  return c.filter(Boolean).join(" ");
}

function Pill({ children }) {
  return (
    <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700">
      {children}
    </span>
  );
}

function ImageOrPlaceholder({ src, alt, className }) {
  const [bad, setBad] = useState(false);

  if (!src || bad) {
    return (
      <div
        className={cx(
          "flex h-full w-full items-center justify-center rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 text-xs text-gray-500",
          className
        )}
      >
        Add image in /public
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setBad(true)}
    />
  );
}

function MediaGrid({ items = [] }) {
  if (!items.length) return null;

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
      {items.map((m) => (
        <div key={m.src} className="h-56 md:h-64">
          <ImageOrPlaceholder
            src={m.src}
            alt={m.alt || "Media"}
            className={cx(
              "h-full w-full rounded-lg bg-white border border-gray-200",
              m.fit === "contain" ? "object-contain" : "object-cover"
            )}
          />
        </div>
      ))}
    </div>
  );
}

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>

      {subtitle ? (
        <p className="mt-1 text-sm text-gray-600 leading-relaxed">
          {subtitle}
        </p>
      ) : null}

      <div className="mt-5">{children}</div>
    </section>
  );
}

function Card({ title, meta, tags = [], links = [], children }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold leading-snug">{title}</h3>

          {meta ? (
            <p className="mt-1 text-sm text-gray-600">{meta}</p>
          ) : null}
        </div>

        {links.length ? (
          <div className="flex flex-wrap gap-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-blue-600 underline underline-offset-4"
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noreferrer" : undefined}
              >
                {l.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-800">
        {children}
      </div>

      {tags.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Navbar() {
  const items = [
    { id: "top", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "research", label: "Research" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <a href="#top" className="font-semibold tracking-tight">
          Akshay Gangakhedkar
        </a>

        <div className="hidden md:flex items-center gap-4 text-sm">
          {items.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-gray-700 hover:text-black"
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <a
            href="/Akshay_Resume.pdf"
            className="rounded-full border border-gray-200 px-3 py-1 hover:bg-gray-50"
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>

          <a
            href="#contact"
            className="rounded-full bg-black text-white px-3 py-1 hover:bg-black/90"
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const mediaAgrobot = useMemo(
    () => [
      {
        type: "image",
        src: "/images/agrobot/agrobot1.jpg",
        alt: "Agrobot",
      },
      {
        type: "image",
        src: "/images/agrobot/agrobot2.jpg",
        alt: "Agrobot Prototype",
      },
      {
        type: "image",
        src: "/images/agrobot/agrobot3.jpg",
        alt: "Agricultural Robotics System",
      },
    ],
    []
  );

  const mediaCV = useMemo(
    () => [
      {
        type: "image",
        src: "/images/cv/cv1.jpg",
        alt: "Computer Vision",
      },
      {
        type: "image",
        src: "/images/cv/cv2.jpg",
        alt: "Object Detection",
      },
      {
        type: "image",
        src: "/images/cv/cv3.jpg",
        alt: "AI Pipeline",
      },
    ],
    []
  );

  const mediaManufacturing = useMemo(
    () => [
      {
        type: "image",
        src: "/images/manufacturing/m1.jpg",
        alt: "Manufacturing Project",
      },
      {
        type: "image",
        src: "/images/manufacturing/m2.jpg",
        alt: "Automation Workflow",
      },
      {
        type: "image",
        src: "/images/manufacturing/m3.jpg",
        alt: "Engineering System",
      },
    ],
    []
  );

  const skillGroups = useMemo(
    () => [
      {
        title: "Programming",
        items: ["Python", "C++", "MATLAB", "JavaScript"],
      },

      {
        title: "Robotics & AI",
        items: [
          "Computer Vision",
          "Machine Learning",
          "OpenCV",
          "Automation",
          "Embedded Systems",
        ],
      },

      {
        title: "Engineering",
        items: [
          "CAD",
          "Manufacturing",
          "Mechanical Design",
          "Prototyping",
        ],
      },

      {
        title: "Tools",
        items: ["Git", "Linux", "VS Code", "SolidWorks"],
      },
    ],
    []
  );

  return (
    <main id="top" className="min-h-screen bg-sky-50 text-gray-900">
      <Navbar />

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
          <h1 className="text-3xl font-semibold tracking-tight">
            Akshay Gangakhedkar
          </h1>

          <p className="mt-3 text-sm text-gray-700 leading-relaxed max-w-3xl">
            Mechanical Engineering graduate and robotics-focused engineer with
            experience across automation, embedded systems, computer vision,
            manufacturing systems, and intelligent robotics. My work combines
            hardware prototyping, AI-driven perception, and real-world
            engineering workflows to build scalable robotic and autonomous
            systems.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Pill>Robotics</Pill>
            <Pill>Computer Vision</Pill>
            <Pill>Embedded Systems</Pill>
            <Pill>Automation</Pill>
            <Pill>Manufacturing</Pill>
            <Pill>Python</Pill>
            <Pill>Machine Learning</Pill>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <Section
        id="projects"
        title="Featured Projects"
        subtitle="Robotics, automation, embedded systems, and intelligent engineering systems."
      >
        <div className="grid grid-cols-1 gap-6">

          <Card
            title="AgroBot – Autonomous Smart Farming Robot"
            meta="Computer vision + autonomous navigation + agricultural automation"
            tags={[
              "Robotics",
              "Computer Vision",
              "Embedded Systems",
              "Automation",
              "Python",
            ]}
          >
            <div>
              <ul className="list-disc ml-5 space-y-1">
                <li>
                  Developed an autonomous agricultural robot capable of
                  assisting with smart farming workflows.
                </li>

                <li>
                  Integrated computer vision pipelines for environmental sensing
                  and crop monitoring.
                </li>

                <li>
                  Designed embedded control architecture for sensor interfacing,
                  actuation, and robot navigation.
                </li>

                <li>
                  Focused on scalable automation concepts for precision
                  agriculture.
                </li>
              </ul>
            </div>

            <MediaGrid items={mediaAgrobot} />
          </Card>

          <Card
            title="Computer Vision & AI Projects"
            meta="ML-based perception systems and intelligent detection pipelines"
            tags={[
              "Machine Learning",
              "OpenCV",
              "Python",
              "Deep Learning",
            ]}
          >
            <div>
              <ul className="list-disc ml-5 space-y-1">
                <li>
                  Built computer vision systems using OpenCV and Python for
                  object detection and image analysis tasks.
                </li>

                <li>
                  Worked with machine learning workflows involving data
                  preprocessing, model evaluation, and inference pipelines.
                </li>

                <li>
                  Applied AI concepts toward robotics perception and automation.
                </li>
              </ul>
            </div>

            <MediaGrid items={mediaCV} />
          </Card>

          <Card
            title="Automation & Manufacturing Engineering"
            meta="Manufacturing systems, optimization, and engineering workflows"
            tags={[
              "Manufacturing",
              "Automation",
              "Process Engineering",
              "CAD",
            ]}
          >
            <div>
              <ul className="list-disc ml-5 space-y-1">
                <li>
                  Worked on engineering projects focused on manufacturing
                  optimization and automation workflows.
                </li>

                <li>
                  Applied engineering analysis and design methodologies to
                  improve operational efficiency.
                </li>

                <li>
                  Utilized CAD and technical engineering tools during project
                  development and prototyping.
                </li>
              </ul>
            </div>

            <MediaGrid items={mediaManufacturing} />
          </Card>
        </div>
      </Section>

      {/* RESEARCH */}
      <Section
        id="research"
        title="Research & Publications"
        subtitle=""
      >
        <Card
          title="Research Experience"
          meta="Robotics, automation, AI, and intelligent systems"
          tags={[
            "Research",
            "Robotics",
            "AI",
            "Automation",
          ]}
        >
          <div className="text-sm text-gray-800 leading-relaxed">
            My research interests include robotics, intelligent autonomous
            systems, computer vision, and AI-driven automation. I am
            particularly interested in the intersection of robotics and
            manufacturing systems, with emphasis on scalable real-world
            deployment.
          </div>
        </Card>
      </Section>

      {/* SKILLS */}
      <Section id="skills" title="Skills" subtitle="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skillGroups.map((g) => (
            <div
              key={g.title}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="text-sm font-semibold">{g.title}</div>

              <div className="mt-3 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <Pill key={s}>{s}</Pill>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact" subtitle="">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div>
              <div className="text-xs text-gray-500">Email</div>

              <a
                className="text-blue-600 underline underline-offset-4"
                href="mailto:your_email@example.com"
              >
                your_email@example.com
              </a>
            </div>

            <div>
              <div className="text-xs text-gray-500">GitHub</div>

              <a
                className="text-blue-600 underline underline-offset-4"
                href="https://github.com/yourgithub"
                target="_blank"
                rel="noreferrer"
              >
                github.com/yourgithub
              </a>
            </div>

            <div>
              <div className="text-xs text-gray-500">LinkedIn</div>

              <a
                className="text-blue-600 underline underline-offset-4"
                href="https://linkedin.com/in/yourlinkedin"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/yourlinkedin
              </a>
            </div>

          </div>
        </div>
      </Section>

      <footer className="py-10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Akshay Gangakhedkar
      </footer>
    </main>
  );
}
