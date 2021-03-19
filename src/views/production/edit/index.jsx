import React, { useState, useEffect } from "react";
import {
  Table,
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { putJson } from "../../../axios";
import { Modal, message, Radio } from "antd";
import { searchCustomer, getAllSaleList } from "../add/service";
import FixAddressSelector from "../../../components/fixAddress";
import AddressSelector from "../../../components/address";
import FindCustomer from "../../findCustomer";
import {getParam} from "../../../axios";

const EditSchema = Yup.object().shape({
  cid: Yup.string().required("กรุณากรอกข้อมูล"),
  cname: Yup.string().required("กรุณากรอกข้อมูล"),
});

function EditProduction() {
  let history = useHistory();
  let { id } = useParams();
  const [customer, setCustomer] = useState({
    shipTo: {},
  });
  const [transaction, setTransaction] = useState({ revenue: 0 });
  const [saleList, setSaleList] = useState([{}]);
  const [openOption, setOpenOption] = useState(false);
  const [transportType, setTransportType] = useState("self");
  const [shipToId, setShipToId] = useState(1);
  const [deliverToId, setDeliverToId] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(async () => {
    const sales = await getAllSaleList();
    setSaleList(sales);

    const res = await getParam(`/purchase/info/${id}`);

    if (res.status == 200) {
      const {
        pid,
        sid,
        transportType,
        transportName,
        transportLocationId,
        transportLocation,
        note,
        revenue,
        customerInfo,
        transportInfo
       
      } = res.data.data;

      setShipToId(transportLocationId);
      setTransportType(transportType);
      setTransaction({
        pid : pid ,
        revenue:revenue,
        note: note ,
        transportName : transportName,
        sid : sid
      });
      setCustomer({
        name: customerInfo.name,
        cid : customerInfo.cid,
        deliveryLocation : transportLocation,
        shipToLocation : customerInfo.shipToLocation,
        shipTo : customerInfo.shipTo,
        deliverTo :  transportInfo
      }
      )
      if(transportType == "transporter")   setOpenOption(!openOption);

    } else {
      message.error("ไม่พบข้อมูล", 3);
      history.push("/admin/production");
    }
  }, []);

  const submitEdit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const response = await putJson(`/purchase/update/${values.code}`, {
      revenue: values.revenue,
      sid: values.sale,
      cid: values.cid,
      transportLocationId: transportType == "self" ? null : deliverToId,
      transportLocation: transportType == "self" ? null : values.transportLocation,
      transportType: transportType,
      transportName: transportType == "self" ? null : values.transportName,
      note: values.note,
    });

    if (response.status == 200) {
      setSubmitting(false);
      message.success("เเก้ไขข้อมูลสำเร็จ", 3);
      history.push("/admin/production");
    } else {
      setSubmitting(false);
      message.error("การทำรายการไม่สำเร็จ", 3);
    }
  };

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleOk = async (id) => {
    const info = await searchCustomer(id);
    setCustomer(info);
    setIsModalVisible(false);
  };

  const selectTransport = (e) => {
    setTransportType(e.target.value);
    setOpenOption(!openOption);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">สร้างรายการสั่งซื้อใหม่</Card.Title>
              </Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    code: transaction.pid,
                    name: "",
                    sale: transaction.sid,
                    revenue: transaction.revenue,
                    cname: customer.name,
                    cid: customer.cid,
                    transportLocation: customer.deliveryLocation,
                    shipToLocation: customer.shipToLocation,
                    transportName: transaction.transportName,
                    note: transaction.note,
                  }}
                  validationSchema={EditSchema}
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
                    setSubmitting,
                    resetForm,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="6">
                          <Form.Group>
                            <h5>รหัสการสั่งซื้อ</h5>
                            <Form.Control
                              placeholder="SOxxxxxxx"
                              type="text"
                              name="code"
                              onChange={(e) => {
                                setTransaction({
                                  ...transaction,
                                  cid: e.target.value,
                                });
                                handleChange(e);
                              }}
                              value={values.code}
                              readOnly
                            ></Form.Control>
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
                              ค้นหาลูกค้า
                            </span>
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <h5 className="h5 font-kanit">รหัสลูกค้า</h5>
                          <Form.Group>
                            <Form.Control
                              placeholder="CSxxxxxxx"
                              type="text"
                              name="cid"
                              onChange={(e) =>
                                autoCompleteCustomer(
                                  e,
                                  handleChange,
                                  setFieldValue
                                )
                              }
                              value={values.cid}
                              readOnly
                            ></Form.Control>
                            {errors.cid && touched.cid ? (
                              <span className="text-danger">{errors.cid}</span>
                            ) : null}
                          </Form.Group>
                        </Col>
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
                            {errors.cname && touched.cname ? (
                              <span className="text-danger">
                                {errors.cname}
                              </span>
                            ) : null}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <h5>พนักงานขาย</h5>
                          <Form.Group>
                            <Form.Control
                              type="text"
                              name="sale"
                              size="sm"
                              as="select"
                              onChange={handleChange}
                              value={values.sale}
                            >
                              {saleList.map((v) => (
                                <option value={v.sid}>
                                  {v.title} {v.firstName} {v.lastName}
                                </option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                        </Col>
                        <Col md="6">
                          <Form.Group>
                            <h5>ยอดสินค้า</h5>
                            <Form.Control
                              placeholder="100xxx"
                              type="number"
                              name="revenue"
                              onChange={(e) => {
                                setTransaction({
                                  ...transaction,
                                  revenue: e.target.value,
                                });
                                handleChange(e);
                              }}
                              value={values.revenue}
                            ></Form.Control>
                            {errors.revenue && touched.revenue ? (
                              <span className="text-danger">
                                {errors.revenue}
                              </span>
                            ) : null}
                          </Form.Group>
                        </Col>
                      </Row>

                      <h5>วิธีการจัดส่ง</h5>

                      <Radio.Group
                        value={transportType}
                        onChange={selectTransport}
                        size="large"
                        
                      >
                        <Radio.Button value="self">จัดส่งเอง</Radio.Button>
                        <Radio.Button value="transporter">
                          ส่งที่ขนส่ง
                        </Radio.Button>
                      </Radio.Group>
                      <br></br>
                      <br></br>
                      {!openOption && (
                        <>
                          <h5>จัดส่งเอง</h5>
                          <Row>
                            <Col md="6">
                              <h5>ที่อยู่จัดส่ง</h5>
                              <FixAddressSelector
                                setAddressId={setShipToId}
                                initProvince={customer.shipTo.province}
                                initSubDistrict={customer.shipTo.subDistrict}
                                initDistrict={customer.shipTo.district}
                                initZipCode={customer.shipTo.zipCode}
                              ></FixAddressSelector>
                              <br></br>
                              <Form.Group>
                                <Form.Control
                                  type="text"
                                  as="textarea"
                                  rows={3}
                                  name="shipToLocation"
                                  maxLength="500"
                                  onChange={handleChange}
                                  readOnly={true}
                                  value={values.shipToLocation}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col md="6">
                              <Form.Group>
                                <h5>Note ถึงคนส่งสินค้า</h5>
                                <Form.Control
                                  placeholder=""
                                  type="text"
                                  as="textarea"
                                  col={3}
                                  name="note"
                                  onChange={handleChange}
                                  value={values.note}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                          </Row>
                        </>
                      )}

                      {openOption && (
                        <>
                          <h5>ส่งที่ขนส่ง</h5>
                          <Row>
                            <Col md="6">
                              <Form.Group>
                                <h5>ขื่อขนส่ง</h5>
                                <Form.Control
                                  placeholder="ชื่อขนส่ง"
                                  type="text"
                                  name="transportName"
                                  onChange={handleChange}
                                  value={values.transportName}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <h5>ที่อยู่ขนส่ง</h5>
                              <Form.Group>
                                <AddressSelector
                                  setAddressId={setDeliverToId}
                                  initProvince={
                                    customer.deliveryTo
                                      ? customer.deliveryTo.province
                                      : null
                                  }
                                  initSubDistrict={
                                    customer.deliveryTo
                                      ? customer.deliveryTo.subDistrict
                                      : null
                                  }
                                  initDistrict={
                                    customer.deliveryTo
                                      ? customer.deliveryTo.district
                                      : null
                                  }
                                  initZipCode={
                                    customer.deliveryTo
                                      ? customer.deliveryTo.zipCode
                                      : null
                                  }
                                ></AddressSelector>
                                <br></br>
                                <Form.Control
                                  placeholder="ที่อยู่ขนส่ง"
                                  type="text"
                                  as="textarea"
                                  col={3}
                                  name="transportLocation"
                                  value={values.transportLocation}
                                  onChange={handleChange}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                          </Row>
                        </>
                      )}

                      <Row className="justify-content-center">
                        <Col md="4" lg="2">
                          <br></br>
                          <Button
                            className="btn-fill pull-right"
                            type="submit"
                            variant="success"
                            disabled={isSubmitting}
                          >
                            <i className="far fa-plus-square mr-1"></i>
                            เเก้ไขรายการสั่งซื้อ
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
        title="ค้นหาลูกค้า"
        visible={isModalVisible}
        className="font-kanit"
        onCancel={handleCancel}
        cancelText={"ยกเลิก"}
        okButtonProps={{ style: { display: "none" } }}
      >
        <FindCustomer handleModal={handleOk}></FindCustomer>
      </Modal>
    </>
  );
}

export default EditProduction;
