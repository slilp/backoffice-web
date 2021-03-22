import React , {useEffect,useState} from "react";
import {
  Table,
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import TableLogistic from "./table";
import { useHistory } from "react-router-dom";
import Calendar from "./calendar";
import { Formik } from "formik";
import { getParam } from "../../axios";

function Logistic() {
  let history = useHistory();
  const [transporterList, setTransporterList] = useState([{}]);
  const [search, setSearch] = useState({
    sInv: "",
    sTid: "",
    sStatus: "",
  });

  useEffect(async () => {

    const transporters = await getParam("/transporter/all",{});

    setTransporterList(transporters.data.data);
  }, []);

  const submitSearch = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    setSearch({
      ...search,
      sInv: values.inv,
      sTid: values.tid,
      sStatus: values.status,
    });
    setSubmitting(false);
  };


  return (
    <div>
      {/* <Calendar></Calendar> */}
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-delivery-fast text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category font-kanit">รายการรอส่ง</p>
                      <Card.Title as="h4">5 รายการ</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  อัพเดท 27-02-2021
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">ค้นหาการจัดส่ง</Card.Title>
              </Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    inv: "",
                    tid: "",
                    status: ""
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
                        <Col md="5">
                          <Form.Group>
                            <h5>รหัสใบเสร็จ</h5>
                            <Form.Control
                              placeholder="INVxxxxx"
                              type="text"
                              name="inv"
                              onChange={handleChange}
                              value={values.inv}
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="5">
                          <Form.Group>
                            <h5>สถานะการขนส่ง</h5>
                            <Form.Control 
                            type="text" 
                            size="sm"
                            as="select"
                            name="status"
                            onChange={handleChange}
                            value={values.status}
                            >
                              <option value="">ทั้งหมด</option>
                              <option value="waiting">รอการจัดส่ง</option>
                              <option value="late">ส่งช้าเกินกำหนด</option>
                              <option value="success">ขนส่งสำเร็จเเล้ว</option>
                            </Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="5">
                          <h5>พนักงานขนส่ง</h5>
                          <Form.Group>
                            <Form.Control
                              type="text"
                              name="tid"
                              size="sm"
                              as="select"
                              onChange={handleChange}
                              value={values.tid}
                            >
                              <option value="">ทั้งหมด</option>
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
                                sInv: "",
                                sTid: "",
                                sStatus: "",
                              });
                            }}
                          >
                            <i className="fas fa-reply mr-1"></i>
                            ล้างการค้นหา
                          </Button>
                        </Col>
                        <Col md="4" lg="2">
                          <br></br>
                          <Button
                            className="btn-fill pull-right"
                            type="submit"
                            variant="warning"
                            onClick={() => history.push("/admin/addl")}
                          >
                            <i className="far fa-plus-square mr-1"></i>
                            เพิ่มรายการใหม่
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
            <TableLogistic
             sInv={search.sInv}
             sTid={search.sTid}
             sStatus={search.sStatus}
            ></TableLogistic>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Logistic;
