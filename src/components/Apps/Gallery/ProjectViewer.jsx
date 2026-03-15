import { useEffect, useState } from "react";

export default function ProjectViewer({ project, close }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (project) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [project]);

  if (!project) return null;

  const handleClose = () => {
    setVisible(false);
    setTimeout(close, 280);
  };

  return (
    <>
      <style>{`
        @keyframes imgReveal {
          from { transform: scale(1.05); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }
        .pv-img { animation: imgReveal 0.5s cubic-bezier(0.25,0.8,0.25,1) both; }
      `}</style>

      {/* Scrim */}
      <div
        onClick={handleClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          zIndex: 40,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.28s ease",
        }}
        aria-hidden="true"
      />

      {/* Bottom sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} details`}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "#1e2022",
          borderRadius: "24px 24px 0 0",
          overflow: "hidden",
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.32s cubic-bezier(0.34,1.08,0.64,1)",
          maxHeight: "92%",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Google Sans', 'Roboto', sans-serif",
          boxShadow: "0 -4px 40px rgba(0,0,0,0.6)",
        }}
      >
        {/* Drag handle */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 10,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              background: "rgba(255,255,255,0.2)",
            }}
          />
        </div>

        {/* Scrollable content */}
        <div style={{ overflowY: "auto", flex: 1 }}>
          {/* Hero image */}
          <div style={{ position: "relative" }}>
            <img
              src={project.image}
              alt={project.title}
              className="pv-img"
              style={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                display: "block",
              }}
            />
            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, #1e2022 0%, transparent 60%)",
              }}
            />

            {/* Back button */}
            <button
              onClick={handleClose}
              aria-label="Close project viewer"
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                width: 36,
                height: 36,
                borderRadius: 18,
                border: "none",
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(8px)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e3e3e3"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>

            {/* Status badge */}
            {project.status && (
              <span
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  background:
                    project.status === "live"
                      ? "rgba(129,201,149,0.2)"
                      : "rgba(255,183,77,0.2)",
                  border: `1px solid ${project.status === "live" ? "#81c995" : "#ffb74d"}`,
                  backdropFilter: "blur(8px)",
                  borderRadius: 20,
                  padding: "3px 10px",
                  fontSize: 11,
                  fontWeight: 600,
                  color: project.status === "live" ? "#81c995" : "#ffb74d",
                  textTransform: "capitalize",
                }}
              >
                ● {project.status}
              </span>
            )}
          </div>

          {/* Main content */}
          <div style={{ padding: "0 18px 32px" }}>
            {/* Title + category */}
            <div style={{ marginTop: 4 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#c9b8e8",
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                }}
              >
                {project.category}
              </span>
              <h2
                style={{
                  margin: "3px 0 0",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#e3e3e3",
                  lineHeight: 1.2,
                  letterSpacing: -0.4,
                }}
              >
                {project.title}
              </h2>
            </div>

            {/* Year + role row */}
            {(project.year || project.role) && (
              <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
                {project.year && <InfoChip icon="📅" label={project.year} />}
                {project.role && <InfoChip icon="👤" label={project.role} />}
              </div>
            )}

            {/* Divider */}
            <div
              style={{
                height: 1,
                background: "rgba(255,255,255,0.07)",
                margin: "14px 0",
              }}
            />

            {/* Description */}
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: "#a9abb4",
                lineHeight: 1.65,
              }}
            >
              {project.description}
            </p>

            {/* Highlights */}
            {project.highlights?.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <SectionLabel>Highlights</SectionLabel>
                <ul
                  style={{
                    margin: "8px 0 0",
                    padding: 0,
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 7,
                  }}
                >
                  {project.highlights.map((h, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        gap: 8,
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          color: "#e8d5fb",
                          fontSize: 14,
                          marginTop: 1,
                          flexShrink: 0,
                        }}
                      >
                        ◆
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          color: "#c0c2cc",
                          lineHeight: 1.5,
                        }}
                      >
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech stack */}
            {project.tech?.length > 0 && (
              <div style={{ marginTop: 18 }}>
                <SectionLabel>Tech Stack</SectionLabel>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 7,
                    marginTop: 8,
                  }}
                >
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        background: "rgba(232,213,251,0.09)",
                        border: "1px solid rgba(232,213,251,0.2)",
                        borderRadius: 10,
                        padding: "4px 12px",
                        fontSize: 12,
                        color: "#d4c4f0",
                        fontWeight: 500,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            <div
              style={{
                height: 1,
                background: "rgba(255,255,255,0.07)",
                margin: "18px 0 16px",
              }}
            />

            {/* CTA buttons */}
            <div style={{ display: "flex", gap: 10 }}>
              {project.github && (
                <LinkButton
                  href={project.github}
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  }
                  label="GitHub"
                  variant="secondary"
                />
              )}
              {project.live && (
                <LinkButton
                  href={project.live}
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                    </svg>
                  }
                  label="Live Demo"
                  variant="primary"
                />
              )}
              {project.caseStudy && (
                <LinkButton
                  href={project.caseStudy}
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  }
                  label="Case Study"
                  variant="secondary"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Sub-components ──

function SectionLabel({ children }) {
  return (
    <p
      style={{
        margin: 0,
        fontSize: 11,
        fontWeight: 700,
        color: "#8e9099",
        textTransform: "uppercase",
        letterSpacing: 0.9,
      }}
    >
      {children}
    </p>
  );
}

function InfoChip({ icon, label }) {
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 20,
        padding: "3px 10px",
        fontSize: 12,
        color: "#a9abb4",
      }}
    >
      {icon} {label}
    </span>
  );
}

function LinkButton({ href, icon, label, variant }) {
  const isPrimary = variant === "primary";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        flex: isPrimary ? 1 : "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
        padding: "5px 8px",
        borderRadius: 100,
        textDecoration: "none",
        fontSize: 13,
        fontWeight: 600,
        transition: "opacity 0.15s",
        ...(isPrimary
          ? {
              background: "#e8d5fb",
              color: "#3b1f5e",
              border: "none",
            }
          : {
              background: "transparent",
              color: "#c9b8e8",
              border: "1px solid rgba(232,213,251,0.3)",
            }),
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
    >
      {icon} {label}
    </a>
  );
}
