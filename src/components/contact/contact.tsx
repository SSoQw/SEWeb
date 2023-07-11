import React from "react";
import { Link } from "react-router-dom";

const ContactPage = () => {
    return (
        <div className="contact-page">
            <h2>In Our Range and Need Immediate Assistance?</h2>
            <p>In case of an electrical emergency where someone's life is in immediate danger, call </p>
            <hr />
            <ul><li>911</li></ul>
            <p>If you are experiencing an outage or issues with your supply. Call your power provider</p>
            <hr />
            <ul><li>CMP: 800-750-4000</li></ul>
            <p>If you require urgent assistance with an electrical issue, please call our emergency line</p>
            <hr />
            <ul><li>Emergency Number</li></ul>
            <p>For same-day electrical service inquiries, please call our service line at </p>
            <hr />
            <ul><li>Service Number</li></ul>
            <p><strong>Please Note:</strong> Our phone support is currently not available 24/7. However, we strive to address your inquiries and return your calls as promptly as possible.</p>
            <h2>Not Sure Who to Call? Want Quick Answers?</h2>
            <Link to="/faq" className="faq-link">Check our FAQ</Link>

            <h2>Didn't Find an Answer? Reach out</h2>
            <ul>
                <li>
                    Email: <a href="mailto:contact@sellickelectric.com">contact@sellickelectric.com</a>
                </li>
                <li>
                    Facebook: <a href="https://www.facebook.com/sellickelectric">Sellick Electric</a>
                </li>
            </ul>
        </div>
    );
};

export default ContactPage;
