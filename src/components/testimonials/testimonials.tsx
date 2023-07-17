import React, { useEffect, useState } from "react";

interface Testimonial {
    id: number;
    type: string;
    name: string;
    quote: string;
}

const fetchTestimonialData = async () => {
    const response = await fetch("/testimonials.json");
    const data = await response.json();
    return data.testimonials as Testimonial[];
};

const TestimonialsPage = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [expandedCard, setExpandedCard] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTestimonialData();
            console.log("Fetched data:", data);
            setTestimonials(data);
        };
        fetchData().then(() => "None Data :(");
    }, []);

    const toggleExpand = (index: number) => {
        if (expandedCard === index) {
            // Clicked card is already expanded, collapse it
            setExpandedCard(null);
        } else {
            // Clicked card is not expanded, expand it
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
                                className={`testimonial-card ${
                                    expandedCard === testimonial.id ? "expanded" : ""
                                }`}
                                onClick={() => toggleExpand(testimonial.id)}
                            >
                                <div className="testimonial-header">
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
                                    <div className="testimonial-content">
                                        <p>{testimonial.quote}</p>
                                        <p className="testimonial-author">- {testimonial.name}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                );
            })}
            <h2>Want To Share Your Testimonial?</h2>
            <p>We value your feedback! If you'd like to share your testimonial with us, please email us!</p>
            <a href="mailto:testimonial@sellickelectric.com">
                <button className="faq-link">Submit Testimonial</button>
            </a>
        </div>
    );
};

export default TestimonialsPage;
