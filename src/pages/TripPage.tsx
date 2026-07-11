import HeaderImage from "../components/HeaderImage";
import morroco from "/images/morroco.jpg";
import TripHeader from "../components/TripHeader";
import "../styles/TripPage.css";
import { useState } from "react";
import EditableField from "../components/EditableField";
import TodoComponent from "../components/ToDoComponent";

type Props = {
  imageUrl?: string;
  date?: string;
  title?: string;
  description?: string;
};

function TripPage({
  imageUrl = morroco,
  title = "Where is your next adventure?",
  description = "Full of surf, sea, and sun, this trip is perfect for those looking to catch some waves and enjoy the beach life.",
}: Props) {
  const [descriptionState, setDescriptionState] = useState(description);

  return (
    <div className="container-fluid p-0">
      <HeaderImage imageUrl={imageUrl} />
      <div className="container py-4">
        <TripHeader title={title} date="01/05/2026 - 15/05/2026" />

        <EditableField
          value={descriptionState ?? "Hello"}
          onChange={setDescriptionState}
          multiline={true}
          tag="p"
        />

        <TodoComponent type="Itinerary" />
        <TodoComponent type="Packing List" />
      </div>
    </div>
  );
}

export default TripPage;
