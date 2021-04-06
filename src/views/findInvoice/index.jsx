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
import TableInvoice from "./table";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import { getParam } from "../../axios";

function FindInvoice({handleModal , pid}) {
  let history = useHistory();

  const [search, setSearch] = useState({
    sPid: pid
  });

  useEffect(()=>{
    setSearch({sPid:pid});
  },[pid]);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Body>
                <Formik
                  initialValues={{
                    pid: pid
                  }}
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
                    resetForm,
                  }) => (
                    <Form>
                      <Row>
                        <Col md="5">
                          <Form.Group>
                            <h5>รหัสการสั่งซื้อ</h5>
                            <Form.Control
                              placeholder="SOxxxxxx"
                              type="text"
                              name="pid"
                              onChange={handleChange}
                              value={values.pid}
                              readOnly
                            ></Form.Control>
                          </Form.Group>
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
            <TableInvoice
              sPid={search.sPid}
              handleSelect={handleModal}
            ></TableInvoice>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FindInvoice;
