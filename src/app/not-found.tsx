import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-svh flex-col justify-center py-32">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 max-w-xl text-5xl">This room hasn’t been finished yet.</h1>
      <p className="mt-5 text-muted">The page you were looking for isn’t here.</p>
      <Button asChild className="mt-10 w-fit">
        <Link href="/">Back to the showroom</Link>
      </Button>
    </section>
  );
}
