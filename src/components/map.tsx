import React from 'react';
import ServiceMap from './ServiceMap';

const ServiceArea = () => {
    return (
        <section>
            <div className="service-area-container">
                <h2>Welcome to Sellick Electric!</h2>
                <div className="business-blurb">
                    <h3>We provide exceptional electrical service to the great state of Maine.</h3>

                    <p>Why settle for anything less than exceptional? Whether you're a business owner seeking professional electrical solutions or a homeowner looking to enhance your living space with advanced security systems, we've got you covered. Our comprehensive services encompass the full spectrum of electrical work, offering seamless integration of networks and robust security installations.</p>
                </div>
                <div className="map-container">
                    <ServiceMap />
                    <Legend />
                </div>
            </div>
        </section>
    );
};

const Legend = () => {
    return (
        <div className="legend">
            <div className="legend-item">
                <div className="legend-color" style={{ background: 'green' }}></div>
                <div className="legend-label">Service Area</div>
            </div>
            <div className="legend-item">
                <div className="legend-color" style={{ background: 'blue' }}></div>
                <div className="legend-label">Service and Emergency Call Range</div>
            </div>
            <div className="legend-item">
                <div className="legend-color" style={{ background: 'orange' }}></div>
                <div className="legend-label">Future Service Area</div>
            </div>
        </div>
    );
};

export default ServiceArea;
