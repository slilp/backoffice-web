import React, { useEffect, useState } from "react";
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
import moment from "moment";

function Logistic() {
  let history = useHistory();
  const [transporterList, setTransporterList] = useState([{}]);
  const [waitingDeliver, setWaitingDeliver] = useState(0);
  const [dateTransaction,setDateTransaction] = useState();
  const [search, setSearch] = useState({
    sInv: "",
    sPid: "",
    sTid: "",
    sStatus: "",
  });

  useEffect(async () => {
    const transporters = await getParam("/transporter/all", {});
    const waitingTrans = await getParam("/logistic/count/waiting");
    const topHundredWaiting = await getParam(`/logistic/search/0/100`, {
      status: 'waiting',
    });
    if (topHundredWaiting.status == 200) {
      console.log(JSON.stringify(topHundredWaiting.data.data.rows));
      setDateTransaction(topHundredWaiting.data.data.rows.map((item)=>(
       {
        id : item.lid  ,
        title : `${item.purchaseInfo.pid} / ${item.inv || '-'} ${item.purchaseInfo.customerInfo.name}` ,
        date : moment(item.deliveryDate).format('YYYY-MM-DD') ,
        url: `http://localhost:3000/admin/editl/${item.lid}`
       }
      )
      ));
    }
    setWaitingDeliver(waitingTrans.data.data);
    setTransporterList(transporters.data.data);
  }, []);

  const submitSearch = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    setSearch({
      ...search,
      sPid: values.pid,
      sInv: values.inv,
      sTid: values.tid,
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
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-delivery-fast text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category font-kanit">?????????????????????????????????</p>
                      <Card.Title as="h4">{waitingDeliver} ??????????????????</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  ?????????????????? 27-02-2021
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">??????????????????????????????????????????</Card.Title>
              </Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    inv: "",
                    tid: "",
                    status: "",
                    pid: "",
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
                            <h5>??????????????????????????????????????????</h5>
                            <Form.Control
                              placeholder="SOxxxxx"
                              type="text"
                              name="pid"
                              onChange={handleChange}
                              value={values.pid}
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col md="5">
                          <Form.Group>
                            <h5>?????????????????????????????????</h5>
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
                            <h5>???????????????????????????????????????</h5>
                            <Form.Control
                              type="text"
                              size="sm"
                              as="select"
                              name="status"
                              onChange={handleChange}
                              value={values.status}
                            >
                              <option value="">?????????????????????</option>
                              <option value="waiting">?????????????????????????????????</option>
                              <option value="late">?????????????????????????????????????????????</option>
                              <option value="success">????????????????????????????????????????????????</option>
                            </Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="5">
                          <h5>????????????????????????????????????</h5>
                          <Form.Group>
                            <Form.Control
                              type="text"
                              name="tid"
                              size="sm"
                              as="select"
                              onChange={handleChange}
                              value={values.tid}
                            >
                              <option value="">?????????????????????</option>
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
                            ?????????????????????????????????
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
                                sPid: "",
                              });
                            }}
                          >
                            <i className="fas fa-reply mr-1"></i>
                            ????????????????????????????????????
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
                            ?????????????????????????????????????????????
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
              sPid={search.sPid}
            ></TableLogistic>
          </Col>
        </Row>
        <Row>
          <Col className="bg-white m-3 p-3">
            <h4 className="font-weight-light">???????????????????????????????????????????????????</h4>
            <Calendar
            dateInfoList={dateTransaction}
            ></Calendar>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Logistic;
