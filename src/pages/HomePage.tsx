import HeaderImage from "../components/HeaderImage";
import surfBanner from "../assets/surf-banner.jpg";
import morroco from "../assets/morroco.jpg";
import portugal from "../assets/portugal.jpg";
import indonesia from "../assets/indonesia.jpg";
import Title from "../components/Title";
import TripCard from "../components/TripCard";
import "../styles/HomePage.css";
import { useState } from "react";
import AddTripModal from "./AddTripModal";
import {
  deleteTrip,
  fetchTrips,
  getTrip,
  updateTrip,
  type Trip,
} from "../api/tripApi";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleDelete = async () => {
    // Placeholder for fetching trips from an API or database
    console.log("Deleting trip by id...");
    await deleteTrip("2"); // Assuming getTrip is a function that fetches a trip by id
    console.log("Trip deleted.");
  };
  const handleOnClick = async () => {
    // Placeholder for fetching trips from an API or database
    console.log("Fetching trips...");
    const trips = await fetchTrips();
    console.log(trips); // Assuming getTrip is a function that fetches a trip by id
  };
  const handleUpdateTrip = async () => {
    // Placeholder for updating a trip in an API or database
    console.log("Updating trip...");
    const trip: Trip = {
      id: "kS0xfcrf2fs",
      title: "Surfing in Portugal - Updated",
      description: "A surfing adventure in Portugal",
      date: "2024-07-20",
      itineraryItems: [],
      packingList: [],
      image: "surf.jpg",
    };

    const updatedTrip = await updateTrip(trip.id, trip);
    console.log(updatedTrip); // Assuming getTrip is a function that fetches a trip by id
  };
  return (
    <div className="container-fluid p-0">
      <HeaderImage imageUrl={surfBanner}>
        <h1 className="hero-title">Life is for exploring</h1>
      </HeaderImage>
      <div className="container-fluid p-6">
        {/* Button and title are in a flex container to align them horizontally */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Title />
          <div className="d-flex gap-4">
            <button className="button-56" onClick={handleOnClick}>
              Get Trips
            </button>
            <button className="button-56" onClick={handleShowModal}>
              Add Trip
            </button>
            <AddTripModal show={showModal} handleClose={handleCloseModal} />
            <button className="button-56" onClick={handleUpdateTrip}>
              Update Trip
            </button>
            <button className="button-56" role="button" onClick={handleDelete}>
              Delete Trip
            </button>
          </div>
        </div>
        <div className="container-fluid d-flex flex-column gap-3">
          <TripCard
            imageUrl={morroco}
            date="2024-08-01"
            title="Trip to Morroco"
            description="Explore the beautiful landscapes and culture of Morroco."
          />
          <TripCard
            imageUrl={indonesia}
            date="2024-06-01"
            title="Trip to Indonesia"
            description="Explore the beautiful landscapes and culture of Indonesia."
          />
          <TripCard
            imageUrl={portugal}
            date="2024-04-01"
            title="Trip to Portugal"
            description="Explore the beautiful landscapes and culture of Portugal."
          />
        </div>
      </div>
    </div>
  );
}
