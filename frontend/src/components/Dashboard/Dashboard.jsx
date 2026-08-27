import { useState } from 'react'

import DashboardProfile from './DashboardProfile.jsx'
import DashboardFeed from './DashboardFeed.jsx'
import DashboardEvents from './DashboardEvents.jsx'
import DashboardNavbar from './DashboardNavbar.jsx'

function Dashboard() {
    const [active, setActive] = useState('Profile');

    return (
        <div className='container text-center mt-5'>
            <DashboardNavbar setActive={setActive} />
            {active === 'Profile' && <DashboardProfile />}
            {active === 'Feed' && <DashboardFeed />}
            {active === 'Events' && <DashboardEvents />}
        </div>
    )
}

export default Dashboard
