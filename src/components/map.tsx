import React from 'react';
import ServiceMap from './ServiceMap';

const ServiceArea = () => {
    return (
        <section>
            <h2>Welcome to Sellick Electric!</h2>
            <div className="service-area-container">
                <div className="business-blurb">
                    <h3>We provide exceptional electrical service on call to the greater Waterboro area</h3>
                    <p>More in-depth business introduction goes here...</p>
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
                <div className="legend-label">Full Service Area</div>
            </div>
            <div className="legend-item">
                <div className="legend-color" style={{ background: 'blue' }}></div>
                <div className="legend-label">Service and Emergency Call Area</div>
            </div>
            <div className="legend-item">
                <div className="legend-color" style={{ background: 'orange' }}></div>
                <div className="legend-label">Future Expansion</div>
            </div>
        </div>
    );
};

export default ServiceArea;
