import "../styles/HomePage.css";

type Props = {
  imageUrl: string;
  children?: React.ReactNode;
};

export default function HeaderImage({ imageUrl, children }: Props) {
  return (
    <div className="header-image">
      <img src={imageUrl} alt="Trip banner" />
      <div className="header-image-overlay">{children}</div>
    </div>
  );
}
