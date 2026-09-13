import { cn } from "@/lib/utils";

export function PageIntro({
  eyebrow,
  title,
  copy,
  className,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  className?: string;
}) {
  return (
    <header className={cn("container-page pt-36 pb-16", className)}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] sm:text-6xl">{title}</h1>
      {copy ? <p className="mt-6 max-w-lg text-lg text-muted">{copy}</p> : null}
    </header>
  );
}
