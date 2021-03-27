import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { message, DatePicker, Modal, Radio } from "antd";
import {
  getLogisticInfo,
  getTransporterList,
  getCustomerInfo,
  getPurchaseInfo,
  editLogisticTrans,
} from "./service";
import AddressSelector from "../../../components/fixAddress";
import FindInvoice from "../../findInvoice";

function EditLogistic() {
  let history = useHistory();
  let { id } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [payDate, setPayDate] = useState(moment(new Date(), "DD/MM/YYYY"));
  const [logisticInfo, setLogisticInfo] = useState({});
  const [transporterList, setTransporterList] = useState([{}]);
  const [logisticStatus, setLogisticStatus] = useState("waiting");
  const [deliveryType, setDeliveryType] = useState(false);
  const [purchaseInfo, setPurchaseInfo] = useState({
    transportInfo: {},
  });
  const [customerInfo, setCustomerInfo] = useState({
    billTo: {},
    shipTo: {},
  });

  useEffect(async () => {
    const {
      logisticInfo,
      status,
      deliveryDate,
      customerId,
      purchaseId,
      invoiceId,
      transporterId,
    } = await getLogisticInfo(id);
    const transporters = await getTransporterList();
    setTransporterList(transporters);
    const customerInfo = await getCustomerInfo(customerId);
    const {
      cid,
      name,
      type,
      tel,
      email,
      billToLocation,
      shipToLocation,
      billTo,
      shipTo,
    } = customerInfo;
    const purchaseInfo = await getPurchaseInfo(purchaseId);
    const {
      transportType,
      transportLocation,
      note,
      transportInfo,
    } = purchaseInfo;
    setLogisticInfo({ inv: invoiceId, tid: transporterId });
    setLogisticStatus(status);
    setPayDate(deliveryDate);
    if (transportType == "transporter") {
      setPurchaseInfo({
        transportLocation: transportLocation,
        transportInfo: transportInfo,
      });
      setDeliveryType(true);
    }

    setCustomerInfo({
      cid: cid,
      cname: name,
      type: type,
      tel: tel,
      shipToLocation: shipToLocation,
      billToLocation: billToLocation,
      email: email,
      billTo: billTo,
      shipTo: shipTo,
    });
  }, []);

  const submitEdit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const response = await editLogisticTrans({
      lid: id,
      inv: logisticInfo.inv,
      deliveryDate: payDate,
      logisticStatus: logisticStatus,
    });

    if (response.status == 200) {
      setSubmitting(false);
      message.success("เเก้ไขข้อมูลสำเร็จ", 3);
      history.push("/admin/logistic");
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

  const handleOk = async (invoiceId) => {
    setLogisticInfo({ ...logisticInfo, inv: invoiceId });
    setIsModalVisible(false);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">เเก้ไขรายการขนส่ง</Card.Title>
              </Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    inv: logisticInfo.inv,
                    tid: logisticInfo.tid,
                    cid: customerInfo.cid,
                    cname: customerInfo.cname,
                    shipToLocation: customerInfo.shipToLocation,
                    billToLocation: customerInfo.billToLocation,
                    transportLocation: purchaseInfo.transportLocation,
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
                            <h5>สถานะการขนส่ง</h5>
                            <Radio.Group
                              size="large"
                              onChange={(e) =>
                                setLogisticStatus(e.target.value)
                              }
                              value={logisticStatus}
                            >
                              <Radio.Button value="waiting">
                                รอการขนส่ง
                              </Radio.Button>
                              <Radio.Button value="late">
                                เกินเวลาขนส่ง
                              </Radio.Button>
                              <Radio.Button value="cancel">
                                ยกเลิกการขนส่ง
                              </Radio.Button>
                              <Radio.Button value="success">
                                ขนส่งเรียบร้อย
                              </Radio.Button>
                            </Radio.Group>
                          </Form.Group>
                        </Col>
                        <Col md="3">
                          <Card className="card-stats">
                            <Card.Body>
                              <Row>
                                <Col xs="5">
                                  <div className="icon-big text-center icon-warning">
                                    <i className="nc-icon nc-notes text-warning"></i>
                                  </div>
                                </Col>
                                <Col xs="7">
                                  <div className="numbers">
                                    <Card.Title as="h5">
                                      ดาวน์โหลดข้อมูล
                                    </Card.Title>
                                    <Button
                                      type="button"
                                      size="sm"
                                      variant="primary"
                                    >
                                      <i className="far fa-plus-square mr-1"></i>
                                      ดาวน์โหลด
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            </Card.Body>
                            <Card.Footer>
                              <hr></hr>
                            </Card.Footer>
                          </Card>
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
                            {errors.inv && touched.inv ? (
                              <span className="text-danger">{errors.inv}</span>
                            ) : null}
                          </Form.Group>
                        </Col>
                        <Col md="6" className="mt-4">
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
                      <h4>ข้อมูลการขนส่ง</h4>
                      <Row>
                        <Col md="6">
                          <Form.Group>
                            <h5>กำหนดการส่งสินค้า</h5>
                            <DatePicker
                              size="large"
                              defaultValue={moment(new Date())}
                              // format={"DD/MM/YYYY"}
                              locale={locale}
                              onChange={onChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md="6">
                          <h5>ผู้ขนส่ง</h5>
                          <Form.Group>
                            <Form.Control
                              type="text"
                              name="tid"
                              size="sm"
                              as="select"
                              value={values.tid}
                              readOnly
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
                          <h5>ที่อยู่ตามการชำระเงิน</h5>
                          <AddressSelector
                            initProvince={customerInfo.billTo.province}
                            initSubDistrict={customerInfo.billTo.subDistrict}
                            initDistrict={customerInfo.billTo.district}
                            initZipCode={customerInfo.billTo.zipCode}
                          ></AddressSelector>
                          <br></br>
                          <Form.Group>
                            <Form.Control
                              type="text"
                              as="textarea"
                              rows={3}
                              name="billToLocation"
                              maxLength="500"
                              onChange={handleChange}
                              value={values.billToLocation}
                              readOnly
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col md="6">
                          <h5>ที่อยู่จัดส่ง</h5>
                          <AddressSelector
                            initProvince={customerInfo.shipTo.province}
                            initSubDistrict={customerInfo.shipTo.subDistrict}
                            initDistrict={customerInfo.shipTo.district}
                            initZipCode={customerInfo.shipTo.zipCode}
                          ></AddressSelector>
                          <br></br>
                          <Form.Group>
                            <Form.Control
                              type="text"
                              as="textarea"
                              rows={3}
                              name="shipToLocation"
                              maxLength="500"
                              onChange={handleChange}
                              value={values.shipToLocation}
                              readOnly
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          {deliveryType && (
                            <>
                              <h5>ที่อยู่สำหรับขนส่ง</h5>
                              <AddressSelector
                                initSubDistrict={
                                  purchaseInfo.transportInfo.subDistrict
                                }
                                initDistrict={
                                  purchaseInfo.transportInfo.district
                                }
                                initZipCode={purchaseInfo.transportInfo.zipCode}
                              ></AddressSelector>
                              <br></br>
                              <Form.Group>
                                <Form.Control
                                  type="text"
                                  as="textarea"
                                  rows={3}
                                  name="transportLocation"
                                  maxLength="500"
                                  onChange={handleChange}
                                  value={values.transportLocation}
                                  readOnly
                                ></Form.Control>
                              </Form.Group>
                            </>
                          )}
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
      <Modal
        title="ค้นหารายการ"
        visible={isModalVisible}
        className="font-kanit"
        onCancel={handleCancel}
        cancelText={"ยกเลิก"}
        okButtonProps={{ style: { display: "none" } }}
        width={800}
      >
        <FindInvoice handleModal={handleOk}></FindInvoice>
      </Modal>
    </>
  );
}

export default EditLogistic;
