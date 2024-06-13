import React from 'react'

import { FooterContainer, FooterWrap, SocialMedia, SocialMediaWrap, WebsiteRights } from './FooterElements';

const Footer = () => {
    return (
        <FooterContainer>
            <FooterWrap>
                <SocialMedia>
                    <SocialMediaWrap>
                    Part Pro Management System
                        <WebsiteRights>
                            Usability Project © {new Date().getFullYear()}
                            &nbsp;All Rights Reserved
                        </WebsiteRights>
                    </SocialMediaWrap>
                </SocialMedia>
            </FooterWrap>
        </FooterContainer>
    );
}

export default Footer
