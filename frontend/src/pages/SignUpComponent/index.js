import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import LoginServices from "../../services/LoginServices"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import '../../components/DetaisSection/Features.css'
import { Button } from "../../components/ButtonElement";
import {
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
} from "../../components/HeroSection/HeroElements"
import {
  FeaturesRow,
  FeaturesColumn,
  TextWrapper,
  TopLine,
  FeaturesSec,
  FeaturesContainer,
  Table
} from "../../components/DetaisSection/Features.elements";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const SignUpComponent = ({ lightTopLine }) => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(false)
  const [errorMessages, setErrorMessages] = useState({});
  const [user, setUser] = useState({
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    emailId: '',
    gender: '',
    mobileNumber: '',
    zipcode: '',
    typeOfUser: ''
  });

  const onHover = () => {
    setHover(!hover);
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Initialize an object to hold error messages
    const errors = {};

    // Basic validation
    if (!user.userName) errors.userName = 'Username is required.';
    if (!user.password) errors.password = 'Password is required.';
    if (user.password && user.password.length < 6) errors.password = 'Password must be at least 6 characters long.';
    if (!user.firstName) errors.firstName = 'First name is required.';
    if (!user.lastName) errors.lastName = 'Last name is required.';
    if (!user.emailId) errors.emailId = 'Email address is required.';
    if (user.emailId && !/\S+@\S+\.\S+/.test(user.emailId)) errors.emailId = 'Email address is invalid.';
    if (!user.gender) errors.gender = 'Gender is required.';
    if (!user.mobileNumber) errors.mobileNumber = 'Mobile number is required.';
    if (user.mobileNumber && !/^\d{10}$/.test(user.mobileNumber)) errors.mobileNumber = 'Mobile number must be 10 digits.';
    if (!user.zipcode) errors.zipcode = 'Zipcode is required.';
    if (user.zipcode && !/^\d{5}$/.test(user.zipcode)) errors.zipcode = 'Zipcode must be 5 digits.';
    if (!user.typeOfUser) errors.typeOfUser = 'User type is required.';

    // If there are errors, update the state and return
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    // Clear error messages if all validations pass
    setErrorMessages({});

    LoginServices.signUp(user).then(response => {
      console.log(response.data)
      setLoading(e => !e)
      navigate('/login')
    }).catch(error => {
      console.log(error)
    })
  };
  const renderInputField = (key, value) => {
    return (
      <div>
        {key === 'password' ? (
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip id={`tooltip-${key}`}>Choose a strong password</Tooltip>}
          >
            <input
              style={{
                borderRadius: "6px",
                textAlign: "center",
                padding: "0.7vh",
                marginLeft: "1vh",
              }}
              type="password"
              name={key}
              value={value}
              onChange={handleChange}
            />
          </OverlayTrigger>
        ) : key === 'mobileNumber' || key === 'zipcode' ? (
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip id={`tooltip-${key}`}>Enter a valid {key === 'mobileNumber' ? 'mobile number' : 'zipcode'}</Tooltip>}
          >
            <input
              style={{
                borderRadius: "6px",
                textAlign: "center",
                padding: "0.7vh",
                marginLeft: "1vh",
              }}
              type="number"
              name={key}
              value={value}
              onChange={handleChange}
            />
          </OverlayTrigger>
        ) : key === 'gender' || key === 'typeOfUser' ? (
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip id={`tooltip-${key}`}>Select your {key === 'gender' ? 'gender' : 'user type'}</Tooltip>}
          >
            <select
              name={key}
              value={value}
              onChange={handleChange}
              style={{
                borderRadius: "6px",
                textAlign: "center",
                padding: "0.7vh",
                marginLeft: "1vh",
              }}
            >
              <option value="">{`Select ${key.charAt(0).toUpperCase() + key.slice(1)}`}</option>
              {key === 'gender' ? (
                <>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </>
              ) : (
                <>
                  <option value="CUSTOMER">Customer</option>
                  <option value="EMPLOYEE">Employee</option>
                </>
              )}
            </select>
          </OverlayTrigger>
        ) : (
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip id={`tooltip-${key}`}>Enter your {key}</Tooltip>}
          >
            <input
              style={{
                borderRadius: "6px",
                textAlign: "center",
                padding: "0.7vh",
                marginLeft: "1vh",
              }}
              type="text"
              name={key}
              value={value}
              onChange={handleChange}
            />
          </OverlayTrigger>
        )}
        {errorMessages[key] && <p className="text-danger">{errorMessages[key]}</p>}
      </div>
    );
  };
  return (
    <>
      <FeaturesSec>
        {loading ? (
          <div
            style={{
              margin: "auto",
              top: "50%",
              display: "block",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </div>
        ) : (
          <FeaturesContainer>
            <FeaturesRow>
              <TopLine lightTopLine={lightTopLine}>
                PART PRO WEBSITE
                <p style={{ color: "grey", fontSize: "2vh", marginTop: "1vh" }}>
                  Registration Details
                </p>
              </TopLine>
              <FeaturesColumn>
                <TextWrapper>
                  <Table>
                    <tbody>
                      {Object.entries(user).map(([key, value]) => (
                        <tr key={key}>
                          <td style={{ textAlign: 'left', paddingRight: '10px' }}>
                            {key}
                          </td>
                          <td style={{
                            color: "white",
                            padding: "1vh",
                            fontSize: "2vh",
                          }}>
                            {renderInputField(key, value)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </TextWrapper>
                <HeroBtnWrapper style={{ display: "inline-block" }}>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip id="tooltip-create-user">Click to create user</Tooltip>}
                  >
                    <Button
                      onClick={(event) => handleSubmit(event)}
                      onMouseEnter={onHover}
                      onMouseLeave={onHover}
                      primary="true"
                      dark="true"
                    >
                      Create User {hover ? <ArrowForward /> : <ArrowRight />}
                    </Button>
                  </OverlayTrigger>
                </HeroBtnWrapper>
              </FeaturesColumn>
            </FeaturesRow>
          </FeaturesContainer>
        )}
      </FeaturesSec>
    </>
  );

};

export default SignUpComponent;
