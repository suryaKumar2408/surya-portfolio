import { FaWhatsapp } from 'react-icons/fa'
import './WhatsApp.css'

export default function WhatsApp() {
  return (
    <a
      href="https://wa.me/7302991707?text=Hi%20Surya%2C%20I%20visited%20your%20portfolio."
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-trigger"
      aria-label="Contact Surya on WhatsApp"
    >
      <FaWhatsapp />
    </a>
  )
}