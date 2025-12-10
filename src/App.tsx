import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { Timer } from "./components/Timer";
import { TimerWidget } from "./components/TimerWidget";
import { TimerProvider } from "./contexts/timer";
import "./index.css";

export function App() {
  return (
    <TimerProvider>
      <div className="flex h-screen p-12">
        <div className="h-full w-1/4">
          <Card />
        </div>
        <div className="h-full flex-1 ml-12 z-20">
          <Card className="h-full flex flex-col justify-center items-center p-16">
            <div className="w-full">
              <Timer />
            </div>
          </Card>
        </div>
        <div className="h-full w-1/4"></div>
        {/* <div className="bg-background h-full w-1/4 flex flex-col justify-center">
          <div className="w-full h-10 bg-[#131313]">
            <div className="bg-background w-full h-full rounded-bl-2xl" />
          </div>
          <div className="w-2/3 bg-linear-90 from-[#131313] to-25% to-foreground rounded-r-2xl p-6">
            <TimerWidget />
          </div>
          <div className="w-full h-10 bg-[#131313]">
            <div className="bg-background w-full h-full rounded-tl-2xl" />
          </div>
        </div> */}
      </div>
    </TimerProvider>
  );
}

export default App;
