import { useState } from 'react';

function Contact() {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault(); // Stops the page from reloading.
    setSent(true); // Show a message. There is no email server in this project.
  }

  return (
    <section className="page contact-page">
      <h2>Contact</h2>
      <p>Questions or suggestions? Fill out this simple form.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          value={message}
          onChange={event => { setMessage(event.target.value); setSent(false); }}
          placeholder="Write your message"
          rows="5"
          required
        />
        <button type="submit">Submit</button>
      </form>
      {sent && <p className="notice">Demo form only. Your message was not sent by email.</p>}
    </section>
  );
}

export default Contact;
