import { useState } from "react";
import GalleryGrid from "./GalleryGrid";
import ProjectViewer from "./ProjectViewer";

export default function Gallery() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <div className="h-full w-full relative p-3 overflow-y-auto">
      <GalleryGrid openProject={setActiveProject} />

      <ProjectViewer
        project={activeProject}
        close={() => setActiveProject(null)}
      />
    </div>
  );
}
