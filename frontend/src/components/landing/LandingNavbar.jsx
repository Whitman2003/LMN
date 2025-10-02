export default function LandingNavbar({ setActive }) {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light py-3 fixed-top">
            <div className="container-fluid">
                {/* Logo */}
                <a className="me-5" onClick={() => setActive('home')} style={{ cursor: 'pointer' }}>
                    <img src="/LMN.svg" alt="Logo" className="img-fluid d-inline-block align-text-top me-2" style={{ maxWidth: '60px', height: 'auto' }} />
                </a>

                {/* Toggler */ }
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navigation Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="nav ms-auto justify-content-center fs-5 fs-md-4 fs-lg-3">
                        <li className="nav-item me-2 me-md-3 me-lg-4"><span className="text-decoration-none text-dark" style={{ cursor: "pointer"}} onClick={() => setActive("home")}>Home</span></li>
                        <li className="nav-item me-2 me-md-3 me-lg-4"><span className="text-decoration-none text-dark" style={{ cursor: "pointer"}} onClick={() => setActive("about")}>About</span></li>
                        <li className="nav-item me-2 me-md-3 me-lg-4"><span className="text-decoration-none text-dark" style={{ cursor: "pointer"}} onClick={() => setActive("services")}>Services</span></li>
                        <li className="nav-item me-2 me-md-3 me-lg-4"><span className="text-decoration-none text-dark" style={{ cursor: "pointer"}} onClick={() => setActive("contact")}>Contact</span></li>
                        <li className="nav-item me-2 me-md-3 me-lg-4"><span className="text-decoration-none text-dark" style={{ cursor: "pointer"}} onClick={() => setActive("careers")}>Careers</span></li>                        
                        <li className="nav-item me-2 me-md-3 me-lg-4"><span className="text-decoration-none text-dark" style={{ cursor: "pointer"}} onClick={() => setActive("faqs")}>FAQs</span></li>
                    </ul>
                    
                    {/* Auth Links */}
                    <div className="d-flex">
                        <button onClick={() => setActive("login")} className="btn btn-primary me-3">Log In</button>
                        <button onClick={() => setActive("signup")} className="btn btn-secondary">Sign Up</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}