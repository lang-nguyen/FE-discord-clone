import { Input } from "@/shared/components/ui/Input";

export const ServerNameField = ({ value, onChange }) => {
  return (
    <div className="mb-6">
      <Input
        label="Name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
