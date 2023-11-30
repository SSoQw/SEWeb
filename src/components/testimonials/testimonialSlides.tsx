import { FC, useContext, useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import DataContext from '../../contexts/dataContext';
import { Testimonial } from "../../types";

const TestimonialSlide: FC<Testimonial> = ({ image, name, quote }) => {
    return (
        <div className="slide-container">
            <div className="slide-content">
                <h3 className="slide-title">{name}</h3>
                <p className="slide-description">{quote}</p>
                <Link to="/testimonials" className="read-more-button">
                    Read More
                </Link>
            </div>
            <img src={image} alt={name} className="slide-image" />
        </div>
    );
};
const Testimonials = () => {
    const { testimonials } = useContext(DataContext);
    const [testimonialsSlides, setTestimonialSlides] = useState<Testimonial[]>([]);

    useEffect(() => {
        const shuffledData = shuffle(testimonials);
        const slicedData = shuffledData.slice(0, 5);
        setTestimonialSlides(slicedData);
    }, [testimonials]);

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
                        {testimonialsSlides.map((testimonial, index) => (
                            <TestimonialSlide
                                key={index}
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
