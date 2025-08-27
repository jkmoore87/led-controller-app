import { useState } from "react";

export default function LEDController() {
  const [color, setColor] = useState("#00ffff");
  const [brightness, setBrightness] = useState(50);
  const [animation, setAnimation] = useState("Static");

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-start p-8 text-white">
      <h1 className="text-4xl font-bold neon-blue mb-6">LED Controller</h1>

      <div className="flex flex-col space-y-6 w-full max-w-lg">
        {/* Color Picker */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg neon-blue">Color</label>
          <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-full h-12 glow" />
        </div>

        {/* Brightness Slider */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg neon-blue">Brightness: {brightness}%</label>
          <input type="range" min="0" max="100" value={brightness} onChange={e => setBrightness(e.target.value)} className="w-full glow" />
        </div>

        {/* Animation Selector */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg neon-blue">Animation</label>
          <select value={animation} onChange={e => setAnimation(e.target.value)} className="w-full glow p-2">
            <option value="Static">Static</option>
            <option value="Blink">Blink</option>
            <option value="Pulse">Pulse</option>
            <option value="Rainbow">Rainbow</option>
          </select>
        </div>

        <button className="py-3 neon-blue glow font-bold text-lg">Apply Settings</button>
      </div>
    </div>
  );
}
