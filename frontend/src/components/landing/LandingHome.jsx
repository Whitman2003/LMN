export default function LandingHome() {
    return (
        <div className="container mt-5">
            {/* Pictures */}
            <div className="row justify-content-center text-center">
                <div className="col">
                    <img src="/Person.png" alt="Person" className="img-fluid" />
                </div>
                <div className="col">
                    <img src="/Arrow.png" alt="Arrow" className="img-fluid" />
                </div>
                <div className="col">
                    <img src="/Community.png" alt="Community" className="img-fluid" />
                </div>
                <div className="col">
                    <img src="/Arrow.png" alt="Arrow" className="img-fluid" />
                </div>
                <div className="col">
                    <img src="/Globe.png" alt="Globe" className="img-fluid" />
                </div>
            </div>

            {/* Home Content */}
            <div id="home" className="text-center mt-5 pt-5">
                <h1>Welcome to Our Landing Page!</h1>
                <p>Providing ways to find local community, events, and services!</p>
            </div>
        </div>
    );
}