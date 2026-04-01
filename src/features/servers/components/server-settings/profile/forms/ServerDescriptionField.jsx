export const ServerDescriptionField = ({ value, onChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xs font-bold uppercase tracking-wide text-gray-300 mb-1">
        Description
      </h3>
      <p className="text-xs text-gray-500 mb-3">
        How did your server get started? Why should people join?
      </p>
      <textarea
        className="w-full min-h-[100px] rounded-md bg-[#1e1f22] px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-[#5865f2] resize-y transition-colors border border-transparent"
        placeholder="Tell the world a bit about this server."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
