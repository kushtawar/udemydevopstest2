import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';
import Paginate from '../../components/Paginate';

const ProductListScreen = () => {
  const { pageNumber } = useParams();
  console.log('pageNumber: ', pageNumber);
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  // OR if using state
  const { state } = useLocation();

  var updatedProductId = state?.updatedProductId;
  const updatedProductIdRef = useRef(updatedProductId);
  //console.log('updatedProductId in ProductList: ', updatedProductId);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success(`${id} deleted successfully`);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  var shouldHighlight = localStorage.getItem('highlight');
  var highlightdone = localStorage.getItem('highlightdone');
  console.log('shouldHighlightinlist: ' + shouldHighlight);
  console.log('highlightdone: ' + highlightdone);
  useEffect(() => {
    if (shouldHighlight === 'true' && highlightdone !== 'true') {
      updatedProductIdRef.current = updatedProductId;
      // eslint-disable-next-line
      highlightdone = localStorage.setItem('highlightdone', 'true');
      //shouldHighlight = false;
      localStorage.setItem('highlight', 'false');
    } else if (highlightdone === 'true') {
      console.log('elseif: ');
      highlightdone = false;
    } else {
      console.log('Do I reach here? ' + shouldHighlight);
      updatedProductIdRef.current = null;
      localStorage.setItem('highlight', 'false');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldHighlight]);
  console.log('updatedProductId: ' + updatedProductIdRef.current);

  highlightdone === 'false' && console.log('Final If');

  updatedProductId =
    highlightdone === 'false' ? '' : updatedProductIdRef.current;
  //updatedProductId = shouldHighlight === 'true' ? updatedProductId : '';

  console.log('updatedProductId is changed: ' + updatedProductId);

  return (
    <>
      <Row className="align-items-center">
        <Col className="align-items-center" md={11}>
          <h2
            className="py-3"
            style={{ textAlign: 'center', justifyContent: 'right' }}
          >
            All Products
          </h2>
        </Col>

        <Col className="text-end" md={1}>
          <Button className="my-1 btn-sm" onClick={createProductHandler}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : (
        <>
          {/* <div>ProductId is {updatedProductId}</div> */}
          <Col className="align-items-center">
            <Table bordered hover responsive className="table-sm custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.products.map((product) => (
                  <tr
                    key={product._id}
                    className={
                      product._id === updatedProductId ? 'highlighted-row' : ''
                    }
                  >
                    <td>
                      {product._id === updatedProductId ? <sup>*</sup> : ''}
                      {product._id}
                    </td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>

                    {/* Indicator */}
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm mx-2">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <FaTrash style={{ color: 'white' }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>

          <Paginate
            pages={data.pages}
            page={data.page}
            isAdmin={true}
            keyword=""
          />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
