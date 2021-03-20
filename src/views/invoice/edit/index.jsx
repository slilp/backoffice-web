import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { putJson, getParam } from "../../../axios";
import moment from "moment";
import { message, DatePicker, Modal, Radio } from "antd";

function EditInvoice() {
  let history = useHistory();
  let { id } = useParams();
  const [payDate, setPayDate] = useState(moment(new Date(), "DD/MM/YYYY"));
  const [purchaseInfo, setPurchaseInfo] = useState({});
  const [invoiceStatus,setInvoiceStatus] = useState("waiting");

  useEffect(async () => {
    const invoiceInfo = await getParam(`/invoice/info/${id}`, {});

    if (invoiceInfo.status == 200) {
      const {
        inv,
        pid,
        amount,
        invoiceDate,
        status,
        purchaseInfo,
        channel
      } = invoiceInfo.data.data;
      setPurchaseInfo({
        inv: inv,
        pid: purchaseInfo.pid,
        payType: purchaseInfo.payType,
        cname: purchaseInfo.customerInfo.name,
        cid: purchaseInfo.customerInfo.cid,
        revenue: amount,
        channel: channel 
      });
      setInvoiceStatus(status);
      setPayDate(invoiceDate);
    } else {
      message.error("ไม่พบข้อมูล", 3);
      history.push("/admin/invoice");
    }
  }, []);

  const submitEdit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const response = await putJson(`/invoice/update/${values.code.trim()}`, {
      pid: values.pid.trim(),
      invoiceDate: payDate,
      amount: values.revenue,
      channel: purchaseInfo.channel,
      status: invoiceStatus,
      images: "45444"
    });

    if (response.status == 200) {
      setSubmitting(false);
      message.success("เเก้ไขข้อมูลสำเร็จ", 3);
      history.push("/admin/invoice");
    } else {
      setSubmitting(false);
      message.error("การทำรายการไม่สำเร็จ", 3);
    }
  };

  function onChange(date, dateString) {
    setPayDate(dateString);
  }

  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];
  const days = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"];

  const locale = {
    localize: {
      month: (n) => months[n],
      day: (n) => days[n],
    },
    formatLong: {},
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">เเก้ไขข้อมูลใบเสร็จ</Card.Title>
              </Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    code: purchaseInfo.inv,
                    pid: purchaseInfo.pid,
                    payType: purchaseInfo.payType,
                    cname: purchaseInfo.cname,
                    cid: purchaseInfo.cid,
                    revenue: purchaseInfo.revenue,
                  }}
                  onSubmit={submitEdit}
                  enableReinitialize={true}
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
                              readOnly
                            ></Form.Control>
                            {errors.code && touched.code ? (
                              <span className="text-danger">{errors.code}</span>
                            ) : null}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <Form.Group>
                            <h5>รหัสการสั่งซื้อ</h5>
                            <Form.Control
                              placeholder="SOxxxxxx"
                              type="text"
                              name="pid"
                              onChange={handleChange}
                              value={values.pid}
                              readOnly
                            ></Form.Control>
                            {errors.pid && touched.pid ? (
                              <span className="text-danger">{errors.pid}</span>
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
                              readOnly
                            ></Form.Control>
                          </Form.Group>
                          {errors.revenue && touched.revenue ? (
                            <span className="text-danger">
                              {errors.revenue}
                            </span>
                          ) : null}
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <Form.Group>
                            <h5>วิธีการชำระเงิน</h5>
                            <Radio.Group
                              defaultValue="cash"
                              size="large"
                              onChange={(e)=>setPurchaseInfo({...purchaseInfo,channel:e.target.value})}
                              value={purchaseInfo.channel}
                            >
                              <Radio.Button value="cash">เงินสด</Radio.Button>
                              <Radio.Button value="credit">
                                บัตรเครดิต
                              </Radio.Button>
                              <Radio.Button value="cheque">เช็ค</Radio.Button>
                            </Radio.Group>
                          </Form.Group>
                        </Col>
                        <Col md="6">
                          <Form.Group>
                            <h5>สถานะการชำระเงิน</h5>
                            <Radio.Group
                              size="large"
                              name="status"
                              onChange={(e)=>setInvoiceStatus(e.target.value)}
                              value={invoiceStatus}
                            >
                              <Radio.Button value="waiting">ยังไม่ชำระ</Radio.Button>
                              <Radio.Button value="success">
                                ชำระเรียบร้อย
                              </Radio.Button>
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
                            เเก้ไขรายการ
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
    </>
  );
}

export default EditInvoice;
