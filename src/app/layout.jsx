import './global.css'

export const metadata = {
  title: 'Agadh - Your Health History, Securely Carried',
  description: 'Consent-driven medical record sharing platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}