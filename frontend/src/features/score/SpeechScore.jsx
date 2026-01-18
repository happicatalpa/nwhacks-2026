

export async function getKeyPoints({initialScript}) {
    if (!initialScript) return null;

    try {
        const response = await fetch('http://127.0.0.1:3001/get-key-points', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ script: initialScript }),
        });
        const data = await response.text();
        console.log('Key points:', data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
        

}

export async function getCheckedKeyPoints({keyPoints, transcript}) {
    if (!keyPoints) return null;
    if (!transcript) return null;

    try {
        const response = await fetch('http://127.0.0.1:3001/compare-scripts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            transcript: transcript,
            keyPoints: keyPoints
         }),
        });
        const data = await response.text();
        console.log('Checked Key points:', data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }

  
}
