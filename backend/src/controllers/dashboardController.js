const pool = require('../db/pool');

exports.dashboardCheck = async (req, res) => {
    const { userID, sessionID } = req.body;

    if (!userID || !sessionID) {
        return res.status(400).json({ message: 'UserID and SessionID are required' });
    }

    let connection;
    try {
        connection = await pool.getConnection();

        // Check if the session is valid
        const session = await connection.query('SELECT * FROM tblSessions WHERE SessionID = ? AND UserID = ?', [sessionID, userID]);
        if (!session || session.length === 0) {
            return res.status(401).json({ message: 'Invalid session' });
        }

        if (session[0].ExpiresAt < new Date()) {
            return res.status(401).json({ message: 'Session has expired' });
        }

        res.status(200).json({ message: 'Dashboard access granted', userID });
    } catch (error) {
        console.error('Error checking dashboard access:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        if (connection) connection.release();
    }
};