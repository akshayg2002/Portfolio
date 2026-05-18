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
        aria-label={alt || "Image placeholder"}
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

function VideoOrPlaceholder({ src, poster, className }) {
  const [bad, setBad] = useState(false);
  if (!src || bad) {
    return (
      <div
        className={cx(
          "flex h-full w-full items-center justify-center rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 text-xs text-gray-500",
          className
        )}
        aria-label="Video placeholder"
      >
        Add video in /public
      </div>
    );
  }
  return (
    <video
      className={className}
      controls
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      onError={() => setBad(true)}
    >

      <source src={src} />
      Your browser does not support the video tag.
    </video>
  );
}

function MediaGrid({ items = [] }) {
  if (!items.length) return null;
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
      {items.map((m) => (
        <div key={m.src} className="h-56 md:h-64">
          {m.type === "video" ? (
            <VideoOrPlaceholder
              src={m.src}
              poster={m.poster}
              className="h-full w-full rounded-lg object-contain bg-black border border-gray-200"
            />
          ) : (
            <ImageOrPlaceholder
              src={m.src}
              alt={m.alt || "Media"}
              className={cx(
                "h-full w-full rounded-lg bg-white border border-gray-200",
                m.fit === "contain" ? "object-contain" : "object-cover"
              )}
            />
          )}
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
        <p className="mt-1 text-sm text-gray-600 leading-relaxed">{subtitle}</p>
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
          {meta ? <p className="mt-1 text-sm text-gray-600">{meta}</p> : null}
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
    { id: "iitgn", label: "IITGN" },
    { id: "oob", label: "OoB" },
    { id: "robocon", label: "Robocon" },
    { id: "scarecrow", label: "Scarecrow 2.0" },
    { id: "publications", label: "Publications" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <a href="#top" className="font-semibold tracking-tight">
          Urvish Shah
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
            href="/Urvish_cv.pdf"
            className="rounded-full border border-gray-200 px-3 py-1 hover:bg-gray-50"
            target="_blank"
            rel="noreferrer"
            title="Put your PDF at public/Urvish_cv.pdf"
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

function StatBox({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
      {items.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-gray-200 bg-gray-50 p-3"
        >
          <div className="text-xs text-gray-500">{s.label}</div>
          <div className="mt-1 text-sm font-semibold text-gray-900">
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ======== IITGN add-on helper (NEW) ======== */
function SubProject({ title, bullets = [] }) {
  return (
    <div className="mt-4">
      <div className="font-semibold text-sm">{title}</div>
      <ul className="mt-2 list-disc ml-5 space-y-1 text-sm text-gray-800 leading-relaxed">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  // =========================
  // Put YOUR media in /public
  // =========================
  const mediaSSL = useMemo(
    () => [
      { type: "video", src: "/videos/MRS_SSL/ssl_demo.mp4", poster: "/videos/MRS_SSL/ssl_poster.jpg" },
      { type: "image", src: "/images/MRS_SSL/ssl_robot_setup.png", alt: "TurtleBot3 Burger + LoRa setup" },
      { type: "image", src: "/images/MRS_SSL/gp_rssi_belief_map.png", alt: "TB3 robot paths + GP RSSI belief map (mean)" },
    ],
    []
  );

  const mediaTransport = useMemo(
    () => [
      { type: "video", src: "/videos/COLO_TRANS/transport_demo.mp4", poster: "/images/transport_poster.jpg" },
      { type: "image", src: "/images/COLO_TRANS/Robots.jpeg", alt: "Robots Used For the Experiments", fit: "contain" },
      { type: "image", src: "/images/COLO_TRANS/object_trajectory_xy.png", alt: "object trajectory" },
    ],
    []
  );

  // ======== IITGN media (NEW) ========
  const mediaIITGN = useMemo(
    () => [
      // Replace with your real filenames in /public
      { type: "image", src: "/images/IITGN/Custom_3d_printer.png", alt: "Custom 3D printer using raw plastic as filament" },
      { type: "image", src: "/images/IITGN/3dprint_closeup.jpg", alt: "3D printed Part using Custom 3D printer with raw plastic as filament" },
      { type: "image", src: "/images/IITGN/mini_robot_swarm.jpg", alt: "Custom designed Mini-robot" },
    ],
    []
  );

  // ======== Robocon media (NEW) ========
  const mediaRobocon = useMemo(
    () => [
      // Replace with your real filenames in /public
      { type: "image", src: "/images/Robocon/team_photo_with_robot.JPG", alt: "Team photo of robots" },
      { type: "image", src: "/images/Robocon/155.JPG", alt: "Robots Photo" },
      { type: "image", src: "/images/Robocon/IMG-20240628-WA0013.jpg", alt: "PCB" },
      { type: "image", src: "/images/Robocon/Passing_and_catching.jpg", alt: "Passing and catching" },
      { type: "image", src: "/images/Robocon/DAP_photo.JPG", alt: "DAP / pneumatic launching mechanism" },
      { type: "image", src: "/images/Robocon/Awards_photo.jpg", alt: "Award photo" },
    ],
    []
  );

  const mediaScarecrow = useMemo(
    () => [
      // Replace with your real assets in /public
      // { type: "video", src: "/videos/SCARECROW/demo.mp4", alt: "Advanced Scarecrow demo video" },
      { type: "image", src: "/images/SCARECROW/Scarecrow_animated_photo.png", alt: "Advanced Scarecrow 2.0 prototype" },
      { type: "image", src: "/images/SCARECROW/Scarecrow_team.png", alt: "Team photo of Scarecrow project" },
      { type: "image", src: "/images/SCARECROW/Scarecrow_Circuit.png", alt: "Electronics enclosure and wiring" },
    ],
    []
  );


  /* ======== IITGN data (NEW) ======== */
  const iitgnSubProjects = useMemo(
    () => [
      {
        title: "Tendon-Driven Flexible Manipulator Prototyping",
        bullets: [
          "Built and iterated tendon-driven flexible manipulator prototypes focusing on repeatability, routing, and tension stability.",
          "Worked on mechanical assembly, tendon routing strategies, and anchor-point refinement to reduce backlash and hysteresis.",
          "Assisted with actuator integration and basic control testing to validate achievable curvature and motion repeatability.",
          "Performed bench-level testing to identify failure modes such as tendon slack, uneven loading, and joint fatigue.",
        ],
      },
      {
        title: "Swarm-Compatible Mini-Robot & Custom PCB Bring-Up",
        bullets: [
          "Contributed to swarm-compatible mini-robot platforms for multi-robot experiments.",
          "Assisted with custom PCB bring-up including power checks, flashing firmware, and validating communication interfaces.",
          "Debugged hardware–software integration issues (boot failures, communication drops, sensor initialization).",
          "Supported modular design decisions to enable scalability and repeatable deployment across multiple robots.",
        ],
      },
      {
        title: "Custom 3D Printer Using Raw Plastic as Filament",
        bullets: [
          "Worked on a custom 3D printer designed to directly use raw plastic instead of conventional filament.",
          "Modified and tuned Marlin firmware parameters to support non-standard extrusion behavior and thermal profiles.",
          "Assisted with power electronics integration, including heater control and safe power delivery to actuators.",
          "Supported mechanical calibration and extrusion testing to improve print consistency and reliability.",
          "Project won Best Design Award — Vishwakarma Awards (IIT Delhi) for a sustainable 3D printing system (raw plastic feedstock).",
        ],
      },
      {
        title: "Sensor-Based Material Classification Pipeline",
        bullets: [
          "Developed a sensor-based pipeline to classify raw plastic feedstock characteristics during printing.",
          "Integrated sensors with the printer control stack to enable real-time material detection.",
          "Used sensor feedback to assist in tuning extrusion parameters and identifying inconsistent feedstock.",
          "Validated the pipeline through controlled test runs and comparison against expected material behavior.",
        ],
      },
    ],
    []
  );

  const iitgnTags = useMemo(
    () => [
      "IIT Gandhinagar",
      "Robotics Lab",
      "Hardware prototyping",
      "Custom PCB bring-up",
      "Firmware (Marlin)",
      "Power electronics",
      "Sensor integration",
      "Mechanical iteration",
      "Best Design Award (IIT Delhi)", // <- add this
    ],
    []
  );

  // ======== OoB Services data (NEW) ========
  const oobSubProjects = useMemo(
    () => [
      {
        title: "Multi-layer PCB Design & Validation",
        bullets: [
          "Designed and validated multi-layer PCBs using Altium Designer for embedded hardware applications.",
          "Handled schematic capture, component selection, and PCB layout with attention to signal integrity and power routing.",
          "Reviewed designs against manufacturability and assembly constraints before fabrication.",
        ],
      },
      {
        title: "Embedded Hardware Integration",
        bullets: [
          "Integrated microcontrollers, sensors, wireless modules, and power electronics on custom PCB assemblies.",
          "Supported interface bring-up for communication buses and peripheral connections during early prototypes.",
          "Worked closely with firmware and test workflows to ensure hardware–software compatibility.",
        ],
      },
      {
        title: "Board Bring-Up, Debugging & System Validation",
        bullets: [
          "Performed board bring-up including power checks, clock verification, and initial firmware flashing.",
          "Debugged hardware issues such as power instability, incorrect pin mapping, and peripheral initialization failures.",
          "Conducted system-level validation to verify functionality under expected operating conditions.",
        ],
      },
    ],
    []
  );

  const oobTags = useMemo(
    () => [
      "OoB Services",
      "Altium Designer",
      "Multi-layer PCB design",
      "Board bring-up",
      "Embedded systems",
      "Hardware debugging",
      "Power electronics",
    ],
    []
  );

  // ======== ABU Robocon data (NEW) ========
  const roboconSubProjects = useMemo(
    () => [
      {
        title: "Embedded Control Systems for Competition Robots",
        bullets: [
          "Developed embedded control systems for competition robots using Arduino and STM32 microcontrollers.",
          "Implemented closed-loop motor control using encoder feedback for precise and repeatable actuation.",
          "Integrated IMUs, encoders, motors, distance sensors, and pneumatic mechanisms into a unified control stack.",
        ],
      },
      {
        title: "Motor Driver & Actuator Control PCB Design",
        bullets: [
          "Designed and tested custom PCBs for motor drivers and actuator control tailored for competition constraints.",
          "Validated power distribution, signal routing, and reliability under high-load and transient conditions.",
          "Performed board-level debugging and rapid fixes during testing and competition preparation phases.",
        ],
      },
      {
        title: "System Integration, Testing & Competition Deployment",
        bullets: [
          "Assisted with full-system integration across mechanical, electrical, and control subsystems.",
          "Performed iterative testing, debugging, and tuning under tight timelines leading up to competition.",
          "Supported on-field deployment, failure diagnosis, and rapid recovery during live competition runs.",
        ],
      },
      {
        title: "Team Leadership, Mentorship & IP Contribution",
        bullets: [
          "Mentored junior team members on embedded systems, wiring practices, and debugging methodologies.",
          "Contributed to system architecture discussions for competition strategy and robot design trade-offs.",
          "Co-inventor on Indian patent IN202321008858 related to robotic system design.",
        ],
      },
    ],
    []
  );

  const roboconTags = useMemo(
    () => [
      "ABU Robocon",
      "PCB Design",
      "STM32",
      "Arduino",
      "Pneumatics",
      "Direct Air Pressure (DAP)",
      "DCV Valves",
      "Pressure regulation",
      "Embedded control",
      "Competition robotics",
    ],
    []
  );

  const scarecrowTags = useMemo(
    () => ["Arduino", "Embedded Systems", "IoT", "GSM (SIM800L)", "Sensors", "Prototyping"],
    []
  );

  // ======== Publications (NEW) ========
  const publications = useMemo(
    () => [
      {
        title:
          "Sustainable recycling of ABS: comprehensive thermophysical characterisation in filament- versus granules-based 3D printing pathways across multiple reprocessing cycles",
        venue: "Rapid Prototyping Journal (Emerald)",
        year: "2025",
        authors: "Rajdeep Singh Devra, Urvish Shah, Madhu Vadali",
        notes:
          "Compared filament-based vs direct granule-based 3D printing of recycled ABS across multiple reprocessing cycles using thermophysical characterization and sustainability assessment.",
        links: [
          {
            label: "Paper (Publisher)",
            href: "https://www.emerald.com/insight/content/doi/10.1108/RPJ-06-2025-0244/full/html",
            external: true,
          },
          {
            label: "DOI",
            href: "https://doi.org/10.1108/RPJ-06-2025-0244",
            external: true,
          },
          {
            label: "Google Scholar",
            href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=xC4NHv0AAAAJ&citation_for_view=xC4NHv0AAAAJ%3Au-x6o8ySG0sC&inst=17395704991083290304",
            external: true,
          },
        ],
      },
      {
        title:
          "Multi-sensor deep learning framework for detection and severity estimation of nozzle clogging in pellet-based 3D printing",
        venue: "Progress in Additive Manufacturing (Springer Nature)",
        year: "2025",
        authors:
          "Rajdeep Singh Devra, Shail Jadav, Urvish Shah, Harish J. Palanthandalam-Madapusi, Madhu Vadali",
        notes:
          "Developed a multi-sensor LSTM-based framework to detect and quantify nozzle clogging severity in pellet-based FDM using time-series signals (e.g., current/vibration/temperature) with strong classification accuracy and generalization.",
        links: [
          {
            label: "Paper (Springer)",
            href: "https://link.springer.com/article/10.1007/s40964-025-01448-z",
            external: true,
          },
          {
            label: "DOI",
            href: "https://doi.org/10.1007/s40964-025-01448-z",
            external: true,
          },
          {
            label: "Google Scholar",
            href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=xC4NHv0AAAAJ&citation_for_view=xC4NHv0AAAAJ%3Au5HHmVD_uO8C&inst=17395704991083290304",
            external: true,
          },
        ],
      },
    ],
    []
  );




  const skillGroups = useMemo(
    () => [
      {
        title: "Robotics (ROS)",
        items: [
          "ROS 2 Humble",
          "Gazebo simulation",
          "ROS node development (Python, C++)",
          "Multi-robot bringup & topic isolation",
          "SLAM basics (Gmapping, Cartographer) ",
          "Nav2 basics",
          "Sensor integration pipelines",
        ],
      },
      {
        title: "Multi-Robot & Autonomy",
        items: [
          "Decentralized coordination (role-based behaviors)",
          "Failure-tolerant execution & robot drop-out handling",
          "Stability-focused control (yaw drift / slip awareness)",
          "Simulation → real-world validation workflow",
          "Structured metrics & episode/step logging",
        ],
      },
      {
        title: "Embedded & Electronics",
        items: [
          "Altium Designer (multi-layer PCB design)",
          "Board bring-up, debugging, validation",
          "STM32, Arduino",
          "UART / I2C / SPI",
          "Power electronics integration",
          "Wireless modules: LoRa (E22), GSM (SIM800L)",
        ],
      },
      {
        title: "Software",
        items: [
          "Python",
          "C++",
          "Linux",
          "Git",
          "Debugging & instrumentation",
          "OpenCV (calibration, detection, geometry tools)",
          "Data logging (CSV, TensorBoard-style)",
        ],
      },
      {
        title: "Learning & Optimization",
        items: [
          "Reinforcement learning",
          "Reward shaping, episode design, evaluation pipelines",
          "Exploration strategies & stability monitoring",
        ],
      },
      {
        title: "Sensing & Modeling",
        items: [
          "Gaussian Process regression (belief + uncertainty)",
          "Exploration–exploitation acquisition logic",
          "RSSI-based sensing (field measurements)",
          "Sensor fusion mindset (IMU/odometry-style pipelines)",
        ],
      },
      {
        title: "Mechanical (supporting)",
        items: [
          "SolidWorks (CAD fundamentals)",
          "Prototyping & assembly",
          "Pneumatics: DCV valves, pressure regulation (Robocon)",
          "3D printing systems (pellet / recycled plastic workflows)",
        ],
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
            Robotics Engineer
          </h1>
          <p className="mt-3 text-sm text-gray-700 leading-relaxed max-w-3xl">
            Robotics engineer with hands-on experience across embedded hardware, multi-robot autonomy,
            and real-world testing. I build systems end-to-end: electronics + sensors → ROS integration → behaviors →
            validation in Gazebo and on hardware. Flagship work includes decentralized multi-robot coordination on
            TurtleBot3 Burger platforms (tested with 4 robots, scalable and fault-tolerant by design).
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Pill>TurtleBot3 Burger</Pill>
            <Pill>Embedded HW + ROS</Pill>
            <Pill>ROS 2 Humble</Pill>
            <Pill>Gazebo simulation</Pill>
            <Pill>Real-world tested (4 robots)</Pill>
            <Pill>Decentralized execution</Pill>
            <Pill>Fault-tolerant behavior</Pill>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <Section
        id="projects"
        title="Flagship projects"
        subtitle=""
      >
        <div className="grid grid-cols-1 gap-6">
          {/* SSL */}
          <Card
            title="Multi-Robot Signal Source Localization"
            meta="Validated in Gazebo + real-world (4 TurtleBot3 Burger robots): LoRa RSSI sensing → decentralized planning → performance evaluation"
            tags={[
              "TurtleBot3 Burger",
              "LoRa E22 RSSI",
              "Gazebo",
              "Decentralized planning",
              "Optimization loop",
              "Logging & metrics",
            ]}
          >
            <StatBox
              items={[
                { label: "Robots", value: "4 TurtleBot3 Burger (real-world tested)" },
                { label: "Validation", value: "Gazebo + real-world" },
                { label: "Scalability", value: "Not limited to 4 (architecture supports scaling)" },
                { label: "Fault handling", value: "Continues on robot dropout" },
              ]}
            />

            <div>
              <div className="font-semibold">What I built</div>
              <ul className="list-disc ml-5 space-y-1">
                <li>
                  Designed <span className="font-semibold">Bayes-Swarm</span>, a decentralized algorithm for
                  locating an unknown signal source using noisy spatial measurements.
                </li>
                <li>
                  Algorithm is modality-agnostic and applicable to RF (RSSI), sound, chemical concentration,
                  or any scalar spatial field.
                </li>
                <li>
                  Each robot independently samples the field and makes decisions without centralized coordination
                  or a shared global map.
                </li>
              </ul>
            </div>

            <div>
              <div className="font-semibold">Core algorithm loop</div>
              <ul className="list-disc ml-5 space-y-1">
                <li>
                  <span className="font-semibold">Measurement:</span> Each robot samples a noisy scalar signal at its current location.
                </li>
                <li>
                  <span className="font-semibold">Belief update:</span> A Gaussian Process (GP) model represents both
                  the estimated signal field and spatial uncertainty.
                </li>
                <li>
                  <span className="font-semibold">Waypoint selection:</span> Each robot selects its next target
                  by optimizing an acquisition function that balances exploration and exploitation.
                </li>
              </ul>
            </div>

            <div>
              <div className="font-semibold">Key innovation</div>
              <ul className="list-disc ml-5 space-y-1">
                <li>
                  Introduced a dynamic exploration–exploitation coefficient that adapts based on swarm coverage.
                </li>
                <li>
                  When uncertainty remains high, robots prioritize exploration; as coverage improves,
                  behavior shifts toward exploitation and convergence.
                </li>
                <li>
                  Prevents premature convergence to local artifacts and improves final localization accuracy.
                </li>
              </ul>
            </div>

            <div>
              <div className="font-semibold">Engineering details (built for real robots)</div>
              <ul className="list-disc ml-5 space-y-1">
                <li>
                  Robots operate asynchronously, tolerating communication delays and dropped updates.
                </li>
                <li>
                  A local active-radius constraint prevents robots from selecting overlapping or conflicting waypoints.
                </li>
                <li>
                  No centralized map, force sensing, or explicit inter-robot coordination is required.
                </li>
              </ul>
            </div>

            <div>
              <div className="font-semibold">Testing & metrics</div>
              <ul className="list-disc ml-5 space-y-1">
                <li>
                  Evaluated in simulation and real-world indoor experiments using TurtleBot3 Burger robots.
                </li>
                <li>
                  Visualized robot trajectories over GP belief maps to analyze convergence behavior.
                </li>
                <li>
                  Measured time-to-source, localization error, and robustness under RSSI noise and multipath effects.
                </li>
              </ul>
            </div>


            <MediaGrid items={mediaSSL} />
          </Card>

          {/* Transport */}
          <Card
            title="Decentralized Collaborative Object Transportation"
            meta="Validated in Gazebo + real-world (4 TurtleBot3 Burger robots): decentralized coordination with stability constraints (incline/slip)"
            tags={[
              "TurtleBot3 Burger",
              "ROS 2",
              "Gazebo",
              "Multi-robot coordination",
              "Terrain/slip handling",
              "Telemetry & logging",
            ]}
          >
            <StatBox
              items={[
                { label: "Robots", value: "4 TurtleBot3 Burger (real-world tested)" },
                { label: "Validation", value: "Gazebo + real-world" },
                { label: "Scalability", value: "Not limited to 4 (architecture supports scaling)" },
                { label: "Fault handling", value: "Continues on robot dropout" },
              ]}
            />

            <div>
              <div className="font-semibold">What I built</div>
              <ul className="list-disc ml-5 space-y-1">
                <li>
                  Designed <span className="font-semibold">R2P2 (Roles with Rules and Proportional-control Primitives)</span>,
                  a fully decentralized algorithm for non-prehensile collaborative object transport.
                </li>
                <li>
                  Each robot independently selects a role and executes a simple control primitive based solely on
                  its relative geometry to the object—no centralized controller, force optimization, or joint trajectory planning.
                </li>
                <li>
                  Enabled stable object motion while preventing rotation, drift, and runaway behavior, including on inclined surfaces.
                </li>
                <li>
                  Implemented structured logging (per-step and episode-level) to analyze stability, failure modes,
                  and convergence behavior.
                </li>
              </ul>
            </div>

            <div>
              <div className="font-semibold">Core idea (why R2P2 works)</div>
              <ul className="list-disc ml-5 space-y-1">
                <li>
                  Robots reason in an <span className="font-semibold">object-fixed (box-aligned) coordinate frame</span>
                  rather than the global map.
                </li>
                <li>
                  Each robot determines whether it is positioned behind, lateral, or diagonal relative to the desired object motion.
                </li>
                <li>
                  This relative geometry directly determines the robot’s role, which is recomputed continuously as
                  the object translates or rotates.
                </li>
              </ul>
            </div>

            <div>
              <div className="font-semibold">Roles & control primitives</div>
              <ul className="list-disc ml-5 space-y-1">
                <li>
                  <span className="font-semibold">Push:</span> Robots behind the desired motion direction regulate
                  translational error using proportional velocity control.
                </li>
                <li>
                  <span className="font-semibold">Prevent:</span> Laterally positioned robots suppress undesired
                  rotation and drift by correcting orientation error.
                </li>
                <li>
                  <span className="font-semibold">Support:</span> Diagonally offset robots preserve formation symmetry
                  and assist stability without directly driving motion.
                </li>
              </ul>
            </div>

            <div>
              <div className="font-semibold">Engineering details (built for real constraints)</div>
              <ul className="list-disc ml-5 space-y-1">
                <li>
                  Robots run independent control loops, avoiding interdependence that would halt the system if a robot fails.
                </li>
                <li>
                  Incline and slip detection trigger safer behavior modes such as reduced pushing aggression
                  and support positioning.
                </li>
                <li>
                  Penalizes overtaking and off-axis pushing that causes loss of contact or object rotation.
                </li>
                <li>
                  Scaling beyond 4 robots is supported by adding additional TurtleBot3 Burger agents
                  with the same behavior stack.
                </li>
              </ul>
            </div>

            <div>
              <div className="font-semibold">Testing & metrics</div>
              <ul className="list-disc ml-5 space-y-1">
                <li>
                  Validated extensively in Gazebo for repeatability, then tested with
                  <span className="font-semibold">4 TurtleBot3 Burger robots</span> in real-world experiments.
                </li>
                <li>
                  Measured success rate, time-to-goal, and robustness under terrain variation and disturbances.
                </li>
                <li>
                  Tracked object yaw error, slip events, and oscillations to identify and mitigate failure modes.
                </li>
              </ul>
            </div>
            <MediaGrid items={mediaTransport} />
          </Card>
        </div>
      </Section>

      {/* ======== IITGN SECTION (NEW) ======== */}
      <Section
        id="iitgn"
        title="IIT Gandhinagar Robotics Lab Experience"
        subtitle="Hands-on prototyping and system integration work across robotics hardware, firmware, and testing."
      >
        <Card
          title="IIT Gandhinagar Robotics Lab — Research Intern → Project Assistant"
          meta="Robotics hardware prototyping • mini-robot platforms • custom PCB bring-up • Marlin firmware • power electronics • sensor integration"
          tags={iitgnTags}
        >
          <div className="text-sm text-gray-800 leading-relaxed">
            This work focused on building and validating real robotic hardware systems, emphasizing
            repeatable prototyping, hardware–software integration, and failure-driven iteration.
          </div>

          <div className="mt-2 text-sm text-gray-800">
            <span className="font-semibold">Recognition:</span>{" "}
            Best Design Award — Vishwakarma Awards (IIT Delhi) for a sustainable 3D printing system.
          </div>


          {iitgnSubProjects.map((sp) => (
            <SubProject key={sp.title} title={sp.title} bullets={sp.bullets} />
          ))}

          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700">
            <span className="font-semibold">Engineering focus:</span> rapid prototyping, hardware debugging,
            firmware modification, system bring-up, and test-driven iteration in a lab environment.
          </div>
          <MediaGrid items={mediaIITGN} />
        </Card>
      </Section>

      {/* ======== OoB SERVICES SECTION (NEW) ======== */}
      <Section
        id="oob"
        title="Industry Experience — OoB Services"
        subtitle="Embedded hardware design, board bring-up, and system-level validation in an industry setting."
      >
        <Card
          title="Hardware Design Engineer (Intern)"
          meta="OoB Services, Ahmedabad • Jun 2022 – Aug 2022"
          tags={oobTags}
        >
          <div className="text-sm text-gray-800 leading-relaxed">
            Worked on embedded hardware design and validation tasks with a focus on practical
            system bring-up, debugging, and integration of real-world electronic components.
          </div>

          {oobSubProjects.map((sp) => (
            <SubProject key={sp.title} title={sp.title} bullets={sp.bullets} />
          ))}

          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700">
            <span className="font-semibold">Engineering focus:</span> schematic design, PCB layout,
            hardware bring-up, embedded integration, and validation-driven debugging.
          </div>
        </Card>
      </Section>

      {/* ======== ABU ROBOTCON SECTION (NEW) ======== */}
      <Section
        id="robocon"
        title="ABU Robocon — Competition Robotics Experience"
        subtitle="Multi-year experience building, integrating, and deploying competition robots under real-world constraints."
      >
        <Card
          title="Robotics Hardware Engineer — GTU ABU Robocon Team"
          meta="Ahmedabad, India • Aug 2020 – May 2023"
          tags={roboconTags}
        >
          <div className="text-sm text-gray-800 leading-relaxed">
            Worked on end-to-end development of competition robots, focusing on embedded control,
            hardware integration, and rapid debugging under time-critical and failure-prone conditions.
          </div>

          {roboconSubProjects.map((sp) => (
            <SubProject key={sp.title} title={sp.title} bullets={sp.bullets} />
          ))}

          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700">
            <span className="font-semibold">Competition highlights:</span>{" "}
            Achieved 1st and 2nd runner-up at DD Robocon (IIT Delhi) with two independent robot systems
            (Target Robot + Defensive Robot). Represented India at ABU Robocon 2021 (Jimo, China),
            placing 9th among international teams.
          </div>

          <MediaGrid items={mediaRobocon} />
          <div className="mt-8">
            <h4 className="text-xl font-semibold mb-4">
              Real Competition Footage
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl">
              {/* National Competition */}
              <div>
                <div className="mb-2 font-medium text-sm text-gray-800">
                  National-Level Competition (DD Robocon, IIT Delhi)
                </div>
                <div className="aspect-video w-full rounded-lg overflow-hidden border border-gray-300">
                  <iframe
                    src="https://www.youtube.com/embed/19KotBhEFhY?start=6"
                    title="DD Robocon National Competition Match"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* International Competition */}
              <div>
                <div className="mb-2 font-medium text-sm text-gray-800">
                  International Competition (ABU Robocon, Jimo, China)
                </div>
                <div className="aspect-video w-full rounded-lg overflow-hidden border border-gray-300">
                  <iframe
                    src="https://www.youtube.com/embed/_cP0rByDEkc?start=66"
                    title="ABU Robocon International Competition Match"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-600 max-w-4xl">
              Footage from real national and international Robocon matches demonstrating system-level
              reliability, pneumatic launching, and on-field performance under competitive constraints.
            </p>
          </div>
        </Card>
      </Section>

      {/* ======== ADVANCED SCARECROW 2.0 (NEW) ======== */}
      <Section
        id="scarecrow"
        title="Advanced Scarecrow 2.0 — Smart Farming System"
        subtitle="IoT-based pest deterrence system with sensor-driven triggering, remote alerts, and field-ready packaging."
      >
        <Card
          title="Advanced Scarecrow 2.0"
          meta="Ideathon (E-Cell × IIT Bombay) • Runner-up"
          tags={scarecrowTags}
        >
          <div className="text-sm text-gray-800 leading-relaxed">
            Built a smart farming deterrence system to detect intrusions and trigger multi-modal responses.
            The system combines motion sensing, environmental sensing, and GSM-based messaging to support
            remote monitoring and reliable operation in outdoor conditions.
          </div>

          <SubProject
            title="What I built"
            bullets={[
              "Event-driven deterrence logic using PIR motion detection and configurable trigger thresholds.",
              "GSM alert pipeline via SIM800L for real-time notifications (no Wi-Fi dependency in rural areas).",
              "Weather-aware sensing inputs (rain + soil moisture) to reduce false triggers and improve reliability.",
              "Field-ready packaging: wiring management, modular sensor placement, and quick maintenance access.",
            ]}
          />

          <SubProject
            title="Hardware stack"
            bullets={[
              "Arduino-based control system with PIR sensor, rain sensor, soil moisture sensor, and SIM800L GSM module.",
              "Solar panel support for outdoor deployment and improved runtime (power-aware design).",
              "Actuation output designed for loud audio / flashing light / motion-based deterrence (configurable).",
            ]}
          />

          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700">
            <span className="font-semibold">Recognition:</span>{" "}
            Runner-up at an Ideathon organized by E-Cell in collaboration with IIT Bombay.
          </div>

          <MediaGrid items={mediaScarecrow} />
        </Card>
      </Section>

      
      {/* ======== PUBLICATIONS SECTION (NEW) ======== */}
      <Section
        id="publications"
        title="Publications"
        subtitle=""
      >
        <div className="grid grid-cols-1 gap-4">
          {publications.map((p) => (
            <Card
              key={`${p.title}-${p.year}`}
              title={p.title}
              meta={`${p.venue} • ${p.year} • ${p.authors}`}
              links={p.links || []}
              tags={["Publication"]}
            >
              <div className="text-sm text-gray-800 leading-relaxed">{p.notes}</div>
            </Card>
          ))}
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" title="Skills" subtitle="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skillGroups.map((g) => (
            <div key={g.title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
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
              <a className="text-blue-600 underline underline-offset-4" href="mailto:shahurvish2001@gmail.com">
                shahurvish2001@gmail.com
              </a>
              {/* <div className="mt-2 text-xs text-gray-500">Replace with your real email.</div> */}
            </div>
            <div>
              <div className="text-xs text-gray-500">GitHub</div>
              <a className="text-blue-600 underline underline-offset-4" href="https://github.com/Urvish2001" target="_blank" rel="noreferrer">
                github.com/Urvish2001
              </a>
            </div>
            <div>
              <div className="text-xs text-gray-500">Resume</div>
              <div className="text-gray-700">
                <a className="text-blue-600 underline underline-offset-4" href="/Urvish_cv.pdf" target="_blank" rel="noreferrer">Download Resume</a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <footer className="py-10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Urvish Shah
      </footer>
    </main>
  );
}