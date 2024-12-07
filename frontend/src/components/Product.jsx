import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <Card
      className="my-3 p-3 rounded cardBackground"
      style={{ height: '400px' }}
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant="top"
          style={{
            objectFit: 'contain',
            height: '100%',
            minHeight: '220px',
            maxHeight: '230px',
          }}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Link to={`/product/${product._id}`}>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Link>
        </Card.Text>

        <Card.Text className="priceColor" as="h5">
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
