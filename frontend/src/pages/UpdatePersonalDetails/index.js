import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import CustomerServices from "../../services/CustomerServices"
import { GlobalStateContext } from '../../GlobalStateContext';
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

const UpdatePersonalDetails = ({ lightTopLine }) => {
    const [hover, setHover] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [state] = useContext(GlobalStateContext);
    const [errorMessages, setErrorMessages] = useState({});
    const [customer, setCustomer] = useState({
        fullName: '',
        emailId: '',
        mobileNumber: '',
        zipcode: '',
    });
    const onHover = () => {
        setHover(!hover);
    };

    const renderInputField = (key, value) => {
        return (
            <OverlayTrigger
                placement="right"
                overlay={<Tooltip id={`tooltip-${key}`}>Enter your {key.replace(/([A-Z])/g, ' $1').toLowerCase()}</Tooltip>}
            >
                <div>
                    {key === 'mobileNumber' || key === 'zipcode' ? (
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
                    ) : (
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
                    )}
                    {errorMessages[key] && <p className="text-danger">{errorMessages[key]}</p>}
                </div>
            </OverlayTrigger>
        );
    };

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Initialize an object to hold error messages
        const errors = {};

        // Basic validation
        if (!customer.fullName) errors.fullName = 'Full name is required.';
        if (!customer.emailId) errors.emailId = 'Email address is required.';
        if (customer.emailId && !/\S+@\S+\.\S+/.test(customer.emailId)) errors.emailId = 'Email address is invalid.';
        if (!customer.mobileNumber) errors.mobileNumber = 'Mobile number is required.';
        if (customer.mobileNumber && !/^\d{10}$/.test(customer.mobileNumber)) errors.mobileNumber = 'Mobile number must be 10 digits.';
        if (!customer.zipcode) errors.zipcode = 'Zipcode is required.';
        if (customer.zipcode && !/^\d{5}$/.test(customer.zipcode)) errors.zipcode = 'Zipcode must be 5 digits.';

        // If there are errors, update the state and return
        if (Object.keys(errors).length > 0) {
            setErrorMessages(errors);
            return;
        }

        // Clear error messages if all validations pass
        setErrorMessages({});

        // Show loading spinner
        setLoading(true);

        // Service call to update personal details
        CustomerServices.updatePersonalDetails(state.userData.userId, customer).then(response => {
            console.log(response.data);
            setLoading(false);
            navigate('/dashboard');
        }).catch(error => {
            console.log(error);
            setLoading(false);
        });
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
                                    Update Personal Details
                                </p>
                            </TopLine>
                            <FeaturesColumn>
                                <TextWrapper>
                                    <Table>
                                        <tbody>
                                            {Object.entries(customer).map(([key, value]) => (
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
                                        overlay={<Tooltip id="tooltip-update-personal">Click to update personal details</Tooltip>}
                                    >
                                        <Button
                                            onClick={(event) => handleSubmit(event)}
                                            onMouseEnter={onHover}
                                            onMouseLeave={onHover}
                                            primary="true"
                                            dark="true"
                                        >
                                            Update Personal Details {hover ? <ArrowForward /> : <ArrowRight />}
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

export default UpdatePersonalDetails;
