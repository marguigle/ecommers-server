import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      alert("Message sent! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitted(false);
    }, 500);
  };

  return (
    <div className="container-xxl py-5">
      <h1>Contact Us</h1>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                spellCheck={false}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                className="form-control"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitted}>
              {isSubmitted ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <h4>Our Information</h4>
          <p><strong>Phone:</strong> +54 9 682 699</p>
          <p><strong>Email:</strong> marguigle72@gmail.com.ar</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
