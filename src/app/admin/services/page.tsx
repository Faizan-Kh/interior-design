import { getVisibleServices } from "@/lib/data/services";
import { AdminFrame } from "@/components/admin/AdminFrame";

export default function AdminServicesPage() {
  return (
    <AdminFrame title="Services">
      <p className="mb-8 max-w-lg text-sm text-muted">
        Categories can be added, renamed or hidden without changing the website’s structure.
      </p>
      <ol className="space-y-4">
        {getVisibleServices().map((service) => (
          <li key={service.slug} className="border-b border-line pb-4">
            <p className="font-serif text-2xl">{service.name}</p>
            <p className="mt-1 text-sm text-muted">{service.short}</p>
          </li>
        ))}
      </ol>
    </AdminFrame>
  );
}
