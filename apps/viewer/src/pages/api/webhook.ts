import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // Pobieramy botId z URL
        const { botId } = req.query;

        if (!botId || typeof botId !== 'string') {
            return res.status(400).json({ error: 'Bad Request: Missing or invalid botId' });
        }

        const { session, text } = req.body;

        if (!session || !text) {
            return res.status(400).json({ error: 'Bad Request: Missing session or text' });
        }

        console.log(`📞 Nowe zapytanie z AudioCodes: ${text} (Session ID: ${session}, Bot ID: ${botId})`);

        // Generujemy odpowiedź bota
        const botResponse = `Odpowiedź od bota ${botId}: ${text}`;

        // Odpowiadamy w formacie AudioCodes LiveHub
        return res.status(200).json({
            session: session,
            response: botResponse
        });

    } catch (error) {
        console.error('❌ Błąd podczas przetwarzania webhooka:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
