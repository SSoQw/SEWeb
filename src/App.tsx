import React, {ReactNode} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header'
import ServiceArea from './components/map';
import Testimonials from "./components/testimonialslides";
import LeadCaptureForm from './components/leadcapture';
import Footer from './components/footer';
import ServiceSlides from "./components/serviceslides";
import NotFoundPage from './components/NotFound';

interface PageLayoutProps {
    children: ReactNode;
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
                    <Route path="/services" element={<PageLayout>a</PageLayout>}/>
                    <Route path="/about" element={<PageLayout>a</PageLayout>}/>
                    <Route path="/contact" element={<PageLayout>a</PageLayout>}/>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
