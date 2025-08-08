"use client";

import Image from "next/image";

interface CardImageProps {
  src: string;
  alt: string;
  sizes?: string;
  overlayClassName?: string;
}

export function CardImage({ src, alt, sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw", overlayClassName = "bg-black/40" }: CardImageProps) {
  return (
    <div className="absolute inset-0">
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        unoptimized
        priority={false}
      />
      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  );
}


