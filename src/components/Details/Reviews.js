import { useEffect, useReducer } from "react";

const initialState = {
  reviews: [],
  loading: true,
  error: null,
  showMore: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "success":
      return { ...state, reviews: action.payload, loading: false };
    case "error":
      return { ...state, error: action.payload, loading: false };
    case "showMore":
      return {
        ...state,
        showMore: state.showMore === action.payload ? null : action.payload,
      };
    default:
      return state;
  }
};

const Reviews = ({ id, type }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { reviews, loading, error, showMore } = state;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=cd6995e50746ae039317681e2b2d6f5a`
        );
        const reviewsData = await response.json();
        dispatch({ type: "success", payload: reviewsData.results });
      } catch (err) {
        dispatch({ type: "error", payload: "Failed to fetch reviews" });
      }
    };

    fetchReviews();
  }, [id, type]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  const toggleReview = (reviewId) =>
    dispatch({ type: "showMore", payload: reviewId });

  return (
    <div className="reviews">
      <h2 className="text-3xl">Reviews</h2>
      <div className="w-full h-px bg-slate-300 mb-5"></div>
      {reviews.length === 0 ? (
        <p>No reviews available for this {type}.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="my-4">
            <h3 className="mb-2">
              Author: <strong className="text-lg">{review.author}</strong>
            </h3>
            <div className="border-b-2">
              <p>
                {showMore === review.id
                  ? review.content
                  : `${review.content.slice(0, 250)}...`}
              </p>
              <button
                onClick={() => toggleReview(review.id)}
                className="show-btn"
              >
                {showMore === review.id ? "Show less" : "Show more"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Reviews;
