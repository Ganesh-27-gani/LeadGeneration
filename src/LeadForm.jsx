import React, { useState } from 'react'

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

        if (!formData.name || !formData.email) {
            return setError('Name and Email are required.');
        }

        if (!validateEmail(formData.email)) {
            return setError('Invalid email address.');
        }

        setError('');

        try {
            const res = await fetch('http://localhost:3000/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            alert(data.message);
        } catch (err) {
             console.log(err)
        }
    };
    return (
        <div >
            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px',   }}>
                            <h2>Lead Form</h2>
                            {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}

                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                onChange={handleChange}
                                required
                                style={{ padding: '10px', fontSize: '16px' }}
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                                required
                                style={{ padding: '10px', fontSize: '16px' }}
                            />

                            <input
                                type="text"
                                name="company"
                                placeholder="Company"
                                onChange={handleChange}
                                style={{ padding: '10px', fontSize: '16px' }}
                            />

                            <textarea
                                name="message"
                                placeholder="Message"
                                onChange={handleChange}
                                rows="4"
                                style={{ padding: '10px', fontSize: '16px' }}
                            ></textarea>

                            <button type="submit" style={{ padding: '10px', fontSize: '16px', cursor: 'pointer',backgroundColor:"slategray",color:"white",  }}>
                                Submit
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeadForm