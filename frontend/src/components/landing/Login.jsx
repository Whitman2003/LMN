import { useNavigate } from 'react-router';

export default function Login({show, onClose}) {
    const navigate = useNavigate();

    if (!show) {
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const form = e.target;

        const formData = {
            username: form.username.value.trim(),
            password: form.password.value.trim(),
        }

        const { username, password } = formData;

        if (!username || !password) {
            alert("Please fill in all required fields.");
            return;
        }
        
        try {
            const response = await fetch("http://localhost:5000/api/users/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                alert(`Login unsuccessful! ${result.message}`);
                return;
            }

            navigate("/dashboard/profile");
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred during login. Please try again later.");
        }
    };

    return (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Login</h2>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <div className="row mb-3">
                                    <div className="text-start">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input type="text" className="form-control" id="username" placeholder="Enter username" required aria-required="true"/>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="text-start">
                                        <label htmlFor="password" className="form-label mt-3">Password</label>
                                        <input type="password" className="form-control" id="password" placeholder="Enter password" required aria-required="true"/>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary w-100 mt-3">Log In!</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}