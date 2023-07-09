import React from "react";
import { Link } from "react-router-dom";

const ContactPage = () => {
    return (
        <div className="contact-page">
            <h2>Need Immediate Assistance?</h2>
            <p>In case of an electrical emergency where someone's life is in immediate danger, call </p>
            <hr />
            <ul><li>911</li></ul>
            <p>If you require urgent assistance with an electrical issue, please call our emergency line</p>
            <hr />
            <ul><li>911</li></ul>
            <p>For same-day electrical service inquiries, please call our service line at </p>
            <hr />
            <ul><li>911</li></ul>

            <h2>Looking for Quick Answers? Visit our FAQ</h2>
            <Link to="/faq" className="faq-link">
                Go to FAQ
            </Link>

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
