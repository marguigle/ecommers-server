import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";

export const Footer = () => {
  return (
    <>
      <footer className="py-4" style={{ backgroundColor: "var(--color4)" }}>
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="d-flex gap-30 align-items-center">
                <img src="/images/accept.png" alt="" style={{ width: "50px" }} />
                <h2 className="text-white mb-0">Suscríbete al boletín</h2>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group">
                <input
                  type="email"
                  className="form-control py-1"
                  placeholder="Tu correo electrónico…"
                  aria-label="Tu correo electrónico"
                  aria-describedby="subscribe-addon"
                  autoComplete="email"
                />
                <span className="input-group-text" id="subscribe-addon">
                  Suscribirse
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4" style={{ backgroundColor: "var(--color5)" }}>
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">Contáctanos</h4>
              <div className="text-white fs-6">
                <address>
                  Calle Falsa 123<br />
                  Código Postal: 123456
                </address>
                <a
                  href="tel:+5422588866"
                  className="mt-4 d-block mb-2 text-white text-decoration-none"
                >
                  +54 225 88866
                </a>
                <a
                  href="mailto: ecommers@gmail.com"
                  className="mt-4 d-block mb-2 text-white text-decoration-none"
                >
                  ecommers@gmail.com
                </a>
                <div className="social-icons d-flex gap-3 mt-3">
                  <Link className="text-white fs-5" to="" aria-label="LinkedIn">
                    <BsLinkedin />
                  </Link>
                  <Link className="text-white fs-5" to="" aria-label="GitHub">
                    <BsGithub />
                  </Link>
                  <Link className="text-white fs-5" to="" aria-label="YouTube">
                    <BsYoutube />
                  </Link>
                  <Link className="text-white fs-5" to="" aria-label="Instagram">
                    <BsInstagram />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Información</h4>
              <div className="d-flex flex-column">
                <Link className="text-white py-2 mb-1 text-decoration-none">Política de Privacidad</Link>
                <Link className="text-white py-2 mb-1 text-decoration-none">Política de Reembolso</Link>
                <Link className="text-white py-2 mb-1 text-decoration-none">Política de Envíos</Link>
                <Link className="text-white py-2 mb-1 text-decoration-none">Términos y Condiciones</Link>
                <Link className="text-white py-2 mb-1 text-decoration-none">Blogs</Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Cuenta</h4>
              <div className="d-flex flex-column">
                <Link className="text-white py-2 mb-1 text-decoration-none">Sobre Nosotros</Link>
                <Link className="text-white py-2 mb-1 text-decoration-none">Preguntas Frecuentes</Link>
                <Link className="text-white py-2 mb-1 text-decoration-none">Contacto</Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Enlaces Rápidos</h4>
              <div className="d-flex flex-column">
                <Link className="text-white py-2 mb-1 text-decoration-none">Laptops</Link>
                <Link className="text-white py-2 mb-1 text-decoration-none">Auriculares</Link>
                <Link className="text-white py-2 mb-1 text-decoration-none">Tablets</Link>
                <Link className="text-white py-2 mb-1 text-decoration-none">Relojes</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4" style={{ backgroundColor: "var(--color3)" }}>
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy;{new Date().getFullYear()} DevCorner; Desarrollado por Developers
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
