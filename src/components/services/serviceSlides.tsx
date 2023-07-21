import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';


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
            setServices(data);
        };
        fetchData().then(() => "None Data :(");
    }, []);

    return (
        <div>
            <h1>Our Services</h1>
            <div className="carousel-container">
                {services.length > 0 && (
                    <Carousel
                        showThumbs={false}
                        autoPlay={true}
                        interval={8000}
                        infiniteLoop={true}
                        showStatus={false}
                    >
                        {services.map((service) => (
                            <ServiceSlide
                                key={service.id}
                                image={service.image}
                                type={service.type}
                                description={service.description}
                            />
                        ))}
                    </Carousel>
                )}
            </div>
        </div>
    );
};

export default ServiceSlides;