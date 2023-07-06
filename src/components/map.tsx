import React from 'react';
import ServiceMap from './ServiceMap';

const ServiceArea = () => {
    return (
        <section>
            <div className="service-area-container">
                <div className="business-blurb">
                    <h3>Why settle for anything less than exceptional?</h3>

                    <p> Whether you're a business owner seeking professional electrical solutions or a homeowner looking to enhance your living space with advanced security systems, we've got you covered. Our comprehensive services encompass the full spectrum of electrical work, offering seamless integration of networks and robust security installations.</p>
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
                <div className="legend-color" style={{ background: 'blue', opacity: .5 }}></div>
                <div className="legend-label">Service and Emergency Call Range</div>
            </div>
            <div className="legend-item">
                <div className="legend-color" style={{ background: 'green', opacity: .5 }}></div>
                <div className="legend-label">Service Area</div>
            </div>
            <div className="legend-item">
                <div className="legend-color" style={{ background: 'orange', opacity: .5 }}></div>
                <div className="legend-label">Future Service Area</div>
            </div>
        </div>
    );
};

export default ServiceArea;
