import React, { useState , useEffect } from "react";
import {
  Table,
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import TableProduction from "./table";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import {getParam} from "../../axios"

function Production() {
  let history = useHistory();
  const [waitingCount,setWaitingCount] = useState(0);

  const [search, setSearch] = useState({
    sCode: "",
    sName: "",
    sStatus: "",
  });

  useEffect(async ()=>{
    const response  = await getParam("/purchase/count/waiting");
    setWaitingCount(response.data.data);
  },[]);  

  const submitSearch = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    setSearch({
      ...search,
      sCode: values.code,
      sName: values.name,
      sStatus: values.status,
    });
    setSubmitting(false);
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-info">
                      <i className="nc-icon nc-credit-card text-info"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category font-kanit">รอสร้างรายการชำระเงิน</p>
                      <Card.Title as="h4">
                        {waitingCount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          <span className="ml-1">รายการ</span>
                      </Card.Title>
                    
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  อัพเดท
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">ค้นหารายการสั่งซื้อ</Card.Title>
              </Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    code: "",
                    name: "",
                    status: "",
                  }}
                  onSubmit={submitSearch}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    resetForm,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md="6">
                          <Form.Group>
                            <h5>รหัสรายการ</h5>
                            <Form.Control
                              placeholder="SOxxxxxx"
                              type="text"
                              name="code"
                              onChange={handleChange}
                              value={values.code}
                            ></Form.Control>
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
                          </Form.Group>
                        </Col>
                        <Col md="4">
                          <Form.Group>
                            <h5>สถานะรายการ</h5>
                            <Form.Control
                              type="text"
                              size="sm"
                              as="select"
                              name="status"
                              onChange={handleChange}
                              value={values.status}
                            >
                              <option value="">ทั้งหมด</option>
                              <option value="waiting">ชำระเงินยังไม่ครบ</option>
                              <option value="success">ชำระเงินครบเเล้ว</option>
                            </Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="3" lg="2">
                          <br></br>
                          <Button
                            className="btn-fill pull-right"
                            type="submit"
                            variant="primary"
                          >
                            <i className="fas fa-search-plus mr-1"></i>
                            ค้นหารายการ
                          </Button>
                        </Col>
                        <Col md="3" lg="2">
                          <br></br>
                          <Button
                            className="btn-fill pull-right"
                            variant="info"
                            onClick={() => {
                              resetForm();
                              setSearch({
                                ...search,
                                sCode: "",
                                sName: "",
                                sStatus: "",
                              });
                            }}
                          >
                            <i className="fas fa-reply mr-1"></i>
                            ล้างการค้นหา
                          </Button>
                        </Col>
                        <Col md="3" lg="2">
                          <br></br>
                          <Button
                            className="btn-fill pull-right"
                            type="submit"
                            variant="warning"
                            onClick={() => history.push("/admin/addp")}
                          >
                            <i className="far fa-plus-square mr-1"></i>
                            เพิ่มรายการสั่งซื้อ
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
          <Col md="12">
            <TableProduction
              sCode={search.sCode}
              sName={search.sName}
              sStatus={search.sStatus}
            ></TableProduction>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Production;
