import { projects } from "@/lib/data/projects";
import { AdminFrame } from "@/components/admin/AdminFrame";

export default function AdminProjectsPage() {
  return (
    <AdminFrame title="Projects">
      <p className="mb-8 max-w-lg text-sm text-muted">
        Completed work the customer sees. Replace placeholder photography with the workshop’s own photos.
      </p>
      <ul className="divide-y divide-line">
        {projects.map((project) => (
          <li key={project.slug} className="flex flex-col gap-1 py-5 sm:flex-row sm:justify-between">
            <span>{project.name}</span>
            <span className="text-sm text-muted">
              {project.room} · {project.location}
            </span>
          </li>
        ))}
      </ul>
    </AdminFrame>
  );
}
