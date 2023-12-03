import { Route, RouteProps } from "react-router-dom"
import ServiceArea from "../components/map/map"
import TestimonialSlides from "../components/testimonials/testimonialSlides"
import ServiceSlides from "../components/services/serviceSlides"
import ServicesPage from "../components/services/services"
import AboutPage from "../components/about/about"
import ContactPage from "../components/contact/contact"
import QuestionsPage from "../components/faq/faq"
import Testimonials from "../components/testimonials/testimonialSlides"
import LoginForm from "../components/login/login"
import Dashboard from "../components/dashboard/dashboard"
import { PageLayout } from "./PageLayout"

export const routesWithPageLayout: ReadonlyArray<RouteProps> = [
    { 
        path: "/", 
        element: <>
            <ServiceArea/>
            <ServiceSlides/>
            <TestimonialSlides />
        </>
    }, {
        path: "/services",
        element: <ServicesPage />
    }, {
        path: "/about",
        element: <AboutPage />
    }, {
        path: "/contact",
        element: <ContactPage />
    }, {
        path: "/faq",
        element: <QuestionsPage />
    }, {
        path: "/testimonials",
        element: <Testimonials />
    },
]
export const routesNoPageLayout: ReadonlyArray<RouteProps> = [
    {
        path: "/login",
        element: <LoginForm />
    }, {
        path: "/dashboard",
        element: <Dashboard />
    }
]

export const createRoutesWithPageLayout = (routes: ReadonlyArray<RouteProps>) => routes.map((r) => <Route {...r} element={<PageLayout>{r.element}</PageLayout>} />)
export const createRoutesNoPageLayout = (routes: ReadonlyArray<RouteProps>) => routes.map((r) => <Route {...r} />)
