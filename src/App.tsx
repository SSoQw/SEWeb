import React, {ReactNode} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/header'
import ServiceArea from './components/map/map';
import Testimonials from "./components/testimonialSlides/testimonialSlides";
import LeadCaptureForm from './components/leadcapture/leadCapture';
import Footer from './components/footer/footer';
import ServiceSlides from "./components/serviceSlides/serviceSlides";
import NotFoundPage from './components/notFound/notFound';
import About from "./components/about/about";
import Contact from "./components/contact/contact";
import ServicesPage from "./components/services/services";

interface PageLayoutProps {
    children?: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    return (
        <div className="force-height">
            <Header />
            {children}
            <LeadCaptureForm />
            <Footer />
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<PageLayout><><ServiceArea /><ServiceSlides />
                        <Testimonials /></></PageLayout>}/>
                    <Route path="/services"  element={<PageLayout><><ServicesPage /></></PageLayout>}/>
                    <Route path="/about" element={<PageLayout><><About /></></PageLayout>}/>
                    <Route path="/contact" element={<PageLayout><><Contact /></></PageLayout>}/>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
