import { useState, useRef, useEffect, useCallback } from "react";

const DEFAULT_ZOOM = 1;

export function useImageEditor({ open, onOpenChange, imageSrc, onApply }) {
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Reset state when dialog opens with new image
  useEffect(() => {
    if (open) {
      setZoom(DEFAULT_ZOOM);
      setPosition({ x: 0, y: 0 });
    }
  }, [open, imageSrc]);

  const handleReset = useCallback(() => {
    setZoom(DEFAULT_ZOOM);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleApply = useCallback(() => {
    if (!imageSrc) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const size = 512;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");

      const container = containerRef.current;
      if (!container) return;

      const containerSize = container.offsetWidth;
      const imgAspect = img.width / img.height;

      // Fit image to cover container
      let baseW, baseH;
      if (imgAspect > 1) {
        baseH = containerSize;
        baseW = containerSize * imgAspect;
      } else {
        baseW = containerSize;
        baseH = containerSize / imgAspect;
      }

      const drawW = baseW * zoom;
      const drawH = baseH * zoom;
      const dx = (containerSize - drawW) / 2 + position.x;
      const dy = (containerSize - drawH) / 2 + position.y;

      // Map to canvas
      const ratio = size / containerSize;
      ctx.drawImage(img, dx * ratio, dy * ratio, drawW * ratio, drawH * ratio);

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          onApply(url);
          onOpenChange(false);
        }
      }, "image/png");
    };
    img.src = imageSrc;
  }, [imageSrc, zoom, position, onApply, onOpenChange]);

  // Drag handlers
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  }, [position]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!dragging) return;
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    },
    [dragging, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [dragging, handleMouseMove, handleMouseUp]);

  return {
    zoom,
    setZoom,
    position,
    containerRef,
    handleReset,
    handleApply,
    handleMouseDown,
  };
}
