import React, { useState, useEffect, useContext } from 'react';
import { Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { GlobalStateContext } from '../../GlobalStateContext';
import Navbar from "../../components/DashboardNavBar/index"
import {
    FeaturesSec
} from "../../components/DetaisSection/Features.elements";
import CustomerServices from '../../services/CustomerServices';

const LoyaltyPointsModal = ({ show, handleClose }) => {
    const [loyaltyPoints, setLoyaltyPoints] = useState(0);
    const [state] = useContext(GlobalStateContext);

    const getCustomerData = async () => {
        if (state.userData.userId !== undefined) {
            const response = await CustomerServices.viewCustomerDetails(state.userData.userId).then(resp => {
                console.log(resp)
                if (resp.status === 200) {
                    console.log("rrr",resp)
                    setLoyaltyPoints(resp.data.loyaltyPoints);
                }
            }).catch(error => {
                console.error("Error fetching loyalty points", error);
            });
        }
    }
    useEffect(() => {
        if (show) {
            getCustomerData();
        }
    }, [show, state.userData.userId]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>View Loyalty Points</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Loyalty Points</Form.Label>
                        <Form.Control type="text" placeholder="Loyalty Points" value={loyaltyPoints} readOnly />
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

const LoyaltyPointsPage = () => {
    const [showLoyaltyPointsModal, setShowLoyaltyPointsModal] = useState(false);

    useEffect(() => {
        // Show the loyalty points modal when the component mounts
        setShowLoyaltyPointsModal(true);
    }, []);

    const handleCloseLoyaltyPointsModal = () => {
        setShowLoyaltyPointsModal(false);
    };

    return (
        <>
            <Navbar>
            </Navbar>
            <FeaturesSec>
                <div>
                    {/* Loyalty Points Modal */}
                    <LoyaltyPointsModal
                        show={showLoyaltyPointsModal}
                        handleClose={handleCloseLoyaltyPointsModal}
                    />
                </div>
            </FeaturesSec>
        </>
    );
};

export default LoyaltyPointsPage;
