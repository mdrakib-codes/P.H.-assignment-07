import Image from "next/image";

type ProductArtworkProps = {
  image?: string;
  fallback?: string;
  alt: string;
  className?: string;
};

export default function ProductArtwork({
  image,
  fallback,
  alt,
  className = "",
}: ProductArtworkProps) {
  if (image?.startsWith("https://")) {
    return (
      <Image
        src={image}
        alt={alt}
        width={320}
        height={240}
        unoptimized
        className={className}
      />
    );
  }

  const isHttpUrl = image?.startsWith("http://") || image?.startsWith("https://");

  return <span className={className}>{isHttpUrl ? fallback : image || fallback}</span>;
}
