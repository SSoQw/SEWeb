import React, { useEffect, useState, useRef } from "react";

interface Testimonial {
    id: number;
    type: string;
    name: string;
    quote: string;
    image: string;
}

const fetchTestimonialData = async () => {
    const response = await fetch("/testimonials.json");
    const data = await response.json();
    return data.testimonials as Testimonial[];
};

const TestimonialsPage = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [expandedCard, setExpandedCard] = useState<number | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTestimonialData();
            console.log("Fetched data:", data);
            setTestimonials(data);
        };
        fetchData().then(() => "None Data :(");
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
            if (!acc[testimonial.type]) {
                acc[testimonial.type] = [];
            }
            acc[testimonial.type].push(testimonial);
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
                                onClick={() => toggleExpand(testimonial.id)}
                                ref={expandedCard === testimonial.id ? cardRef : null}
                            >
                                <div className="accordion-header">
                                    <span>{testimonial.name}</span>
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
            <p>We value your feedback! If you'd like to share your testimonial with us, please email us with your feedback and an picture of the work.</p>
            <a href="mailto:testimonial@sellickelectric.com">
                <button className="big-button">Submit Testimonial</button>
            </a>
        </div>
    );
};

export default TestimonialsPage;
