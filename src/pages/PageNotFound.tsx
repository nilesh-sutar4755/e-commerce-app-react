import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <h2>Page not found!</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia alias
        cupiditate ad nostrum doloribus iste tempora quisquam excepturi
        repellat, fugit cumque dolore magni possimus inventore neque provident!
        Sunt, quo eos?
      </p>

      <p>
        Go to the <Link to="/">Homepage</Link>.
      </p>
    </>
  );
};

export default PageNotFound;
