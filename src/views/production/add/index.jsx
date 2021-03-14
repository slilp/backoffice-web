import React from "react";
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
import { postJson } from "../../../axios";
import { message } from "antd";
import { getParam } from "../../../axios";

const AddSchema = Yup.object().shape({
  code: Yup.string().required("กรุณากรอกข้อมูล"),
  sale: Yup.string().required("กรุณากรอกข้อมูล"),
  cid: Yup.string().required("กรุณากรอกข้อมูล"),
  cname: Yup.string()
    .required("กรุณากรอกข้อมูล")
    .notOneOf([Yup.ref("not")], "กรุณาเลือกลูกค้าที่ถูกต้อง"),
});

const searchCustomer = async (search) => {
  const res = await getParam(`/customer/search/0/1`, {
    cid: search || "",
  });

  if (res.status == 200) {
    if (res.data.data.count != 0) {
      return res.data.data.rows[0].name;
    } else {
      return "not";
    }
  } else {
    return "";
  }
};

function AddProduction() {
  let history = useHistory();

  const submitAdd = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const response = await postJson("/purchase/add", {
      pid: `SO${values.code}`,
      revenue: values.revenue,
      sale: values.sale,
      cid: `CS${values.cid}`,
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

  const autoCompleteCustomer = async (e, handleChange, setFieldValue) => {
    handleChange(e);
    if (e.target.value.length > 5) {
      const name = await searchCustomer(e.target.value);
      setFieldValue("cname", name);
    } else {
      setFieldValue("cname", "");
    }
  };

  return (
    <div>
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
                    code: "",
                    name: "",
                    sale: "",
                    revenue: 0,
                    cname: "",
                    cid: "",
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
                              placeholder="SOxxxxxxx"
                              type="text"
                              name="code"
                              onChange={handleChange}
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
                            <h5>รหัสลูกค้า</h5>
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
                          <Form.Group>
                            <h5>พนักงานขาย</h5>
                            <Form.Control
                              placeholder="พนักงานขาย"
                              type="text"
                              name="sale"
                              onChange={handleChange}
                              value={values.sale}
                            ></Form.Control>
                            {errors.sale && touched.sale ? (
                              <span className="text-danger">{errors.sale}</span>
                            ) : null}
                          </Form.Group>
                        </Col>
                        <Col md="6">
                          <Form.Group>
                            <h5>ยอดสินค้า</h5>
                            <Form.Control
                              placeholder="100xxx"
                              type="number"
                              name="revenue"
                              onChange={handleChange}
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
                            เพิ่มรายการสั่งซื้อ
                          </Button>
                        </Col>
                        <Col md="4" lg="3">
                          <br></br>
                          <Button
                            className="btn-fill"
                            type="submit"
                            variant="primary"
                            disabled={isSubmitting}
                            // onClick={() => history.push("/admin/addd")}
                          >
                            <i className="fas fa-forward mr-1"></i>
                            ทำข้อมูลขนส่งต่อ
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

export default AddProduction;
