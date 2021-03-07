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

function AddDelivery() {
  let history = useHistory();

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">สร้างข้อมูลขนส่งใหม่</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <h5>รหัสการสั่งซื้อ</h5>
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
                    <Col md="6">
                      <Form.Group>
                        <h5>เบอร์ติดต่อ</h5>
                        <Form.Control
                          placeholder="เบอร์ติดต่อ"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Col md="6">
                    <Form.Group>
                      <h5>ที่อยู่จัดส่ง</h5>
                      <Form.Control
                        type="text"
                        as="textarea"
                        rows={3}
                      ></Form.Control>
                    </Form.Group>
                  </Col>

                  <h5>วิธีการจัดส่ง</h5>

                  <h5>จัดส่งเอง</h5>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <h5>Note ถึงคนส่งสินค้า</h5>
                        <Form.Control
                          placeholder=""
                          type="text"
                          as="textarea"
                          col={3}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <br></br>

                  <h5>ส่งที่ขนส่ง</h5>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <h5>ขื่อขนส่ง</h5>
                        <Form.Control placeholder="" type="text"></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <h5>ที่อยู่ขนส่ง</h5>
                        <Form.Control
                          placeholder="ที่อยู่ขนส่ง"
                          type="text"
                          as="textarea"
                          col={3}
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
                        onClick={() => history.push("/admin/production")}
                      >
                        <i className="far fa-plus-square mr-1"></i>
                        เพิ่มข้อมูลขนส่ง
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

export default AddDelivery;
