import { useState } from "react";
import { projects } from "../../../assets/data/projects.js";

export default function GalleryGrid({ openProject }) {
  const [pressed, setPressed] = useState(null);

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .proj-card {
          animation: fadeSlideUp 0.4s cubic-bezier(0.34,1.1,0.64,1) both;
        }
      `}</style>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px 12px 24px",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 10,
          alignContent: "start",
        }}
        role="list"
        aria-label="Project gallery"
      >
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="proj-card"
            role="listitem"
            onClick={() => openProject(project)}
            onMouseDown={() => setPressed(project.id)}
            onMouseUp={() => setPressed(null)}
            onMouseLeave={() => setPressed(null)}
            style={{
              animationDelay: `${i * 60}ms`,
              borderRadius: 20,
              overflow: "hidden",
              background: "#2b2d30",
              cursor: "pointer",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: pressed === project.id
                ? "0 1px 4px rgba(0,0,0,0.5)"
                : "0 4px 16px rgba(0,0,0,0.35)",
              transform: pressed === project.id ? "scale(0.96)" : "scale(1)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              display: "flex",
              flexDirection: "column",
            }}
            aria-label={`Open ${project.title}`}
            tabIndex={0}
            onKeyDown={e => e.key === "Enter" && openProject(project)}
          >
            {/* Image */}
            <div style={{ position: "relative", paddingTop: "75%", flexShrink: 0 }}>
              <img
                src={project.image}
                alt={project.title}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* Category pill */}
              <span style={{
                position: "absolute",
                top: 8,
                left: 8,
                background: "rgba(232,213,251,0.18)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(232,213,251,0.25)",
                borderRadius: 20,
                padding: "2px 9px",
                fontSize: 10,
                fontWeight: 600,
                color: "#e8d5fb",
                letterSpacing: 0.3,
                textTransform: "uppercase",
              }}>
                {project.category}
              </span>

              {/* Status dot */}
              {project.status && (
                <span style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: project.status === "live" ? "#81c995" : "#ffb74d",
                  boxShadow: project.status === "live"
                    ? "0 0 6px #81c995"
                    : "0 0 6px #ffb74d",
                }} aria-label={`Status: ${project.status}`} />
              )}
            </div>

            {/* Info */}
            <div style={{ padding: "10px 11px 12px" }}>
              <p style={{
                margin: 0,
                fontSize: 13,
                fontWeight: 600,
                color: "#e3e3e3",
                lineHeight: 1.3,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
                {project.title}
              </p>

              {/* Tech chips — show first 2 */}
              <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                {project.tech?.slice(0, 2).map(t => (
                  <span key={t} style={{
                    background: "rgba(232,213,251,0.1)",
                    border: "1px solid rgba(232,213,251,0.18)",
                    borderRadius: 8,
                    padding: "1px 7px",
                    fontSize: 10,
                    color: "#c9b8e8",
                    fontWeight: 500,
                  }}>
                    {t}
                  </span>
                ))}
                {project.tech?.length > 2 && (
                  <span style={{ fontSize: 10, color: "#8e9099", paddingTop: 2 }}>
                    +{project.tech.length - 2}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}