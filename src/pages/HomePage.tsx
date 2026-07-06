import HeaderImage from "../components/HeaderImage";
import surfBanner from "../assets/surf-banner.jpg";
import morroco from "../assets/morroco.jpg";
import portugal from "../assets/portugal.jpg";
import indonesia from "../assets/indonesia.jpg";
import Title from "../components/Title";
import TripCard from "../components/TripCard";

export default function HomePage() {
  return (
    <div className="container-fluid p-0">
      <HeaderImage imageUrl={surfBanner}>
        <h1 className="hero-title">Life is for exploring</h1>
      </HeaderImage>
      <div className="container-fluid p-6">
        <Title />
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
