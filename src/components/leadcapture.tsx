const LeadCaptureForm = () => {
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        // Handle form submission
    };

    return (
        <section>
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                {/* Form fields */}
            </form>
        </section>
    );
};
export default LeadCaptureForm;