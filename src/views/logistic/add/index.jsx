import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { postJson } from "../../../axios";
import moment from "moment";
import { message, DatePicker, Modal, Radio } from "antd";
import { getAllTransporterList } from "./service";

const AddSchema = Yup.object().shape({
  inv: Yup.string().required("กรุณากรอกข้อมูล"),
});

function AddLogistic() {
  let history = useHistory();
  const [deliveryDate, setDeliveryPayDate] = useState(
    moment(new Date(), "DD/MM/YYYY")
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [logisticInfo, setLogisticInfo] = useState({});
  const [transporterList, setTransporterList] = useState([{}]);

  useEffect(async () => {
    const transporters = await getAllTransporterList();
    setTransporterList(transporters);
  }, []);

  const submitAdd = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const response = await postJson("/logistic/add", {
      inv: values.inv.trim(),
      tid: values.tid.trim(),
      deliveryDate: payDate,
    });

    if (response.status == 200) {
      setSubmitting(false);
      message.success("เพิ่มข้อมูลสำเร็จ", 3);
      history.push("/admin/logistic");
    } else {
      setSubmitting(false);
      message.error("การทำรายการไม่สำเร็จ", 3);
    }
  };

  function onChange(date, dateString) {
    setDeliveryPayDate(dateString);
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

  const handleOk = async (id, invoiceInfo) => {
    // setLogisticInfo({
    //   cid: customerInfo.cid,
    //   cname: customerInfo.name,
    //   balance: balance,
    //   pid: id,
    // });
    setIsModalVisible(false);
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">สร้างรายการขนส่ง</Card.Title>
              </Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    inv: logisticInfo.inv,
                    tid: logisticInfo.tid,
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
                          <Button
                            type="button"
                            variant="info"
                            size="sm"
                            className="m-2"
                            onClick={showModal}
                          >
                            <i class="fas fa-search-plus ml-1"></i>
                            <span className="ml-1 h5 font-kanit">
                              ค้นหารายการ
                            </span>
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <Form.Group>
                            <h5>รหัสใบเสร็จ</h5>
                            <Form.Control
                              placeholder="INVxxxxx"
                              name="inv"
                              onChange={handleChange}
                              value={values.inv}
                              type="text"
                              readOnly
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <Form.Group>
                            <h5>กำหนดการส่งสินค้า</h5>
                            <Form.Control
                              placeholder="06-03-2020 13:00"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col md="6">
                          <h5>ผู้ขนส่ง</h5>
                          <Form.Group>
                            <Form.Control
                              type="text"
                              name="sale"
                              size="sm"
                              as="select"
                              onChange={handleChange}
                              value={values.tid}
                            >
                              {transporterList.map((v) => (
                                <option value={v.tid}>
                                  {v.firstName} {v.lastName}
                                </option>
                              ))}
                            </Form.Control>
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
                            onClick={() => history.push("/admin/logistic")}
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

export default AddLogistic;
