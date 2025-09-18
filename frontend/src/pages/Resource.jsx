// Resource page component: LED Setup Guide
export default function Resource() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Page title */}
      <h1 className="text-4xl font-bold neon-blue mb-6 text-center pulse-glow">
        LED Setup Guide
      </h1>

      <div className="space-y-8 max-w-3xl mx-auto">

        {/* Step 1: Hardware Requirements */}
        <div className="p-6 bg-gray-900/50 rounded-xl glow">
          <h2 className="text-2xl neon-blue mb-2">Step 1: Hardware Requirements</h2>
          <ul className="list-disc list-inside space-y-1 neon-blue/80">
            <li>ESP32 or ESP8266 microcontroller</li>
            <li>WS2812 / Neopixel LED strip</li>
            <li>Power supply compatible with your LEDs</li>
            <li>USB cable to connect ESP32 to your computer</li>
            <li>Arduino IDE or PlatformIO installed</li>
          </ul>
        </div>

        {/* Step 2: Upload ESP32 Code */}
        <div className="p-6 bg-gray-900/50 rounded-xl glow">
          <h2 className="text-2xl neon-blue mb-2">Step 2: Upload ESP32 Code</h2>
          <p className="neon-blue/80">
            Download the ESP32 code below and upload it using Arduino IDE. Make sure to set your Wi-Fi credentials.
          </p>
        </div>

        {/* Step 3: Connect to the App */}
        <div className="p-6 bg-gray-900/50 rounded-xl glow">
          <h2 className="text-2xl neon-blue mb-2">Step 3: Connect to the App</h2>
          <ol className="list-decimal list-inside space-y-1 neon-blue/80">
            <li>Start the backend server: <code>npm run dev</code> in /backend</li>
            <li>Start the frontend: <code>npm run dev</code> in /frontend</li>
            <li>Open LED Controller page in your browser</li>
            <li>Pick a color, brightness, or animation and click Apply</li>
            <li>Your LEDs should respond!</li>
          </ol>
        </div>

        {/* Download Resources Section */}
        <div className="p-6 bg-gray-900/50 rounded-xl glow text-center">
          <h2 className="text-2xl neon-blue mb-4">Download Resources</h2>
          <div className="flex flex-col space-y-4 items-center">
            {/* Download link for ESP32 code */}
            <a
              href="/resources/ESP32_LED_Code.ino"
              download
              className="py-2 px-4 neon-blue glow font-bold rounded-lg hover:bg-cyan-500 hover:text-black transition"
            >
              Download ESP32 Code
            </a>
          </div>
        </div>

        {/* Final Encouragement Section */}
        <div className="p-6 bg-gray-900/50 rounded-xl glow text-center">
          <p className="text-xl neon-blue">✨Your LEDs are ready to shine!✨</p>
        </div>
      </div>
    </div>
  );
}