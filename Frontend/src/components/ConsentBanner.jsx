import { useState } from 'react'

const STORAGE_KEY = 'cookieConsentStatus'
const TIMESTAMP_KEY = 'cookieConsentTimestamp'
const REAPPEAR_MS = 24 * 60 * 60 * 1000

function shouldShowConsent() {
  if (typeof window === 'undefined') return false
  const status = window.localStorage.getItem(STORAGE_KEY)
  const timestamp = Number(window.localStorage.getItem(TIMESTAMP_KEY) || '0')
  if (status === 'accepted') return false
  if (status === 'rejected') {
    return Date.now() - timestamp >= REAPPEAR_MS
  }
  return true
}

export default function ConsentBanner() {
  const [visible, setVisible] = useState(shouldShowConsent())
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState({ analytics: true, marketing: false })

  const handleAccept = () => {
    window.localStorage.setItem(STORAGE_KEY, 'accepted')
    window.localStorage.removeItem(TIMESTAMP_KEY)
    setVisible(false)
  }

  const handleReject = () => {
    window.localStorage.setItem(STORAGE_KEY, 'rejected')
    window.localStorage.setItem(TIMESTAMP_KEY, Date.now().toString())
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex w-[90%] max-w-md flex-col gap-4 rounded-3xl border border-slate-800 bg-[#0a0f1c] p-6 text-white shadow-2xl shadow-black/50">
      <div>
        <h2 className="text-xl font-bold">We use cookies</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          We use cookies and tracking technologies to improve your browsing experience, show relevant content, and understand how visitors use our site.
        </p>
      </div>

      {showDetails && (
        <div className="flex flex-col gap-3 rounded-2xl bg-slate-900/60 border border-slate-800 p-4 text-xs text-slate-300 mt-2">
          <p className="font-bold text-white text-sm">Cookie Preferences</p>
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <p className="font-semibold text-slate-200">Strictly Necessary</p>
              <p className="text-[11px] text-slate-500 mt-0.5 max-w-[200px]">Required for website functionality.</p>
            </div>
            <div className="relative inline-flex h-5 w-9 shrink-0 cursor-not-allowed items-center rounded-full bg-cyan-600 opacity-50">
              <span className="translate-x-4 inline-block h-3 w-3 transform rounded-full bg-white" />
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <p className="font-semibold text-slate-200">Analytics & Performance</p>
              <p className="text-[11px] text-slate-500 mt-0.5 max-w-[200px]">Helps us improve performance.</p>
            </div>
            <button 
              type="button"
              onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out ${preferences.analytics ? 'bg-cyan-500' : 'bg-slate-700'}`}
            >
              <span className={`${preferences.analytics ? 'translate-x-5' : 'translate-x-1'} inline-block h-3 w-3 transform rounded-full bg-white transition duration-200 ease-in-out`} />
            </button>
          </div>

          <div className="flex items-center justify-between pb-1">
            <div>
              <p className="font-semibold text-slate-200">Marketing & Advertising</p>
              <p className="text-[11px] text-slate-500 mt-0.5 max-w-[200px]">Used to deliver personalized ads.</p>
            </div>
            <button 
              type="button"
              onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out ${preferences.marketing ? 'bg-cyan-500' : 'bg-slate-700'}`}
            >
              <span className={`${preferences.marketing ? 'translate-x-5' : 'translate-x-1'} inline-block h-3 w-3 transform rounded-full bg-white transition duration-200 ease-in-out`} />
            </button>
          </div>
          
          <button
            type="button"
            onClick={handleAccept}
            className="mt-3 w-full rounded-lg bg-emerald-500 py-2.5 font-bold text-slate-950 transition hover:bg-emerald-400"
          >
            Save My Preferences
          </button>
        </div>
      )}

      {!showDetails && (
        <div className="flex flex-col gap-3 pt-2">
          <div className="flex flex-row gap-3">
            <button
              type="button"
              onClick={handleAccept}
              className="flex-1 rounded-full bg-yellow-400 px-4 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-yellow-500/20 transition hover:bg-yellow-500 hover:scale-105"
            >
              I agree
            </button>
            <button
              type="button"
              onClick={handleReject}
              className="flex-1 rounded-full border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700 hover:border-slate-500"
            >
              I decline
            </button>
          </div>
          <button
            type="button"
            onClick={() => setShowDetails(true)}
            className="text-center text-xs font-semibold text-slate-400 hover:text-white underline underline-offset-4 transition"
          >
            Change my preferences
          </button>
        </div>
      )}
    </div>
  )
}
