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
    { id: "experience", label: "Experience" },
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
      { type: "image", src: "/images/agrobot/agrobot1.jpg", alt: "Agrobot in vineyard" },
      { type: "image", src: "/images/agrobot/agrobot2.jpg", alt: "Agrobot Prototype" },
      { type: "image", src: "/images/agrobot/agrobot3.jpg", alt: "Agricultural Robotics System" },
    ],
    []
  );

  const mediaCV = useMemo(
    () => [
      { type: "image", src: "/images/cv/cv1.jpg", alt: "Computer Vision Pipeline" },
      { type: "image", src: "/images/cv/cv2.jpg", alt: "Object Detection" },
      { type: "image", src: "/images/cv/cv3.jpg", alt: "AI Inference" },
    ],
    []
  );

  const mediaManufacturing = useMemo(
    () => [
      { type: "image", src: "/images/manufacturing/m1.jpg", alt: "Cartesian Robotic Arm" },
      { type: "image", src: "/images/manufacturing/m2.jpg", alt: "FEA Stress Analysis" },
      { type: "image", src: "/images/manufacturing/m3.jpg", alt: "Injection Molding Setup" },
    ],
    []
  );

  const skillGroups = useMemo(
    () => [
      {
        title: "Programming & Software",
        items: ["Python", "C++ (Arduino IDE)", "MATLAB", "R", "ROS / ROS 2", "Git", "Linux", "PLC", "SCADA"],
      },
      {
        title: "Robotics & AI",
        items: ["Computer Vision", "Machine Learning", "OpenCV", "Gazebo", "MoveIt", "Kinematics", "PID Control", "RRT Path Planning"],
      },
      {
        title: "Modelling & Simulation",
        items: ["AutoCAD", "Fusion 360", "Onshape", "SolidWorks", "Sketchup", "Simulink", "Simscape", "LabView"],
      },
      {
        title: "Engineering",
        items: ["FEA Stress Analysis", "Mechatronics", "Manufacturing Processes", "CNC Operation", "Prototyping", "P&ID", "HMI", "Electric Vehicles"],
      },
      {
        title: "Block-Based & Automation Tools",
        items: ["LabView", "Simulink", "UIPath", "Simscape"],
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

          <p className="mt-1 text-sm text-gray-500">Buffalo, NY · akshayg20002@gmail.com · +1 (716) 617-1612</p>

          <p className="mt-3 text-sm text-gray-700 leading-relaxed max-w-3xl">
            MS Robotics candidate at the University at Buffalo with hands-on industry experience in agricultural robotics,
            mechatronics, and manufacturing automation. My work spans autonomous robot design, computer vision pipelines,
            embedded control systems, PLC/SCADA integration, and kinematic modeling — bridging hardware prototyping with
            AI-driven perception for real-world deployment.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Pill>Robotics</Pill>
            <Pill>ROS / ROS 2</Pill>
            <Pill>Computer Vision</Pill>
            <Pill>Embedded Systems</Pill>
            <Pill>PLC / SCADA</Pill>
            <Pill>Mechatronics</Pill>
            <Pill>Python</Pill>
            <Pill>Machine Learning</Pill>
            <Pill>FEA</Pill>
          </div>

          {/* Education */}
          <div className="mt-6 border-t border-gray-100 pt-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-gray-900">University at Buffalo, SUNY</p>
              <p className="text-gray-600">MS in Robotics (Engineering Science) · Aug 2024 – Jan 2026</p>
              <p className="text-gray-500 text-xs mt-0.5">CGPA: 3.33 / 4.0</p>
              <p className="text-gray-500 text-xs mt-1">
                Robotics I &amp; II · Robot Control Systems · Machine Learning · Computer Vision ·
                Collaborative Robotics · Robotics Algorithms · Digital Control Systems · Road Vehicle Dynamics
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">NMIMS University, MPSTME — Mumbai, India</p>
              <p className="text-gray-600">BTech in Mechatronics Engineering · Aug 2020 – Jul 2024</p>
              <p className="text-gray-500 text-xs mt-0.5">CGPA: 3.2 / 4.0</p>
              <p className="text-gray-500 text-xs mt-1">
                Industrial Robotics · Mechatronics Systems Design · Manufacturing Processes ·
                PLC / SCADA / HMI · Modern Control Systems · AI &amp; ML · CAD · Electric Vehicles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <Section
        id="experience"
        title="Professional Experience"
        subtitle="Industry roles spanning agricultural robotics, graduate instruction, and mechatronics engineering."
      >
        <div className="grid grid-cols-1 gap-6">

          <Card
            title="Robotics Engineering Intern — Orbitist LLC"
            meta="Holland, NY · May 2025 – Dec 2025"
            tags={["Agricultural Robotics", "Mechanical Design", "BOM", "Prototyping"]}
          >
            <ul className="list-disc ml-5 space-y-1">
              <li>Designed mechanical subsystems and developed architecture for agricultural robots navigating uneven vineyard terrain.</li>
              <li>Developed a full system Bill of Materials (BOM), achieving a 45% cost reduction through strategic component selection and design validation.</li>
              <li>Researched and designed a dual-robot vineyard system featuring peer-to-peer docking and 2WD-to-4WD conversion for difficult terrain.</li>
              <li>Operated the Amiga robot in active vineyards, collecting field data to analyze phases of vine growth cycles.</li>
            </ul>
            <MediaGrid items={mediaAgrobot} />
          </Card>


          <Card
            title="Graduate Student Assistant — University at Buffalo"
            meta="Buffalo, NY · Aug 2025 – Dec 2025"
            tags={["Teaching", "Robotics", "MAE 493", "MAE 593"]}
          >
            <ul className="list-disc ml-5 space-y-1">
              <li>Evaluated coursework and assignments for two robotics courses — MAE 493 (undergraduate) and MAE 593 (graduate).</li>
            </ul>
          </Card>

          <Card
            title="Mechatronics Engineering Intern — Miranda Automation"
            meta="Mumbai, India · Dec 2023 – May 2024"
            tags={["PLC", "HMI", "Industrial Machines", "Electrical Panels", "CNC"]}
          >
            <ul className="list-disc ml-5 space-y-1">
              <li>Resolved PLC-based control system faults across 4 active production lines using HMI dashboards to monitor system health.</li>
              <li>Assembled 15+ industrial machines (mixers, creamers) and 30+ electro-mechanical components including valves and sensors.</li>
              <li>Wired 5 electrical panels and circuits, translated P&amp;IDs, and operated CNC and lathe machines per design specifications.</li>
            </ul>
          </Card>

          <Card
            title="Mechanical Engineering Intern — Pro Moulds Private Limited"
            meta="Mumbai, India · May 2023 – Aug 2023"
            tags={["Robotics", "FEA", "Fusion 360", "CAD", "Injection Molding"]}
          >
            <ul className="list-disc ml-5 space-y-1">
              <li>Designed and simulated a Cartesian robotic arm for factory automation; performed FEA stress analysis in Fusion 360 to validate structural integrity and confirm safe load-bearing performance.</li>
              <li>Generated Bills of Materials for multiple injection molding machines to assess automation ROI.</li>
            </ul>
          </Card>

        </div>
      </Section>

      {/* PROJECTS */}
      <Section
        id="projects"
        title="Academic Projects"
        subtitle="Robotics, automation, embedded systems, and intelligent engineering systems."
      >
        <div className="grid grid-cols-1 gap-6">

          <Card
            title="Capstone: Robotic Manipulation for Injection Molding"
            meta="Cartesian robotic arm design, kinematics, and structural validation"
            tags={["FEA", "Kinematics", "DH Parameters", "Motion Planning", "Fusion 360"]}
          >
            <ul className="list-disc ml-5 space-y-1">
              <li>Conducted FEA stress analysis on a Cartesian robotic arm under a 100 kg load, achieving a factor of safety of 11.95.</li>
              <li>Modeled forward and inverse kinematics using DH parameters for motion planning and task execution.</li>
            </ul>
            <MediaGrid items={mediaManufacturing} />
          </Card>

          <Card
            title="Turtlebot3 Navigation & Localization in Gazebo"
            meta="Autonomous behaviors in simulated ROS / Gazebo environments"
            tags={["ROS", "Gazebo", "PID Control", "RRT", "Localization", "Turtlebot3"]}
          >
            <ul className="list-disc ml-5 space-y-1">
              <li>Developed and tested autonomous behaviors on Turtlebot3 in simulated ROS/Gazebo environments.</li>
              <li>Implemented PID control for navigation, localization, and goal-seeking across 5 different environments.</li>
              <li>Applied RRT (Rapidly-exploring Random Tree) for path planning.</li>
            </ul>
          </Card>

          <Card
            title="Industrial Robotics: Dual-Arm Punching Robot"
            meta="Mechanical design and motor-driven actuation"
            tags={["Robotics", "Mechanical Design", "Rack and Pinion"]}
          >
            <ul className="list-disc ml-5 space-y-1">
              <li>Built a dual-arm punching robot performing alternating back-and-forth motion using a single motor via a rack and pinion system.</li>
            </ul>
          </Card>

          <Card
            title="SCADA Project: Radar Detection System"
            meta="Hardware ultrasonic sensing with live LabView visualization"
            tags={["Arduino UNO", "HC-SR04", "LabView", "SCADA", "Ultrasonic Sensing"]}
          >
            <ul className="list-disc ml-5 space-y-1">
              <li>Developed a hardware system detecting ultrasonic waves via an HC-SR04 sensor controlled by an Arduino UNO programmed in Arduino IDE.</li>
              <li>Visualized object proximity data live on LabView with a 2 cm accuracy.</li>
            </ul>
          </Card>

          <Card
            title="Mechatronics Project: PID Speed Control of DC Motor"
            meta="Closed-loop motor control with Arduino"
            tags={["PID Control", "Arduino UNO", "Embedded Systems", "Control Systems"]}
          >
            <ul className="list-disc ml-5 space-y-1">
              <li>Implemented a PID-based closed-loop speed controller for a DC motor using Arduino UNO.</li>
              <li>Achieved stable target RPM tracking within 5% steady-state error.</li>
            </ul>
          </Card>

          <Card
            title="Computer Vision & AI Projects"
            meta="ML-based perception systems and intelligent detection pipelines"
            tags={["Machine Learning", "OpenCV", "Python", "Deep Learning", "Computer Vision"]}
          >
            <ul className="list-disc ml-5 space-y-1">
              <li>Built computer vision systems using OpenCV and Python for object detection and image analysis tasks.</li>
              <li>Worked on ML workflows involving data preprocessing, model evaluation, and inference pipelines.</li>
              <li>Applied AI-driven perception techniques toward robotics automation.</li>
            </ul>
            <MediaGrid items={mediaCV} />
          </Card>

        </div>
      </Section>

      {/* RESEARCH */}
      <Section
        id="research"
        title="Publications & Certifications"
        subtitle=""
      >
        <div className="grid grid-cols-1 gap-6">

          <Card
            title="Journal Publication — World Scientific"
            meta="Innovation and Emerging Technologies"
            tags={["Publication", "Biomimicry", "Pneumatic Control", "Grippers", "Robotics"]}
            links={[]}
          >
            <p>
              Gangakhedkar, A. et al., <em>"Exploring Biomimicry in Robotic Systems: Nature-Inspired Pneumatic Control
              and Gripper for Enhanced Pick-and-Place Efficiency."</em> Innovation and Emerging Technologies, World Scientific.
            </p>
          </Card>

          <Card
            title="Certifications"
            meta=""
            tags={[]}
          >
            <ul className="list-disc ml-5 space-y-1">
              <li>Robot Safety (Oct 2023)</li>
              <li>MATLAB Onramp (2023)</li>
              <li>Simulink Onramp (2023)</li>
              <li>Digital Manufacturing (Jul 2023, Oct 2023)</li>
              <li>Advanced Manufacturing (Jul 2023)</li>
              <li>3D CAD (Dec 2021)</li>
              <li>Fusion 360 (Apr 2022)</li>
              <li>3D Printing (Mar 2023)</li>
            </ul>
          </Card>

        </div>
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

      {/* EXTRACURRICULARS */}
      <Section id="extra" title="Extracurricular Activities" subtitle="">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm text-sm text-gray-800 leading-relaxed space-y-2">
          <p>🎙️ Worked as a <strong>sports journalist</strong> and provided statistics for sports broadcasts at <strong>Sony Sports India</strong>.</p>
          <p>🧗 Member of <strong>Buffalo's Central Rock Climbing Team</strong> and <strong>UB's Outdoor Adventure Club</strong>.</p>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact" subtitle="">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm text-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <div>
              <div className="text-xs text-gray-500">Email</div>
              <a
                className="text-blue-600 underline underline-offset-4"
                href="mailto:akshayg20002@gmail.com"
              >
                akshayg20002@gmail.com
              </a>
            </div>

            <div>
              <div className="text-xs text-gray-500">Phone</div>
              <a
                className="text-blue-600 underline underline-offset-4"
                href="tel:+17166171612"
              >
                +1 (716) 617-1612
              </a>
            </div>

            <div>
              <div className="text-xs text-gray-500">LinkedIn</div>
              <a
                className="text-blue-600 underline underline-offset-4"
                href="https://www.linkedin.com/in/akshay-gangakhedkar/"
                target="_blank"
                rel="noreferrer"
              >
                My LinkedIn
              </a>
            </div>

            <div>
              <div className="text-xs text-gray-500">Portfolio</div>
              <a
                className="text-blue-600 underline underline-offset-4"
                href="#top"
              >
                This site
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
