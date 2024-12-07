import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? null : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause="hover" className="custom-carousel">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <div className="d-flex justify-content-around align-items-center">
            <div>
              <Link to={`/product/${product._id}`}>
                <Image
                  className="img-carousel"
                  src={product.image}
                  alt={product.name}
                  object-fit="cover"
                />
              </Link>
            </div>

            <div>
              <Link to={`/product/${product._id}`}>
                <div className="placeholder-content">
                  <h3>{product.name}</h3>

                  <p>{product.description}</p>

                  <p>Price: ${product.price}</p>
                </div>
              </Link>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
