import "../styles/ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>
        If you have any questions or comments, feel free to reach out to us
        using the form below.
      </p>
      <form className="contact-form">
        <input type="text" name="name" placeholder="Full Name" required />
        <input type="email" name="email" placeholder="Email Address" required />
        <textarea name="message" placeholder="Your Message" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactUs;
