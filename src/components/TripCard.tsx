import Card from "react-bootstrap/Card";

type Props = {
  imageUrl: string;
  date?: string;
  title: string;
  description?: string;
};
function TripCard({ imageUrl, date, title, description }: Props) {
  return (
    <Card className="trip-card">
      <div className="trip-card-layout">
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
