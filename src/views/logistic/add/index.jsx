import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
function AddLogistic() {
  let history = useHistory();

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">สร้างรายการขนส่ง</Card.Title>
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
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <h5>กำหนดการส่งสินค้า</h5>
                        <Form.Control
                          placeholder="06-03-2020 13:00"
                          type="text"
                        ></Form.Control>
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
                        onClick={() => history.push("/admin/logistic")}
                      >
                        <i className="far fa-plus-square mr-1"></i>
                        เพิ่มรายการ
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

export default AddLogistic;
