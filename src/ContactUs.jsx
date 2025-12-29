import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Send, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';

const ContactUs = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl w-full max-w-4xl my-8">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-3xl font-bold text-white flex items-center gap-2">
            <Mail className="text-cyan-400" />
            Contact Us
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Get In Touch</h3>
              <p className="text-gray-300 mb-6">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-slate-800 p-4 rounded-lg hover:bg-slate-750 transition-colors">
                <div className="bg-cyan-500 p-3 rounded-full">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Email</h4>
                  <p className="text-gray-300 text-sm">support@caspire.com</p>
                  <p className="text-gray-300 text-sm">hr@caspire.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-slate-800 p-4 rounded-lg hover:bg-slate-750 transition-colors">
                <div className="bg-green-500 p-3 rounded-full">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Phone</h4>
                  <p className="text-gray-300 text-sm">+91 98765 43210</p>
                  <p className="text-gray-300 text-sm">Mon-Fri: 9AM - 6PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-slate-800 p-4 rounded-lg hover:bg-slate-750 transition-colors">
                <div className="bg-purple-500 p-3 rounded-full">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Address</h4>
                  <p className="text-gray-300 text-sm">Mumbai, Maharashtra</p>
                  <p className="text-gray-300 text-sm">India</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-3">
                <a href="https://linkedin.com/company/caspire" target="_blank" rel="noopener noreferrer" className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition-all transform hover:scale-110">
                  <Linkedin className="text-white" size={20} />
                </a>
                <a href="https://twitter.com/caspire" target="_blank" rel="noopener noreferrer" className="bg-sky-500 p-3 rounded-full hover:bg-sky-600 transition-all transform hover:scale-110">
                  <Twitter className="text-white" size={20} />
                </a>
                <a href="https://instagram.com/caspire" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-110">
                  <Instagram className="text-white" size={20} />
                </a>
                <a href="https://youtube.com/caspire" target="_blank" rel="noopener noreferrer" className="bg-red-600 p-3 rounded-full hover:bg-red-700 transition-all transform hover:scale-110">
                  <Youtube className="text-white" size={20} />
                </a>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-white text-sm font-semibold mb-2 block">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">Subject *</label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                >
                  <option value="">Select Subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="hr">HR Partnership</option>
                  <option value="student">Student Support</option>
                  <option value="technical">Technical Issue</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">Message *</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows="4"
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;