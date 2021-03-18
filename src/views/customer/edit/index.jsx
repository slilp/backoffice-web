import React, { useState , useEffect , useRef } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useHistory , useParams } from "react-router-dom";
import { useFormikContext , Formik } from "formik";
import * as Yup from "yup";
import {  putJson , getParam } from "../../../axios";
import { message } from "antd";
import AddressSelector from "../../../components/address";

const editSchema = Yup.object().shape({
  code: Yup.string().required("กรุณากรอกข้อมูล"),
  name: Yup.string().required("กรุณากรอกข้อมูล"),
  tel: Yup.string().required("กรุณากรอกข้อมูล"),
  email: Yup.string().required("กรุณากรอกข้อมูล")
});

function EditCustomer() {

  let history = useHistory();
  let { id } = useParams();
  const [billToId, setBillToId] = useState(1);
  const [shipToId, setShipToId] = useState(1);
  const [deliveryToId, setDeliveryToId] = useState(1);
  const [addDeliver, setAddDeliver] = useState(false);
  const [info,setInfo] = useState({
    billTo:{},
    shipTo:{},
    deliveryTo:{}
  });

   useEffect(async ()=> {

    const res = await getParam(`/customer/info/${id}`);

    if(res.status == 200){

        const {cid, name , type , tel , email ,billToLocation , shipToLocation , deliveryLocation , billTo , shipTo , deliveryTo} = res.data.data;
        setBillToId(res.data.data.billToLocationId);
        setShipToId(res.data.data.shipToLocationId);
        if(res.data.data.deliveryLocationId){
          setDeliveryToId(res.data.deliveryLocationId);
          setAddDeliver(true);
        }
        setInfo({
          code:  cid ,
          name: name,
          type: type,
          tel: tel,
          shipToLocation: shipToLocation,
          billToLocation: billToLocation,
          deliveryToLocation: deliveryLocation,
          email: email,
          billTo : billTo,
          shipTo : shipTo ,
          deliveryTo : deliveryTo || {}
        });

    }else{
      message.error("ไม่พบข้อมูล", 3);
      history.push("/admin/user");
    }

   },[]);

  const submitEdit = async (values, { setSubmitting, resetForm }) => {

    setSubmitting(true);
    const response = await putJson(`/customer/update/${values.code}`, {
      name: values.name,
      type: values.type,
      tel: values.tel,
      email: values.email,
      billToLocationId: billToId,
      billToLocation: values.billToLocation,
      shipToLocationId: shipToId,
      shipToLocation: values.shipToLocation,
      deliveryLocationId: addDeliver? deliveryToId : null,
      deliveryLocation: addDeliver? values.deliveryToLocation : null,
    });

    if (response.status == 200) {
      setSubmitting(false);
      message.success("เเก้ไขข้อมูลสำเร็จ", 3);
      history.push("/admin/user");
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
                <Card.Title as="h4">เเก้ไขข้อมูลลูกค้า</Card.Title>
              </Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    code: info.code,
                    name: info.name,
                    type: info.type,
                    tel: info.tel,
                    shipToLocation: info.shipToLocation,
                    billToLocation: info.billToLocation,
                    deliveryToLocation: info.deliveryToLocation,
                    email: info.email,
                  }}
                  enableReinitialize={true}
                  validationSchema={editSchema}
                  onSubmit={submitEdit}
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
                        <Col md="6">
                          <Form.Group>
                            <h5>รหัสลูกค้า</h5>
                            <Form.Control
                              placeholder="รหัสลูกค้า"
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
                            <h5>ชื่อลูกค้า</h5>
                            <Form.Control
                              placeholder="ชื่อลูกค้า"
                              type="text"
                              name="name"
                              onChange={handleChange}
                              value={values.name}
                            ></Form.Control>
                            {errors.name && touched.name ? (
                              <span className="text-danger">{errors.name}</span>
                            ) : null}
                          </Form.Group>
                        </Col>
                        <Col md="4">
                          <Form.Group>
                            <h5>ประเภทลูกค้า</h5>
                            <Form.Control
                              type="text"
                              name="type"
                              size="sm"
                              as="select"
                              onChange={handleChange}
                              value={values.type}
                            >
                              <option>INN</option>
                              <option>INVV</option>
                            </Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <Form.Group>
                            <h5>เบอร์โทร</h5>
                            <Form.Control
                              placeholder="08xxxxxxxx"
                              type="text"
                              name="tel"
                              onChange={handleChange}
                              value={values.tel}
                            ></Form.Control>
                            {errors.tel && touched.tel ? (
                              <span className="text-danger">{errors.tel}</span>
                            ) : null}
                          </Form.Group>
                        </Col>
                        <Col md="6">
                          <Form.Group>
                            <h5>อีเมล</h5>
                            <Form.Control
                              type="text"
                              name="email"
                              onChange={handleChange}
                              value={values.email}
                            ></Form.Control>
                            {errors.tel && touched.tel ? (
                              <span className="text-danger">
                                {errors.email}
                              </span>
                            ) : null}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <h5>ที่อยู่ตามการชำระเงิน</h5>
                          <AddressSelector
                            setAddressId={setBillToId}
                            initProvince={info.billTo.province}
                            initSubDistrict={info.billTo.subDistrict}
                            initDistrict={info.billTo.district}
                            initZipCode={info.billTo.zipCode}
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
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col md="6">
                          <h5>ที่อยู่จัดส่ง</h5>
                          <AddressSelector
                            setAddressId={setShipToId}
                            initProvince={info.shipTo.province}
                            initSubDistrict={info.shipTo.subDistrict}
                            initDistrict={info.shipTo.district}
                            initZipCode={info.shipTo.zipCode}
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
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <h5>ที่อยู่สำหรับขนส่ง (ถ้ามี)</h5>
                          {addDeliver && (
                            <Button
                              type="button"
                              variant="info"
                              size="sm"
                              onClick={() => setAddDeliver(false)}
                            >
                              <i class="fas fa-minus ml-1"></i>
                              <span className="ml-1"></span>ลด
                            </Button>
                          )}
                          {!addDeliver && (
                            <Button
                              type="button"
                              variant="info"
                              size="sm"
                              onClick={() => setAddDeliver(true)}
                            >
                              <i class="fas fa-plus"></i>
                              <span className="ml-1">เพิ่ม</span>
                            </Button>
                          )}
                          {addDeliver && (
                            <>
                              <AddressSelector
                                setAddressId={setDeliveryToId}
                                initProvince={info.deliveryTo.province}
                                initSubDistrict={info.deliveryTo.subDistrict}
                                initDistrict={info.deliveryTo.district}
                                initZipCode={info.deliveryTo.zipCode}
                              ></AddressSelector>
                              <br></br>
                              <Form.Group>
                                <Form.Control
                                  type="text"
                                  as="textarea"
                                  rows={3}
                                  name="deliveryToLocation"
                                  maxLength="500"
                                  onChange={handleChange}
                                  value={values.deliveryToLocation}
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
                            className="btn-fill pull-right"
                            type="submit"
                            variant="success"
                            disabled={isSubmitting}
                          >
                            <i className="far fa-plus-square mr-1"></i>
                            เเก้ไขข้อมูลลูกค้า
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

export default EditCustomer;
