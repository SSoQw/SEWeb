import React, { useEffect, useState } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';

interface Service {
    id: number;
    type: string;
    longDescription: string;
    image: string;
}

const fetchServiceData = async () => {
    const response = await fetch('/services.json');
    const data = await response.json();
    return data.services as Service[];
};

const ServicesPage: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [expandedCard, setExpandedCard] = useState<number | null>(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchServiceData();
            console.log('Fetched data:', data);
            setServices(data);
        };
        fetchData().then(() => "None Data :(");
    }, []);

    useEffect(() => {
        if (type && services.length) {
            const serviceIndex = services.findIndex((service: Service) => service.type === type);

            if (serviceIndex !== -1) {
                setExpandedCard(serviceIndex);
            } else {
                // Service type doesn't exist, redirect to /404
                navigate('/404');
            }
        }
    }, [type, navigate, services]);

    useEffect(() => {
        if (expandedCard !== null) {
            setTimeout(() => {
                const cardElement = document.getElementById(`accordion-card-${expandedCard}`);
                if (cardElement) {
                    cardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }, [expandedCard]);

    const toggleExpand = (index: number) => {
        if (expandedCard === index) {
            // Clicked card is already expanded, collapse it
            setExpandedCard(null);
        } else {
            // Clicked card is not expanded, expand it
            setExpandedCard(index);
        }
    };

    const renderDescriptionWithParagraphs = (description: string) => {
        //TODO: Change to make have the service cards take in HTML ref from JSON, rather than string from JSON
        const lines = description.split('\n\n');
        return lines.map((line, index) => (
            <p key={index}>{line}</p>
        ));
    };

    return (
        <div>
            <div>
            <h1>Our Services</h1>
            {services.map((service: Service, index: number) => (
                <div
                    key={service.id}
                    id={`accordion-card-${index}`}
                    className={`accordion-card ${expandedCard === index ? 'expanded' : ''}`}
                    onClick={() => toggleExpand(index)}
                >
                    <div className="accordion-header">
                        <span>{service.type}</span>
                        <span className={`expand-icon ${expandedCard === index ? 'minus' : 'plus'}`}>
              {expandedCard === index ? '-' : '+'}
            </span>
                    </div>
                    {expandedCard === index && (
                        <div className="accordion-content">
                            <img src={service.image} alt={service.type} />
                            {renderDescriptionWithParagraphs(service.longDescription)}
                        </div>
                    )}
                </div>
            ))}
        </div>
            <h2>Read About Our Work</h2>
            <Link to="/testimonials" className="big-button">
                Client Testimonials
            </Link>
        </div>
    );
};

export default ServicesPage;