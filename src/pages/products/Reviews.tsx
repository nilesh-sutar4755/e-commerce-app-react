import useReviews from "../../hooks/useReviews";
import { Review } from "../../utils/Interfaces";
interface Props {
  id: string;
}

const Reviews = ({ id }: Props) => {
  const { data, isLoading, error } = useReviews(id);
  return (
    <>
      {isLoading && <p>Please wait loading content...!</p>}
      {error && <p>Error while fetching data...!</p>}
      {data?.comments.map((review: Review) => (
        <div className="card" key={review.id}>
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <p>{review.body}</p>
              <footer className="blockquote-footer">
                <cite title="Source title">{review.user.username}</cite>
              </footer>
            </blockquote>
          </div>
        </div>
      ))}
    </>
  );
};

export default Reviews;
