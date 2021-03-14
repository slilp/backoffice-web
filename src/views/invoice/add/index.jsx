import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { postJson, getParam } from "../../../axios";
import { Select, Radio, message, DatePicker } from "antd";

const AddSchema = Yup.object().shape({
  code: Yup.string().required("กรุณากรอกข้อมูล"),
  pid: Yup.string().required("กรุณากรอกข้อมูล"),
  cname: Yup.string()
    .required("กรุณากรอกข้อมูล")
    .notOneOf([Yup.ref("ไม่พบข้อมูล")], "กรุณาเลือกข้อมูลที่ถูกต้อง"),
  cid: Yup.string()
    .required("กรุณากรอกข้อมูล")
    .notOneOf([Yup.ref("ไม่พบข้อมูล")], "กรุณาเลือกข้อมูลที่ถูกต้อง"),
});

const searchTransaction = async (search) => {
  const res = await getParam(`/purchase/search/0/1`, {
    pid: search || "",
  });

  if (res.status == 200) {
    if (res.data.data.count != 0) {
      return res.data.data.rows[0]
    } else {
      return null;
    }
  } else {
    return null;
  }
};

function AddInvoice() {
  let history = useHistory();

  const submitAdd = async (values, { setSubmitting, resetForm }) => {

    setSubmitting(true);
    const response = await postJson("/invoice/add", {
      inv: values.code.trim(),
      pid: values.pid.trim(),
      invoiceDate: values.payDate  , 
      amount: values.revenue,
      channel: values.payType
    });

    if (response.status == 200) {
      setSubmitting(false);
      message.success("เพิ่มข้อมูลสำเร็จ", 3);
      history.push("/admin/invoice");
    } else {
      setSubmitting(false);
      message.error("การทำรายการไม่สำเร็จ", 3);
    }
  };

  const autoCompleteCustomer = async (e, handleChange, setFieldValue) => {
    handleChange(e);
    if (e.target.value.length > 5) {
      const customer = await searchTransaction(e.target.value);
      if (customer != null) {
        setFieldValue("cid", customer.customerInfo.cid);
        setFieldValue("cname", customer.customerInfo.name);
      } else {
        setFieldValue("cid", "ไม่พบข้อมูล");
        setFieldValue("cname", "ไม่พบข้อมูล");
      }
    } else {
      setFieldValue("cid", "");
      setFieldValue("cname", "");
    }
  };

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">สร้างรายการใบเสร็จเเละการจัดส่ง</Card.Title>
              </Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    code: "",
                    pid: "",
                    payDate: "2021-03-14",
                    payType: "cash",
                    cname: "",
                    cid: "",
                    revenue: 0,
                  }}
                  validationSchema={AddSchema}
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
                    setFieldValue,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="6">
                          <Form.Group>
                            <h5>รหัสใบเสร็จ</h5>
                            <Form.Control
                              placeholder="INVxxxxx"
                              type="text"
                              name="code"
                              onChange={handleChange}
                              value={values.code}
                            ></Form.Control>
                              {errors.code && touched.code ? (
                              <span className="text-danger">
                                {errors.code}
                              </span>
                            ) : null}
                          </Form.Group>
                        </Col>
                        <Col md="6">
                          <Form.Group>
                            <h5>รหัสการสั่งซื้อ</h5>
                            <Form.Control
                              placeholder="SOxxxxxx"
                              type="text"
                              name="pid"
                              onChange={(e) =>
                                autoCompleteCustomer(
                                  e,
                                  handleChange,
                                  setFieldValue
                                )
                              }
                              value={values.pid}
                            ></Form.Control>
                              {errors.pid && touched.pid ? (
                              <span className="text-danger">
                                {errors.pid}
                              </span>
                            ) : null}
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
                              name="cname"
                              onChange={handleChange}
                              value={values.cname}
                              readOnly
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col md="6">
                          <Form.Group>
                            <h5>รหัสลูกค้า</h5>
                            <Form.Control
                              placeholder="รหัสลูกค้า"
                              type="text"
                              name="cid"
                              onChange={handleChange}
                              value={values.cid}
                              readOnly
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <Form.Group>
                            <h5>รอบการชำระเงิน</h5>
                            {/* <DatePicker 
                            size="large" 
                            format={['DD/MM/YYYY']}  
                            onChange={handleChange} 
                            value={values.payDate}
                            /> */}
                          </Form.Group>
                          <Form.Group controlId="dob"></Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <Form.Group>
                            <h5>จำนวนเงินที่ชำระ</h5>
                            <Form.Control
                              type="number"
                              name="revenue"
                              onChange={handleChange}
                              value={values.revenue}
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <Form.Group>
                            <h5>วิธีการชำระเงิน</h5>
                            <Radio.Group
                              defaultValue="cash"
                              size="large"
                              name="paymentType"
                              onChange={handleChange}
                              value={values.paymentType}
                            >
                              <Radio.Button value="cash">เงินสด</Radio.Button>
                              <Radio.Button value="credit">
                                บัตรเครดิต
                              </Radio.Button>
                              <Radio.Button value="cheque">เช็ค</Radio.Button>
                            </Radio.Group>
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
                          >
                            <i className="far fa-plus-square mr-1"></i>
                            เพิ่มรายการ
                          </Button>
                        </Col>
                        <Col md="4" lg="3">
                          <br></br>
                          <Button
                            className="btn-fill"
                            type="submit"
                            variant="primary"
                            onClick={() => history.push("/admin/addl")}
                          >
                            <i className="fas fa-forward mr-1"></i>
                            ทำรายการจขนส่งต่อ
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

export default AddInvoice;
