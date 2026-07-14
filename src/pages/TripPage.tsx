import HeaderImage from "../components/HeaderImage";
import morroco from "/images/morroco.jpg";
import TripHeader from "../components/TripHeader";
import "../styles/TripPage.css";
import { useEffect, useState } from "react";
import EditableField from "../components/EditableField";
import TodoComponent from "../components/ToDoComponent";
import { useParams } from "react-router-dom";
import type { RootState, AppDispatch } from "../state/store";
import { useSelector, useDispatch } from "react-redux";
import type { Trip } from "../api/tripApi";
import { fetchTripsAsync, updateTripAsync } from "../state/tripSlice";

// type Props = {
//   imageUrl?: string;
//   date?: string;
//   title?: string;
//   description?: string;
// };

function TripPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Fetch trips when the component mounts
    dispatch(fetchTripsAsync());
  }, [dispatch]);
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

  return (
    <div className="container-fluid p-0">
      <HeaderImage imageUrl={editedTrip?.image ?? morroco} />
      <div className="container py-4">
        <TripHeader
          title={editedTrip?.title ?? "Where is your next adventure?"}
          date={editedTrip?.date ?? "Date not available"}
          onTitleChange={(newTitle) =>
            setEditedTrip((prev) =>
              prev ? { ...prev, title: newTitle } : prev,
            )
          }
          onDateChange={(newDate) =>
            setEditedTrip((prev) => (prev ? { ...prev, date: newDate } : prev))
          }
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

        <TodoComponent
          type="Itinerary"
          todos={editedTrip?.itineraryItems ?? []}
          onChange={(newTodos) =>
            setEditedTrip((prev) =>
              prev ? { ...prev, itineraryItems: newTodos } : prev,
            )
          }
        />
        <TodoComponent
          type="Packing List"
          todos={editedTrip?.packingList ?? []}
          onChange={(newTodos) =>
            setEditedTrip((prev) =>
              prev ? { ...prev, packingList: newTodos } : prev,
            )
          }
        />
        <div className="d-flex justify-content-center mt-3">
          <button
            className="button-56"
            onClick={() => {
              if (editedTrip) {
                dispatch(updateTripAsync(editedTrip));
                alert("Trip updated successfully!");
              } else {
                alert("No trip data to update.");
              }
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default TripPage;
