import React, { useState, useEffect, useCallback } from 'react';

type ServiceSlideProps = {
    services: string[];
};

export const ServiceSlide: React.FC<ServiceSlideProps> = ({ services }) => {
    const [activeSlide, setActiveSlide] = useState(0);

    const slideNext = useCallback(() => {
        setActiveSlide((prevSlide) => (prevSlide === services.length - 1 ? 0 : prevSlide + 1));
    }, [services.length]);

    const slidePrev = useCallback(() => {
        setActiveSlide((prevSlide) => (prevSlide === 0 ? services.length - 1 : prevSlide - 1));
    }, [services.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            slideNext();
        }, 12000);

        return () => {
            clearInterval(interval);
        };
    }, [slideNext]);

    return (
        <section>
            <h2 className="service-header">Our Services</h2>
            <div className="service-slide-container">
                <div className="service-slide-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                    {services.map((service, index) => (
                        <div key={index} className={`service-slide ${index === activeSlide ? 'active' : ''}`}>
                            <div className="service-slide-content">
                                <h3>{service}</h3>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="slide-control prev" onClick={slidePrev}>
                    &lt;
                </button>
                <button className="slide-control next" onClick={slideNext}>
                    &gt;
                </button>
            </div>
        </section>
    );
};

type Testimonial = {
    name: string;
    quote: string;
    image: string;
};

type TestimonialsProps = {
    testimonials: Testimonial[];
};

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
    const [activeSlide, setActiveSlide] = useState(0);

    const slideNext = useCallback(() => {
        setActiveSlide((prevSlide) => (prevSlide === testimonials.length - 1 ? 0 : prevSlide + 1));
    }, [testimonials.length]);

    const slidePrev = useCallback(() => {
        setActiveSlide((prevSlide) => (prevSlide === 0 ? testimonials.length - 1 : prevSlide - 1));
    }, [testimonials.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            slideNext();
        }, 12000);

        return () => {
            clearInterval(interval);
        };
    }, [slideNext]);

    return (
        <section className="testimonial-container">
            <h2>Customer Testimonials</h2>
            <div className="testimonial-slideshow">
                <div className="testimonial-slide-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className={`testimonial-slide ${index === activeSlide ? 'active' : ''}`}>
                            <div className="testimonial-slide-content">
                                <div className="testimonial-image">
                                    <img src={testimonial.image} alt={testimonial.name} />
                                </div>
                                <div className="testimonial-info">
                                    <h3>{testimonial.name}</h3>
                                    <p>{testimonial.quote}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="slide-control prev" onClick={slidePrev}>
                    &lt;
                </button>
                <button className="slide-control next" onClick={slideNext}>
                    &gt;
                </button>
            </div>
        </section>
    );
};

