import React from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import 'font-awesome/css/font-awesome.min.css';
import authHeader from "../../helpers/access_token_header";
import { Button, Card, CardBody, Col, Container, Row } from 'reactstrap';

const Register = () => {

  let history = useHistory();
  function showAlert(iconName,titleName){
    Swal.fire({
      icon: iconName,
      title: titleName
    })
  }

  function handleValidSubmit(event, values) {
    var data = {
      firstName : values.firstName,
      lastName : values.lastName,
      email : values.email,
      password : values.password,
    }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/register`, data , 
      {
        headers: authHeader()
      }
    )
    .then(res => {
      showAlert("success","An invite has been sent to your mail")
      setTimeout(() => {
        history.push('/dashboard')
      }, 1000);
    })
    .catch((error) => {
      localStorage.removeItem("authUser");
      history.push('/login');        
    })
  }

    return (
      <div className="app flex-row align-items-center">
        <Container className="p-5">
          <Row className="justify-content-center">
            <Col md="11" lg="9" xl="8">
              <Card className="shadow-lg mx-4">
                <CardBody className="p-4">
                  <AvForm onValidSubmit={(e, v) => { handleValidSubmit(e, v) }} >
                    <h3 className="mb-4 text-center"> <i className="fa fa-user-plus mr-2"></i>Register</h3>
                    <p className="text-muted text-center">Create a new user account</p>

                    <AvField
                        label="First Name"
                        name="firstName"
                        className="form-control "
                        placeholder="First Name"
                        type="text"
                        validate={{
                            required: { value: true, errorMessage: "First Name can't be empty" }
                        }}
                    />
                    <AvField
                        label="Last Name"
                        name="lastName"
                        className="form-control "
                        placeholder="Last Name"
                        type="text"
                        validate={{
                            required: { value: true, errorMessage: "Last Name can't be empty" }
                        }}
                    />
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
                        className="form-control "
                        placeholder="Enter password"
                        type="password"
                        validate={{
                            required: { value: true, errorMessage: "Password can't be empty" }
                        }}
                    />

                    <Button color="success" block type="submit">Create Account</Button>
                  </AvForm>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
}

export default Register;
