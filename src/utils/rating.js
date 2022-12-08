export const getAverageRating = (product) => {
  const number_reviews = product.Reviews.length;
  const sum_rating = product.Reviews.map((review) => review.rating).reduce((a, b) => a + b);
  const average_rating = sum_rating/number_reviews;

  return ( Math.round(average_rating) )
}

export const printReviewsStar = (stars_checked) => {
  return (
    <>
      { [1, 2, 3, 4, 5].map(( number, idx) => number <= stars_checked ? <span key={idx} className="fa fa-star checked"></span> : <span key={idx} className="fa fa-star"></span>)}
    </>
  );
}