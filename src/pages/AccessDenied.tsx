
import { Link, useSearchParams } from "react-router-dom";

const AccessDenied = () => {
  const [searchParams] = useSearchParams({});
  const redirectTo = searchParams.get("redirectTo");

  return (
    <div>
      <h5>Access Denied</h5>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt
        facere impedit sed officiis aliquam. Fugiat aperiam exercitationem
        maiores? Eos dolores quae corrupti molestias repellat possimus
        repellendus numquam in maiores laborum!
      </p>
      <Link to={`/sign-in?redirectTo=${redirectTo}`}>Login to continue</Link>
    </div>
  );
};

export default AccessDenied;
