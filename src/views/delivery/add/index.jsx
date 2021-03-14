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
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { postJson , getParam } from "../../../axios";
import { Select, Radio, message } from "antd";

const AddSchema = Yup.object().shape({
  code: Yup.string().required("กรุณากรอกข้อมูล"),
  cname: Yup.string().required("กรุณากรอกข้อมูล")
  .notOneOf([Yup.ref("ไม่พบข้อมูล")], "กรุณาเลือกข้อมูลที่ถูกต้อง"),
  cid: Yup.string().required("กรุณากรอกข้อมูล")
  .notOneOf([Yup.ref("ไม่พบข้อมูล")], "กรุณาเลือกข้อมูลที่ถูกต้อง"),
  location: Yup.string().required("กรุณากรอกข้อมูล")
  .notOneOf([Yup.ref("ไม่พบข้อมูล")], "กรุณาเลือกข้อมูลที่ถูกต้อง"),
});

const searchTransaction = async (search) => {
  const res = await getParam(`/purchase/search/0/1`, {
    pid: search || "",
  });
  if (res.status == 200) {
    if (res.data.data.count != 0) {
      const customer = await getParam(`/customer/info/${res.data.data.rows[0].customerInfo.cid}`, {});
      if(customer.status == 200){
        return customer.data.data
      }else{
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
};

function AddDelivery() {
  let history = useHistory();
  const [openOption, setOpenOption] = useState(false);
  const [transportType, setTransportType] = useState("self");

  const submitAdd = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const response = await postJson("/purchase/add", {
      pid: values.code,
      revenue: values.revenue,
      sale: values.sale,
      cid: values.cid,
    });

    if (response.status == 200) {
      setSubmitting(false);
      message.success("เพิ่มข้อมูลสำเร็จ", 3);
      history.push("/admin/production");
    } else {
      setSubmitting(false);
      message.error("การทำรายการไม่สำเร็จ", 3);
    }
  };

  const selectTransport = (e) => {
    setTransportType(e.target.value);
    setOpenOption(!openOption);
  };

  const autoCompleteCustomer = async (e, handleChange, setFieldValue) => {
    handleChange(e);
    console.log(e.target.value);
    if (e.target.value.length > 5) {
      const customerInfo = await searchTransaction(e.target.value);
      console.log(JSON.stringify(customerInfo));
      if(customerInfo){
        setFieldValue("cid", customerInfo.cid);
        setFieldValue("cname", customerInfo.name);
        setFieldValue("transportLocation", customerInfo.deliveryLocation);
        setFieldValue("location", customerInfo.location);
      }else{
        setFieldValue("cid", "ไม่พบข้อมูล");
        setFieldValue("cname", "ไม่พบข้อมูล");
        setFieldValue("location", "ไม่พบข้อมูล");
      }
    } else{
      setFieldValue("cid", "");
      setFieldValue("cname", "");
      setFieldValue("transportLocation", "");
      setFieldValue("location", "");
    }
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">สร้างข้อมูลขนส่งใหม่</Card.Title>
              </Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    code: "",
                    cid: "",
                    cname: "",
                    transportType: "self",
                    transportName: "",
                    transportLocation: "",
                    note: "",
                    location:""
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
                            <h5>รหัสการสั่งซื้อ</h5>
                            <Form.Control
                              placeholder="รหัสการสั่งซื้อ"
                              type="text"
                              name="code"
                              onChange={(e)=>autoCompleteCustomer(e,handleChange,setFieldValue)}
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
                            {errors.cid && touched.cid ? (
                              <span className="text-danger">
                                {errors.cid}
                              </span>
                            ) : null}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Col md="6">
                        <Form.Group>
                          <h5>ที่อยู่จัดส่ง</h5>
                          <Form.Control
                            type="text"
                            as="textarea"
                            rows={3}
                            name="location"
                            onChange={handleChange}
                            value={values.location}
                            readOnly
                          ></Form.Control>
                        </Form.Group>
                      </Col>

                      <h5>วิธีการจัดส่ง</h5>

                      <Radio.Group
                        defaultValue="self"
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
                              <Form.Group>
                                <h5>ที่อยู่ขนส่ง</h5>
                                <Form.Control
                                  placeholder="ที่อยู่ขนส่ง"
                                  type="text"
                                  as="textarea"
                                  col={3}
                                  name="transportLocation"
                                  onChange={handleChange}
                                  value={values.transportLocation}
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
                          >
                            <i className="far fa-plus-square mr-1"></i>
                            เพิ่มข้อมูลขนส่ง
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

export default AddDelivery;
