import React, {useState, useEffect, useRef, FormEvent} from 'react';

const LeadCaptureForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [workProposal, setWorkProposal] = useState('');
    const [statusType, setStatusType] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [showStatus, setShowStatus] = useState(false);
    const [errorField, setErrorField] = useState('');
    const [honeypot, setHoneypot] = useState('');

    const setStatus = (type: string, message: string) => {
        setStatusType(type);
        setStatusMessage(message);
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [workProposal]);

    useEffect(() => {
        if (statusMessage) {
            setShowStatus(true);

            const timeout = setTimeout(() => {
                setShowStatus(false);
            }, 15000);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [statusMessage]);


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorField('');

        if (!name) {
            setErrorField((prev) => prev + 'name ');
            setStatus('info', 'Please enter your name');
        }

        if (!workProposal) {
            setErrorField((prev) => prev + 'proposal ');
            setStatus('info', 'Please enter a work proposal');
        }

        if (!email && !phone) {
            setErrorField((prev) => prev + 'email phone');
            setStatus('info', 'Please enter an email or phone number');
        } else {
            if (email && !validateEmail(email)) {
                setErrorField((prev) => prev + 'email ');
                setStatus('info', 'Please enter a valid email address');
            }

            if (phone && !validatePhoneNumber(phone)) {
                setErrorField((prev) => prev + 'phone ');
                setStatus('info', 'Please enter a valid phone number');
            }
        }

        if (honeypot) {
            setStatus('error', 'Your submission was rejected :(');
            return;
        }


        if (errorField === '' && !honeypot){
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
                    setStatus('success', 'Email sent successfully');
                    // Clear form inputs after successful submission
                    setName('');
                    setEmail('');
                    setPhone('');
                    setWorkProposal('');
                } else {
                    setStatus('error', 'UwU server did a fuckywucky');
                }
            } catch (error) {
                console.error('Error occurred:', error);
                setStatus('error', 'UwU server did a fuckywucky');
            }
        }
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phone: string) => {
        const phoneRegex = /^\d{10}?$/;
        return phoneRegex.test(phone);
    };

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    /*
    const [recaptchaResponse, setRecaptchaResponse] = useState('');

    const handleRecaptchaCallback = (response: string) => {
        setRecaptchaResponse(response);
    };

    if (!recaptchaResponse) {
         setStatus('error', 'Please complete the reCAPTCHA');
         return;
    }

    <div className="g-recaptcha" data-sitekey="6Lc3b_smAAAAAH3neMDeQfg_y9p9a_y5IVtz-Tkf" data-callback={handleRecaptchaCallback}></div>
    */

    return (
        <section>
            <h2>Have a Project in mind? Get in Touch</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div>
                        <input
                            type="text"
                            id="honeypot"
                            name="honeypot"
                            value={honeypot}
                            onChange={(e) => setHoneypot(e.target.value)}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="name">Name *</label>
                        <input
                            type="text"
                            pattern="[A-Za-z ]+"
                            id="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={errorField.includes('name') ? 'highlight' : ''}
                        />
                        <span className="validity"></span>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={errorField.includes('email') ? 'highlight' : ''}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={errorField.includes('phone') ? 'highlight' : ''}
                        />
                    </div>
                </div>
                <label htmlFor="proposal">Work Proposal *</label>
                <textarea
                    id="proposal"
                    placeholder="Work Proposal"
                    value={workProposal}
                    onChange={(e) => setWorkProposal(e.target.value)}
                    ref={textareaRef}
                    className={errorField.includes('proposal') ? 'highlight' : ''}
                ></textarea>
                <button type="submit">Submit</button>
            </form>
            {showStatus && (
                <div className={`status-message ${statusType}`}>
                    {statusMessage}
                    <span
                        className={`dismiss ${statusType}`}
                        onClick={() => setShowStatus(false)}
                    >x</span>
                </div>
            )}
        </section>
    );
};
export default LeadCaptureForm;
