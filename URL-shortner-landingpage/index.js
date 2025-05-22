
document.addEventListener('DOMContentLoaded', () => {
    const longUrlInput = document.getElementById('longUrlInput');
    const shortenBtn = document.getElementById('shortenBtn');
    const errorMessage = document.getElementById('errorMessage');
    const resultBox = document.getElementById('resultBox');
    const shortenedUrlOutput = document.getElementById('shortenedUrlOutput');
    const copyBtn = document.getElementById('copyBtn');
    const copySuccess = document.getElementById('copySuccess');

    shortenBtn.addEventListener('click', async () => {
        const longUrl = longUrlInput.value.trim();

        // Clear previous messages and results
        errorMessage.textContent = '';
        resultBox.style.display = 'none';
        copySuccess.classList.remove('show');

        if (!longUrl) {
            errorMessage.textContent = 'Please enter a URL to shorten.';
            return;
        }

        // Basic URL validation (more robust validation can be added)
        if (!/^https?:\/\/.+\..+/.test(longUrl)) {
            errorMessage.textContent = 'Please enter a valid URL (e.g., https://example.com).';
            return;
        }

        try {
            // Using shrtcode API (no API key needed)
            const apiUrl = `https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(longUrl)}`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                // Handle API errors
                const errorData = await response.json();
                let errorMsg = 'An error occurred while shortening the URL.';
                if (errorData && errorData.error) {
                    errorMsg = errorData.error;
                }
                errorMessage.textContent = errorMsg;
                return;
            }

            const data = await response.json();

            if (data.ok && data.result && data.result.full_short_link) {
                const shortUrl = data.result.full_short_link;
                shortenedUrlOutput.textContent = shortUrl;
                shortenedUrlOutput.href = shortUrl;
                resultBox.style.display = 'flex'; // Show the result box
            } else {
                errorMessage.textContent = 'Failed to shorten URL. Please try again.';
            }

        } catch (error) {
            console.error('Error shortening URL:', error);
            errorMessage.textContent = 'Network error or unable to reach the shortening service.';
        }
    });

    copyBtn.addEventListener('click', () => {
        const shortUrlText = shortenedUrlOutput.textContent;

        if (shortUrlText) {
            navigator.clipboard.writeText(shortUrlText).then(() => {
                copySuccess.classList.add('show');
                setTimeout(() => {
                    copySuccess.classList.remove('show');
                }, 2000); // Hide "Copied!" after 2 seconds
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                // Fallback for older browsers or if clipboard API is not available
                const textArea = document.createElement('textarea');
                textArea.value = shortUrlText;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                copySuccess.classList.add('show');
                setTimeout(() => {
                    copySuccess.classList.remove('show');
                }, 2000);
            });
        }
    });
});