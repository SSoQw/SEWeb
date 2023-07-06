import React, {useState, useEffect, useRef, FormEvent} from 'react';

const LeadCaptureForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [workProposal, setWorkProposal] = useState('');
    const [status, setStatus] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        adjustTextareaHeight();
    }, [workProposal]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!name || !workProposal || (!email && !phone)) {
            setStatus('Please fill in all required fields, you need either an email or phone number');
            return;
        }

        if (email && !validateEmail(email)) {
            setStatus('Invalid email format');
            return;
        }

        if (phone && !validatePhoneNumber(phone)) {
            setStatus('Invalid phone number format');
            return;
        }

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    phone,
                    email,
                    workProposal,
                }),
            });

            if (response.ok) {
                setStatus('Email sent successfully');
                // Clear form inputs after successful submission
                setName('');
                setEmail('');
                setPhone('');
                setWorkProposal('');
            } else {
                setStatus('UwU server did a fuckywucky');
            }
        } catch (error) {
            console.error('Error occurred:', error);
            setStatus('An error occurred');
        }
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phone: string)  => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    return (
        <section>
            <h2>Have a Project in mind? Get in Touch</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div>
                        <label htmlFor="name">Name *</label>
                        <input type="text" id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone</label>
                        <input type="tel" id="phone" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                </div>
                <label htmlFor="proposal">Work Proposal *</label>
                <textarea
                    id="proposal"
                    placeholder="Work Proposal"
                    value={workProposal}
                    onChange={(e) => setWorkProposal(e.target.value)}
                    required
                    ref={textareaRef}
                ></textarea>
                <button type="submit">Submit</button>
            </form>
            {status && <div className="status-message">{status}</div>}
        </section>
    );
};
export default LeadCaptureForm;
