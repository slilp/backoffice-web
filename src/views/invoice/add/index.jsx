import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { postJson, getParam } from "../../../axios";
import moment from "moment";
import { Radio, message, DatePicker } from "antd";

const AddSchema = Yup.object().shape({
  code: Yup.string().required("กรุณากรอกข้อมูล"),
  pid: Yup.string().required("กรุณากรอกข้อมูล"),
  cname: Yup.string().required("กรุณากรอกข้อมูล"),
  cid: Yup.string().required("กรุณากรอกข้อมูล"),
});

const searchTransaction = async (search) => {
  const res = await getParam(`/purchase/search/0/1`, {
    pid: search || "",
  });

  if (res.status == 200) {
    if (res.data.data.count != 0) {
      return res.data.data.rows[0];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

function AddInvoice() {
  let history = useHistory();
  const [payDate, setPayDate] = useState(moment(new Date(), "DD/MM/YYYY"));

  const submitAdd = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const response = await postJson("/invoice/add", {
      inv: values.code.trim(),
      pid: values.pid.trim(),
      invoiceDate: payDate,
      amount: values.revenue,
      channel: values.payType,
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
    console.log(date);
    setPayDate(dateString);
  }

  const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
const days = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz']

const locale = {
  localize: {
    month: n => months[n],
    day: n => days[n]
  },
  formatLong: {}
}

  return (
    <div>
        <Container fluid>
          <Row>
            <Col md="12">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">
                    สร้างรายการใบเสร็จเเละการจัดส่ง
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Formik
                    initialValues={{
                      code: "",
                      pid: "",
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
                              <DatePicker
                                size="large"
                                defaultValue={moment(new Date())}
                                // format={"DD/MM/YYYY"}
                                locale={locale}
                                onChange={onChange}
                              />
                            </Form.Group>
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
