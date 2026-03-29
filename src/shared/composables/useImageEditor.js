import { useState, useRef, useEffect } from "react";

const CONFIG = {
  // Ảnh gốc ban đầu sẽ hiển thị tự động lấp đầy 90% diện tích màn hình chứa nó
  COVER_RATIO: 0.9,
  // Khung Crop mặc định sẽ lấy 90% kích thước của bức ảnh (chiều nhỏ nhất)
  CROP_RATIO: 0.9,
};

export function useImageEditor({ open, imageSrc }) {
  const containerRef = useRef(null);

  const [img, setImg] = useState({ w: 0, h: 0 });
  const [box, setBox] = useState({ w: 0, h: 0 });

  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // 1. Lắng nghe ảnh thay đổi -> Tính kích thước gốc
  useEffect(() => {
    if (!imageSrc) return;
    const i = new Image();
    i.onload = () => setImg({ w: i.width, h: i.height });
    i.src = imageSrc;
  }, [imageSrc]);

  // 2. Lắng nghe màn hình mở -> Tính kích thước khung chứa
  useEffect(() => {
    if (open && containerRef.current) {
      setBox({
        w: containerRef.current.offsetWidth,
        h: containerRef.current.offsetHeight,
      });
    }
  }, [open, imageSrc]);

  // 3. Reset thông số chuẩn ngay khi mở modal
  useEffect(() => {
    if (open) {
      setZoom(1);
      setRotation(0);
      setPos({ x: 0, y: 0 });
    }
  }, [open, imageSrc]);

  // -- TOÁN HỌC TRỌNG TÂM --
  // 4. Kích thước thị giác sau khi xoay
  const isRotated = rotation % 180 !== 0;
  const vW = isRotated ? img.h : img.w;
  const vH = isRotated ? img.w : img.h;

  let scale = 1;
  let cropSize = 240;

  if (vW > 0 && vH > 0 && box.w > 0 && box.h > 0) {
    // Ép bức ảnh chiếm tỷ lệ 90% container (COVER_RATIO) - vừa khít trên chiều nhỏ hơn
    const targetW = box.w * CONFIG.COVER_RATIO;
    const targetH = box.h * CONFIG.COVER_RATIO;
    scale = Math.max(targetW / vW, targetH / vH);

    const baseUI_W = vW * scale;
    const baseUI_H = vH * scale;

    // Khung crop luôn bằng 90% bức ảnh ban đầu (CROP_RATIO)
    cropSize = Math.floor(Math.min(baseUI_W, baseUI_H) * CONFIG.CROP_RATIO);
  }

  // 5. Tính kích thước DOM thực tế cho <img>
  const drawW = img.w * scale * zoom;
  const drawH = img.h * scale * zoom;

  // 6. Tính kích thước UI trên màn hình để kiểm tra viền chạm (Constraint Boundaries)
  const uiW = vW * scale * zoom;
  const uiH = vH * scale * zoom;

  const maxX = Math.max(0, (uiW - cropSize) / 2);
  const maxY = Math.max(0, (uiH - cropSize) / 2);

  const clamp = (x, y) => ({
    x: Math.max(-maxX, Math.min(maxX, x)),
    y: Math.max(-maxY, Math.min(maxY, y)),
  });

  const safePos = clamp(pos.x, pos.y);

  // -- CÁC HÀM XỬ LÝ KÉO DI CHUYỂN --
  const startRef = useRef(null);

  const onPointerDown = (e) => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      y: e.clientY,
      startX: safePos.x,
      startY: safePos.y,
    };
    e.target.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!startRef.current) return;
    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;
    setPos(clamp(startRef.current.startX + dx, startRef.current.startY + dy));
  };

  const onPointerUp = () => {
    startRef.current = null;
  };

  // -- XỬ LÝ XUẤT ẢNH --
  const handleApply = (onApplyCallback, onOpenChangeCallback) => {
    if (!imageSrc) return;

    const i = new Image();
    i.onload = () => {
      const canvas = document.createElement("canvas");
      const size = 512;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");

      const ratio = size / cropSize;

      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.translate(-safePos.x * ratio, -safePos.y * ratio);
      ctx.rotate((rotation * Math.PI) / 180);

      const finalW = i.width * scale * zoom * ratio;
      const finalH = i.height * scale * zoom * ratio;
      ctx.drawImage(i, -finalW / 2, -finalH / 2, finalW, finalH);
      ctx.restore();

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "avatar.png", { type: "image/png" });
          onApplyCallback(file);
          onOpenChangeCallback(false);
        }
      }, "image/png");
    };
    i.src = imageSrc;
  };

  return {
    containerRef,
    zoom,
    setZoom,
    rotation,
    handleRotate: () => setRotation((r) => (r + 90) % 360),
    handleReset: () => {
      setZoom(1);
      setRotation(0);
      setPos({ x: 0, y: 0 });
    },
    pos: safePos,
    drawW,
    drawH,
    cropSize,
    scale,
    handleApply,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
}
