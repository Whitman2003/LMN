export default function LandingNavbar() {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light py-3 fixed-top">
            <div className="container-fluid">
                {/* Logo */}
                <a className="me-5" href="#home">
                    <img src="/LMN.svg" alt="Logo" className="img-fluid d-inline-block align-text-top me-2" style={{ maxWidth: '60px', height: 'auto' }} />
                </a>

                {/* Toggler */ }
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navigation Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="nav ms-auto justify-content-center fs-5 fs-md-4 fs-lg-3">
                        <li className="nav-item me-2 me-md-3 me-lg-4"><a className="text-decoration-none text-dark" href="#home">Home</a></li>
                        <li className="nav-item me-2 me-md-3 me-lg-4"><a className="text-decoration-none text-dark" href="#about">About</a></li>
                        <li className="nav-item me-2 me-md-3 me-lg-4"><a className="text-decoration-none text-dark" href="#services">Services</a></li>
                        <li className="nav-item me-2 me-md-3 me-lg-4"><a className="text-decoration-none text-dark" href="#contact">Contact</a></li>
                        <li className="nav-item me-2 me-md-3 me-lg-4"><a className="text-decoration-none text-dark" href="#careers">Careers</a></li>
                        <li className="nav-item me-2 me-md-3 me-lg-4"><a className="text-decoration-none text-dark" href="#contact">Contact Us</a></li>
                        <li className="nav-item me-2 me-md-3 me-lg-4"><a className="text-decoration-none text-dark" href="#faq">FAQ</a></li>
                    </ul>
                    
                    {/* Auth Links */}
                    <div className="d-flex">
                        <a href="#login" className="btn btn-primary me-3">Log In</a>
                        <a href="#signup" className="btn btn-secondary">Sign Up</a>
                    </div>
                </div>
            </div>
        </nav>
    );
}