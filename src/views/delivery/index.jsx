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
import TableDelivery from "./table";
import { useHistory } from "react-router-dom";

function Delivery() {
  let history = useHistory();

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4" className="font-kanit">
                  ค้นหาข้อมูลที่อยู่ขนส่ง
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <h5>รหัสการสั่งซื้อ</h5>
                        <Form.Control
                          placeholder="รหัสการสั่งซื้อ"
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
                        <h5>วิธีการจัดส่ง</h5>
                        <Form.Control type="text" size="sm" as="select">
                          <option>ทั้งหมด</option>
                          <option>ส่งเอง</option>
                          <option>ส่งที่ขนส่ง</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="3" lg="2">
                      <br></br>
                      <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="primary"
                      >
                        <i className="fas fa-search-plus mr-1"></i>
                        ค้นหาข้อมูล
                      </Button>
                    </Col>
                    <Col md="4" lg="2">
                      <br></br>
                      <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="warning"
                        onClick={() => history.push("/admin/addd")}
                      >
                        <i className="far fa-plus-square mr-1"></i>
                        เพิ่มข้อมูลใหม่
                      </Button>
                    </Col>
                  </Row>

                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <TableDelivery></TableDelivery>
        </Row>
      </Container>
    </div>
  );
}

export default Delivery;
