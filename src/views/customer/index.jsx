import React from "react";
import {
  Table,
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import TableCustomer from "./table";

function Customer() {
  let history = useHistory();

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4" className="font-kanit">
                  ค้นหาลูกค้า
                </Card.Title>
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
                          <option>ทั้งหมด</option>
                          <option>INN</option>
                          <option>INVV</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col md="6">
                      <Form.Group>
                        <h5>เบอร์โทร</h5>
                        <Form.Control
                          placeholder="081xxxxxxx"
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
                  </Row> */}
                  <Row>
                    <Col md="3" lg="2">
                      <br></br>
                      <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="primary"
                      >
                        <i className="fas fa-search-plus mr-1"></i>
                        ค้นหาลูกค้า
                      </Button>
                    </Col>
                    <Col md="4" lg="2">
                      <br></br>
                      <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="warning"
                        onClick={() => history.push("/admin/addc")}
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
          <TableCustomer></TableCustomer>
        </Row>
      </Container>
    </div>
  );
}

export default Customer;
