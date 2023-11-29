import {FC, ReactNode, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
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
import LoginForm from "./components/login/login";
import Dashboard from "./components/dashboard/dashboard";

interface PageLayoutProps {
    children?: ReactNode;
}
interface PrivateRouteProps {
    element: ReactNode;
    isAuthenticated: boolean;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ element, isAuthenticated }) => {
    return isAuthenticated ? (
        <Route element={element} />
    ) : (
        <Navigate to="/login" replace={true} />
    );
};

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
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

    const handleLoginSuccess = () => {
        setAuthenticated(true);
    };

    return (
        <Router>
            <DataProvider>
            <div>
                <Routes>
                    <Route path="/" element={<PageLayout><><ServiceArea /><ServiceSlides />
                        <TestimonialSlides /></></PageLayout>}/>
                    <Route path="/login"
                           element={<PageLayout><LoginForm onLoginSuccess={handleLoginSuccess} /></PageLayout>}/>
                    <Route path="/services"  element={<PageLayout><><ServicesPage /></></PageLayout>}/>
                    <Route path="/about" element={<PageLayout><><About /></></PageLayout>}/>
                    <Route path="/contact" element={<PageLayout><><Contact /></></PageLayout>}/>
                    <Route path="/faq" element={<PageLayout><><QuestionsPage /></></PageLayout>}/>
                    <Route path="/testimonials" element={<PageLayout><><Testimonials /></></PageLayout>}/>
                    <PrivateRoute element={<PageLayout><><Dashboard /></></PageLayout>}
                        isAuthenticated={isAuthenticated}/>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
            </DataProvider>
        </Router>
    );
};

export default App;
