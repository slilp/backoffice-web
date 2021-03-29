import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { postJson } from "../../../axios";
import { message } from "antd";

const addSchema = Yup.object().shape({
  firstName: Yup.string().required("กรุณากรอกข้อมูล"),
  lastName: Yup.string().required("กรุณากรอกข้อมูล"),
});

function AddSale() {
  let history = useHistory();

  const submitAdd = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const response = await postJson("/sale/add", {
      title: values.title,
      firstName: values.firstName,
      lastName: values.lastName,
    });

    if (response.status == 200) {
      setSubmitting(false);
      message.success("เพิ่มข้อมูลสำเร็จ", 3);
      history.push("/admin/sale");
    } else {
      setSubmitting(false);
      message.error("การทำรายการไม่สำเร็จ", 3);
    }
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">สร้างพนักงานขายใหม้่</Card.Title>
              </Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    title: "นาย",
                    firstName: "",
                    lastName: "",
                  }}
                  validationSchema={addSchema}
                  onSubmit={submitAdd}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="4">
                          <Form.Group>
                            <Form.Control
                              type="text"
                              name="title"
                              size="sm"
                              as="select"
                              onChange={handleChange}
                              value={values.title}
                            >
                              <option value="นาย">นาย</option>
                              <option value="นาง">นาง</option>
                              <option value="นางสาว">นางสาว</option>
                            </Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <Form.Group>
                            <h5>ชื่อ</h5>
                            <Form.Control
                              placeholder="ชื่อ"
                              type="text"
                              name="firstName"
                              onChange={handleChange}
                              value={values.firstName}
                            ></Form.Control>
                            {errors.firstName && touched.firstName ? (
                              <span className="text-danger">
                                {errors.firstName}
                              </span>
                            ) : null}
                          </Form.Group>
                        </Col>
                        <Col md="6">
                          <Form.Group>
                            <h5>นามสกุล</h5>
                            <Form.Control
                              placeholder="นามสกุล"
                              type="text"
                              name="lastName"
                              onChange={handleChange}
                              value={values.lastName}
                            ></Form.Control>
                            {errors.lastName && touched.lastName ? (
                              <span className="text-danger">
                                {errors.lastName}
                              </span>
                            ) : null}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row className="justify-content-center">
                        <Col md="4" lg="3">
                          <br></br>
                          <Button
                            className="btn-fill pull-right"
                            type="submit"
                            variant="success"
                            disabled={isSubmitting}
                          >
                            <i className="far fa-plus-square mr-1"></i>
                            เพิ่มพนักงานขายใหม่
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
        </Row>
      </Container>
    </div>
  );
}

export default AddSale;
