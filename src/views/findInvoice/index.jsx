import React, { useState , useEffect } from "react";
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
import { getParam } from "../../axios";

function FindInvoice({handleModal}) {
  let history = useHistory();

  const [search, setSearch] = useState({
    sInv: "",
    sPid: ""
  });

  const submitSearch = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    setSearch({
      ...search,
      sInv: values.inv,
      sPid: values.pid
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
                    inv: "",
                    pid: ""
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
                                sInv: "",
                                sPid: "",
                                sStatus: "",
                                sStartDate: "",
                                sEndDate: "",
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
            <TableInvoice
              sInv={search.sInv}
              sPid={search.sPid}
              handleSelect={handleModal}
            ></TableInvoice>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FindInvoice;
