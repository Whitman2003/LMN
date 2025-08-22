export default function LandingNavbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 fixed-top">
            <div className="container-fluid">
                {/* Logo */}
                <a className="me-5" href="#home">
                    <img src="/LMN.svg" alt="Logo" width="60" height="60" className="d-inline-block align-text-top me-2" />
                </a>
                {/* Navigation Links */}
                <ul className="nav ms-auto justify-content-center fs-5">
                    <li className="nav-item me-3"><a className="text-decoration-none text-dark" href="#home">Home</a></li>
                    <li className="nav-item me-3"><a className="text-decoration-none text-dark" href="#about">About</a></li>
                    <li className="nav-item me-3"><a className="text-decoration-none text-dark" href="#services">Services</a></li>
                    <li className="nav-item me-3"><a className="text-decoration-none text-dark" href="#contact">Contact</a></li>
                    <li className="nav-item me-3"><a className="text-decoration-none text-dark" href="#careers">Careers</a></li>
                    <li className="nav-item me-3"><a className="text-decoration-none text-dark" href="#contact">Contact Us</a></li>
                    <li className="nav-item me-5"><a className="text-decoration-none text-dark" href="#faq">FAQ</a></li>
                </ul>
                {/* Auth Links */}
                <div className="d-flex">
                    <a href="#login" className="btn btn-primary me-3">Log In</a>
                    <a href="#signup" className="btn btn-secondary">Sign Up</a>
                </div>
            </div>
        </nav>
    );
}