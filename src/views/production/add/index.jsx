import React from 'react'
import {
    Table,
    Container,
    Row,
    Col,
    Card,
    Form,
    Button
  } from "react-bootstrap";
  import { useHistory } from "react-router-dom";


function AddProduction() {
  let history = useHistory();

    return (
        <div>
            <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">สร้างรายการสั่งซื้อใหม่</Card.Title>
              </Card.Header>
              <Card.Body>
              <Form>
                <Row>
                    <Col  md="6">
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
                    <Col  md="6">
                      <Form.Group>
                        <h5>ชื่อลูกค้า</h5>
                        <Form.Control
                          placeholder="ชื่อลูกค้า"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                  <Col  md="6">
                      <Form.Group>
                        <h5>พนักงานขาย</h5>
                        <Form.Control
                          placeholder="พนักงานขาย"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col  md="6">
                      <Form.Group>
                        <h5>ยอดสินค้า</h5>
                        <Form.Control
                          placeholder="100xxx"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="justify-content-center">
                    <Col  md="4" lg="2">
                    <br></br>
                      <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="success"
                        onClick={() => history.push("/admin/production")}
                      >
                        <i className="far fa-plus-square mr-1"></i>
                        เพิ่มรายการสั่งซื้อ
                      </Button>
                    </Col>
                    <Col md="4" lg="3">
                      <br></br>
                      <Button
                        className="btn-fill"
                        type="submit"
                        variant="primary"
                        onClick={() => history.push("/admin/addd")}
                      >
                        <i className="fas fa-forward mr-1"></i>
                        ทำข้อมูลขนส่งต่อ
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
    )
}

export default AddProduction
