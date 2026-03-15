import { useRef, useState, useEffect, useCallback } from "react";

export default function CameraApp() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const shutterRef = useRef(null);
  const lastDistance = useRef(null);

  const [stream, setStream] = useState(null);
  const [facingMode, setFacingMode] = useState("environment");
  const [photos, setPhotos] = useState([]);
  const [flash, setFlash] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [focusPoint, setFocusPoint] = useState(null);
  const [mode, setMode] = useState("PHOTO"); // PHOTO | VIDEO
  const [isRecording, setIsRecording] = useState(false);
  const [photoCount, setPhotoCount] = useState(0);
  const [switching, setSwitching] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const startCamera = useCallback(async () => {
    try {
      if (stream) stream.getTracks().forEach((t) => t.stop());
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      });
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
    } catch (err) {
      console.error("Camera error:", err);
    }
  }, [facingMode]);

  useEffect(() => {
    startCamera();
    return () => stream?.getTracks().forEach((t) => t.stop());
  }, [facingMode]);

  const triggerFlash = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 150);
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const image = canvas.toDataURL("image/jpeg", 0.92);

    setPhotos((prev) => [image, ...prev]);
    setPhotoCount((c) => c + 1);

    if (shutterRef.current) {
      shutterRef.current.currentTime = 0;
      shutterRef.current.play().catch(() => {});
    }
    triggerFlash();
  };

  const switchCamera = async () => {
    setSwitching(true);
    setTimeout(() => setSwitching(false), 400);
    setFacingMode((f) => (f === "environment" ? "user" : "environment"));
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (lastDistance.current) {
        const diff = distance - lastDistance.current;
        setZoom((z) => Math.min(5, Math.max(1, z + diff * 0.005)));
      }
      lastDistance.current = distance;
    }
  };

  const handleTouchEnd = () => {
    lastDistance.current = null;
  };

  const handleFocus = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setFocusPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setFocusPoint(null), 900);
  };

  const savePhoto = (src) => {
    const a = document.createElement("a");
    a.download = `photo_${Date.now()}.jpg`;
    a.href = src;
    a.click();
  };

  const MODES = ["VIDEO", "PHOTO", "PORTRAIT"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600&display=swap');

        @keyframes focusRing {
          0%   { transform: translate(-50%,-50%) scale(1.4); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(1);   opacity: 0; }
        }
        @keyframes shutterPulse {
          0%  { transform: scale(1); }
          40% { transform: scale(0.88); }
          100%{ transform: scale(1); }
        }
        @keyframes switchSpin {
          0%  { transform: rotate(0deg);   opacity: 1; }
          50% { transform: rotate(180deg); opacity: 0.3; }
          100%{ transform: rotate(360deg); opacity: 1; }
        }
        @keyframes gallerySlideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        @keyframes countPop {
          0%  { transform: scale(1.6); opacity: 0.6; }
          100%{ transform: scale(1);   opacity: 1; }
        }
        .shutter-btn:active { animation: shutterPulse 0.25s ease; }
        .switch-spin { animation: switchSpin 0.4s cubic-bezier(0.34,1.1,0.64,1); }
        .focus-ring {
          position: absolute;
          width: 68px; height: 68px;
          border: 2px solid #ffcc02;
          border-radius: 50%;
          pointer-events: none;
          animation: focusRing 0.9s ease forwards;
          transform: translate(-50%, -50%);
        }
        .count-pop { animation: countPop 0.3s ease; }
      `}</style>

      <audio ref={shutterRef} src="/sounds/shutter.mp3" preload="auto" />
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background: "#000",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          fontFamily: "'Google Sans', sans-serif",
          userSelect: "none",
        }}
      >
        {/* ── Flash overlay ── */}
        {flash && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "white",
              opacity: 0.75,
              zIndex: 100,
              pointerEvents: "none",
              transition: "opacity 0.12s",
            }}
          />
        )}

        {/* ── Video feed ── */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            onClick={handleFocus}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${zoom})`,
              transformOrigin: "center",
              opacity: switching ? 0 : 1,
              transition: "opacity 0.2s ease",
              display: "block",
            }}
          />

          {/* Focus ring */}
          {focusPoint && (
            <div
              className="focus-ring"
              style={{ left: focusPoint.x, top: focusPoint.y }}
            />
          )}

          {/* ── Top bar ── */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              padding: "14px 16px 10px",
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Flash toggle placeholder */}
            <button style={topBtnStyle} aria-label="Flash">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#fff"
                opacity="0.85"
              >
                <path d="M7 2v11h3v9l7-12h-4l4-8z" />
              </svg>
            </button>

            {/* Zoom chip */}
            <div
              style={{
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 20,
                padding: "3px 12px",
                fontSize: 13,
                fontWeight: 600,
                color: zoom > 1 ? "#ffcc02" : "#fff",
                letterSpacing: 0.3,
              }}
            >
              {zoom.toFixed(1)}×
            </div>

            {/* Photo count */}
            <div
              style={{
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 20,
                padding: "3px 11px",
                fontSize: 12,
                color: "rgba(255,255,255,0.8)",
                fontWeight: 500,
              }}
            >
              {photoCount > 0 ? (
                <span key={photoCount} className="count-pop">
                  {photoCount} 📷
                </span>
              ) : (
                "0 📷"
              )}
            </div>
          </div>

          {/* ── Zoom pill bar (bottom of viewfinder) ── */}
          <div
            style={{
              position: "absolute",
              bottom: 12,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 4,
            }}
          >
            {[1, 2, 3].map((z) => (
              <button
                key={z}
                onClick={() => setZoom(z)}
                style={{
                  width: 36,
                  height: 28,
                  borderRadius: 14,
                  border: "none",
                  background:
                    Math.round(zoom) === z
                      ? "rgba(255,204,2,0.9)"
                      : "rgba(0,0,0,0.45)",
                  backdropFilter: "blur(6px)",
                  color: Math.round(zoom) === z ? "#000" : "#fff",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {z}×
              </button>
            ))}
          </div>
        </div>

        {/* ── Bottom control panel ── */}
        <div
          style={{
            background: "#0d0d0d",
            paddingBottom: "env(safe-area-inset-bottom, 12px)",
            flexShrink: 0,
          }}
        >
          {/* Mode selector */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 0,
              paddingTop: 10,
              paddingBottom: 4,
            }}
          >
            {MODES.map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 14px",
                  fontSize: 11,
                  fontWeight: mode === m ? 700 : 400,
                  color: mode === m ? "#ffcc02" : "rgba(255,255,255,0.45)",
                  letterSpacing: 0.8,
                  transition: "color 0.15s",
                  textTransform: "uppercase",
                  borderBottom:
                    mode === m ? "2px solid #ffcc02" : "2px solid transparent",
                }}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Main controls row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              padding: "12px 20px 16px",
            }}
          >
            {/* Gallery thumbnail */}
            <button
              onClick={() => photos.length && setGalleryOpen(true)}
              aria-label="Open gallery"
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                overflow: "hidden",
                border: photos[0]
                  ? "2px solid rgba(255,255,255,0.7)"
                  : "2px solid rgba(255,255,255,0.2)",
                background: "#1a1a1a",
                cursor: "pointer",
                flexShrink: 0,
                padding: 0,
              }}
            >
              {photos[0] ? (
                <img
                  src={photos[0]}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  alt="Last photo"
                />
              ) : (
                <span style={{ fontSize: 22 }}>🖼</span>
              )}
            </button>

            {/* Shutter */}
            <button
              className="shutter-btn"
              onClick={takePhoto}
              aria-label="Take photo"
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                border: "3px solid #fff",
                background: "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                padding: 0,
                position: "relative",
              }}
            >
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: "50%",
                  background: "#fff",
                  transition: "transform 0.1s",
                }}
              />
            </button>

            {/* Switch camera */}
            <button
              onClick={switchCamera}
              aria-label="Switch camera"
              className={switching ? "switch-spin" : ""}
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 4v6h6" />
                <path d="M23 20v-6h-6" />
                <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Gallery overlay ── */}
        {galleryOpen && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#000",
              zIndex: 80,
              display: "flex",
              flexDirection: "column",
              animation: "gallerySlideUp 0.3s cubic-bezier(0.34,1.1,0.64,1)",
              fontFamily: "'Google Sans', sans-serif",
            }}
          >
            {/* Gallery header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <button
                onClick={() => setGalleryOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: 14,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                Back
              </button>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
                {photos.length} photos
              </span>
              <button
                onClick={() => savePhoto(photos[galleryIndex])}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ffcc02",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                Save
              </button>
            </div>

            {/* Large preview */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={photos[galleryIndex]}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
                alt={`Photo ${galleryIndex + 1}`}
              />
            </div>

            {/* Thumbnail strip */}
            <div
              style={{
                display: "flex",
                gap: 4,
                padding: "10px 10px 20px",
                overflowX: "auto",
                flexShrink: 0,
              }}
            >
              {photos.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setGalleryIndex(i)}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 10,
                    overflow: "hidden",
                    flexShrink: 0,
                    border:
                      galleryIndex === i
                        ? "2px solid #ffcc02"
                        : "2px solid transparent",
                    padding: 0,
                    cursor: "pointer",
                    background: "none",
                  }}
                >
                  <img
                    src={p}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    alt=""
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const topBtnStyle = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  background: "rgba(0,0,0,0.35)",
  backdropFilter: "blur(6px)",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
