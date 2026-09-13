import Image from "next/image";
import { cn } from "@/lib/utils";

type CoverImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function CoverImage({
  src,
  alt,
  className,
  priority,
  sizes = "(max-width: 768px) 100vw, 80vw",
}: CoverImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={cn("img-cover", className)}
    />
  );
}
