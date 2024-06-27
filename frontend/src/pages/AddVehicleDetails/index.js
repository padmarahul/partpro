import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import DashboardServices from "../../services/DashboardServices"
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

const AddVehicleDetails = ({ lightTopLine }) => {
    const [hover, setHover] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [errorMessages, setErrorMessages] = useState({});
    const [state] = useContext(GlobalStateContext);
    const [vehicle, setVehicle] = useState({
        vehicleYear: '',
        licenseplate: '',
        vehicleMaker: '',
        vehicleModel: '',
        vehicleIdNumber: '',
        mileage: '',
        vehicleType: '',
        color: '',
        vehicleUsage: ''
    });
    const onHover = () => {
        setHover(!hover);
    };
    const handleChange = (e) => {
        setVehicle({ ...vehicle, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Initialize an object to hold error messages
        const errors = {};

        // Basic validation
        if (!vehicle.vehicleYear) {
            errors.vehicleYear = 'Vehicle year is required.';
        } else if (vehicle.vehicleYear < 2000 || vehicle.vehicleYear > new Date().getFullYear()) {
            errors.vehicleYear = 'Enter a valid vehicle year from 2000 onwards.';
        }

        if (!vehicle.licenseplate) {
            errors.licenseplate = 'License plate is required.';
        } else if (!/^[A-Za-z]{3}\d{3}$/.test(vehicle.licenseplate)) {
            errors.licenseplate = 'License plate must be 3 letters followed by 3 numbers.';
        }

        if (!vehicle.vehicleIdNumber) {
            errors.vehicleIdNumber = 'Vehicle ID number is required.';
        } else if (!/^VIN\d{9}$/.test(vehicle.vehicleIdNumber)) {
            errors.vehicleIdNumber = 'Vehicle ID number must start with "VIN" followed by 9 digits.';
        }

        if (!vehicle.vehicleMaker) errors.vehicleMaker = 'Vehicle maker is required.';
        if (!vehicle.vehicleModel) errors.vehicleModel = 'Vehicle model is required.';
        if (!vehicle.mileage) errors.mileage = 'Mileage is required.';
        if (!vehicle.vehicleType) errors.vehicleType = 'Vehicle type is required.';
        if (!vehicle.color) errors.color = 'Color is required.';
        if (!vehicle.vehicleUsage) errors.vehicleUsage = 'Vehicle usage is required.';

        // If there are errors, update the state and return
        if (Object.keys(errors).length > 0) {
            setErrorMessages(errors);
            return;
        }

        // Clear error messages if all validations pass
        setErrorMessages({});

        // Show loading spinner
        setLoading(true);

        // Service call to add vehicle details
        DashboardServices.addVehicleDetails(state.userData.userId, vehicle).then(response => {
            console.log(response.data);
            setLoading(false);
            navigate('/dashboard');
        }).catch(error => {
            console.log(error);
            setLoading(false);
        });
    };

    const renderInputField = (key, value) => {
        return (
            <OverlayTrigger
                placement="right"
                overlay={<Tooltip id={`tooltip-${key}`}>Enter your {key.replace(/([A-Z])/g, ' $1').toLowerCase()}</Tooltip>}
            >
                <div>
                    {key === 'mileage' || key === 'vehicleYear' ? (
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
                                    Add Vehicle Details
                                </p>
                            </TopLine>
                            <FeaturesColumn>
                                <TextWrapper>
                                    <Table>
                                        <tbody>
                                            {Object.entries(vehicle).map(([key, value]) => (
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
                                        overlay={<Tooltip id="tooltip-add-vehicle">Click to add vehicle information</Tooltip>}
                                    >
                                        <Button
                                            onClick={(event) => handleSubmit(event)}
                                            onMouseEnter={onHover}
                                            onMouseLeave={onHover}
                                            primary="true"
                                            dark="true"
                                        >
                                            Add Vehicle Information {hover ? <ArrowForward /> : <ArrowRight />}
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

export default AddVehicleDetails;
