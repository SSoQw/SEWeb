import React from 'react';
import ServiceMap from './ServiceMap';

const ServiceArea = () => {
    return (
        <section>
            <h2>Welcome to Sellick Electric!</h2>
            <div className="service-area-container">
                <div className="business-blurb">
                    <p>We provide exceptional electrical service on call to the greater Waterboro area.</p>
                </div>
                <div className="map-container">
                    <ServiceMap />
                    <p>Got a job you want us to come look at? Give us a call!</p>
                </div>
            </div>
        </section>
    );
};

export default ServiceArea;
