import { Document, Page, pdfjs } from "react-pdf";
import { useState, useRef } from "react";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import ResumePdf from "../../assets/resume/resume.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

function Resume() {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [shareToast, setShareToast] = useState(false);
  const containerRef = useRef(null);

  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const shareResume = async () => {
    const url = window.location.origin + ResumePdf;
    if (navigator.share) {
      await navigator.share({
        title: "My Resume",
        text: "Check out my resume",
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2500);
    }
  };

  const zoomIn = () => setScale((s) => Math.min(s + 0.2, 2.5));
  const zoomOut = () => setScale((s) => Math.max(s - 0.2, 0.5));

  return (
    <section
      className="absolute inset-0 flex flex-col"
      style={{
        background: "#1a1c1e",
        fontFamily: "'Google Sans', 'Roboto', sans-serif",
      }}
      role="main"
      aria-label="Resume viewer"
    >
      {/* ── Top App Bar ── */}
      <header
        style={{
          background: "#1a1c1e",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "0 8px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          zIndex: 10,
        }}
      >
        {/* Left: back + title */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <button
            aria-label="Go back"
            style={iconBtnStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <svg
              width="24"
              height="24"
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
          <div>
            <p
              style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 500,
                color: "#e3e3e3",
                letterSpacing: 0.1,
              }}
            >
              Resume
            </p>
            {numPages && (
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  color: "#8e9099",
                  lineHeight: 1,
                }}
              >
                Page {currentPage} of {numPages}
              </p>
            )}
          </div>
        </div>
        {/* Right: actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <button
            onClick={shareResume}
            aria-label="Share resume"
            style={iconBtnStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#c7c6d0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
            </svg>
          </button>

          <a
            href={ResumePdf}
            download="resume.pdf"
            aria-label="Download resume"
            style={{
              ...iconBtnStyle,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#c7c6d0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
        </div>
      </header>
      {/* ── PDF Scroll Area ── */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "auto",
          background: "#2b2d30",
          padding: "16px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          scrollBehavior: "smooth",
        }}
        role="region"
        aria-label="PDF pages"
      >
        <Document
          file={ResumePdf}
          onLoadSuccess={onLoadSuccess}
          loading={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: 300,
                gap: 16,
              }}
            >
              <div style={spinnerStyle} aria-hidden="true" />
              <p style={{ color: "#8e9099", fontSize: 14, margin: 0 }}>
                Loading Resume…
              </p>
            </div>
          }
          error={
            <div
              style={{
                color: "#f28b82",
                padding: 24,
                textAlign: "center",
                fontSize: 14,
              }}
            >
              Failed to load resume. Please try downloading it instead.
            </div>
          }
        >
          {numPages &&
            Array.from({ length: numPages }, (_, i) => (
              <div
                key={i + 1}
                style={{
                  boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
                  borderRadius: 4,
                  overflow: "hidden",
                  background: "#fff",
                }}
              >
                <Page
                  pageNumber={i + 1}
                  scale={scale}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  onRenderSuccess={() => {
                    if (i === 0) setCurrentPage(1);
                  }}
                />
              </div>
            ))}
        </Document>
      </div>
      {/* ── Zoom FAB cluster (bottom-right) ── */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          right: 16,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          zIndex: 20,
        }}
        role="group"
        aria-label="Zoom controls"
      >
        <button
          onClick={zoomIn}
          aria-label="Zoom in"
          style={fabStyle}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#d8c4f8")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#e8d5fb")}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3b1f5e"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button
          onClick={zoomOut}
          aria-label="Zoom out"
          style={fabStyle}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#d8c4f8")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#e8d5fb")}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3b1f5e"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>

        {/* Zoom indicator chip */}
        <div
          style={{
            background: "rgba(232,213,251,0.15)",
            border: "1px solid rgba(232,213,251,0.25)",
            borderRadius: 20,
            padding: "4px 10px",
            textAlign: "center",
            fontSize: 11,
            color: "#e8d5fb",
            fontWeight: 600,
            backdropFilter: "blur(8px)",
          }}
          aria-live="polite"
          aria-label={`Zoom level ${Math.round(scale * 100)} percent`}
        >
          {Math.round(scale * 100)}%
        </div>
      </div>
      {/* ── Share Toast (Snackbar) ── */}
      <div
        role="status"
        aria-live="polite"
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: `translateX(-50%) translateY(${shareToast ? "0" : "80px"})`,
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          background: "#e8d5fb",
          color: "#3b1f5e",
          borderRadius: 28,
          padding: "10px 20px",
          fontSize: 13,
          fontWeight: 600,
          boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
          whiteSpace: "nowrap",
          zIndex: 30,
          pointerEvents: "none",
        }}
      >
        ✓ Link copied to clipboard
      </div>
    </section>
  );
}

// ── Shared style objects ──
const iconBtnStyle = {
  width: 44,
  height: 44,
  borderRadius: 22,
  border: "none",
  background: "transparent",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 0.15s ease",
};

const fabStyle = {
  width: 44,
  height: 44,
  borderRadius: 16,
  border: "none",
  background: "#e8d5fb",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
  transition: "background 0.15s ease, transform 0.1s ease",
};

const spinnerStyle = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  border: "3px solid rgba(232,213,251,0.2)",
  borderTopColor: "#e8d5fb",
  animation: "spin 0.9s linear infinite",
};

// Inject keyframes once
if (
  typeof document !== "undefined" &&
  !document.getElementById("resume-spin")
) {
  const s = document.createElement("style");
  s.id = "resume-spin";
  s.textContent = "@keyframes spin { to { transform: rotate(360deg); } }";
  document.head.appendChild(s);
}

export default Resume;
