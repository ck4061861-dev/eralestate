import { useState } from 'react'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
  MessageSquare,
  User,
  DollarSign,
  Home,
  ArrowRight,
  Calendar
} from 'lucide-react'

export default function Contact() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({ 
    name:'', email:'', phone:'', subject:'', message:'',
    propertyTitle: '', amount: '',
  })
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleChange=(e)=>{
    const { name, value } = e.target;
    setFormData({...formData,[name]:value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!formData.name || !formData.email || !formData.phone || !formData.message) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/inquiries/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          propertyTitle: formData.propertyTitle,
          amount: formData.amount,
        })
      });
      
      const data = await res.json();
      if(data.success) {
        setSuccess('Thank you! Your inquiry has been submitted successfully.');
        setFormData({ name:'', email:'', phone:'', subject:'', message:'', propertyTitle: '', amount: '' });
        setTimeout(() => setSuccess(''), 5000);
      } else {
        alert('Error submitting inquiry');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit inquiry');
    } finally {
      setLoading(false);
    }
  }

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5" strokeWidth={1.5} />,
      label: 'Location',
      value: '166 Heston Road, London, TW5 0QU',
      href: 'https://maps.google.com/?q=166+Heston+Road+London+TW5+0QU'
    },
    {
      icon: <Phone className="w-5 h-5" strokeWidth={1.5} />,
      label: 'Phone',
      value: '020 8570 4848',
      href: 'tel:02085704848'
    },
    {
      icon: <Mail className="w-5 h-5" strokeWidth={1.5} />,
      label: 'Email',
      value: 'info@nestfind.co.uk',
      href: 'mailto:info@nestfind.co.uk'
    },
  ];

  const businessHours = [
    { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
    { day: 'Saturday', time: '10:00 AM – 4:00 PM' },
    { day: 'Sunday', time: 'Closed' },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900 overflow-hidden" style={{ fontFamily: "'Poppins', sans-serif" }}>

      {/* ── HERO SECTION ── */}
      <section className="relative px-6 pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gray-50 rounded-full blur-[120px] opacity-60 pointer-events-none -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gray-100 rounded-full blur-[100px] opacity-40 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm mb-6 sm:mb-8">
              <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-[10px] font-semibold tracking-[0.3em] text-gray-500 uppercase">Get In Touch</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6 sm:mb-8">
              Contact <span className="font-light text-gray-400">Us</span>
            </h1>
            
            <p className="text-gray-500 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light px-4 sm:px-0">
              Questions? Let's help you find the right property solution. Our support team is ready to provide personalized guidance.
            </p>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-28 -mt-4 sm:-mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
            
            {/* ── LEFT: CONTACT INFO ── */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex items-start gap-4 p-5 sm:p-6 bg-white rounded-2xl sm:rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="p-3 bg-gray-50 rounded-xl text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-all duration-300 shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">{item.value}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-900 group-hover:translate-x-1 transition-all duration-300 shrink-0 mt-1 hidden sm:block" />
                  </a>
                ))}
              </div>

              {/* Business Hours */}
              <div className="p-6 sm:p-8 bg-gray-50 rounded-2xl sm:rounded-3xl border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-white rounded-xl shadow-sm">
                    <Clock className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Business Hours</h3>
                </div>
                <div className="space-y-4">
                  {businessHours.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{item.day}</span>
                      <span className={`text-sm font-semibold ${item.time === 'Closed' ? 'text-gray-400' : 'text-gray-900'}`}>
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Response Badge */}
              <div className="p-6 bg-gray-900 rounded-2xl sm:rounded-3xl text-white text-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-lg mb-2">Fast Response</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  We typically respond within 24 hours during business days.
                </p>
              </div>

            </div>

            {/* ── RIGHT: FORM ── */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl sm:rounded-[2rem] border border-gray-100 p-5 sm:p-8 lg:p-10 shadow-sm">
                
                {/* Success Message */}
                {success && (
                  <div className="mb-6 sm:mb-8 p-4 sm:p-5 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-emerald-900">Success!</p>
                      <p className="text-sm text-emerald-700 mt-0.5">{success}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                  
                  {/* Contact Information Section */}
                  <div>
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wider">Contact Information</h3>
                    </div>
                    
                    <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                      <div className="relative">
                        <input 
                          name="name" 
                          value={formData.name} 
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Your Name *" 
                          required
                          className={`w-full text-sm rounded-xl sm:rounded-2xl border bg-white px-4 sm:px-5 py-3.5 sm:py-4 outline-none transition-all duration-300 ${
                            focusedField === 'name' 
                              ? 'border-gray-900 ring-4 ring-gray-100' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`} 
                        />
                      </div>
                      <div className="relative">
                        <input 
                          name="email" 
                          value={formData.email} 
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Email Address *" 
                          required
                          type="email"
                          className={`w-full text-sm rounded-xl sm:rounded-2xl border bg-white px-4 sm:px-5 py-3.5 sm:py-4 outline-none transition-all duration-300 ${
                            focusedField === 'email' 
                              ? 'border-gray-900 ring-4 ring-gray-100' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`} 
                        />
                      </div>
                      <div className="relative">
                        <input 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleChange}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Phone Number *" 
                          required
                          type="tel"
                          className={`w-full text-sm rounded-xl sm:rounded-2xl border bg-white px-4 sm:px-5 py-3.5 sm:py-4 outline-none transition-all duration-300 ${
                            focusedField === 'phone' 
                              ? 'border-gray-900 ring-4 ring-gray-100' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`} 
                        />
                      </div>
                      <div className="relative">
                        <input 
                          name="subject" 
                          value={formData.subject} 
                          onChange={handleChange}
                          onFocus={() => setFocusedField('subject')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Subject (Optional)" 
                          className={`w-full text-sm rounded-xl sm:rounded-2xl border bg-white px-4 sm:px-5 py-3.5 sm:py-4 outline-none transition-all duration-300 ${
                            focusedField === 'subject' 
                              ? 'border-gray-900 ring-4 ring-gray-100' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`} 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100" />

                  {/* Inquiry Details Section */}
                  <div>
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <Home className="w-4 h-4 text-gray-600" />
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wider">Inquiry Details</h3>
                    </div>
                    
                    <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                      <div className="relative">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Property Name</label>
                        <input 
                          name="propertyTitle" 
                          value={formData.propertyTitle} 
                          onChange={handleChange}
                          onFocus={() => setFocusedField('propertyTitle')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="e.g., Modern Villa"
                          className={`w-full text-sm rounded-xl sm:rounded-2xl border bg-white px-4 sm:px-5 py-3.5 sm:py-4 outline-none transition-all duration-300 ${
                            focusedField === 'propertyTitle' 
                              ? 'border-gray-900 ring-4 ring-gray-100' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`} 
                        />
                      </div>
                      <div className="relative">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Budget / Amount</label>
                        <div className="relative">
                          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input 
                            name="amount" 
                            value={formData.amount} 
                            onChange={handleChange}
                            onFocus={() => setFocusedField('amount')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="e.g., £500,000"
                            className={`w-full text-sm rounded-xl sm:rounded-2xl border bg-white pl-10 pr-4 sm:pr-5 py-3.5 sm:py-4 outline-none transition-all duration-300 ${
                              focusedField === 'amount' 
                                ? 'border-gray-900 ring-4 ring-gray-100' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100" />

                  {/* Message Section */}
                  <div>
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <MessageSquare className="w-4 h-4 text-gray-600" />
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wider">Your Message</h3>
                    </div>
                    
                    <div className="relative">
                      <textarea 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        rows="5" 
                        placeholder="Tell us about your requirements, preferred location, timeline, or any questions you have..." 
                        required
                        className={`w-full text-sm rounded-xl sm:rounded-2xl border bg-white px-4 sm:px-5 py-3.5 sm:py-4 outline-none transition-all duration-300 resize-none ${
                          focusedField === 'message' 
                            ? 'border-gray-900 ring-4 ring-gray-100' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`} 
                      />
                      <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                        {formData.message.length} chars
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="group w-full rounded-xl sm:rounded-2xl bg-gray-900 px-6 sm:px-8 py-4 sm:py-5 font-semibold text-white shadow-lg shadow-gray-900/10 hover:bg-black hover:shadow-xl hover:shadow-gray-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    By submitting, you agree to our privacy policy and terms of service.
                  </p>

                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── MAP SECTION (Optional) ── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl sm:rounded-[2rem] overflow-hidden bg-gray-100 border border-gray-100 h-64 sm:h-80 lg:h-96 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.6!2d-0.37!3d51.48!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDI4JzQ4LjAiTiAwwrAyMicxMi4wIlc!5e0!3m2!1sen!2suk!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%) contrast(1.1)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
              className="absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

    </main>
  )
}