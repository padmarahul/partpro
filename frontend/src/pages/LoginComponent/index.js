// LoginScreen.js

import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { GlobalStateContext } from '../../GlobalStateContext';
import './LoginScreen.css'; // Importing the CSS file
import { Container, Form, Row, Col, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import LoginServices from "../../services/LoginServices"
import { Button } from "../../components/ButtonElement";
import TM from "../../common/assets/form.svg";
import {
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
} from "../../components/HeroSection/HeroElements"
import {
  FeaturesColumn,
  Img,
  FeaturesSec,
  ImgWrapper,
} from "../../components/DetaisSection/Features.elements";
export default function LoginComponent({ lightTopLine }) {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [state, dispatch] = useContext(GlobalStateContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('')
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const onHover = () => {
    setHover(!hover);
  };

  const handleLogin = async (event) => {
    event.preventDefault()
    setErrorMessage(''); // Reset the error message before a new login attempt
    const response = await LoginServices.login(username, password).then(resp => {
      if (resp.data.message === 'Enter OTP generated' && resp.status === 200) {
        setShowOtpModal(true);
        dispatch({ type: 'SET_USER_DATA', payload: resp.data });
      }
    }).catch(err => {
      if (err.response.data.message === 'User does not exist' && err.response.data.status === 500) {
        setErrorMessage('User does not exist');
      }

      if (err.response.data.message === 'Wrong password' && err.response.data.status === 500) {
        setErrorMessage('Wrong password');
      }
      console.log(err)
    })

  }

  const retryOtp = async (event) => {
    event.preventDefault()
    const otp = await LoginServices.retryOtp(state.userData.userId).then(
      resp => {
        console.log(resp)
      }
    ).catch(err => {
      console.log(err)
    })
  }
  const handleOtpSubmit = async (event) => {
    event.preventDefault()
    // Logic to handle OTP submission
    console.log("sssss", state.userData.userId)
    const otpResponse = await LoginServices.verifyOtp(state.userData.userId, otp).then(
      resp => {
        setShowOtpModal(false);
        const type = state.userData.typeOfUser.toLowerCase()
        if (type === "customer") {
          navigate("/dashboard");
        }
        if (type === "employee") {
          navigate("/employee-dashboard")
        }

      }
    ).catch(err => {
      console.log(err)
    })

  };

  return (
    <>
      <FeaturesSec>
        <Container className="d-flex align-items-center justify-content-center " style={{ minHeight: "100vh" }}>
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Form>
              <h2 className="text-center mb-4">Login</h2>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip id="tooltip-username">Enter your username</Tooltip>}
                >
                  <Form.Control type="text" placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                </OverlayTrigger>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip id="tooltip-password">Enter your password</Tooltip>}
                >
                  <Form.Control type="password" placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </OverlayTrigger>
              </Form.Group>
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
              <HeroBtnWrapper style={{ width: "400px", display: "inline-block" }}>
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip id="tooltip-login">Click to login</Tooltip>}
                >
                  <Button
                    onClick={(event) => handleLogin(event)}
                    onMouseEnter={onHover}
                    onMouseLeave={onHover}
                    primary="true"
                    dark="true"
                  >
                    Login {hover ? <ArrowForward /> : <ArrowRight />}
                  </Button>
                </OverlayTrigger>
              </HeroBtnWrapper>

              <div className="w-100 text-center mt-3">
                <a href="/changepassword">Forgot Password?</a>
              </div>
            </Form>

            <Row className="py-4">
              <Col>
                <div className="w-100 text-center">
                  Need an account? <a href="/signup">Sign Up</a>
                </div>
              </Col>
            </Row>
          </div>

          <FeaturesColumn>
            <ImgWrapper style={{ position: "absolute" }}>
              <Img src={TM} alt="car" />
            </ImgWrapper>
          </FeaturesColumn>

          <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Enter OTP</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>OTP</Form.Label>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip id="tooltip-otp">Enter the 4-digit OTP sent to your phone</Tooltip>}
                  >
                    <Form.Control type="text" placeholder="4-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)} />
                  </OverlayTrigger>
                </Form.Group>
                <HeroBtnWrapper style={{ width: "400px", display: "inline-block" }}>
                  <Button
                    onClick={(event) => handleOtpSubmit(event)}
                    onMouseEnter={onHover}
                    onMouseLeave={onHover}
                    primary="true"
                    dark="true"
                  >
                    Submit {hover ? <ArrowForward /> : <ArrowRight />}
                  </Button>
                </HeroBtnWrapper>
                <HeroBtnWrapper style={{ width: "400px", display: "inline-block" }}>
                  <Button
                    onClick={(event) => retryOtp(event)}
                    onMouseEnter={onHover}
                    onMouseLeave={onHover}
                    primary="true"
                    dark="true"
                  >
                    Retry {hover ? <ArrowForward /> : <ArrowRight />}
                  </Button>
                </HeroBtnWrapper>
              </Form>
            </Modal.Body>
          </Modal>
        </Container>
      </FeaturesSec>
    </>
  );
};


