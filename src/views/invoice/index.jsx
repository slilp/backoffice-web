import React, { useState } from "react";
import {
  Table,
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import TableInvoice from "./table";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";

function Invoice() {
  let history = useHistory();

  const [search, setSearch] = useState({
    sInv: "",
    sPid: "",
    sStatus: "",
    sStartDate: "",
    sEndDate: "",
  });

  const submitSearch = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    setSearch({
      ...search,
      sInv: values.inv,
      sPid: values.pid,
      sStatus: values.status,
      sStartDate: values.startDate,
      sEndDate: values.endDate
    });
    setSubmitting(false);
  };


  return (
    <div>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-credit-card text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category font-kanit">ยอดเงินรอเก็บ</p>
                      <Card.Title as="h4">1,345</Card.Title>
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
                <Card.Title as="h4">ค้นหาการชำระเงินเเละการจัดส่ง</Card.Title>
              </Card.Header>
              <Card.Body>
              <Formik
                  initialValues={{
                    inv: "",
                    pid: "",
                    status: "",
                    startDate: "",
                    endDate: "",
                  }}
                  onSubmit={submitSearch}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    resetForm,
                  }) => (
                    <Form onSubmit={handleSubmit}>                  <Row>
                    <Col md="5">
                      <Form.Group>
                        <h5>รหัสใบเสร็จ</h5>
                        <Form.Control
                          placeholder="INVxxxxx"
                          type="text"
                          name="inv"
                          onChange={handleChange}
                          value={values.inv}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="5">
                      <Form.Group>
                        <h5>รหัสการสั่งซื้อ</h5>
                        <Form.Control
                          placeholder="SOxxxxxx"
                          type="text"
                          name="pid"
                          onChange={handleChange}
                          value={values.pid}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="5">
                      <Form.Group>
                        <h5>สถานะการรับเงิน</h5>
                        <Form.Control 
                        type="text" 
                        size="sm" 
                        as="select"
                        name="status"
                        onChange={handleChange}
                        value={values.status}
                        defaultValue="waiting"
                        >
                          <option value="waiting">รอการชำระเงิน</option>
                          <option value="success">ได้รับเงินเเล้ว</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="5">
                      <Form.Group>
                        <h5>รอบจากวันที่</h5>
                        <Form.Control
                          placeholder="27-02-2021"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="5">
                      <Form.Group>
                        <h5>รอบถึงวันที่</h5>
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
                    <Col md="3" lg="2">
                          <br></br>
                          <Button
                            className="btn-fill pull-right"
                            variant="info"
                            onClick={() => {
                              resetForm();
                              setSearch({
                                ...search,
                                sInv: "",
                                sPid: "",
                                sStatus: "",
                                sStartDate: "",
                                sEndDate: ""
                              });
                            }}
                          >
                            <i className="fas fa-reply mr-1"></i>
                            ล้างการค้นหา
                          </Button>
                        </Col>
                    <Col md="3" lg="2">
                      <br></br>
                      <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="warning"
                        onClick={() => history.push("/admin/addi")}
                      >
                        <i className="far fa-plus-square mr-1"></i>
                        เพิ่มรายการใหม่
                      </Button>
                    </Col>
                  </Row>

                  <div className="clearfix"></div>
                  </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
          <Col md="12">
            <TableInvoice
                      sInv={search.sInv}
                      sPid={search.sPid}
                      sStatus={search.sStatus}
                      sStartDate={search.sStartDate}
                      sEndDate={search.sEndDate}
            ></TableInvoice>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Invoice;
Invoice;
