import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../state/store";
import { deleteTripAsync } from "../state/tripSlice";

type Props = {
  id: string;
  imageUrl: string;
  date: string;
  title: string;
  description: string;
};
function TripCard({ id, imageUrl, date, title, description }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(deleteTripAsync(id));
  };

  return (
    <Card className="trip-card">
      <div className="trip-card-layout">
        <button className="trip-delete-button" onClick={handleDelete}>
          X
        </button>

        <img className="trip-card-img" src={imageUrl} />

        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Header>{date}</Card.Header>
        </Card.Body>
      </div>
    </Card>
  );
}

export default TripCard;
