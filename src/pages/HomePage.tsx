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

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
            <button className="button-56" onClick={handleShowModal}>
              Add Trip
            </button>
            <AddTripModal show={showModal} handleClose={handleCloseModal} />
            <button
              className="button-56"
              role="button"
              onClick={() => alert("Delete Trip button clicked!")}
            >
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
