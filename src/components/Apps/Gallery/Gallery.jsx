import { useState } from "react";
import GalleryGrid from "./GalleryGrid";
import ProjectViewer from "./ProjectViewer";

export default function Gallery() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "'Google Sans', 'Roboto', sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 16px 8px",
          flexShrink: 0,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <p style={{ margin: 0, fontSize: 22, fontWeight: 600, color: "#e3e3e3", letterSpacing: -0.3 }}>
          Projects
        </p>
        <p style={{ margin: "2px 0 0", fontSize: 12, color: "#8e9099" }}>
          Tap a project to explore
        </p>
      </div>

      <GalleryGrid openProject={setActiveProject} />

      <ProjectViewer
        project={activeProject}
        close={() => setActiveProject(null)}
      />
    </div>
  );
}