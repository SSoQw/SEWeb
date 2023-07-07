import React from "react";

const ContactPage: React.FC = () => {
    return (
        <div>
            <h2>Have an Electrical Emergency, Give us a Call</h2>
            <p>Call: 911</p>

            <h2>Got a Question for us?</h2>
            <p>For general inquiries, you can reach us through the following channels:</p>

            <ul>
                <li>
                    <a href="https://www.facebook.com/sellickelectric">Facebook</a>
                </li>
                <li>Email: <a href="mailto:contact@sellickelectric.com">contact@sellickelectric.com</a></li>
            </ul>
        </div>
    );
};

export default ContactPage;
