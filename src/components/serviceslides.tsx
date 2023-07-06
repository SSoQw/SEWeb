import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import servicesData from '../data/services.json';

interface Service {
    id?: number;
    type: string;
    description: string;
    image: string;
    readMoreUrl: string;
}

const ServiceSlide: React.FC<Service> = ({ image, type, description, readMoreUrl }) => {
    return (
        <div className="slide-container">
            <img src={image} alt={type} className="slide-image"/>
            <div className="slide-content">
                <h3 className="slide-title">{type}</h3>
                <p className="slide-description">{description}</p>
                <a href={readMoreUrl} className="read-more-button">
                    Read More
                </a>
            </div>
        </div>
    );
};


const ServiceSlides = () => {
    const services: Service[] = servicesData.services;

    return (
        <div className="container">
            <h2>Our Services</h2>
        <Carousel showThumbs={true} autoPlay={true} interval={10000} infiniteLoop={true} showStatus={false}>
            {services.map((service) => (
                <ServiceSlide
                    key={service.id}
                    image={service.image}
                    type={service.type}
                    description={service.description}
                    readMoreUrl={service.readMoreUrl}
                />
            ))}
        </Carousel>
        </div>
    );
};

export default ServiceSlides;