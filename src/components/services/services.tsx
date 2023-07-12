import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const fetchServiceData = async () => {
    const response = await fetch('/services.json');
    const data = await response.json();
    return data.services as Service[];
};

interface Service {
    id: number;
    type: string;
    longDescription: string;
    image: string;
}

const ServicesPage: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchServiceData();
            console.log('Fetched data:', data);
            setServices(data);
        };
        fetchData();
    }, []);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');

    const [expandedCard, setExpandedCard] = useState<number | null>(null);
    const navigate = useNavigate();

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
                const cardElement = document.getElementById(`service-card-${expandedCard}`);
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
        const lines = description.split('\n\n');
        return lines.map((line, index) => (
            <p key={index}>{line}</p>
        ));
    };

    return (
        <div>
            <h1>Our Services</h1>
            {services.map((service: Service, index: number) => (
                <div
                    key={service.id}
                    id={`service-card-${index}`}
                    className={`service-card ${expandedCard === index ? 'expanded' : ''}`}
                    onClick={() => toggleExpand(index)}
                >
                    <div className="service-header">
                        <span className={`expand-icon ${expandedCard === index ? 'minus' : 'plus'}`}>
                            {expandedCard === index ? '-' : '+'}
                        </span>
                        <h2>{service.type}</h2>
                    </div>
                    {expandedCard === index && (
                        <div className="service-content">
                            <img src={service.image} alt={service.type} />
                            {renderDescriptionWithParagraphs(service.longDescription)}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ServicesPage;