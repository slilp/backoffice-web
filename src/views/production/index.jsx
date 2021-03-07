import React from 'react';
import {
    Table,
    Container,
    Row,
    Col,
    Card,
    Form,
    Button
  } from "react-bootstrap";
import TableProduction from "./table";
import { useHistory } from "react-router-dom";

function Production() {

  let history = useHistory();


    return (
        <div>
       <Container fluid>
        <Row>
        <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">ค้นหารายการสั่งซื้อ</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                <Row>
                    <Col  md="6">
                      <Form.Group>
                        <h5>รหัสรายการ</h5>
                        <Form.Control
                          placeholder="SOxxxxxx"
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
                    <Col  md="6">
                    <Form.Group>
                        <h5>ชื่อพนักงานขาย</h5>
                        <Form.Control
                          placeholder="ชื่อพนักงานขาย"
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
                    <Col  md="4" lg="2">
                    <br></br>
                      <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="warning"
                        onClick={()=>history.push('/admin/addp')}
                      >
                        <i className="far fa-plus-square mr-1"></i>
                        เพิ่มรายการสั่งซื้อ
                      </Button>
                    </Col>
                  </Row>

                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="12">
            <TableProduction></TableProduction>
          </Col>
        </Row>
      </Container>
    </div>
    )
}

export default Production
