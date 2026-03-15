import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useNavigate } from "react-router-dom";

import cameraImg from "../assets/apps/native-apps/Camera.png";
import filesImg from "../assets/apps/native-apps/MyFiles.png";
import galleryImg from "../assets/apps/native-apps/Gallery.png";
import pdfImg from "../assets/apps/native-apps/WriteonPDF.png";
import gmailImg from "../assets/apps/native-apps/Email.png";
import chromeImg from "../assets/apps/google/Chrome.png";
import githubImg from "../assets/apps/socials/github.png";
import instagramImg from "../assets/apps/socials/instagram.png";
import linkedinImg from "../assets/apps/socials/linkedin.png";
import meetImg from "../assets/apps/google/meet.png";
import mapsImg from "../assets/apps/google/maps.png";
import twitterImg from "../assets/apps/socials/twitter.png";

// ─────────────────────────────────────────────
// App definitions — set path OR externalUrl
// ─────────────────────────────────────────────
const SLIDES = [
  [
    { name: "Camera", icon: cameraImg, path: "camera" },
    { name: "Projects", icon: filesImg, path: "gallery" },
    { name: "Gallery", icon: galleryImg, path: "gallery" },
    { name: "About", icon: chromeImg, path: "chrome" },
    { name: "Resume", icon: pdfImg, path: "resume" },
    { name: "Contact", icon: gmailImg, path: "contact" },
  ],
  [
    {
      name: "GitHub",
      icon: githubImg,
      externalUrl: "https://github.com",
      popup: {
        label: "GitHub",
        desc: "View my repos & contributions",
        accent: "#e8d5fb",
        gradient: "linear-gradient(135deg,#161b22,#0d1117)",
        actions: [
          { label: "Open Profile", primary: true },
          { label: "Copy Link" },
        ],
      },
    },
    {
      name: "Instagram",
      icon: instagramImg,
      externalUrl: "https://instagram.com",
      popup: {
        label: "Instagram",
        desc: "Follow me for photos & updates",
        accent: "#fd1d1d",
        gradient: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)",
        actions: [
          { label: "Open Instagram", primary: true },
          { label: "Copy Handle" },
        ],
      },
    },
    {
      name: "LinkedIn",
      icon: linkedinImg,
      externalUrl: "https://linkedin.com",
      popup: {
        label: "LinkedIn",
        desc: "Connect with me professionally",
        accent: "#0a66c2",
        gradient: "linear-gradient(135deg,#0a66c2,#004182)",
        actions: [
          { label: "View Profile", primary: true },
          { label: "Copy Link" },
        ],
      },
    },
    {
      name: "Meet",
      icon: meetImg,
      externalUrl: "https://meet.google.com",
      popup: {
        label: "Google Meet",
        desc: "Schedule a quick call with me",
        accent: "#00897b",
        gradient: "linear-gradient(135deg,#00897b,#004d40)",
        actions: [{ label: "Start Meeting", primary: true }],
      },
    },
    {
      name: "Maps",
      icon: mapsImg,
      externalUrl: "https://maps.google.com",
      popup: {
        label: "Google Maps",
        desc: "Find me in San Francisco, CA",
        accent: "#ea4335",
        gradient: "linear-gradient(135deg,#ea4335,#a50e0e)",
        actions: [{ label: "Open Maps", primary: true }],
      },
    },
    {
      name: "X",
      icon: twitterImg,
      externalUrl: "https://x.com",
      popup: {
        label: "X (Twitter)",
        desc: "Follow my dev journey & thoughts",
        accent: "#fff",
        gradient: "linear-gradient(135deg,#000,#1a1a2e)",
        actions: [{ label: "Open X", primary: true }, { label: "Copy Handle" }],
      },
    },
  ],
];

// ─────────────────────────────────────────────
// One UI popup component
// ─────────────────────────────────────────────
function OneUIPopup({ app, anchorRect, onClose }) {
  const [show, setShow] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => setShow(true));
    const handler = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 220);
  };

  const handleAction = (action) => {
    if (action.label.toLowerCase().includes("copy")) {
      navigator.clipboard.writeText(app.externalUrl || "").catch(() => {});
    } else {
      window.open(app.externalUrl, "_blank", "noopener,noreferrer");
    }
    handleClose();
  };

  const p = app.popup;

  // Figure out popup position: prefer below icon, flip up near bottom
  const viewH = window.innerHeight;
  const popupH = 200;
  const spaceBelow = anchorRect ? viewH - anchorRect.bottom : 200;
  const placeAbove = spaceBelow < popupH + 20;

  const popupLeft = anchorRect
    ? Math.min(Math.max(anchorRect.left - 20, 8), window.innerWidth - 188)
    : 40;

  const popupTop = anchorRect
    ? placeAbove
      ? anchorRect.top - popupH - 8
      : anchorRect.bottom + 8
    : 100;

  return (
    <>
      {/* Scrim */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "rgba(0,0,0,0.35)",
          opacity: show ? 1 : 0,
          transition: "opacity 0.2s ease",
          backdropFilter: show ? "blur(2px)" : "none",
        }}
      />

      {/* Popup bubble — Samsung One UI style */}
      <div
        ref={popupRef}
        role="dialog"
        aria-label={`${p.label} options`}
        style={{
          position: "fixed",
          left: popupLeft,
          top: popupTop,
          width: 180,
          zIndex: 201,
          background: "rgba(30,30,36,0.97)",
          borderRadius: 20,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.06) inset",
          transform: show
            ? "scale(1) translateY(0)"
            : "scale(0.82) translateY(placeAbove ? 10px : -10px)",
          transformOrigin: placeAbove ? "bottom left" : "top left",
          opacity: show ? 1 : 0,
          transition:
            "transform 0.22s cubic-bezier(0.34,1.2,0.64,1), opacity 0.18s ease",
        }}
      >
        {/* Gradient header */}
        <div
          style={{
            background: p.gradient,
            padding: "13px 14px 11px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Gloss */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 11,
              overflow: "hidden",
              flexShrink: 0,
              border: "1.5px solid rgba(255,255,255,0.2)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            <img
              src={app.icon}
              alt={app.name}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.2,
              }}
            >
              {p.label}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 10,
                color: "rgba(255,255,255,0.65)",
                marginTop: 1,
              }}
            >
              {p.desc}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />

        {/* Actions */}
        <div style={{ padding: "4px 0" }}>
          {p.actions.map((action, i) => (
            <button
              key={i}
              onClick={() => handleAction(action)}
              style={{
                width: "100%",
                padding: "10px 14px",
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 10,
                textAlign: "left",
                transition: "background 0.1s",
                borderRadius: 0,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
              onMouseDown={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.12)")
              }
            >
              {/* Dot indicator for primary */}
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: action.primary
                    ? p.accent === "#fff"
                      ? "#e8e8e8"
                      : p.accent
                    : "rgba(255,255,255,0.2)",
                  boxShadow: action.primary
                    ? `0 0 6px ${p.accent === "#fff" ? "#aaa" : p.accent}88`
                    : "none",
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: action.primary ? 600 : 400,
                  color: action.primary ? "#fff" : "rgba(255,255,255,0.6)",
                  fontFamily: "'Google Sans', sans-serif",
                }}
              >
                {action.label}
              </span>
            </button>
          ))}

          {/* Cancel */}
          <div
            style={{
              height: 1,
              background: "rgba(255,255,255,0.06)",
              margin: "2px 0",
            }}
          />
          <button
            onClick={handleClose}
            style={{
              width: "100%",
              padding: "10px 14px",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 10,
              transition: "background 0.1s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "rgba(255,80,80,0.5)",
              }}
            />
            <span
              style={{
                fontSize: 13,
                color: "rgba(255,120,120,0.85)",
                fontFamily: "'Google Sans', sans-serif",
              }}
            >
              Cancel
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────
// App icon
// ─────────────────────────────────────────────
function AppIcon({ app, onOpenPopup, navigate }) {
  const iconRef = useRef(null);
  const [pressed, setPressed] = useState(false);

  const handleTap = () => {
    if (app.popup) {
      const rect = iconRef.current?.getBoundingClientRect() ?? null;
      onOpenPopup(app, rect);
    } else if (app.path) {
      navigate(`/${app.path}`);
    }
  };

  return (
    <div
      ref={iconRef}
      onClick={handleTap}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => {
        setPressed(false);
        handleTap();
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <div
        style={{
          padding: 6,
          borderRadius: 18,
          background: pressed ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.22)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          transform: pressed ? "scale(0.90)" : "scale(1)",
          transition:
            "transform 0.12s cubic-bezier(0.34,1.2,0.64,1), background 0.1s",
          boxShadow: pressed ? "none" : "0 2px 10px rgba(0,0,0,0.25)",
        }}
      >
        <img
          src={app.icon}
          alt={app.name}
          draggable={false}
          style={{
            width: 44,
            height: 44,
            objectFit: "contain",
            display: "block",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
          }}
        />
      </div>
      <span
        style={{
          fontSize: 10,
          color: "#fff",
          textShadow: "0 1px 3px rgba(0,0,0,0.8)",
          fontFamily: "'Google Sans', 'Roboto', sans-serif",
          fontWeight: 500,
          letterSpacing: 0.1,
          lineHeight: 1,
          maxWidth: 56,
          textAlign: "center",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {app.name}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────
// Slider
// ─────────────────────────────────────────────
const Slider = ({ className }) => {
  const navigate = useNavigate();
  const [activePopup, setActivePopup] = useState(null); // { app, rect }

  const openPopup = (app, rect) => setActivePopup({ app, rect });
  const closePopup = () => setActivePopup(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&display=swap');
      `}</style>

      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        className={className}
        // Prevent swipe from firing while popup is open
        allowTouchMove={!activePopup}
      >
        {SLIDES.map((apps, slideIndex) => (
          <SwiperSlide key={slideIndex}>
            <div
              style={{
                height: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gridTemplateRows: "repeat(7, 1fr)",
                gap: 8,
                padding: 10,
              }}
            >
              {Array.from({ length: 35 }).map((_, i) => {
                const app = apps[i];
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {app && (
                      <AppIcon
                        app={app}
                        navigate={navigate}
                        onOpenPopup={openPopup}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Portal-like popup — rendered outside Swiper so it overlays everything */}
      {activePopup && (
        <OneUIPopup
          app={activePopup.app}
          anchorRect={activePopup.rect}
          onClose={closePopup}
        />  
      )}
    </>
  );
};

export default Slider;
