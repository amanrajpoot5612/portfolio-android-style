import { useRef, useState, useEffect } from "react";

export default function CameraApp() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [facingMode, setFacingMode] = useState("environment");
  const [photos, setPhotos] = useState([]);
  const [flash, setFlash] = useState(false);
  const [zoom, setZoom] = useState(1);
  const shutterRef = useRef(null);
  const lastDistance = useRef(null);
  <audio ref={shutterRef} src="/sounds/shutter.mp3" preload="auto" />;
  const [focusPoint, setFocusPoint] = useState(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
        },
        audio: false,
      });

      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/png");

    setPhotos((prev) => [image, ...prev]);

    const takePhoto = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");

      ctx.drawImage(video, 0, 0);

      const image = canvas.toDataURL("image/png");

      setPhotos((prev) => [image, ...prev]);

      if (shutterRef.current) {
        shutterRef.current.currentTime = 0;
        shutterRef.current.play();
      }

      triggerFlash();
    };

    triggerFlash();
  };

  const triggerFlash = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 120);
  };

  const switchCamera = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (lastDistance.current) {
        const diff = distance - lastDistance.current;

        setZoom((z) => Math.min(3, Math.max(1, z + diff * 0.005)));
      }

      lastDistance.current = distance;
    }
  };

  const handleFocus = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setFocusPoint({ x, y });

    setTimeout(() => setFocusPoint(null), 800);
  };

  return (
    <div className="relative w-full h-full bg-black flex flex-col">
      {/* Flash Effect */}
      {flash && (
        <div className="absolute inset-0 bg-white opacity-80 z-50 pointer-events-none"></div>
      )}

      {/* Camera Preview */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        onTouchMove={handleTouchMove}
        className="w-full h-full object-cover"
        onClick={handleFocus}
        style={{ transform: `scale(${zoom})` }}
      />
      {focusPoint && (
        <div
          className="absolute border-2 border-yellow-400 rounded-full w-20 h-20 pointer-events-none"
          style={{
            left: focusPoint.x - 40,
            top: focusPoint.y - 40,
          }}
        />
      )}

      <canvas ref={canvasRef} className="hidden" />

      {/* Controls */}
      <div className="absolute bottom-10 w-full flex flex-col items-center gap-4">
        {/* Zoom Slider */}

        <button
          onClick={() => {
            const link = document.createElement("a");
            link.download = "photo.png";
            link.href = photos[0];
            link.click();
          }}
          className="text-white bg-gray-700 px-3 py-2 rounded"
        >
          Save
        </button>
        <input
          type="range"
          min="1"
          max="3"
          step="0.1"
          value={zoom}
          onChange={(e) => setZoom(e.target.value)}
          className="w-1/2"
        />

        <div className="flex items-center gap-10">
          {/* Gallery Preview */}
          <div className="w-12 h-12 bg-gray-800 rounded overflow-hidden">
            {photos[0] && (
              <img src={photos[0]} className="w-full h-full object-cover" />
            )}
          </div>

          {/* Shutter Button */}
          <button
            onClick={takePhoto}
            className="
            w-16 h-16
            rounded-full
            border-4 border-white
            bg-white
            active:scale-90
            transition
            "
          />

          {/* Switch Camera */}
          <button
            onClick={switchCamera}
            className="text-white text-sm bg-gray-700 px-3 py-2 rounded"
          >
            Switch
          </button>
        </div>
      </div>
    </div>
  );
}
