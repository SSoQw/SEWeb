import { useContext, useEffect, useState, useRef } from "react";
import DataContext from '../../DataContext';
import { Testimonial } from "../../types";


const TestimonialsPage = () => {
    const { testimonials } = useContext(DataContext);
    const [expandedCard, setExpandedCard] = useState<number | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);

    // Scroll to the top of the page when component is mounted
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (expandedCard !== null) {
            setTimeout(() => {
                const cardElement = cardRef.current;
                if (cardElement) {
                    cardElement.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            }, 100);
        }
    }, [expandedCard, testimonials]);

    const toggleExpand = (index: number) => {
        if (expandedCard === index) {
            setExpandedCard(null);
        } else {
            setExpandedCard(index);
        }
    };

    const testimonialsByType = testimonials.reduce(
        (acc: { [key: string]: Testimonial[] }, testimonial) => {
            if (!acc[testimonial.type ?? 'No type found']) {
                acc[testimonial.type ?? 'No type found'] = [];
            }
            acc[testimonial.type ?? 'No type found'].push(testimonial);
            return acc;
        },
        {}
    );

    return (
        <div>
            <h1>Testimonials</h1>
            {Object.entries(testimonialsByType).map(([type, testimonials]) => {
                return (
                    <div key={type}>
                        <h2>{type}</h2>
                        {testimonials.map((testimonial: Testimonial) => (
                            <div
                                key={`${type}-${testimonial.id}`}
                                className={`accordion-card ${
                                    expandedCard === testimonial.id ? "expanded" : ""
                                }`}
                                onClick={() => toggleExpand(testimonial.id ?? -1)}
                                ref={expandedCard === testimonial.id ? cardRef : null}
                            >
                                <div className="long-accordion-header">
                                    <span>{testimonial.tagline}</span>
                                    <span
                                        className={`expand-icon ${
                                            expandedCard === testimonial.id ? "minus" : "plus"
                                        }`}
                                    >
                    {expandedCard === testimonial.id ? "-" : "+"}
                  </span>
                                </div>
                                {expandedCard === testimonial.id && (
                                    <div className="accordion-content">
                                        <img src={testimonial.image} alt={testimonial.type} />
                                        <p>{testimonial.quote}</p>
                                        <p className="accordion-author">- {testimonial.name}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                );
            })}
            <h2>Want To Share Your Testimonial?</h2>
            <p>We value your feedback! If you'd like to share your testimonial with us, please email us with your name, company name if applicable, feedback, and a picture of the work you thought was worth talking about.</p>
            <a href="mailto:testimonial@sellickelectric.com">
                <button className="big-button">Submit Testimonial</button>
            </a>
        </div>
    );
};

export default TestimonialsPage;
