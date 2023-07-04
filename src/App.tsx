import React from 'react';
import Header from './components/header'
import ServiceArea from './components/map';
import { ServiceSlide, Testimonials } from './components/serviceslideshow';
import LeadCaptureForm from './components/leadcapture';
import Footer from './components/footer';

const App = () => {
    const testimonials = [
        {
            name: 'John Doe',
            quote: 'Sellick Electric did an excellent job!',
            image: ''
        },
        {
            name: 'Jane Smith',
            quote: 'I am really happy with the service provided by Sellick Electric.',
            image: ''
        },
    ];

    return (
        <div>
            <Header />
            <ServiceArea />
            <ServiceSlide services={['Residential', 'Commercial', 'Generators', 'Networks', 'Camera Systems']} />
            <Testimonials testimonials={testimonials} />
            <LeadCaptureForm />
            <Footer />
        </div>
    );
};

export default App;
