import HeaderImage from "../components/HeaderImage";
import morroco from "../assets/morroco.jpg";
import surf from "../assets/surf-banner.jpg";
import TripHeader from "../components/TripHeader";
import "../styles/TripPage.css";

type Props = {
  imageUrl?: string;
  date?: string;
  title?: string;
  description?: string;
};

const TripPage = (
  props: Props = {
    imageUrl: surf,
    title: "Default Title",
    description: "Default Description",
  },
) => {
  return (
    <div className="container-fluid p-0">
      <HeaderImage imageUrl={morroco} />
      <div className="container py-4">
        <TripHeader title="Morocco Adventure" date="01/05/2026 - 15/05/2026" />

        <p>Exploring the coast, surfing and hiking.</p>

        <h2>Itinerary</h2>

        <h2>Packing List</h2>
      </div>
    </div>
  );
};

export default TripPage;
