import { useState, useRef } from "react";

const ImageZoom = ({ image }: { image: string }) => {
  const [zoom, setZoom] = useState({ x: 0, y: 0, visible: false });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoom({ x, y, visible: true });
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-96 h-96 overflow-hidden border border-gray-300"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setZoom((prev) => ({ ...prev, visible: false }))}
    >
      {/* Main Image */}
      <img src={image} alt="Product" className="w-full h-full object-cover" />
      
      {/* Zoomed Image Overlay */}
      {zoom.visible && (
        <div 
          className="absolute inset-0 bg-no-repeat bg-cover border-2 border-gray-400"
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: `${zoom.x}% ${zoom.y}%`,
            transform: "scale(2)",
            transformOrigin: `${zoom.x}% ${zoom.y}%`,
          }}
        />
      )}
    </div>
  );
};

export default ImageZoom;
