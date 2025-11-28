import { Link } from 'react-router-dom';
import { FiMail, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

/**
 * Footer component with contact information and copyright
 * Maintains consistent design with the application theme
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  const contactLinks = [
    {
      icon: FiMail,
      label: 'Email',
      href: 'mailto:contacto@animecbf.com',
      text: 'contacto@animecbf.com',
    },
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      href: 'https://wa.me/1234567890',
      text: '+1 (234) 567-890',
    },
    {
      icon: FiPhone,
      label: 'Teléfono',
      href: 'tel:+1234567890',
      text: '+1 (234) 567-890',
    },
  ];

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Contact Section */}
        <div className="footer__section footer__section--contact">
          <h3 className="footer__title">Contacto</h3>
          <ul className="footer__contact-list">
            {contactLinks.map((contact) => {
              const Icon = contact.icon;
              return (
                <li key={contact.label} className="footer__contact-item">
                  <a
                    href={contact.href}
                    className="footer__contact-link"
                    aria-label={contact.label}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <Icon className="footer__contact-icon" aria-hidden="true" />
                    <span className="footer__contact-text">{contact.text}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* About Section */}
        <div className="footer__section footer__section--about">
          <h3 className="footer__title">AnimeCBF</h3>
          <p className="footer__description">
            Tu plataforma favorita para descubrir y explorar el mundo del anime. Series, películas
            y mucho más.
          </p>
        </div>

        {/* Links Section */}
        <div className="footer__section footer__section--links">
          <h3 className="footer__title">Enlaces</h3>
          <nav aria-label="Footer navigation">
            <ul className="footer__links-list">
              <li className="footer__link-item">
                <Link to="/" className="footer__link">
                  Inicio
                </Link>
              </li>
              <li className="footer__link-item">
                <Link to="/series" className="footer__link">
                  Series
                </Link>
              </li>
              <li className="footer__link-item">
                <Link to="/movies" className="footer__link">
                  Películas
                </Link>
              </li>
              <li className="footer__link-item">
                <Link to="/about" className="footer__link">
                  Acerca de
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer__bottom">
        <div className="footer__container">
          <p className="footer__copyright">
            &copy; {currentYear} AnimeCBF. Todos los derechos reservados.
          </p>
          <p className="footer__attribution">
            Datos proporcionados por{' '}
            <a
              href="https://kitsu.io"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link footer__link--external"
            >
              Kitsu API
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
