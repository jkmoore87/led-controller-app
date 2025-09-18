import { useEffect, useMemo, useState } from "react";
import api from "../api";

export default function LEDController() {
  const [color, setColor] = useState("#00ffff");
  const [brightness, setBrightness] = useState(50);
  const [animation, setAnimation] = useState("Static");
  const [status, setStatus] = useState("");

  const ledCount = 18;
  const leds = useMemo(() => Array.from({ length: ledCount }), [ledCount]);

  const handleApply = async () => {
    try {
      const { data } = await api.post("/led/set", { color, brightness, animation });
      setStatus("LED settings sent successfully! ✨");
      console.log("LED State:", data.state);
    } catch (err) {
      setStatus("Error sending LED settings ✖");
      console.error(err);
    }
  };

  useEffect(() => {
    if (!status) return;
    const t = setTimeout(() => setStatus(""), 3000);
    return () => clearTimeout(t);
  }, [status]);

  const animClass = useMemo(() => {
    switch (animation) {
      case "Blink":
        return "blink";
      case "Pulse":
        return "pulse";
      case "Rainbow":
        return "rainbow";
      default:
        return "";
    }
  }, [animation]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 text-white">
      <h1 className="text-4xl font-extrabold neon-blue mb-6 pulse-glow">LED Controller</h1>

      <div className="flex flex-col items-center space-y-6 w-full max-w-3xl">

        {/* Controls */}
        <div className="flex flex-col space-y-6 w-full max-w-lg">
          {/* Color Picker */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg neon-blue">Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-12 glow rounded-md"
            />
          </div>

          {/* Brightness Slider */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg neon-blue">Brightness: {brightness}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(e.target.value)}
              className="w-full glow"
            />
          </div>

          {/* Animation Selector */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg neon-blue">Animation</label>
            <select
              value={animation}
              onChange={(e) => setAnimation(e.target.value)}
              className="w-full glow p-2 rounded-md"
            >
              <option value="Static">Static</option>
              <option value="Blink">Blink</option>
              <option value="Pulse">Pulse</option>
              <option value="Rainbow">Rainbow</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleApply}
              className="flex-1 py-3 neon-button glow font-bold text-lg rounded-md"
            >
              Apply Settings
            </button>
            <button
              onClick={() => {
                setColor("#00ffff");
                setBrightness(50);
                setAnimation("Static");
              }}
              className="py-3 px-4 neon-blue border border-[#00ffff2a] rounded-md"
            >
              Reset
            </button>
          </div>

          {/* Status message */}
          {status && <p className="text-center neon-blue mt-4">{status}</p>}
        </div>
      </div>
    </div>
  );
}
