import { catalogItems } from "@/lib/data/catalog";
import { AdminFrame } from "@/components/admin/AdminFrame";

export default function AdminShowroomPage() {
  return (
    <AdminFrame title="Showroom">
      <p className="mb-8 max-w-lg text-sm text-muted">
        Add, hide or reorder items here in a later version. This list is the catalog the website already reads.
      </p>
      <table className="w-full text-left text-sm">
        <thead className="border-b border-line text-[0.68rem] tracking-[0.14em] uppercase text-taupe">
          <tr>
            <th className="py-3 font-medium">Name</th>
            <th className="py-3 font-medium">Type</th>
            <th className="py-3 font-medium">Visible</th>
            <th className="py-3 font-medium">Price</th>
          </tr>
        </thead>
        <tbody>
          {catalogItems.map((item) => (
            <tr key={item.slug} className="border-b border-line/70">
              <td className="py-4">{item.name}</td>
              <td className="py-4 text-muted">{item.kind}</td>
              <td className="py-4">{item.visible ? "Yes" : "Hidden"}</td>
              <td className="py-4 text-muted">{item.pricingLabel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminFrame>
  );
}
