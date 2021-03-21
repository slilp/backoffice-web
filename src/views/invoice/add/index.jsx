import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { postJson, getParam } from "../../../axios";
import moment from "moment";
import { message, DatePicker, Modal, Radio } from "antd";
import FindPurchase from "../../findPurchase";
import { getBalance } from "./service";


function AddInvoice() {
  let history = useHistory();
  const [payDate, setPayDate] = useState(moment(new Date(), "DD/MM/YYYY"));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [transaction, setTransaction] = useState({});
  const [purchaseInfo, setPurchaseInfo] = useState({ balance: 0 });

  const AddSchema = Yup.object().shape({
    code: Yup.string().required("กรุณากรอกข้อมูล"),
    pid: Yup.string().required("กรุณากรอกข้อมูล"),
    revenue: Yup.number().test(
      "เกินจำนวนเงินคงเหลือที่ต้องชำระ",
      "เกินจำนวนเงินคงเหลือที่ต้องชำระ",
      (value) => value <= purchaseInfo.balance
    ),
  });

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

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleOk = async (id, customerInfo) => {
    const balance = await getBalance(id);
    setPurchaseInfo({
      cid: customerInfo.cid,
      cname: customerInfo.name,
      balance: balance,
      pid: id,
    });
    setIsModalVisible(false);
  };

  return (
    <>
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
                    code: transaction.inv,
                    pid: purchaseInfo.pid,
                    payType: "cash",
                    cname: purchaseInfo.cname,
                    cid: purchaseInfo.cid,
                    revenue: 0,
                    waitingRevenue: purchaseInfo.balance,
                  }}
                  validationSchema={AddSchema}
                  onSubmit={submitAdd}
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
                              onChange={(e)=> { setTransaction({inv:e.target.value})  ;handleChange(e); } }
                              value={values.code}
                            ></Form.Control>
                            {errors.code && touched.code ? (
                              <span className="text-danger">{errors.code}</span>
                            ) : null}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <Button
                            type="button"
                            variant="info"
                            size="sm"
                            className="m-2"
                            onClick={showModal}
                          >
                            <i class="fas fa-search-plus ml-1"></i>
                            <span className="ml-1 h5 font-kanit">
                              ค้นหารหัสการสั่งซื่อ
                            </span>
                          </Button>
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
                            ></Form.Control>
                          </Form.Group>
                          {errors.revenue && touched.revenue ? (
                            <span className="text-danger">
                              {errors.revenue}
                            </span>
                          ) : null}
                        </Col>
                        <Col md="6">
                          <Form.Group>
                            <h5>จำนวนเงินคงเหลือที่ต้องชำระ</h5>
                            <Form.Control
                              type="number"
                              name="waitingRevenue"
                              onChange={handleChange}
                              value={values.waitingRevenue}
                              readOnly
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
      <Modal
        title="ค้นหารายการ"
        visible={isModalVisible}
        className="font-kanit"
        onCancel={handleCancel}
        cancelText={"ยกเลิก"}
        okButtonProps={{ style: { display: "none" } }}
        width={800}
      >
        <FindPurchase handleModal={handleOk}></FindPurchase>
      </Modal>
    </>
  );
}

export default AddInvoice;
