const phoneRegex = /^\d{10}$/;
const zipRegex = /^\d{5}(-\d{4})?$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

import Swal from 'sweetalert2';

export default function SignUp({ show, onClose }) {
    if (!show) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;

        const formData = {
            username: form.username.value.trim(),
            email: form.email.value.trim().toLowerCase(),
            password: form.password.value.trim(),
            confirmPassword: form.confirmPassword.value.trim(),
            fName: form.fName.value.trim(),
            lName: form.lName.value.trim(),
            phone: form.phone.value.trim(),
            addressLine1: form.addressLine1.value.trim(),
            addressLine2: form.addressLine2.value.trim(),
            city: form.city.value.trim(),
            state: form.state.value,
            zip: form.zip.value.trim(),
        };

        const { username, email, password, confirmPassword, fName, lName, phone, addressLine1, city, state, zip } = formData;

        if (!username || !email || !password || !confirmPassword || !fName || !lName || !phone || !addressLine1 || !city || !state || !zip) {
            alert("Please fill in all required fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        if (!passwordRegex.test(password)) {
            alert("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
            return;
        }

        if (!phoneRegex.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        if (!zipRegex.test(zip)) {
            alert("Please enter a valid ZIP or postal code.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                alert(`Sign up unsuccessful! ${result.message}`);
                return;
            }

            Swal.fire({
                icon: 'success',
                title: 'Sign up successful!  Please verify your email before signing in.',
                input: 'text',
                inputAttributes: {
                    maxlength: 6,
                    inputmode: 'numeric',
                    pattern: '[0-9]*',
                    autocapitalize: 'off',
                    autocorrect: 'off'
                },
                confirmButtonText: 'Verify Email',
                cancelButtonText: 'Cancel',
                showCancelButton: true,
                allowOutsideClick: false,
                preConfirm: (verificationCode) => {
                    if (!/^|d{6}$/.test(verificationCode)) {
                        Swal.showValidationMessage('Please enter a valid 6-digit verification code.');
                        return false;
                    }
                    return verificationCode;
                }
            }).then(async (swalResult) => {
                if (swalResult.isConfirmed) {
                    const verifyResponse = await fetch("http://localhost:5000/api/users/verify", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            body: swalResult.value,
                        }),
                    });
                    const verifyResult = await verifyResponse.json();

                    if (!verifyResponse.ok) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Verification Failed',
                            text: verifyResult.message
                        });
                        return;
                    }
                    Swal.fire({
                        icon: 'success',
                        title: 'Email verified successfully! You can now sign in.'
                    });
                    onClose();
                }
            });
        } catch (error) {
            console.error("Error during sign up:", error);
            alert("An error occurred during sign up. Please try again later.");
        }
    };

    const handleResend = async (e) => {
        e.preventDefault();

        const form = document.querySelector('form');
        const formData = {
            email: form.email.value.trim().toLowerCase(),
            username: form.username.value.trim(),
        }

        if (!formData.email || !formData.username) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please provide both username and email to resend verification code.'
            });
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/users/resendVerification", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: result.message
                });
                return;
            }

            Swal.fire({
                icon: 'success',
                title: 'Verification code resent! Please check your email.',
                input: 'text',
                inputAttributes: {
                    maxlength: 6,
                    inputmode: 'numeric',
                    pattern: '[0-9]*',
                    autocapitalize: 'off',
                    autocorrect: 'off'
                },
                confirmButtonText: 'Verify Email',
                cancelButtonText: 'Cancel',
                showCancelButton: true,
                allowOutsideClick: false,
                preConfirm: (verificationCode) => {
                    if (!/^|d{6}$/.test(verificationCode)) {
                        Swal.showValidationMessage('Please enter a valid 6-digit verification code.');
                        return false;
                    }
                    return verificationCode;
                }
            }).then(async (swalResult) => {
                if (swalResult.isConfirmed) {
                    const verifyResponse = await fetch("http://localhost:5000/api/users/verify", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            body: swalResult.value,
                        }),
                    });
                    const verifyResult = await verifyResponse.json();

                    if (!verifyResponse.ok) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Verification Failed',
                            text: verifyResult.message
                        });
                        return;
                    }
                    Swal.fire({
                        icon: 'success',
                        title: 'Email verified successfully! You can now sign in.'
                    });
                    onClose();
                }
            });
        } catch (error) {
            console.error("Error resending verification code:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while resending the verification code. Please try again later.'
            });
        }
    };

    return (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Sign Up</h2>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <div className="row mb-3">
                                    <div className="col-md-6 text-start">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input type="text" className="form-control" id="username" placeholder="Enter username" required aria-required="true"/>
                                    </div>
                                    <div className="col-md-6 text-start">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="email" placeholder="Enter email" required aria-required="true"/>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6 text-start">
                                        <label htmlFor="password" className="form-label mt-3">Password</label>
                                        <input type="password" className="form-control" id="password" placeholder="Enter password" required aria-required="true"/>
                                    </div>
                                    <div className="col-md-6 text-start">
                                        <label htmlFor="confirmPassword" className="form-label mt-3">Confirm Password</label>
                                        <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm password" required aria-required="true"/>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6 text-start">
                                        <label htmlFor="fName" className="form-label mt-3">First Name</label>
                                        <input type="text" className="form-control" id="fName" placeholder="Enter first name" required aria-required="true"/>
                                    </div>
                                    <div className="col-md-6 text-start">
                                        <label htmlFor="lName" className="form-label mt-3">Last Name</label>
                                        <input type="text" className="form-control" id="lName" placeholder="Enter last name" required aria-required="true"/>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="text-start">
                                        <label htmlFor="phone" className="form-label mt-3">Phone Number</label>
                                        <input type="tel" className="form-control" id="phone" placeholder="Enter phone number. Ex 1234567890" required aria-required="true"/>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-12 text-start">
                                        <label htmlFor="addressLine1" className="form-label mt-3">Address Line 1</label>
                                        <input type="text" className="form-control" id="addressLine1" placeholder="Enter address line 1" required aria-required="true"/>
                                    </div>
                                    <div className="col-md-6 text-start mt-3">
                                        <label htmlFor="addressLine2" className="form-label">Address Line 2</label>
                                        <input type="text" className="form-control" id="addressLine2" placeholder="Apartment, suite, etc. (optional)"/>
                                    </div>
                                    <div className="col-md-6 text-start mt-3">
                                        <label htmlFor="city" className="form-label">City</label>
                                        <input type="text" className="form-control" id="city" placeholder="Enter city" required aria-required="true"/>
                                    </div>
                                    <div className="col-md-6 text-start mt-3">
                                        <label htmlFor="state" className="form-label">State/Province</label>
                                        <select className="form-select" id="state" required aria-required="true">
                                            <option value="" disabled selected>Select state or province</option>
                                            <option value="AL">Alabama</option>
                                            <option value="AK">Alaska</option>
                                            <option value="AZ">Arizona</option>
                                            <option value="AR">Arkansas</option>
                                            <option value="CA">California</option>
                                            <option value="CO">Colorado</option>
                                            <option value="CT">Connecticut</option>
                                            <option value="DE">Delaware</option>
                                            <option value="FL">Florida</option>
                                            <option value="GA">Georgia</option>
                                            <option value="HI">Hawaii</option>
                                            <option value="ID">Idaho</option>
                                            <option value="IL">Illinois</option>
                                            <option value="IN">Indiana</option>
                                            <option value="IA">Iowa</option>
                                            <option value="KS">Kansas</option>
                                            <option value="KY">Kentucky</option>
                                            <option value="LA">Louisiana</option>
                                            <option value="ME">Maine</option>
                                            <option value="MD">Maryland</option>
                                            <option value="MA">Massachusetts</option>
                                            <option value="MI">Michigan</option>
                                            <option value="MN">Minnesota</option>
                                            <option value="MS">Mississippi</option>
                                            <option value="MO">Missouri</option>
                                            <option value="MT">Montana</option>
                                            <option value="NE">Nebraska</option>
                                            <option value="NV">Nevada</option>
                                            <option value="NH">New Hampshire</option>
                                            <option value="NJ">New Jersey</option>
                                            <option value="NM">New Mexico</option>
                                            <option value="NY">New York</option>
                                            <option value="NC">North Carolina</option>
                                            <option value="ND">North Dakota</option>
                                            <option value="OH">Ohio</option>
                                            <option value="OK">Oklahoma</option>
                                            <option value="OR">Oregon</option>
                                            <option value="PA">Pennsylvania</option>
                                            <option value="RI">Rhode Island</option>
                                            <option value="SC">South Carolina</option>
                                            <option value="SD">South Dakota</option>
                                            <option value="TN">Tennessee</option>
                                            <option value="TX">Texas</option>
                                            <option value="UT">Utah</option>
                                            <option value="VT">Vermont</option>
                                            <option value="VA">Virginia</option>
                                            <option value="WA">Washington</option>
                                            <option value="WV">West Virginia</option>
                                            <option value="WI">Wisconsin</option>
                                            <option value="WY">Wyoming</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 text-start mt-3">
                                        <label htmlFor="zip" className="form-label">ZIP/Postal Code</label>
                                        <input type="text" className="form-control" id="zip" placeholder="Enter ZIP or postal code" required aria-required="true"/>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary w-100 mt-3">Sign Up</button>
                            <button type="button" className="btn btn-secondary w-100 mt-2" onClick={handleResend}>Resend Code and Verify!</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};