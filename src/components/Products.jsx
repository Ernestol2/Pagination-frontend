import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Pagination from "./Pagination";

export default function Products() {
 

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);

  const fetchProducts = (page) => {
    const URL = `https://crud-backend-pagination.onrender.com/api/products/${page}`;
    axios
      .get(URL)
      .then((response) => {
        setProducts(response.data.products);
        setCurrentPage(response.data.current);
        setPages(response.data.pages);
      })
      .catch((error) => console.log(error));
  };

  const deleteProduct = async (productId) => {
    const URL = `https://crud-backend-pagination.onrender.com/api/products/${productId}`;

    try {
      const response = await axios.delete(URL);
      const deletedProductName = response.data.name;

      alert(`Product ${deletedProductName} was deleted!`);
      fetchProducts(currentPage);
    } catch (error) {
      console.log("Error deleting product", error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <h2 className="m-4 text-center">PRODUCTS</h2>
      <Container className="products">
        <Row>
          {products.map((product) => {

            return (
                <Col className="mb-4" key={product._id} xs={6} sm={6} md={4} lg={3}>
              <Card className="product-card">
                <Card.Img variant="top" src={product.cover} />
                <Card.Body>
                  <h6>{product.name}</h6>
                  <p><i>Category: </i>{product.category}</p>
                  <Card.Text><i>Price: </i>${product.price}</Card.Text>
                  <Col className="d-flex justify-content-between align-items-center">
                    <Link to={`/update/${product._id}`}>
                        <Button 
                            variant="success" 
                            size="sm"
                            >
                        Update
                        </Button>
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteProduct(product._id)}
                    >
                      Delete
                    </Button>
                  </Col>
                </Card.Body>
              </Card>
            </Col>
            );
          })}
        </Row>
      </Container>
      <Pagination
        pages={pages}
        current={parseInt(currentPage)}
        onPageChange={handlePageChange}
      />
    </>
  );
}
