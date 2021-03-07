import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function AddInvoice() {

  let history = useHistory();

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">สร้างรายการใบเสร็จเเละการจัดส่ง</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <h5>รหัสใบเสร็จ</h5>
                        <Form.Control
                          placeholder="INVxxxxx"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <h5>รหัสการสั่งซื้อ</h5>
                        <Form.Control
                          placeholder="SOxxxxxx"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <h5>รอบการชำระเงิน</h5>
                        <Form.Control
                          placeholder="06-03-2020 13:00"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <h5>จำนวนเงินที่ชำระ</h5>
                        <Form.Control
                          placeholder="5000xxx"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <h5>วิธีการชำระเงิน</h5>
                        <Form>
                          <Form.Check
                            type="radio"
                            label="จ่ายสด"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                          />
                          <Form.Check
                            type="radio"
                            label="โอน"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                          />
                          <Form.Check
                            type="radio"
                            label="เช็ค"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                          />
                        </Form>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col md="4" lg="2">
                      <br></br>
                      <Button
                        className="btn-fill"
                        type="submit"
                        variant="success"
                        onClick={() => history.push("/admin/invoice")}
                      >
                        <i className="far fa-plus-square mr-1"></i>
                        เพิ่มรายการ
                      </Button>
                    </Col>
                    <Col md="4" lg="3">
                      <br></br>
                      <Button
                        className="btn-fill"
                        type="submit"
                        variant="primary"
                        onClick={() => history.push("/admin/addl")}
                      >
                        <i className="fas fa-forward mr-1"></i>
                        ทำรายการจขนส่งต่อ
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

export default AddInvoice;
