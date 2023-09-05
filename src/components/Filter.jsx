import { useEffect, useState } from "react";
import { 
  Card, 
  Col, 
  Container, 
  Dropdown, DropdownButton, FormControl, Row, Spinner } from "react-bootstrap";

export default function Filter() {

  const [products, setProducts] = useState([])
  let [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [search, setSearch] = useState("")

  
  useEffect(() => {
    try {
      const getProducts = () => {
        const URL = 'https://crud-backend-pagination.onrender.com/api/all-products'
        fetch(URL).then(res=> res.json()).then(data=>{ 
          setProducts(data)
  
          const uniqueCategories = [...new Set(data.map(product => product.category))];
          setCategories(uniqueCategories)
        })
      }
      getProducts()
    } catch (error) {
      console.log(error);
    }
  },[])

  const searcher = (e) => {
    setSearch(e.target.value)
  }

  const handleCategory = (category) => {
    setSelectedCategory(category)
  }
  
  const filteredProducts = products.filter(product => {
    if (selectedCategory && search) {
      return (
        product.category === selectedCategory &&
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    } else if (selectedCategory) {
      return product.category === selectedCategory;
    } else if (search) {
      return product.name.toLowerCase().includes(search.toLowerCase());
    } else {
      return true; // No filtering, return all products
    }
  });
  


  return (
    <>
    <Container className="mb-4" >
      <h2 className="text-center m-4">SEARCH & FILTER PAGE</h2>
      <Row>
        <Col className="d-flex" md={12} >
        <FormControl
        type="text"
        placeholder="Search"
        value={search}
        onChange={searcher}
      />
      <DropdownButton title="Category" variant="light">
        <Dropdown.Item href="/">All products</Dropdown.Item>
        {categories.map((category) => (
          <Dropdown.Item key={category} onClick={() => handleCategory(category)}>
            {category}
          </Dropdown.Item>
        ))}
      </DropdownButton>
        </Col>
      </Row>
    </Container>
    {filteredProducts.length > 0 ? (
        <Container>
          <Row>
            {filteredProducts.map((product) => (
              <Col className="mb-4" xs={6} md={4} lg={3} key={product._id}>
                <Card className='filtered-card' >
                  <Card.Img variant="top" src={product.cover} />
                  <Card.Body>
                    <h6>{product.name}</h6>
                    <Card.Text><i>Category: </i>{product.category}</Card.Text>
                    <Card.Text><i>Price: </i>{product.price}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <Container style={{ textAlign: 'center' }}>
          <p >Loading products...</p>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading products...</span>
          </Spinner>
        </Container>
      )}
    </>
  );
}


