import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import WideLogo from "../../assets/Icon-Wide.jpg";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";

const Login = () => {
  const history = useHistory();
  const [values, setValues] = useState({ email: "", password: "" });
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  function showAlert(iconName, titleName) {
    Swal.fire({
      icon: iconName,
      title: titleName,
    });
  }

  const validateForm = () => {
    const { email, password } = values;
    if (email === "") {
      showAlert("error", "Please enter valid email");
      return false;
    } else if (password === "") {
      showAlert("error", "Please enter valid credentials");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios
        .post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, values)
        .then((res) => {
          sessionStorage.setItem("authUser", JSON.stringify(res.data.data));
          history.push("/dashboard");
        })
        .catch((err) => {
          showAlert("error", "Invalid credentials");
        });
    }
  };
  return (
    <>
      <div className="app flex-row align-items-center d-flex min-vh-100">
        <Container>
          <Row className="justify-content-center">
            <Col md="8" lg="6" xl="5">
              <Card className="shadow-lg p-4">
                <CardBody>
                  <Form action="" onSubmit={(event) => handleSubmit(event)}>
                    {/* <h4 className="text-center text-danger font-weight-bold">Palki Shiva's Option Chain View</h4> */}
                    <div
                      class="col-md-6 px-0"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <img
                        src={WideLogo}
                        class="shadow-sm rounded img-fluid img-responsive"
                        alt="trading view icon"
                      ></img>
                    </div>
                    <br></br>
                    <FormGroup>
                      <Label for="emailField" className="text-secondary">
                        Email
                      </Label>
                      <Input
                        type="email"
                        name="email"
                        id="emailField"
                        placeholder="Mate, your email please"
                        onChange={(e) => handleChange(e)}
                      />
                      <br></br>
                      <Label for="passwordField" className="text-secondary">
                        Password
                      </Label>
                      <Input
                        type="password"
                        name="password"
                        id="passwordField"
                        placeholder="What's your password ?"
                        onChange={(e) => handleChange(e)}
                      />
                      <FormText color="danger">
                        Trust me, I will hold it as as secret!
                      </FormText>
                    </FormGroup>
                    <div className="text-center">
                      <Button color="primary" type="submit">
                        Click me to log you in!
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Login;
