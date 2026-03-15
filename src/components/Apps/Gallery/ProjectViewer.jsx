export default function ProjectViewer({ project, close }) {
  if (!project) return null;

  return (
    <div className="absolute inset-0 bg-black z-50 p-5 overflow-y-auto">
      <button onClick={close} className="mb-5 text-white">
        Back
      </button>

      <img src={project.image} className="w-full rounded-xl mb-4" />

      <h2 className="text-2xl font-bold text-white">{project.title}</h2>

      <p className="text-gray-400 mt-2">{project.description}</p>

      <div className="flex gap-2 mt-4 flex-wrap">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 bg-neutral-800 rounded-md text-sm"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <a href={project.github} className="text-blue-400">
          GitHub
        </a>
        <a href={project.live} className="text-green-400">
          Live
        </a>
      </div>
    </div>
  );
}
