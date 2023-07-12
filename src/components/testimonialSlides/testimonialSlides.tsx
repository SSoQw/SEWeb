import React, {useEffect, useState} from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface Testimonial {
    id?: number;
    name: string;
    quote: string;
    image: string;
}

const fetchTestimonialsData = async () => {
    const response = await fetch('/testimonials.json');
    const data = await response.json();
    return data.testimonials as Testimonial[];
};

const TestimonialSlide: React.FC<Testimonial> = ({ image, name, quote }) => {
    return (
        <div className="slide-container">
            <div className="slide-content">
                <h3 className="slide-title">{name}</h3>
                <p className="slide-description">{quote}</p>
            </div>
            <img src={image} alt={name} className="slide-image"/>
        </div>
    );
};

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTestimonialsData();
            setTestimonials(data);
        };
        fetchData();
    }, []);

    return (
        <div className="carousel-container">
            <h2>Testimonials</h2>
            <Carousel showThumbs={false} autoPlay={true} interval={15000} infiniteLoop={true} showStatus={false}>
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
