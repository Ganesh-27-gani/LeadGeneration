import React, { useState } from 'react';

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email) {
      return setError('Name and Email are required.');
    }

    if (!validateEmail(formData.email)) {
      return setError('Invalid email address.');
    }

    setError('');

    try {
      const res = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        alert(data.message);
      } else {
        alert("Failed to submit lead.");
      }
    } catch (err) {
      console.log("Error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <h2>Lead Form</h2>
            {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}

            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="company"
              placeholder="Company"
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Message"
              onChange={handleChange}
              rows="4"
            ></textarea>

            <button
              type="submit"
              style={{
                backgroundColor: 'slategray',
                color: 'white',
                padding: '10px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;
