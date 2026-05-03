import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { VscGitCompare } from "react-icons/vsc";
import { GrFavorite } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { logout } from "../redux/slices/authSlice.js";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2"></div>
            <div className="col-5">
              <p className="text-white">Envío gratis en compras sobre $100 y devoluciones gratis</p>
            </div>
            <div className="col-5">
              <p className="text-end text-white mb-0">
                Línea caliente:
                <a className="text-white px-1" href="tel:+549682699">
                  +54 9 682 699
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link className="text-white text-decoration-none" to="/">
                  devcorner
                </Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Buscar productos…"
                  aria-label="Buscar productos"
                  aria-describedby="basic-addon2"
                  autoComplete="off"
                />
                <span className="input-group-text" id="basic-addon2" aria-hidden="true">
                  <BsSearch />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div className="text-white fs-2 text-center">
                  <VscGitCompare aria-hidden="true" />
                  <Link className="Link d-flex flex-column fs-6 align-items-center text-white text-decoration-none" to="/compare">
                    <p>Comparar productos</p>
                  </Link>
                </div>
                <div className="text-white fs-2 text-center">
                  <GrFavorite aria-hidden="true" />
                  <Link className="Link d-flex flex-column fs-6 text-white align-items-center text-decoration-none" to="/wishlist">
                    <p>Favoritos {wishlist?.length > 0 && <span className="badge">{wishlist.length}</span>} wishlist</p>
                  </Link>
                </div>
                <div className="text-white fs-2 text-center">
                  {isAuthenticated ? (
                    <>
                      <FaRegUser aria-hidden="true" />
                      <Link className="Link d-flex flex-column fs-6 text-white align-items-center text-decoration-none" to="/profile">
                        <p>{user?.firstname} Mi cuenta</p>
                      </Link>
                    </>
                  ) : (
                    <>
                      <FaRegUser aria-hidden="true" />
                      <Link className="Link d-flex flex-column fs-6 text-white align-items-center text-decoration-none" to="/login">
                        <p>Login Mi cuenta</p>
                      </Link>
                    </>
                  )}
                </div>
                <div className="text-white fs-2 text-center">
                  <FiShoppingCart className="mb-2" aria-hidden="true" />
                  <Link className="Link d-flex flex-column fs-6 text-white align-items-center text-decoration-none gap-5" to="/cart">
                    <p className="badge bg-white text-dark">{cart?.length || 0}</p>
                  </Link>
                </div>
                {isAuthenticated && (
                  <button className="btn btn-link text-white" onClick={handleLogout}>
                    Salir
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-15">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent d-flex gap-10 align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src="/images/menu.png" alt="" className="menu-img" />
                      <span className="me-5 d-inline-block">Categorías</span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li>
                        <Link className="dropdown-item" to="/products">
                          Todos los productos
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/blogs">
                          Blogs
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-30">
                    <NavLink className="Link-bottom" to="/">
                      Inicio
                    </NavLink>
                    <NavLink className="Link-bottom" to="/products">
                      Tienda
                    </NavLink>
                    <NavLink className="Link-bottom" to="/blogs">
                      Blogs
                    </NavLink>
                    <NavLink className="Link-bottom" to="/contact">
                      Contacto
                    </NavLink>
                    {user?.role === "admin" && (
                      <NavLink className="Link-bottom" to="/admin">
                        Admin
                      </NavLink>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
