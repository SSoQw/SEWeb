import React from 'react';

type Testimonial = {
    name: string;
    quote: string;
    image: string;
};

type TestimonialsProps = {
    testimonials: Testimonial[];
};

const TestimonialSlide: React.FC<Testimonial> = ({ name, quote, image }) => {
    return (
        <div className="testimonial-slide">
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>{quote}</p>
        </div>
    );
};

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
    return (
        <section>
            <h2>Customer Testimonials</h2>
            <div className="testimonial-slideshow">
                {testimonials.map((testimonial, index) => (
                    <TestimonialSlide key={index} {...testimonial} />
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
