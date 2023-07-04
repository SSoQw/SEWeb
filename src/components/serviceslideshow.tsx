import React from 'react';

type ServiceSlideProps = {
    services: string[];
};

const ServiceSlide: React.FC<ServiceSlideProps> = ({ services }) => {
    const serviceBackgrounds = {
        Residential: 'residential.jpg',
        Commercial: 'commercial.jpg',
        Generators: 'generators.jpg',
        'Home Networks': 'networks.jpg',
        'Camera Systems': 'cameras.png',
    } as { [key: string]: string };

    const serviceDescriptions = {
        Residential: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        Commercial: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        Generators: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Home Networks': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Camera Systems': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    } as { [key: string]: string };

    return (
        <div>
            {services.map((service) => (
                <div
                    className="service-slide"
                    key={service}
                    style={{ backgroundImage: `url(${serviceBackgrounds[service]})` }}
                >
                    <h3>{service}</h3>
                    <p>{serviceDescriptions[service]}</p>
                    <a href="/service-details" className="read-more-button">
                        Read More
                    </a>
                </div>
            ))}
        </div>
    );
};

export default ServiceSlide;
