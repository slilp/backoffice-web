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
import TableProduction from "./table";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";

function Production() {
  let history = useHistory();

  const [search, setSearch] = useState({
    sCode: "",
    sName: "",
    sStatus: "",
  });

  const submitSearch = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    setSearch({
      ...search,
      sCode: values.code,
      sName: values.name,
      sStatus: values.status,
    });
    setSubmitting(false);
  };

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
                <Formik
                  initialValues={{
                    code: "",
                    name: "",
                    status: "",
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
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="6">
                          <Form.Group>
                            <h5>รหัสรายการ</h5>
                            <Form.Control
                              placeholder="SOxxxxxx"
                              type="text"
                              name="code"
                              onChange={handleChange}
                              value={values.code}
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
                              name="name"
                              onChange={handleChange}
                              value={values.name}
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col md="4">
                          <Form.Group>
                            <h5>สถานะรายการ</h5>
                            <Form.Control
                              type="text"
                              size="sm"
                              as="select"
                              name="status"
                              onChange={handleChange}
                              value={values.status}
                            >
                              <option value="">ทั้งหมด</option>
                              <option value="waiting">ชำระเงินยังไม่ครบ</option>
                              <option value="success">ชำระเงินครบเเล้ว</option>
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
                                sCode: "",
                                sName: "",
                                sStatus: "",
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
                            onClick={() => history.push("/admin/addp")}
                          >
                            <i className="far fa-plus-square mr-1"></i>
                            เพิ่มรายการสั่งซื้อ
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
            <TableProduction
              sCode={search.sCode}
              sName={search.sName}
              sStatus={search.sStatus}
            ></TableProduction>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Production;
