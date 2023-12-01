import React, { useState } from "react";
//import Form from "react-bootstrap/Form";
//import Button from "react-bootstrap/Button";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const Login = (props) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };
  const onChangeId = (e) => {
    const id = e.target.value;
    setId(id);
  };
  const login = () => {
    props.login({ name: name, id: id });
    props.history.push("/");
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "20vh" }}
    >
      <Row>
        <Col md={6}>
          <div
            style={{
              backgroundColor: "lightblue",
              padding: "20px",
              width: "500px",
              height: "500px",
            }}
          >
            <Form>
              <Form.Group>
                <h2 style={{ textAlign: "center" }}>Login</h2>
                <b>
                  <Form.Label>Username</Form.Label>
                </b>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  value={name}
                  onChange={onChangeName}
                  style={{ width: "100%" }}
                />
              </Form.Group>
              <Form.Group>
                <b>
                  <Form.Label>ID</Form.Label>
                </b>
                <Form.Control
                  type="text"
                  placeholder="Enter ID"
                  value={id}
                  onChange={onChangeId}
                  style={{ width: "100%" }}
                />
              </Form.Group>
              <br></br>
              <Button variant="primary" onClick={login}>
                Login
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
