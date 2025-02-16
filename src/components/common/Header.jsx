import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  useEffect(() => {
    const handleNavbarToggle = () => {
      setIsNavbarOpen(!isNavbarOpen);
    };

    const toggleButton = document.querySelector('.navbar-toggler');
    toggleButton.addEventListener('click', handleNavbarToggle);

    return () => {
      toggleButton.removeEventListener('click', handleNavbarToggle);
    };
  }, [isNavbarOpen]);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar01"
            aria-controls="navbar01"
            aria-expanded="false"
            aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar01">
            <a className="navbar-brand d-none d-lg-block" href="/goit-react-hw-05-movies">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="50px"
                viewBox="0 0 512 512"
                fill="white">
                <path d="M448 32H361.9l-1 1-127 127h92.1l1-1L453.8 32.3c-1.9-.2-3.8-.3-5.8-.3zm64 128V96c0-15.1-5.3-29.1-14-40l-104 104H512zM294.1 32H201.9l-1 1L73.9 160h92.1l1-1 127-127zM64 32C28.7 32 0 60.7 0 96v64H6.1l1-1 127-127H64zM512 192H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192z" />
              </svg>
            </a>
            <ul className="navbar-nav me-auto mb-lg-3 mt-lg-3 mx-lg-3 text-center">
              <li><NavLink className="nav-link px-2 text-white" to="/">Home</NavLink></li>
              <li><NavLink className="nav-link px-2 text-white" to="/movies">Movies</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
