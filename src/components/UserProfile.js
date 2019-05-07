return ({loggedIn ? (
  <div>

    {match.params.filter === 'reviews'? (
      <div>
        {userProfileReviews.map(review => {
          return (
            <div key={review.id}>
              <h5>{review.title}</h5>
              <div>{review.rating} / 5 stars</div>
              <div>{review.content}</div>
            </div>
          )
        })}
      </div>
    ) : (
      <div>
        {userOrders.map(order => {
          return (
            <div key={order.id}>
              {/* <h5>{order.title}</h5>
              <div>{order.rating} / 5 stars</div>
              <div>{order.content}</div> */}
              <div>{order.status}</div>
            </div>
          )
        })}
      </div>
    )}
  </div>
) : (
  <div>
    <h1>Reviews</h1>
    <h4>by {user && `${user.firstName} ${user.lastName}`}</h4>

    {reviews.map(review => (
      <ul key={review.id}>
        <h4>
          <Link to={`/products/${review.productId}`}>
            {products.length &&
              findProductNameById(review.productId, products)}
          </Link>
        </h4>
        <h5>{review.title}</h5>
        <li>{review.rating} / 5 stars</li>
        <li>{review.content}</li>
      </ul>
    ))}
  </div>
)})
