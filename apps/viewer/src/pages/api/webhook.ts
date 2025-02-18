import type { NextApiRequest, NextApiResponse } from 'next';

// Funkcja symulująca przetwarzanie wiadomości przez Twojego bota
async function processBotMessage(botId: string, message: string) {
    return `Odpowiedź od bota ${botId}: ${message}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { botId, transcription } = req.body;

        if (!botId) {
            return res.status(400).json({ error: 'Bad Request: Missing botId' });
        }

        if (!transcription) {
            return res.status(400).json({ error: 'Bad Request: Missing transcription' });
        }

        // Przetwarzanie wiadomości przez Twojego bota w Brosbots
        const botResponse = await processBotMessage(botId, transcription);

        // Zwrócenie odpowiedzi do Twilio / AudioCodes / Telnyx
        return res.status(200).json({ response: botResponse });

    } catch (error) {
        console.error('❌ Błąd podczas przetwarzania webhooka:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
