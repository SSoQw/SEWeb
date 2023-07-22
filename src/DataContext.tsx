import  { FC, ReactNode, createContext, useEffect, useState } from 'react';
import { Service, Testimonial } from './types';

interface DataContextProps {
    children: ReactNode;
}

interface DataContextValue {
    services: Service[];
    testimonials: Testimonial[];
}

const DataContext = createContext<DataContextValue>({
    services: [],
    testimonials: [],
});

export const DataProvider: FC<DataContextProps> = ({ children }) => {
    const [services, setServices] = useState<Service[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        const fetchServicesData = async () => {
            try {
                const response = await fetch('/api/services');
                const data = await response.json();
                setServices(data.services as Service[]);
            } catch (error) {
                console.error('Error occurred:', error);
                //If the API call fails, fetch the data from the services.json file in public, which may be old.
                const response = await fetch('/services.json');
                const data = await response.json();
                setServices(data.services as Service[]);
            }
        };

        const fetchTestimonialData = async () => {
            try {
                const response = await fetch('/api/testimonials');
                const data = await response.json();
                setTestimonials(data.testimonials as Testimonial[]);
            } catch (error) {
                console.error('Error occurred:', error);
                //If the API call fails, fetch the data from the testimonials.json file in public, which may be old.
                const response = await fetch('/testimonials.json');
                const data = await response.json();
                setTestimonials(data.testimonials as Testimonial[]);
            }
        };

        fetchServicesData();
        fetchTestimonialData();
    }, []);

    return (
        <DataContext.Provider value={{ services, testimonials }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;