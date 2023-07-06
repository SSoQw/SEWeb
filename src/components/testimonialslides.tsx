import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import testimonialsData from '../data/testimonials.json';

interface Testimonial {
    id?: number;
    name: string;
    quote: string;
    image: string;
}

const TestimonialSlide: React.FC<Testimonial> = ({ image, name, quote }) => {
    return (
        <div className="testimonial-slide">
            <div className="slide-content">
                <img src={image} alt={name} className="slide-image" />
                <h3 className="slide-title">{name}</h3>
                <p className="slide-description">{quote}</p>
            </div>
        </div>
    );
};

const Testimonials = () => {
    const testimonials: Testimonial[] = testimonialsData.testimonials;

    return (
        <div className="testimonial-slides">
            <h2>Testimonials</h2>
        <Carousel showThumbs={true} autoPlay={true} interval={15000} infiniteLoop={true} showStatus={false}>
            {testimonials.map((testimonial, index) => (
                <TestimonialSlide
                    key={index}
                    image={testimonial.image}
                    name={testimonial.name}
                    quote={testimonial.quote}
                />
            ))}
        </Carousel>
        </div>
    );
};

export default Testimonials;
