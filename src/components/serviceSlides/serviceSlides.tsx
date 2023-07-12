import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const fetchServiceData = async () => {
    const response = await fetch('/services.json');
    const data = await response.json();
    return data.services as Service[];
};

interface Service {
    id?: number;
    type: string;
    description: string;
    image: string;
}

const ServiceSlide: React.FC<Service> = ({ image, type, description }) => {
    const url = `/services?type=${encodeURIComponent(type)}`;

    return (
        <div className="slide-container">
            <img src={image} alt={type} className="slide-image"/>
            <div className="slide-content">
                <h3 className="slide-title">{type}</h3>
                <p className="slide-description">{description}</p>
                <Link to={url.toString()} className="read-more-button">
                    Read More
                </Link>
            </div>
        </div>
    );
};


const ServiceSlides = () => {
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchServiceData();
            console.log('Fetched data:', data);
            setServices(data);
        };
        fetchData();
    }, []);

    return (
        <div className="carousel-container">
            <h2>Our Services</h2>
        <Carousel showThumbs={false} autoPlay={true} interval={10000} infiniteLoop={true} showStatus={false}>
            {services.map((service) => (
                <ServiceSlide
                    key={service.id}
                    image={service.image}
                    type={service.type}
                    description={service.description}
                />
            ))}
        </Carousel>
        </div>
    );
};

export default ServiceSlides;