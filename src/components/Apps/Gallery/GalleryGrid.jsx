import { projects } from "../../../assets/data/projects.js";

export default function GalleryGrid({ openProject }) {
  return (
    // <div className="grid grid-cols-1   gap-[2px] h-full w-full">
    //   {projects.map((project) => (
    //     <div
    //       key={project.id}
    //       className="aspect-square overflow-hidden cursor-pointer"
    //       onClick={() => openProject(project)}
    //     >
    //       <img
    //         src={project.image}
    //         className="w-full h-full object-cover opacity-70"
    //       />
    //     </div>
    //   ))}
    // </div>
    // <div className="grid grid-cols-1 gap-2 h-full w-full p-1">
    //   {projects.map((project) => (
    //     <div
    //       key={project.id}
    //       onClick={() => openProject(project)}
    //       className="aspect-square cursor-pointer overflow-hidden rounded-lg border border-neutral-700 bg-neutral-900 hover:border-neutral-500 transition"
    //     >
    //       <img
    //         src={project.image}
    //         className="w-full h-full object-cover opacity-80 hover:opacity-100 transition"
    //         alt={project.title}
    //       />
    //     </div>
    //   ))}
    // </div>
    // <div className="grid grid-cols-1 gap-3 h-full w-full p-2">
    //   {projects.map((project) => (
    //     <div
    //       key={project.id}
    //       onClick={() => openProject(project)}
    //       className="aspect-square relative overflow-hidden rounded-xl border border-neutral-700 bg-neutral-900 cursor-pointer hover:border-neutral-500 transition group"
    //     >
    //       <img
    //         src={project.image}
    //         alt={project.title}
    //         className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
    //       />

    //       {/* bottom overlay */}
    //       <div className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-sm px-2 py-1">
    //         <p className="text-xs font-semibold text-white leading-tight">
    //           {project.title}
    //         </p>

    //         <p className="text-[10px] text-neutral-300">{project.category}</p>
    //       </div>
    //     </div>
    //   ))}
    // </div>
    <div className="grid grid-cols-1 gap-3 w-full p-2 overflow-y-auto h-full">
      {projects.map((project) => (
        <div
          key={project.id}
          onClick={() => openProject(project)}
          className="aspect-square relative overflow-hidden rounded-xl border border-neutral-700 bg-neutral-900 cursor-pointer hover:border-neutral-500 transition group"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
          />

          {/* bottom overlay */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent px-2 py-1">
            <p className="text-xs font-semibold text-white leading-tight">
              {project.title}
            </p>

            <p className="text-[10px] text-neutral-300">{project.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
