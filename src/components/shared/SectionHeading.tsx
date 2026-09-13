import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  light,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow mb-5", light && "text-ivory/60")}>{eyebrow}</p>
      ) : null}
      <h2
        className={cn(
          "text-[2.35rem] leading-[1.05] sm:text-5xl lg:text-[3.6rem]",
          light ? "text-ivory" : "text-charcoal",
        )}
      >
        {title}
      </h2>
      {copy ? (
        <p
          className={cn(
            "mt-5 max-w-md text-base leading-relaxed sm:text-lg",
            light ? "text-ivory/72" : "text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {copy}
        </p>
      ) : null}
    </div>
  );
}
