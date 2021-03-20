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

function FindPurchase({ handleModal }) {
  let history = useHistory();

  const [search, setSearch] = useState({
    sCode: "",
    sName: "",
  });

  const submitSearch = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    setSearch({
      ...search,
      sCode: values.code,
      sName: values.name,
    });
    setSubmitting(false);
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Body>
                <Formik
                  initialValues={{
                    code: "",
                    name: ""
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
                      </Row>
                      <Row>
                        <Col md="6">
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
                        <Col md="6">
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
              handleSelect={handleModal}
            ></TableProduction>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FindPurchase;
