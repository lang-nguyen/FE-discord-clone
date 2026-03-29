import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./Dialog";
import { Button } from "./Button";

import { useImageEditor } from "../../composables/useImageEditor";

export const ImageEditorDialog = ({ open, onOpenChange, imageSrc, onApply }) => {
  const {
    containerRef,
    zoom,
    setZoom,
    rotation,
    handleRotate,
    pos,
    drawW,
    drawH,
    cropSize,
    scale,
    handleReset,
    handleApply,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  } = useImageEditor({ open, imageSrc });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-[#313338] border-none max-w-[480px] p-0 gap-0 rounded-[12px] overflow-hidden outline-none"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {/* HEADER */}
        <DialogHeader className="px-6 pt-5 pb-0">
          <DialogTitle className="text-white text-xl font-bold">
            Edit Image
          </DialogTitle>
        </DialogHeader>

        {/* DRAG AREA (Container > Image > Crop Frame) */}
        <div className="px-6 py-5">
          <div
            ref={containerRef}
            className="relative w-full h-[320px] rounded-lg overflow-hidden bg-[#111214] select-none touch-none"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={onPointerUp}
            style={{ cursor: "grab" }}
          >
            {/* Lớp Hình Ảnh (Nằm Ớ Giữa) */}
            {imageSrc && drawW > 0 && (
              <div
                className="absolute top-1/2 left-1/2 pointer-events-none"
                style={{ transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))` }}
              >
                <img
                  src={imageSrc}
                  alt="Preview"
                  className="absolute top-1/2 left-1/2 pointer-events-none max-w-none shadow-xl"
                  style={{
                    width: `${drawW}px`,
                    height: `${drawH}px`,
                    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                  }}
                  draggable={false}
                />
              </div>
            )}

            {/* Lớp Crop Frame (Vùng Cắt Cố Định - Static & Fixed Focus Center) */}
            {cropSize > 0 && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div
                  className="rounded-xl border-2 border-white/60 shrink-0 relative"
                  style={{
                    width: `${cropSize}px`,
                    height: `${cropSize}px`,
                    boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.65)",
                  }}
                >
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CONTROLS AREA */}
        <div className="px-6 pb-5">
          <div className="flex items-center justify-between gap-3">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-400 shrink-0" fill="currentColor">
              <path d="M21 19V5C21 3.89 20.1 3 19 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" />
            </svg>

            <span className="w-2 h-2 rounded-full bg-gray-500 shrink-0" />

            <input
              type="range"
              min={1}
              max={4}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="flex-1 h-1.5 bg-[#4e5058] rounded-full appearance-none cursor-grab active:cursor-grabbing hover:bg-[#5c5f66] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />

            <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-400 shrink-0" fill="currentColor">
              <path d="M21 19V5C21 3.89 20.1 3 19 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" />
            </svg>

            <button
              onClick={handleRotate}
              className="w-5 h-5 ml-2 text-gray-300 hover:text-white transition-colors flex items-center justify-center shrink-0"
              aria-label="Rotate Image"
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <DialogFooter className="bg-[#2b2d31] px-6 py-4 flex items-center justify-between sm:justify-between w-full h-[72px]">
          <button
            onClick={handleReset}
            className="text-sm text-[#00a8fc] hover:underline font-medium"
          >
            Reset
          </button>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-white hover:underline focus:ring-0 active:translate-y-0"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-8 transition-colors active:translate-y-px"
              onClick={() => handleApply(onApply, onOpenChange)}
            >
              Apply
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
