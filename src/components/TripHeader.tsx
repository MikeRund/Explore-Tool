import { useState } from "react";
import EditableField from "./EditableField";

type Props = {
  title: string;
  date: string;
};

export default function TripHeader({ title, date }: Props) {
  const [titleState, setTitleState] = useState(title);
  const [dateState, setDateState] = useState(date);

  return (
    <div className="trip-header">
      <div className="destination">
        <EditableField value={titleState} onChange={setTitleState} />
      </div>

      <div className="date">
        <EditableField value={dateState} onChange={setDateState} />
      </div>
    </div>
  );
}
