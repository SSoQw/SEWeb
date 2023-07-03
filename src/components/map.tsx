const ServiceArea = () => {
    return (
        <section>
            <h2>Welcome to Sellick Electric!</h2>
            <div className="service-area-container">
                <div className="business-blurb">
                    <p>We provide exceptional electrical services.</p>
                    <p>Note: We may work outside the service area for the right price.</p>
                </div>
                <div className="map-container">
                    <Map />
                    <p>Note: We may work outside the service area for the right price.</p>
                </div>
            </div>
        </section>
    );
};
export default ServiceArea;