import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import servicesData from '../../data/services.json';

interface Service {
    id: number;
    type: string;
    longDescription: string;
    image: string;
}

const ServicesPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');

    const [expandedCard, setExpandedCard] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (type) {
            const serviceIndex = servicesData.services.findIndex((service: Service) => service.type === type);

            if (serviceIndex !== -1) {
                setExpandedCard(serviceIndex);
            } else {
                // Service type doesn't exist, redirect to /404
                navigate('/404');
            }
        }
    }, [type, navigate]);

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
            // Scroll to the expanded card
            const cardElement = document.getElementById(`service-card-${index}`);
            if (cardElement) {
                cardElement.scrollIntoView({ behavior: 'smooth', inline: 'start' });
            }
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
            {servicesData.services.map((service: Service, index: number) => (
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
