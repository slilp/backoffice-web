import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import TableCustomer from "./table";
import { Formik } from "formik";

function Customer() {
  let history = useHistory();
  const [search, setSearch] = useState({
    sCode: "",
    sName: "",
    sType: "",
  });

  const submitSearch = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    setSearch({
      ...search,
      sCode: values.code,
      sName: values.name,
      sType: values.type,
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
                <Card.Title as="h4" className="font-kanit">
                  ค้นหาลูกค้า
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    code: "",
                    name: "",
                    type: "",
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
                            <h5>รหัสลูกค้า</h5>
                            <Form.Control
                              placeholder="รหัสลูกค้า"
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
                            <h5>ประเภทลูกค้า</h5>
                            <Form.Control
                              type="text"
                              size="sm"
                              as="select"
                              name="type"
                              onChange={handleChange}
                              value={values.type}
                            >
                              <option value="">ทั้งหมด</option>
                              <option>INN</option>
                              <option>INVV</option>
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
                            ค้นหาลูกค้า
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
                                sType: "",
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
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
          <TableCustomer
            sCode={search.sCode}
            sName={search.sName}
            sType={search.sType}
          ></TableCustomer>
        </Row>
      </Container>
    </div>
  );
}

export default Customer;
