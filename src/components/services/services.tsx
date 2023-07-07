import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import servicesData from '../../data/services.json';

interface Service {
    id: number;
    type: string;
    longDescription: string;
    image: string;
}

const ServicesPage: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');

    const [expandedCard, setExpandedCard] = useState<number | null>(null);
    const navigate = useNavigate(); // Hook to get the navigate function

    useEffect(() => {
        if (type) {
            const serviceIndex = servicesData.services.findIndex((service: Service) => service.type === type);

            if (serviceIndex !== -1) {
                setExpandedCard(serviceIndex);
                // Scroll to the expanded card
                const cardElement = document.getElementById(`service-card-${serviceIndex}`);
                if (cardElement) {
                    cardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else {
                // Service type doesn't exist, redirect to /404
                navigate('/404');
            }
        }
    }, [type, navigate]);

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
                cardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    return (
        <div>
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
                        <h3>{service.type}</h3>
                    </div>
                    {expandedCard === index && (
                        <div className="service-content">
                            <img src={service.image} alt={service.type} />
                            <p>{service.longDescription}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ServicesPage;
