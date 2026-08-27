import { useState } from 'react'

import LandingNavbar from './LandingNavbar.jsx'
import LandingHome from './LandingHome.jsx'
import LandingAbout from './LandingAbout.jsx'
import LandingServices from './LandingServices.jsx'
import LandingContact from './LandingContact.jsx'
import LandingCareers from './LandingCareers.jsx'
import LandingFAQs from './LandingFAQs.jsx'

function Landing() {
    const [active, setActive] = useState('home');

    return (
        <div className='container text-center mt-5'>
            <LandingNavbar setActive={setActive} />
            {active === 'home' && <LandingHome />}
            {active === 'about' && <LandingAbout />}
            {active === 'services' && <LandingServices />}
            {active === 'contact' && <LandingContact />}
            {active === 'careers' && <LandingCareers />}
            {active === 'faqs' && <LandingFAQs />}
        </div>
    )
}

export default Landing
