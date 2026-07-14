import EditableField from "./EditableField";

type Props = {
  title: string;
  date: string;
  onTitleChange: (newTitle: string) => void;
  onDateChange: (newDate: string) => void;
};

export default function TripHeader({
  title,
  date,
  onTitleChange,
  onDateChange,
}: Props) {
  return (
    <div className="trip-header">
      <div className="destination">
        <EditableField value={title} onChange={onTitleChange} />
      </div>

      <div className="date">
        <EditableField value={date} onChange={onDateChange} tag="h2" />
      </div>
    </div>
  );
}
