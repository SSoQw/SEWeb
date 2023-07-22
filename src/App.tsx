import {FC, ReactNode} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './DataContext';
import Header from './components/header/header'
import ServiceArea from './components/map/map';
import TestimonialSlides from "./components/testimonials/testimonialSlides";
import LeadCaptureForm from './components/leadcapture/leadCapture';
import Footer from './components/footer/footer';
import ServiceSlides from "./components/services/serviceSlides";
import NotFoundPage from './components/notFound/notFound';
import About from "./components/about/about";
import Contact from "./components/contact/contact";
import ServicesPage from "./components/services/services";
import QuestionsPage from "./components/faq/faq";
import Testimonials from "./components/testimonials/testimonials";

interface PageLayoutProps {
    children?: ReactNode;
}

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
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
            <DataProvider>
            <div>
                <Routes>
                    <Route path="/" element={<PageLayout><><ServiceArea /><ServiceSlides />
                        <TestimonialSlides /></></PageLayout>}/>
                    <Route path="/services"  element={<PageLayout><><ServicesPage /></></PageLayout>}/>
                    <Route path="/about" element={<PageLayout><><About /></></PageLayout>}/>
                    <Route path="/contact" element={<PageLayout><><Contact /></></PageLayout>}/>
                    <Route path="/faq" element={<PageLayout><><QuestionsPage /></></PageLayout>}/>
                    <Route path="/testimonials" element={<PageLayout><><Testimonials /></></PageLayout>}/>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
            </DataProvider>
        </Router>
    );
};

export default App;
