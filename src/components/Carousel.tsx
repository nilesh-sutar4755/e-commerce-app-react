import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../utils/Interfaces";

interface Props {
  data: [];
}

const Carousel = ({ data }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselItems = data.slice(0, 10);

  useEffect(() => {
    // Set the initial active index to 0 when the component mounts
    setActiveIndex(0);
  }, []);
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide mb-4"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        {carouselItems.map((index: number) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={index}
            className={index === activeIndex ? "active" : ""}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {carouselItems.map((item: Product, index: number) => (
          <div
            className={`carousel-item ${index === activeIndex ? "active" : ""}`}
            key={item.id}
          >
            <Link to={`/products/${item.id.toString()}`}>
              <img
                src={item.thumbnail}
                className="d-block img-fluid"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>{item.title}</h5>
                <p>{item.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
        onClick={() =>
          setActiveIndex((prevIndex) =>
            prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
          )
        }
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
        onClick={() =>
          setActiveIndex((prevIndex) =>
            prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
          )
        }
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
