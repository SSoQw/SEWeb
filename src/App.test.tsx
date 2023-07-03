
import React from 'react';
import {Header} from './components/header';
import ServiceArea from './src/components/map';
import ServiceSlideshow from './src/components/ServiceSlideshow';
import Testimonials from './src/components/Testimonials';
import LeadCaptureForm from './src/components/LeadCaptureForm';
import Footer from './src/components/Footer';

const App = () => {
  return (
      <div>
        <Header />
        <ServiceArea />
        <ServiceSlideshow />
        <Testimonials />
        <LeadCaptureForm />
        <Footer />
      </div>
  );
};

export default App;

