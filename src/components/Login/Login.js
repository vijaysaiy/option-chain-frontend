import React, { Component } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Button, Card, CardBody, Col, Container, Row } from 'reactstrap';
// import NSELOGO from '../../../public/assets/nse-logo.png'

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email : "",
      password : ""
    }
  }
  showAlert(iconName,titleName){
    Swal.fire({
      icon: iconName,
      title: titleName
    })
  }
  handleValidSubmit(event, values) {
    event.preventDefault();
    var data = {
      email : values.email,
      password : values.password
    }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, data)
    .then(res => {
        localStorage.setItem("authUser",JSON.stringify(res.data.data))
        window.location="/dashboard";
    })
    .catch(err => {
      this.showAlert("error","Invalid credentials");
    })

  }

  render() {
    return (
      <div className="app flex-row align-items-center d-flex min-vh-100">
        <Container>
          <Row className="justify-content-center">
            <Col md="8" lg="6" xl="5">
                <Card className="shadow-lg p-4">
                  <CardBody>
                    {/* <div className="text-center mb-3" >
                        <img src={NSELOGO} style={{"backgroundColor" : "white"}}></img>
                    </div> */}
                    <AvForm onValidSubmit={(e, v) => { this.handleValidSubmit(e, v) }} >
                      <h1 className="text-center">Sign In to your account</h1>
                      {/* <p className="text-muted">Sign In to your account</p> */}
                      <AvField
                        label="Email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        type="email"
                        validate={{
                            required: { value: true, errorMessage: "Email can't be empty" }
                        }}
                      />
                      <AvField
                        label="Password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        type="password"
                        validate={{
                            required: { value: true, errorMessage: "Password can't be empty" }
                        }}
                      />

                      <Button color="success" className="px-4" block type="submit">Login</Button>
                      
                    </AvForm>
                  </CardBody>
                </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
