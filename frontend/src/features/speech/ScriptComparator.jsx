

export default function ScriptComparator({transcript, initialScript}) {
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