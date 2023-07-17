import React, {useEffect, useState} from 'react';
import { shuffle } from 'lodash';
import { Carousel } from 'react-responsive-carousel';

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
            <img src={image} alt={name} className="slide-image" />
        </div>
    );
};
const Testimonials = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTestimonialsData();
            const shuffledData = shuffle(data);
            const slicedData = shuffledData.slice(0, 5);
            setTestimonials(slicedData);
        };
        fetchData().then(() => "None Data :(");
    }, []);

    return (
        <div>
            <h1>Testimonials</h1>
            <div className="carousel-container">
                {testimonials.length > 0 && (
                    <Carousel
                        showThumbs={false}
                        autoPlay={true}
                        interval={10000}
                        infiniteLoop={true}
                        showStatus={false}
                    >
                        {testimonials.map((testimonial, index) => (
                            <TestimonialSlide
                                key={testimonial.id ?? index}
                                image={testimonial.image}
                                name={testimonial.name}
                                quote={testimonial.quote}
                            />
                        ))}
                    </Carousel>
                )}
            </div>
        </div>
    );
};

export default Testimonials;
