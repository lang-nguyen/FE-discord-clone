export const ServerDescriptionField = ({ value, onChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xs font-bold uppercase tracking-wide text-muted-text mb-1">
        Description
      </h3>
      <p className="text-xs text-muted-text/70 mb-3">
        How did your server get started? Why should people join?
      </p>
      <textarea
        className="w-full min-h-[100px] rounded-md bg-input-bg px-3 py-2 text-sm text-primary-text placeholder:text-muted-text/50 focus:outline-none focus:ring-1 focus:ring-[#5865f2] resize-y transition-colors border border-transparent"
        placeholder="Tell the world a bit about this server."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
