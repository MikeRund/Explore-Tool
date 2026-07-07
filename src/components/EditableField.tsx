import { useState } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
};

export default function EditableField({
  value,
  onChange,
  multiline = false,
}: Props) {
  const [editing, setEditing] = useState(false);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter" && !multiline) {
      setEditing(false);
    }
  };

  if (editing) {
    return multiline ? (
      <textarea
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setEditing(false)}
      />
    ) : (
      <input
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => setEditing(false)}
      />
    );
  }

  return <h1 onClick={() => setEditing(true)}>{value}</h1>;
}
