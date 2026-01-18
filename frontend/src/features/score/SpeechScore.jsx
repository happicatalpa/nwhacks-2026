

export default async function getKeyPoints({initialScript}) {
    if (!initialScript) return null;

    try {
        const response = await fetch('/get-key-points', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ script: initialScript }),
        });
        const data = await response.text();
        console.log('Key points:', data);
    } catch (error) {
        console.error('Error:', error);
    }
        

}

export default function getCheckedKeyPoints({transcript, initialScript}) {
    if (!initialScript) return null;

    const clean = (str) => str.trim().toLowerCase();
    const isMatch = clean(transcript) === clean(initialScript);

    return (
        <div>
        <h3>Comparison Result:</h3>
        <p>{isMatch ? "Perfect match!" : "Transcript does not match the script."}</p>
        </div>
    );

}