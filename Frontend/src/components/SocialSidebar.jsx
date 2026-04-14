import React from 'react'

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-pink-500">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37a4 4 0 1 1-7.9 1.63 4 4 0 0 1 7.9-1.63z" />
        <path d="M17.5 6.5h.01" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-black">
        <path d="M16 8.25a4.25 4.25 0 0 1-4.25-4.25" />
        <path d="M12 6.25v10.5a4.25 4.25 0 1 1-4.25-4.25" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-600">
        <path d="M18 2h-3a4 4 0 0 0-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h3V2z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://twitter.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-slate-900">
        <path d="M6 6L18 18" />
        <path d="M18 6L6 18" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/8449896759?text=Hi%20there%2C%20I%20want%20to%20chat%20about%20a%20property',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-emerald-500">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.8.47 3.56 1.36 5.07l-1.2 4.68c-.2.8.6 1.6 1.4 1.4l4.68-1.2c1.51.89 3.27 1.36 5.07 1.36 5.52 0 10-4.48 10-10S17.52 2 12 2m0 18c-1.41 0-2.8-.38-4.02-1.09l-.29-.16-3.01.77.77-3.01-.16-.29C4.38 14.8 4 13.41 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
        <path d="M16.68 13.38l-2.5-1.27c-.3-.15-.74-.04-1 .27l-.62.82c-.2.27-.63.35-1 .14-1.27-.65-2.15-1.53-2.8-2.8-.21-.37-.13-.8.14-1l.82-.62c.31-.26.42-.7.27-1l-1.27-2.5c-.21-.42-.67-.54-1.04-.29-.74.5-1.42 1.18-1.92 1.92-.5.74-.58 1.95.27 3.8 1.07 2.34 2.62 4.48 5.02 5.56 1.85.85 3.06.77 3.8.27.74-.5 1.42-1.18 1.92-1.92.25-.37.13-.83-.29-1.04z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-sky-600">
        <path d="M16 8a6 6 0 0 1 6 6v8h-4v-8a2 2 0 0 0-4 0v8h-4v-8a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
]

export default function SocialSidebar() {
  return (
    <aside className="fixed top-[35%] right-0 z-40 hidden flex-col gap-2 lg:flex pr-2">
      {SOCIAL_LINKS.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          aria-label={item.label}
          className="group flex h-12 w-12 items-center justify-center rounded-l-2xl bg-white text-current border border-slate-200 shadow-lg shadow-slate-900/10 transition hover:shadow-xl"
          title={item.label}
        >
          {item.icon}
        </a>
      ))}
    </aside>
  )
}
