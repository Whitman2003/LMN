import { useState } from "react";

export default function DashboardNavbar({ setActive }) {
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-light bg-light py-3 fixed-bottom">
                <div className="container-fluid">
                    {/* Logo */}
                    <a className="me-5" style={{ cursor: 'pointer' }}>
                        <img src="/LMN.svg" alt="Logo" className="img-fluid d-inline-block align-text-top me-2" style={{ maxWidth: '60px', height: 'auto' }} />
                    </a>

                    {/* Toggler */ }
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navigation Links */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="nav ms-auto justify-content-center fs-5 fs-md-4 fs-lg-3">
                            <li className="nav-item me-2 me-md-3 me-lg-4"><span className="text-decoration-none text-dark" style={{ cursor: "pointer"}} onClick={() => setActive("Feed")}>Feed</span></li>
                            <li className="nav-item me-2 me-md-3 me-lg-4"><span className="text-decoration-none text-dark" style={{ cursor: "pointer"}} onClick={() => setActive("Events")}>Events</span></li>
                            <li className="nav-item me-2 me-md-3 me-lg-4"><span className="text-decoration-none text-dark" style={{ cursor: "pointer"}} onClick={() => setActive("Profile")}>Profile</span></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}