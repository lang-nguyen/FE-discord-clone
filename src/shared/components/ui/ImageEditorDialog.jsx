import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./Dialog";
import { Button } from "./Button";

const DEFAULT_ZOOM = 1;
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.01;

export const ImageEditorDialog = ({ open, onOpenChange, imageSrc, onApply }) => {
  const [zoom, setZoom] = React.useState(DEFAULT_ZOOM);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [dragging, setDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const containerRef = React.useRef(null);

  // Reset state when dialog opens with new image
  React.useEffect(() => {
    if (open) {
      setZoom(DEFAULT_ZOOM);
      setPosition({ x: 0, y: 0 });
    }
  }, [open, imageSrc]);

  const handleReset = () => {
    setZoom(DEFAULT_ZOOM);
    setPosition({ x: 0, y: 0 });
  };

  const handleApply = () => {
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
  };

  // Drag handlers
  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = React.useCallback(
    (e) => {
      if (!dragging) return;
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    },
    [dragging, dragStart]
  );

  const handleMouseUp = React.useCallback(() => {
    setDragging(false);
  }, []);

  React.useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [dragging, handleMouseMove, handleMouseUp]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#313338] border-none max-w-[480px] p-0 gap-0 rounded-xl">
        {/* Header */}
        <DialogHeader className="px-6 pt-5 pb-0">
          <DialogTitle className="text-white text-xl font-semibold">
            Edit Image
          </DialogTitle>
        </DialogHeader>

        {/* Image preview area */}
        <div className="px-6 py-5">
          <div
            ref={containerRef}
            className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#1e1f22] border border-[#3b3d44]/50 cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
          >
            {imageSrc && (
              <img
                src={imageSrc}
                alt="Preview"
                className="absolute top-1/2 left-1/2 pointer-events-none max-w-none"
                style={{
                  transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                  transformOrigin: "center center",
                  minWidth: "100%",
                  minHeight: "100%",
                  objectFit: "cover",
                }}
                draggable={false}
              />
            )}
          </div>
        </div>

        {/* Controls: icons + zoom slider */}
        <div className="px-6 pb-5">
          <div className="flex items-center gap-3">
            {/* Small image icon */}
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>

            {/* Dot */}
            <span className="w-3 h-3 rounded-full bg-gray-500 shrink-0" />

            {/* Slider */}
            <input
              type="range"
              min={MIN_ZOOM}
              max={MAX_ZOOM}
              step={ZOOM_STEP}
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="flex-1 h-1 accent-white bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
            />

            {/* Large image icon */}
            <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>

            {/* Crop icon */}
            <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H7.5m8.25 8.25H21m-3.375-3.375V3.75" />
            </svg>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="px-6 py-4 border-t border-[#3b3d44]/50 !flex !flex-row items-center !justify-between">
          <button
            onClick={handleReset}
            className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Reset
          </button>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white hover:bg-[#404249] rounded-md px-6"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="bg-[#5865f2] hover:bg-[#4752c4] rounded-md px-8"
              onClick={handleApply}
            >
              Apply
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
