import { inquiries } from "@/lib/data/inquiries";
import { AdminFrame } from "@/components/admin/AdminFrame";

const labels = {
  quote: "Quote",
  measurement: "Measurement",
  custom: "Custom",
  visualizer: "Visualizer",
};

export default function AdminInquiriesPage() {
  return (
    <AdminFrame title="Inquiries">
      <p className="mb-8 max-w-lg text-sm text-muted">
        Sample requests. A live version will collect quote, measurement, custom and visualizer leads here.
      </p>
      <ul className="divide-y divide-line">
        {inquiries.map((inquiry) => (
          <li key={inquiry.id} className="py-6">
            <p className="eyebrow">
              {labels[inquiry.type]} · {inquiry.status}
            </p>
            <p className="mt-2 font-serif text-2xl">{inquiry.name}</p>
            <p className="mt-2 text-sm text-muted">{inquiry.summary}</p>
            <p className="mt-2 text-xs text-taupe">
              {inquiry.location} · {inquiry.createdAt}
            </p>
          </li>
        ))}
      </ul>
    </AdminFrame>
  );
}
