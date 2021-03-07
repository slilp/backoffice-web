import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function AddCustomer() {
  let history = useHistory();

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">สร้างลูกค้าใหม่</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <h5>รหัสลูกค้า</h5>
                        <Form.Control
                          placeholder="รหัสลูกค้า"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <h5>ชื่อลูกค้า</h5>
                        <Form.Control
                          placeholder="ชื่อลูกค้า"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="4">
                      <Form.Group>
                        <h5>ประเภทลูกค้า</h5>
                        <Form.Control type="text" size="sm" as="select">
                          <option>INN</option>
                          <option>INVV</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <h5>เบอร์โทร</h5>
                        <Form.Control
                          placeholder="08xxxxxxxx"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <h5>พื้นที่</h5>
                        <Form.Control
                          placeholder="พื้นที่"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <h5>ที่อยู่บริษัท</h5>
                        <Form.Control
                          type="text"
                          as="textarea"
                          rows={3}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <h5>ที่อยู่จัดส่ง ( ถ้ามี )</h5>
                        <Form.Control
                          type="text"
                          as="textarea"
                          rows={3}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col md="4" lg="2">
                      <br></br>
                      <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="success"
                        onClick={() => history.push("/admin/user")}
                      >
                        <i className="far fa-plus-square mr-1"></i>
                        เพิ่มลูกค้าใหม่
                      </Button>
                    </Col>
                  </Row>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddCustomer;
