import { useState } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  tag?: "h1" | "h2" | "p";
};

export default function EditableField({
  value,
  onChange,
  multiline = false,
  tag = "h1",
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

  if (tag === "h1") {
    return <h1 onClick={() => setEditing(true)}>{value}</h1>;
  } else if (tag === "h2") {
    return <h2 onClick={() => setEditing(true)}>{value}</h2>;
  } else if (tag === "p") {
    return <p onClick={() => setEditing(true)}>{value}</p>;
  }
}
