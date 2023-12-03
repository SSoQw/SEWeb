import ServiceMap from "./serviceMap";

const ServiceArea = () => {
  return (
    <section>
      <div className="service-area-container">
        <div className="business-blurb">
          <h2>Welcome to Sellick Electric</h2>
          <p> Whether you&apos;re a business owner seeking professional electrical solutions or a homeowner looking
            to enhance your living space with advanced security systems, we&apos;ve got you covered. Our
            comprehensive services encompass the full spectrum of electrical work, offering seamless
            integration of networks and robust security installations.</p>
        </div>
        <div className="map-container">
          <ServiceMap />
          <Legend />
        </div>
      </div>
    </section>
  );
};

const Legend = () => {
  return (
    <div className="legend">
      <div className="legend-item">
        <div className="legend-color" style={{ background: "blue", opacity: .5 }}></div>
        <div className="legend-label">Call Response Range</div>
      </div>
      <div className="legend-item">
        <div className="legend-color" style={{ background: "green", opacity: .5 }}></div>
        <div className="legend-label">Service Area</div>
      </div>
      <div className="legend-item">
        <div className="legend-color" style={{ background: "orange", opacity: .5 }}></div>
        <div className="legend-label">Not Serviceable</div>
      </div>
    </div>
  );
};

export default ServiceArea;
