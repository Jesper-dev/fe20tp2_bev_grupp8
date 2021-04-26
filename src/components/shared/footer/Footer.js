import React from 'react';

import { FooterElement } from './FooterElements';

const Footer = () => {
    return (
        <>
            <FooterElement>
                <main>
                    <section className="contact-wrapper">
                        <h2>Let's Vest AB</h2>
                        <span>+46 048 32 52</span>
                        <span>info@letsvest.com</span>
                        <span>Kungsgatan 15A</span>
                    </section>
                    <section className="content-wrapper">
                        <section className="section-wrapper">
                            <h2>CONTACT</h2>
                            <span>GOOGLE</span>
                            <span>LINKED IN</span>
                            <span>GITHUB</span>
                        </section>
                        <section className="section-wrapper">
                            <h2>ABOUT</h2>
                            <span>About us</span>
                            <span>Management</span>
                            <span>Employees</span>
                        </section>
                        <section className="section-wrapper">
                            <h2>GET STARTED</h2>
                            <span>Tutorial</span>
                            <span>Videos</span>
                            <span>Inspiration</span>
                        </section>
                    </section>
                </main>
            </FooterElement>
        </>
    );
};

export default Footer;
