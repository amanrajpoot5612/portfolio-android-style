import { useState } from "react";
import data from "../../assets/data/about.json";

// ── Social icons ──
const SocialIcon = ({ icon, size = 18 }) => {
  const s = { width: size, height: size, display: "block" };
  if (icon === "github")
    return (
      <svg style={s} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    );
  if (icon === "linkedin")
    return (
      <svg style={s} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  if (icon === "twitter")
    return (
      <svg style={s} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.766l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  return (
    <svg
      style={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
};

// ── Chrome tab bar ──
const TABS = ["About", "Skills", "Journey", "Interests"];

export default function Chrome() {
  const [tab, setTab] = useState("About");
  const [pressedSocial, setPressedSocial] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&family=Google+Sans+Mono&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes barGrow {
          from { width: 0%; }
          to   { width: var(--w); }
        }
        @keyframes avatarPop {
          0%   { transform: scale(0.85); opacity: 0; }
          100% { transform: scale(1);    opacity: 1; }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.4; transform: scale(0.7); }
        }
        .tab-content { animation: fadeUp 0.35s cubic-bezier(0.34,1.1,0.64,1) both; }
        .skill-bar    { animation: barGrow 0.9s cubic-bezier(0.25,0.8,0.25,1) both; }
        .avatar-img   { animation: avatarPop 0.5s cubic-bezier(0.34,1.2,0.64,1) both; }
        .avail-dot    { animation: dotPulse 2s ease infinite; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(232,213,251,0.2); border-radius: 4px; }
      `}</style>

      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#111214",
          fontFamily: "'Google Sans', sans-serif",
          overflow: "hidden",
        }}
      >
        {/* ── Chrome address bar ── */}
        <div
          style={{
            background: "#1e2022",
            padding: "10px 12px 0",
            flexShrink: 0,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* URL bar */}
          <div
            style={{
              background: "#2b2d30",
              borderRadius: 22,
              padding: "7px 14px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 10,
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* Lock icon */}
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#81c995"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            <span
              style={{
                flex: 1,
                fontSize: 12,
                color: "rgba(255,255,255,0.55)",
                fontFamily: "'Google Sans Mono', monospace",
                letterSpacing: 0.2,
              }}
            >
              about://
              <span style={{ color: "#e8d5fb" }}>
                {data.name.toLowerCase().replace(" ", "-")}
              </span>
              .dev
            </span>
            {/* Available badge */}
            {data.available && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  background: "rgba(129,201,149,0.12)",
                  border: "1px solid rgba(129,201,149,0.3)",
                  borderRadius: 20,
                  padding: "2px 8px",
                  fontSize: 10,
                  color: "#81c995",
                  fontWeight: 600,
                }}
              >
                <span
                  className="avail-dot"
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#81c995",
                    display: "inline-block",
                  }}
                />
                Available
              </span>
            )}
          </div>

          {/* Tab bar */}
          <div style={{ display: "flex", gap: 2 }}>
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  flex: 1,
                  padding: "7px 4px",
                  background: tab === t ? "#111214" : "transparent",
                  border: "none",
                  borderRadius: "10px 10px 0 0",
                  cursor: "pointer",
                  fontSize: 11,
                  fontWeight: tab === t ? 700 : 400,
                  color: tab === t ? "#e8d5fb" : "rgba(255,255,255,0.4)",
                  letterSpacing: 0.3,
                  transition: "all 0.15s",
                  borderBottom:
                    tab === t ? "2px solid #e8d5fb" : "2px solid transparent",
                  fontFamily: "'Google Sans', sans-serif",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab content ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 28px" }}>
          {/* ══ ABOUT ══ */}
          {tab === "About" && (
            <div
              key="about"
              className="tab-content"
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              {/* Hero card */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #2b1f3a 0%, #1a2340 100%)",
                  borderRadius: 20,
                  padding: "20px 16px",
                  border: "1px solid rgba(232,213,251,0.12)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: 10,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Decorative blobs */}
                <div
                  style={{
                    position: "absolute",
                    top: -30,
                    right: -30,
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: "rgba(232,213,251,0.06)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: -20,
                    left: -20,
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "rgba(97,218,251,0.05)",
                    pointerEvents: "none",
                  }}
                />

                {/* Avatar */}
                <div
                  className="avatar-img"
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #e8d5fb, #61dafb)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                    border: "3px solid rgba(232,213,251,0.3)",
                    boxShadow: "0 4px 20px rgba(232,213,251,0.2)",
                    overflow: "hidden",
                  }}
                >
                  {data.avatar ? (
                    <img
                      src={data.avatar}
                      alt={data.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    "👨‍💻"
                  )}
                </div>

                <div>
                  <h1
                    style={{
                      margin: 0,
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#e3e3e3",
                      letterSpacing: -0.5,
                    }}
                  >
                    {data.name}
                  </h1>
                  <p
                    style={{
                      margin: "3px 0 0",
                      fontSize: 13,
                      color: "#c9b8e8",
                      fontWeight: 500,
                    }}
                  >
                    {data.title}
                  </p>
                  <p
                    style={{
                      margin: "2px 0 0",
                      fontSize: 12,
                      color: "rgba(255,255,255,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 4,
                    }}
                  >
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {data.location}
                  </p>
                </div>

                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    color: "rgba(255,255,255,0.55)",
                    fontStyle: "italic",
                    lineHeight: 1.4,
                  }}
                >
                  "{data.tagline}"
                </p>

                {/* Social links */}
                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  {data.social.map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      onMouseEnter={() => setPressedSocial(s.label)}
                      onMouseLeave={() => setPressedSocial(null)}
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 12,
                        background:
                          pressedSocial === s.label
                            ? "rgba(232,213,251,0.2)"
                            : "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#c9b8e8",
                        textDecoration: "none",
                        transition: "background 0.15s",
                      }}
                    >
                      <SocialIcon icon={s.icon} size={16} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Stats row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 8,
                }}
              >
                {data.stats.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#1e2022",
                      borderRadius: 14,
                      padding: "12px 8px",
                      textAlign: "center",
                      border: "1px solid rgba(255,255,255,0.07)",
                      animationDelay: `${i * 60}ms`,
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: 20,
                        fontWeight: 700,
                        color: "#e8d5fb",
                      }}
                    >
                      {s.value}
                    </p>
                    <p
                      style={{
                        margin: "2px 0 0",
                        fontSize: 9,
                        color: "rgba(255,255,255,0.4)",
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bio */}
              <div
                style={{
                  background: "#1e2022",
                  borderRadius: 16,
                  padding: "14px 15px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
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
                  Bio
                </p>
                {data.bio.map((p, i) => (
                  <p
                    key={i}
                    style={{
                      margin: 0,
                      fontSize: 13,
                      color: "#a9abb4",
                      lineHeight: 1.65,
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* ══ SKILLS ══ */}
          {tab === "Skills" && (
            <div
              key="skills"
              className="tab-content"
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              <p
                style={{
                  margin: "0 0 6px",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#8e9099",
                  textTransform: "uppercase",
                  letterSpacing: 0.9,
                }}
              >
                Tech proficiency
              </p>
              {data.skills.map((skill, i) => (
                <div
                  key={skill.name}
                  style={{
                    background: "#1e2022",
                    borderRadius: 14,
                    padding: "12px 14px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    animationDelay: `${i * 50}ms`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#e3e3e3",
                      }}
                    >
                      {skill.name}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: skill.color,
                      }}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: 6,
                      borderRadius: 6,
                      background: "rgba(255,255,255,0.08)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      className="skill-bar"
                      style={{
                        "--w": `${skill.level}%`,
                        height: "100%",
                        borderRadius: 6,
                        background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})`,
                        animationDelay: `${i * 80}ms`,
                        boxShadow: `0 0 8px ${skill.color}55`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ══ JOURNEY ══ */}
          {tab === "Journey" && (
            <div
              key="journey"
              className="tab-content"
              style={{ display: "flex", flexDirection: "column", gap: 0 }}
            >
              <p
                style={{
                  margin: "0 0 14px",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#8e9099",
                  textTransform: "uppercase",
                  letterSpacing: 0.9,
                }}
              >
                Timeline
              </p>
              {data.timeline.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 12,
                    animationDelay: `${i * 70}ms`,
                  }}
                >
                  {/* Line + dot */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: 20,
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: "#e8d5fb",
                        border: "2px solid #3b1f5e",
                        boxShadow: "0 0 8px rgba(232,213,251,0.5)",
                        flexShrink: 0,
                        marginTop: 4,
                      }}
                    />
                    {i < data.timeline.length - 1 && (
                      <div
                        style={{
                          flex: 1,
                          width: 2,
                          background: "rgba(232,213,251,0.15)",
                          minHeight: 40,
                          margin: "4px 0",
                        }}
                      />
                    )}
                  </div>

                  {/* Card */}
                  <div
                    style={{
                      flex: 1,
                      background: "#1e2022",
                      borderRadius: 14,
                      padding: "11px 13px",
                      marginBottom: 10,
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#e3e3e3",
                          }}
                        >
                          {item.role}
                        </p>
                        <p
                          style={{
                            margin: "2px 0 0",
                            fontSize: 11,
                            color: "#c9b8e8",
                            fontWeight: 500,
                          }}
                        >
                          {item.place}
                        </p>
                      </div>
                      <span
                        style={{
                          background: "rgba(232,213,251,0.1)",
                          border: "1px solid rgba(232,213,251,0.2)",
                          borderRadius: 20,
                          padding: "2px 9px",
                          fontSize: 10,
                          color: "#e8d5fb",
                          fontWeight: 700,
                          flexShrink: 0,
                          marginLeft: 8,
                        }}
                      >
                        {item.year}
                      </span>
                    </div>
                    <p
                      style={{
                        margin: "7px 0 0",
                        fontSize: 12,
                        color: "#8e9099",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ══ INTERESTS ══ */}
          {tab === "Interests" && (
            <div
              key="interests"
              className="tab-content"
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              <p
                style={{
                  margin: "0 0 2px",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#8e9099",
                  textTransform: "uppercase",
                  letterSpacing: 0.9,
                }}
              >
                Things I love
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {data.interests.map((interest, i) => (
                  <span
                    key={interest}
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(232,213,251,0.1), rgba(97,218,251,0.07))",
                      border: "1px solid rgba(232,213,251,0.2)",
                      borderRadius: 20,
                      padding: "7px 15px",
                      fontSize: 13,
                      color: "#d4c4f0",
                      fontWeight: 500,
                      animationDelay: `${i * 40}ms`,
                    }}
                  >
                    {interest}
                  </span>
                ))}
              </div>

              {/* Fun footer */}
              <div
                style={{
                  marginTop: 8,
                  background: "#1e2022",
                  borderRadius: 16,
                  padding: "16px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    color: "rgba(255,255,255,0.35)",
                    fontStyle: "italic",
                    lineHeight: 1.6,
                  }}
                >
                  "Any application that{" "}
                  <span style={{ color: "#e8d5fb" }}>can</span> be written
                  <br />
                  in JavaScript, <span style={{ color: "#61dafb" }}>
                    will
                  </span>{" "}
                  be written in JavaScript."
                </p>
                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.2)",
                  }}
                >
                  — Atwood's Law
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
