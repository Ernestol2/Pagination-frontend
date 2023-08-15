import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";

export default function AddProduct() {

    const [category, setCategory] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("");
  
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const URL = "http://localhost:3001/api/add-product/";
            const response = await axios.post(URL, {
                category,
                name,
                price
            },
            { headers: {'Content-Type': 'application/json'}})
            alert(`Product ${response.data.name} was created!`)
        } catch (error) {
            console.log("error creating", error);
            alert("error")
        }

        setCategory("")
        setName("")
        setPrice("")
    }

  return (
    <Container className="mt-4 p-4">
    <h2 className="m-4">Create New Product</h2>
        <Row>
            <Col lg={4} md={6} sm={12} >
                <Form method="post" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Category:</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Books, Baby, etc" 
                            id="category_name"
                            name="category_name"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                            required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Name:</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Baby Towels, etc"
                            id="product_name"
                            name="product_name" 
                            onChange={(e) => setName(e.target.value)}                            value={name}
                            required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price:</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="40"
                            id="product_price"
                            name="product_price" 
                            onChange={(e) => setPrice(e.target.value)}                            value={price}
                            required/>
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Create
                    </Button>
                </Form>
            </Col>
        </Row>
    </Container>
  )
}
