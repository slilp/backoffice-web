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
import TableLogistic from "./table";
import { useHistory } from "react-router-dom";
import Calendar from "./calendar";

function Logistic() {
  let history = useHistory();

  return (
    <div>
      {/* <Calendar></Calendar> */}
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-delivery-fast text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category font-kanit">รายการรอส่ง</p>
                      <Card.Title as="h4">5 รายการ</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  อัพเดท 27-02-2021
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">ค้นหาการจัดส่ง</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="5">
                      <Form.Group>
                        <h5>รหัสใบเสร็จ</h5>
                        <Form.Control
                          placeholder="INVxxxxx"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="5">
                      <Form.Group>
                        <h5>สถานะการขนส่ง</h5>
                        <Form.Control type="text" size="sm" as="select">
                           <option>ทั้งหมด</option>
                          <option>รอการจัดส่ง</option>
                          <option>ส่งช้าเกินกำหนด</option>
                          <option>ขนส่งสำเร็จเเล้ว</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="5">
                      <Form.Group>
                        <h5>จัดส่งจากวันที่</h5>
                        <Form.Control
                          placeholder="27-02-2021"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="5">
                      <Form.Group>
                        <h5>จัดส่งถึงวันที่</h5>
                        <Form.Control
                          placeholder="10-03-2021"
                          type="text"
                        ></Form.Control>
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
                        ค้นหารายการ
                      </Button>
                    </Col>
                    <Col md="4" lg="2">
                      <br></br>
                      <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="warning"
                        onClick={() => history.push("/admin/addl")}
                      >
                        <i className="far fa-plus-square mr-1"></i>
                        เพิ่มรายการใหม่
                      </Button>
                    </Col>
                  </Row>

                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="12">
            <TableLogistic></TableLogistic>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Logistic;
