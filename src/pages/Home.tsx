import ListingPageContainer from "../components/ListingPageContainer";
import Carousel from "../components/Carousel";
import useCart from "../hooks/useCart";

const Home = () => {
  const { context } = useCart();

  return (
    <div className="home">
      <Carousel data={context._products} />
      <ListingPageContainer />
    </div>
  );
};

export default Home;
