import React from 'react';
import Header from './components/header'
import ServiceArea from './components/map';
import ServiceSlide from './components/serviceslideshow';
import Testimonials from './components/testimonials';
import LeadCaptureForm from './components/leadcapture';
import Footer from './components/footer';

const App = () => {
  return (
      <div>
        <Header />
        <ServiceArea />
        <ServiceSlide  />
        <Testimonials />
        <LeadCaptureForm />
        <Footer />
      </div>
  );
};

export default App;

