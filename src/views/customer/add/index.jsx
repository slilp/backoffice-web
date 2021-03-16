import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { postJson } from "../../../axios";
import { Select, message } from "antd";
const { Option } = Select;

const provinceData = ["กรุงเทพ", "นนทบุรี"];
const cityData = {
  กรุงเทพ: ["บางซื่อ", "บางซ่อน", "ดุสิต"],
  นนทบุรี: ["เยาวราช", "สีลม", "พญาไท"],
};
const districtData = {
  บางซื่อ: ["วงศ์สว่าง"],
  ดุสิต: ["rrr"],
  บางซ่อน: ["พรุดินนา"],
  เยาวราช: ["ทรายขาว","ทรายเขียว"],
  สีลม:["ddddd"],
  พญาไท:["qqqqq"]
};
const zipCodeData = {
  วงศ์สว่าง: ["10800"],
  พรุดินนา: ["811ggdfdssds70"],
  ทรายขาว: ["ขาวววว","จ้าาาา"],
  ทรายเขียว: ["เขียวว"],
  rrr:["dddddd"],
  ddddd :["wwwww"],
  qqqqq:["iiii"]
};



const SignupSchema = Yup.object().shape({
  code: Yup.string().required("กรุณากรอกข้อมูล"),
  name: Yup.string().required("กรุณากรอกข้อมูล"),
  tel: Yup.string().required("กรุณากรอกข้อมูล"),
  email: Yup.string().required("กรุณากรอกข้อมูล"),
  location: Yup.string().required("กรุณากรอกข้อมูล"),
});

function AddCustomer() {
  let history = useHistory();
  const [cities, setCities] = useState(cityData[provinceData[0]]);
  const [secondCity, setSecondCity] = useState(cityData[provinceData[0]]);
  const [secondCityList,setSecondCityList] = useState(districtData[cityData[provinceData[0]][0]]);
  const [thirdCity, setThirdCity] = useState(districtData[cityData[provinceData[0]][0]][0]);
  const [thirdCityList, setThirdCityList] = useState(zipCodeData[districtData[cityData[provinceData[0]][0]][0]]);
  const [forthCity, setForthCity] = useState(zipCodeData[districtData[cityData[provinceData[0]][0]][0]][0]);

  const submitAdd = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const response = await postJson("/customer/add", {
      cid: values.code,
      name: values.name,
      type: values.type,
      tel: values.tel,
      email: values.email,
      location: values.location,
      deliveryLocation: values.locationDeliver,
    });

    if (response.status == 200) {
      setSubmitting(false);
      message.success("เพิ่มข้อมูลสำเร็จ", 3);
      history.push("/admin/user");
    } else {
      setSubmitting(false);
      message.error("การทำรายการไม่สำเร็จ", 3);
    }
  };

  const handleProvinceChange = (value) => {
    setCities(cityData[value]);
    setSecondCity(cityData[value][0]);
    setSecondCityList(districtData[cityData[value][0]]);
    setThirdCity(districtData[cityData[value][0]][0]);
    setThirdCityList(zipCodeData[districtData[cityData[value][0]][0]]);
    setForthCity(zipCodeData[districtData[cityData[value][0]][0]][0]);
  };

  const onSecondCityChange = (value) => {
    setSecondCity(value);
    setSecondCityList(districtData[value]);
    setThirdCity(districtData[value][0]);
    setThirdCityList(zipCodeData[districtData[value][0]]);
    setForthCity(zipCodeData[districtData[value][0]][0]);
  };

  const onThirdCityChange = (value) => {
    setThirdCity(value);
    setThirdCityList(zipCodeData[value]);
    setForthCity(zipCodeData[value][0]);
  };

  const onForthCityChange = (value) => {
    setForthCity(value);
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">สร้างลูกค้าใหม่</Card.Title>
              </Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    code: "",
                    name: "",
                    type: "INN",
                    tel: "",
                    location: "",
                    locationDeliver: "",
                    email: "",
                  }}
                  validationSchema={SignupSchema}
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
                          <Select
                            defaultValue={provinceData[0]}
                            style={{ width: 120 }}
                            onChange={handleProvinceChange}
                          >
                            {provinceData.map((province) => (
                              <Option key={province}>{province}</Option>
                            ))}
                          </Select>
                          <Select
                            style={{ width: 120 }}
                            value={secondCity}
                            onChange={onSecondCityChange}
                          >
                            {cities.map((city) => (
                              <Option key={city}>{city}</Option>
                            ))}
                          </Select>
                          <Select
                            style={{ width: 120 }}
                            value={thirdCity}
                            onChange={onThirdCityChange}
                          >
                            {secondCityList.map((city) => (
                              <Option key={city}>{city}</Option>
                            ))}
                          </Select>

                          <Select
                            style={{ width: 120 }}
                            value={forthCity}
                            onChange={onForthCityChange}
                          >
                            {thirdCityList.map((city) => (
                              <Option key={city}>{city}</Option>
                            ))}
                          </Select>

                          {/* <Form.Group>
                            <h5>ที่อยู่บริษัท</h5>
                            <Form.Control
                              type="text"
                              as="textarea"
                              rows={3}
                              name="location"
                              onChange={handleChange}
                              value={values.location}
                            ></Form.Control>
                            {errors.location && touched.location ? (
                              <span className="text-danger">
                                {errors.location}
                              </span>
                            ) : null}
                          </Form.Group> */}
                        </Col>
                        <Col md="6">
                          <Form.Group>
                            <h5>ที่อยู่จัดส่ง ( ถ้ามี )</h5>
                            <Form.Control
                              type="text"
                              as="textarea"
                              rows={3}
                              name="locationDeliver"
                              onChange={handleChange}
                              value={values.locationDeliver}
                            ></Form.Control>
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
                            // onClick={() => history.push("/admin/user")}
                          >
                            <i className="far fa-plus-square mr-1"></i>
                            เพิ่มลูกค้าใหม่
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

export default AddCustomer;
