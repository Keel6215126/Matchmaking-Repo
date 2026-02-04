
// Simple in-memory lobby storage (Vercel serverless function)
// For production, you'd want to use a database like Vercel KV or Redis

let lobbies = [];

// Clean up old lobbies (older than 30 minutes)
function cleanupOldLobbies() {
    const thirtyMinutesAgo = Date.now() - 30 * 60 * 1000;
    lobbies = lobbies.filter(lobby => lobby.timestamp > thirtyMinutesAgo);
}

export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    cleanupOldLobbies();

    // GET - List all public lobbies
    if (req.method === 'GET') {
        return res.status(200).json({ 
            lobbies: lobbies.map(l => ({
                peerId: l.peerId,
                hostName: l.hostName,
                playerCount: l.playerCount,
                maxPlayers: l.maxPlayers,
                timestamp: l.timestamp
            }))
        });
    }

    // POST - Create/Update a lobby
    if (req.method === 'POST') {
        const { peerId, hostName, playerCount, maxPlayers } = req.body;

        if (!peerId || !hostName) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if lobby already exists
        const existingIndex = lobbies.findIndex(l => l.peerId === peerId);

        if (existingIndex >= 0) {
            // Update existing lobby
            lobbies[existingIndex] = {
                peerId,
                hostName,
                playerCount: playerCount || 1,
                maxPlayers: maxPlayers || 10,
                timestamp: Date.now()
            };
        } else {
            // Create new lobby
            lobbies.push({
                peerId,
                hostName,
                playerCount: playerCount || 1,
                maxPlayers: maxPlayers || 10,
                timestamp: Date.now()
            });
        }

        return res.status(200).json({ success: true });
    }

    // DELETE - Remove a lobby
    if (req.method === 'DELETE') {
        const { peerId } = req.body;

        if (!peerId) {
            return res.status(400).json({ error: 'Missing peerId' });
        }

        lobbies = lobbies.filter(l => l.peerId !== peerId);

        return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
