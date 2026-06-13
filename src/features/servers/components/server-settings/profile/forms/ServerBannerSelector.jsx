export const BANNER_COLORS = [
  [
    "linear-gradient(135deg, #4a6741 0%, #6b8f5e 100%)",
    "linear-gradient(135deg, #8b5e6b 0%, #c47a8a 100%)",
    "linear-gradient(135deg, #c94040 0%, #e05555 100%)",
    "linear-gradient(135deg, #d4843e 0%, #e8a04c 100%)",
    "linear-gradient(135deg, #c4b440 0%, #ddd055 100%)",
  ],
  [
    "linear-gradient(135deg, #7b4a8a 0%, #9b6aaa 100%)",
    "linear-gradient(135deg, #2a6bc4 0%, #4488dd 100%)",
    "linear-gradient(135deg, #2a9b9b 0%, #44bbbb 100%)",
    "linear-gradient(135deg, #3aaa55 0%, #55cc77 100%)",
    "linear-gradient(135deg, #555555 0%, #777777 100%)",
  ],
];

export const ServerBannerSelector = ({ selectedBanner, onChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xs font-bold uppercase tracking-wide text-muted-text mb-3">
        Banner
      </h3>
      <div className="flex flex-col gap-2">
        {BANNER_COLORS.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-2">
            {row.map((gradient, colIdx) => {
              const idx = rowIdx * row.length + colIdx;
              return (
                <button
                  key={idx}
                  className={`w-[85px] h-[52px] rounded-lg transition-all ${
                    selectedBanner === idx
                      ? "ring-2 ring-primary-text ring-offset-2 ring-offset-chat-bg scale-105"
                      : "hover:scale-105 hover:ring-1 hover:ring-muted-text"
                  }`}
                  style={{ background: gradient }}
                  onClick={() => onChange(idx)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
