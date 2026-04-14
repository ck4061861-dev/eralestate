import { useState } from 'react'

export default function Contact() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({ 
    name:'', email:'', phone:'', subject:'', message:'',
    propertyTitle: '', amount: '',
  })
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

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
        setSuccess('Thank you! Your inquiry has been submitted.');
        setFormData({ name:'', email:'', phone:'', subject:'', message:'', propertyTitle: '', amount: '' });
        setTimeout(() => setSuccess(''), 3000);
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

  return (
    <main className="bg-slate-50 min-h-screen">
      <section className="relative w-full bg-slate-950 text-white pt-32 pb-40 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute -top-24 left-1/2 h-96 w-96 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />

        <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10 z-10 text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">Get In Touch</p>
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-7xl tracking-tight">Contact Us</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">Questions? Let's help you find the right property solution. Our support team is ready to provide personalized guidance.</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-20">
        <div className="grid gap-6 sm:gap-8 lg:gap-10 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 h-fit">
            <h2 className="text-lg md:text-xl font-bold text-slate-900">Our Office</h2>
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Location</p>
                  <p className="text-sm text-slate-600 mt-1">166 Heston Road, London, TW5 0QU</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Phone</p>
                  <p className="text-sm text-slate-600 mt-1">020 8570 4848</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">✉️</span>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Email</p>
                  <p className="text-sm text-slate-600 mt-1">info@nestfind.co.uk</p>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-slate-100 pt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600">Business Hours</p>
              <div className="mt-2 text-sm text-slate-600 font-medium">Mon–Sat: 9:00 AM – 6:00 PM</div>
              <div className="mt-1 text-sm text-slate-500">Sun: Closed</div>
            </div>
          </div>
          <form className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50" onSubmit={handleSubmit}>
          {success && (
            <div className="mb-4 p-2 sm:p-3 bg-emerald-100 text-emerald-700 rounded-lg text-xs sm:text-sm font-semibold">
              ✓ {success}
            </div>
          )}

          {/* CONTACT INFORMATION */}
          <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b">
            <h3 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide mb-3 sm:mb-4">👤 Contact Information</h3>
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              <input 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Your Name *" 
                required
                className="text-xs sm:text-sm rounded-lg border border-slate-300 px-3 py-2 focus:border-cyan-400 focus:ring-cyan-200 focus:ring-2 outline-none" 
              />
              <input 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Email *" 
                required
                type="email"
                className="text-xs sm:text-sm rounded-lg border border-slate-300 px-3 py-2 focus:border-cyan-400 focus:ring-cyan-200 focus:ring-2 outline-none" 
              />
              <input 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="Phone *" 
                required
                className="text-xs sm:text-sm rounded-lg border border-slate-300 px-3 py-2 focus:border-cyan-400 focus:ring-cyan-200 focus:ring-2 outline-none" 
              />
              <input 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange} 
                placeholder="Subject (Optional)" 
                className="text-xs sm:text-sm rounded-lg border border-slate-300 px-3 py-2 focus:border-cyan-400 focus:ring-cyan-200 focus:ring-2 outline-none" 
              />
            </div>
          </div>

          {/* INQUIRY DETAILS */}
          <div className="mb-4 sm:mb-6">
            <h3 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide mb-3 sm:mb-4">🏠 Inquiry Details</h3>
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              <div>
                <label className="text-[11px] sm:text-xs font-semibold text-slate-600 mb-1.5 sm:mb-2 block">Property Name</label>
                <input 
                  name="propertyTitle" 
                  value={formData.propertyTitle} 
                  onChange={handleChange}
                  placeholder="e.g., Modern Villa"
                  className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 px-3 py-2 focus:border-cyan-400 focus:ring-cyan-200 focus:ring-2 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] sm:text-xs font-semibold text-slate-600 mb-1.5 sm:mb-2 block">Amount / Price</label>
                <input 
                  name="amount" 
                  value={formData.amount} 
                  onChange={handleChange}
                  placeholder="e.g., £100,000"
                  className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 px-3 py-2 focus:border-cyan-400 focus:ring-cyan-200 focus:ring-2 outline-none"
                />
              </div>
            </div>
          </div>

          {/* MESSAGE */}
          <div className="mb-4 sm:mb-6">
            <label className="text-[11px] sm:text-xs font-semibold text-slate-600 mb-1.5 sm:mb-2 block">Message / Requirements *</label>
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              rows="5" 
              placeholder="Tell us about your requirements..." 
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-cyan-400 focus:ring-cyan-200 focus:ring-2 outline-none" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full rounded-xl bg-cyan-500 px-5 py-3.5 font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 disabled:opacity-50 transition-all"
          >
            {loading ? 'Sending...' : 'Submit Inquiry'}
          </button>
        </form>
        </div>
      </div>
    </main>
  )
}
