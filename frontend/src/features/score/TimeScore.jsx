export default function TimeScore ({ timeLimit, currentTime }) {
    console.log("time limit:", timeLimit);
    console.log("current time: ", currentTime);
    if (currentTime <= timeLimit) {
        const leftoverTimeSeconds = timeLimit - currentTime;
        const leftoverTimeFormatted = formatTime(leftoverTimeSeconds);
        return (<div>{`Good job! You finished on time with ${leftoverTimeFormatted} remaining!`}</div>)

    }
    else {
        const overtimeSeconds = currentTime - timeLimit;
        const overtimeFormatted = formatTime(overtimeSeconds);
        return (<div>{`Uh oh! You went over the alloted time by ${overtimeFormatted}!`}</div>)
    }


}

export function formatTime(timeSeconds) {
  const minutes = Math.floor(timeSeconds / 60);
  const seconds = timeSeconds % 60;

  return `${minutes} minute${minutes !== 1 ? "s" : ""} and ${seconds} second${seconds !== 1 ? "s" : ""}`;
}