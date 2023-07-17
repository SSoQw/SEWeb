import React from "react";
import {Link} from "react-router-dom";

const ContactPage = () => {
    return (
        <div className="contact-page">
            <h2 className="business-blurb">In the case of an electrical emergency where someone's life may be in danger,
                please call 911.</h2>
            <h2>Experiencing an outage or issues with your supply?</h2>
            <hr/>
            <p><strong>Call your power provider</strong></p>
            <ul>
                <li>CMP: 1-(800)-750-4000</li>
                <li>Versant: 1-(855)-363-7211</li>
                <li>Eastern Maine E.C.: 1-(844)-363-2688  </li>
                <li>Kennebunk L&P: (207)-985-3311</li>
                <li>Maddison Electric Works: (207) 696-4401</li>
            </ul>
            <h2>Require urgent assistance with an electrical issue?</h2>
            <hr/>
            <p><strong>Call our emergency line at</strong></p>
            <ul>
                <li>Emergency Number</li>
            </ul>
            <h2>For same-day electrical service inquiries</h2>
            <hr/>
            <p><strong>Call our service line at</strong></p>
            <ul>
                <li>Service Number</li>
            </ul>
            <h2>For all Other Inquires Contact Us Via</h2>
            <hr />
            <ul>
                <li>Email: <a href="mailto:contact@sellickelectric.com">contact@sellickelectric.com</a></li>
                <li>Facebook: <a href="https://www.facebook.com/sellickelectric">Sellick Electric</a></li>
            </ul>
            <p><strong>Please Note:</strong> Our phone support is currently not available 24/7. However, we strive to
                address your inquiries and return your calls as promptly as possible.</p>
            <h2>Not Sure Who to Call? Want Quick Answers?</h2>
            <Link to="/faq" className="faq-link">Check our FAQ</Link>

        </div>
    );
};

export default ContactPage;
