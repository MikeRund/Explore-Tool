import HeaderImage from "../components/HeaderImage";
import morroco from "/images/morroco.jpg";
import TripHeader from "../components/TripHeader";
import "../styles/TripPage.css";
import { useEffect, useState } from "react";
import EditableField from "../components/EditableField";
import TodoComponent from "../components/ToDoComponent";
import { useParams } from "react-router-dom";
import type { RootState } from "../state/store";
import { useSelector } from "react-redux";
import type { Trip } from "../api/tripApi";

// type Props = {
//   imageUrl?: string;
//   date?: string;
//   title?: string;
//   description?: string;
// };

function TripPage() {
  const { id } = useParams();
  const trip = useSelector((state: RootState) =>
    state.trip.trips.find((trip) => trip.id === id),
  );
  const [editedTrip, setEditedTrip] = useState<Trip>();
  useEffect(() => {
    if (trip) {
      setEditedTrip(trip);
    }
  }, [trip]);
  console.log("TripPage id:", id);
  console.log("TripPage trip:", trip);
  console.log("TripPage trip items:", trip?.itineraryItems);

  return (
    <div className="container-fluid p-0">
      <HeaderImage imageUrl={trip?.image ?? morroco} />
      <div className="container py-4">
        <TripHeader
          title={trip?.title ?? "Where is your next adventure?"}
          date="01/05/2026 - 15/05/2026"
        />

        <EditableField
          value={editedTrip?.description ?? "Hello"}
          onChange={(newDescription) =>
            setEditedTrip((prev) =>
              prev ? { ...prev, description: newDescription } : prev,
            )
          }
          multiline={true}
          tag="p"
        />

        <TodoComponent type="Itinerary" todos={editedTrip?.itineraryItems} />
        <TodoComponent type="Packing List" todos={editedTrip?.packingList} />
        <div className="d-flex justify-content-center mt-3">
          <button
            className="button-56"
            onClick={() =>
              alert("Save Changes functionality not implemented yet")
            }
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default TripPage;
