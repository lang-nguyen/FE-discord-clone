export function ProfileInfoBlock({
  title,
  children,
  muted = false,
  onClick,
}) {
  const content = (
    <>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400">{title}</h3>
      <p className={`mt-2 whitespace-pre-wrap ${muted ? "text-gray-400" : "text-gray-300"}`}>
        {children}
      </p>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="-mx-2 block w-[calc(100%+16px)] rounded-md px-2 py-1 text-left transition-colors hover:bg-white/5"
      >
        {content}
      </button>
    );
  }

  return <div>{content}</div>;
}
