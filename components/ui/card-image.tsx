"use client";

import Image from "next/image";

interface CardImageProps {
  src: string;
  alt: string;
  sizes?: string;
  overlayClassName?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
}

export function CardImage({ 
  src, 
  alt, 
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw", 
  overlayClassName = "bg-black/40",
  priority = false,
  loading = "lazy"
}: CardImageProps) {
  return (
    <div className="absolute inset-0">
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        quality={75}
        priority={priority}
        loading={loading}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
      />
      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  );
}


