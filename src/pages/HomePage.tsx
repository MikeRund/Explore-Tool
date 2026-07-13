import HeaderImage from "../components/HeaderImage";
import surfBanner from "/images/surf.jpg";
import Title from "../components/Title";
import TripCard from "../components/TripCard";
import "../styles/HomePage.css";
import { useEffect, useState } from "react";
import AddTripModal from "./AddTripModal";
import type { RootState, AppDispatch } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchTripsAsync } from "../state/tripSlice";

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const trips = useSelector((state: RootState) => state.trip.trips);

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    // Fetch trips when the component mounts
    dispatch(fetchTripsAsync());
  }, [dispatch]);

  const tripsList = trips.map((trip) => (
    <TripCard
      id={trip.id}
      key={trip.id}
      imageUrl={trip.image ?? surfBanner}
      date={trip.date}
      title={trip.title}
      description={trip.description}
    />
  ));

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
          </div>
        </div>
        <div className="container-fluid d-flex flex-column gap-3">
          {tripsList.length > 0 ? (
            tripsList
          ) : (
            <p>Add some trips!! Where do you want to explore next? 🤔</p>
          )}
        </div>
      </div>
    </div>
  );
}
