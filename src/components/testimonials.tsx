const Testimonials = () => {
    const testimonials = [
        {
            name: 'John Doe',
            quote: 'Sellick Electric did an excellent job!',
            image: 'john-doe.jpg',
        },
        // Add more testimonials
    ];

    return (
        <section>
            <h2>Customer Testimonials</h2>
            <div className="testimonial-slideshow">
                {testimonials.map((testimonial, index) => (
                    <Testimonial key={index} testimonial={testimonial} />
                ))}
            </div>
        </section>
    );
};
export default Testimonials;