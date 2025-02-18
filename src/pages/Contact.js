import React from 'react';
import handleSubmit from '../handleemails/handleSubmit.js'; // Adjust the path to your email handler
import '../assets/css/Contact.css'; // Import the CSS file

function Contact() {
  return (
    <div className="contact-container">
      <h1 className="contact-heading">Contact Me</h1>
      <div className="contact-info">
        <div className="info-item">
          <label>Email:</label>
          <p>rachadev032@gmail.com</p>
        </div>
        <div className="info-item">
          <label>Phone:</label>
          <p>+27 672 116 011</p>
        </div>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="from_name">Your Name</label>
          <input
            type="text"
            id="from_name"
            name="from_name"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reply_to">Your Email</label>
          <input
            type="email"
            id="reply_to"
            name="reply_to"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            className="form-control"
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Contact;