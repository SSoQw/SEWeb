type ServiceSlideProps = {
    service: string;
};

const ServiceSlide: React.FC<ServiceSlideProps> = ({ service }) => {
    return (
        <div className="service-slide">
            {/* Add the content for a single slide */}
            <h3>{service}</h3>
        </div>
    );
};

export default ServiceSlide;
