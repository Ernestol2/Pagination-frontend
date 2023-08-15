import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

export default function Update() {

    const history = useHistory();
    const { productId } = useParams();
    const [category, setCategory] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")

    useEffect(() => {
        const fetchProduct = async () => {
            const url = `https://crud-backend-pagination.onrender.com/api/product/${productId}`
            try {
                const response = await axios.get(url)
                setCategory(response.data.category)
                setName(response.data.name)
                setPrice(response.data.price)
            } catch (error) {
                alert(error.response.data)
                console.log(error);
            }
        }
        fetchProduct();
    }, [productId])
    

    const handleUpdate = async (e) => {

        e.preventDefault();
        const url = `https://crud-backend-pagination.onrender.com/api/update/product/${productId}`

        const updatedProduct = {
            category: category,
            name: name,
            price: price,
        };

        try {
            const result = await axios.put(url, updatedProduct)
            if(result) {
                alert(`Product (${name}) was updated`)
                history.push("/products")
            }

        } catch (error) {
            console.log(error);
        }

        setCategory("");
        setName("");
        setPrice('');
    }; 
            

  return (
    <Container className="mt-4 p-4">
    <h2 className="m-4">Update Product</h2>
        <Row>
            <Col lg={4} md={8} sm={12} >
                <Form method="put">
                    <Form.Group className="mb-3">
                        <Form.Label>Category:</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Books, Baby, etc" 
                            onChange={(e) => setCategory(e.target.value) }
                            value={category}
                            required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Name:</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Baby Towels, etc" 
                            onChange={(e) => setName(e.target.value) }                            
                            value={name}
                            required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price:</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="40" 
                            onChange={(e) => setPrice(e.target.value) }                            
                            value={price}
                            required/>
                    </Form.Group>
                    <Button variant="success" type="submit" onClick={handleUpdate}>
                        Update
                    </Button>
                </Form>
            </Col>
        </Row>
    </Container>
  )
}
