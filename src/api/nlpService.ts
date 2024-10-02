import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.openai.com/v1',
    headers: { Authorization: `Bearer YOUR_API_KEY` },
});

export function analyzeText(text: string): Promise<string | undefined> {
    return api.post('/chat/completions', {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: text }],
    })
    .then(response => response.data.choices[0].message.content)
    .catch(error => {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.error?.message || error.message;
            console.error("Error:", errorMessage);
        } else {
            console.error("Unexpected error:", error);
        }
        return undefined; 
    });
}