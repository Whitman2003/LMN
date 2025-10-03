export default function SignUp({ show, onClose }) {
    if (!show) return null;

    return (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Sign Up</h2>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <div className="row mb-3">
                                    <div className="col-md-6 text-start">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input type="text" className="form-control" id="username" placeholder="Enter username" />
                                    </div>
                                    <div className="col-md-6 text-start">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="email" placeholder="Enter email" />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6 text-start">
                                        <label htmlFor="password" className="form-label mt-3">Password</label>
                                        <input type="password" className="form-control" id="password" placeholder="Enter password" />
                                    </div>
                                    <div className="col-md-6 text-start">
                                        <label htmlFor="confirmPassword" className="form-label mt-3">Confirm Password</label>
                                        <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm password" />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6 text-start">
                                        <label htmlFor="firstName" className="form-label mt-3">First Name</label>
                                        <input type="text" className="form-control" id="firstName" placeholder="Enter first name" />
                                    </div>
                                    <div className="col-md-6 text-start">
                                        <label htmlFor="lastName" className="form-label mt-3">Last Name</label>
                                        <input type="text" className="form-control" id="lastName" placeholder="Enter last name" />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="text-start">
                                        <label htmlFor="phone" className="form-label mt-3">Phone Number</label>
                                        <input type="tel" className="form-control" id="phone" placeholder="Enter phone number" />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-12 text-start">
                                        <label htmlFor="addressLine1" className="form-label mt-3">Address Line 1</label>
                                        <input type="text" className="form-control" id="addressLine1" placeholder="Enter address line 1" />
                                    </div>
                                    <div className="col-md-6 text-start mt-3">
                                        <label htmlFor="addressLine2" className="form-label">Address Line 2</label>
                                        <input type="text" className="form-control" id="addressLine2" placeholder="Apartment, suite, etc. (optional)" />
                                    </div>
                                    <div className="col-md-6 text-start mt-3">
                                        <label htmlFor="city" className="form-label">City</label>
                                        <input type="text" className="form-control" id="city" placeholder="Enter city" />
                                    </div>
                                    <div className="col-md-6 text-start mt-3">
                                        <label htmlFor="state" className="form-label">State/Province</label>
                                        <input type="text" className="form-control" id="state" placeholder="Enter state or province" />
                                    </div>
                                    <div className="col-md-6 text-start mt-3">
                                        <label htmlFor="zip" className="form-label">ZIP/Postal Code</label>
                                        <input type="text" className="form-control" id="zip" placeholder="Enter ZIP or postal code" />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary w-100 mt-3">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};