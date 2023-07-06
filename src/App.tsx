import React from 'react';
import Header from './components/header'
import ServiceArea from './components/map';
import Testimonials from "./components/testimonialslides";
import LeadCaptureForm from './components/leadcapture';
import Footer from './components/footer';
import ServiceSlides from "./components/serviceslides";

const App = () => {
    return (
        <div>
            <Header />
            <ServiceArea />
            <ServiceSlides />
            <Testimonials />
            <LeadCaptureForm />
            <Footer />
        </div>
    );
};

export default App;
