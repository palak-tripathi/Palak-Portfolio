import React from "react";

interface StickerCutoutProps {
  src: string;
  alt: string;
  size?: number | string;
  rotate?: string;
  float?: boolean;
  className?: string;
  onClick?: () => void;
}

export const StickerCutout: React.FC<StickerCutoutProps> = ({
  src,
  alt,
  size = 80,
  rotate = "0deg",
  float = true,
  className = "",
  onClick,
}) => {
  const sizeStyle = typeof size === "number" ? `${size}px` : size;

  return (
    <div
      onClick={onClick}
      style={{
        width: sizeStyle,
        height: sizeStyle,
        transform: `rotate(${rotate})`,
      }}
      className={`inline-block select-none transition-transform duration-300 hover:scale-110 hover:rotate-0 cursor-pointer ${
        float ? "animate-float" : ""
      } ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.18)]"
        loading="lazy"
        draggable={false}
      />
    </div>
  );
};

export default StickerCutout;
