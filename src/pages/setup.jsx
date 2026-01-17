import TimerSetter from "../components/TimerSetter";

export default function Setup() {
  return (
    <div> 
        <h1>SETUP</h1>
        <div>
            <h2>Input your script here!</h2>
            <input type="text"></input>
        </div>
        <div>
            <h2>Set the timer</h2>
            <TimerSetter />
        </div>
        <button>Start Presentation!</button>
    </div>
  );
}