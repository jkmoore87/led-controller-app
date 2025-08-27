export default function Resource() {
  return (
    <div className="min-h-screen bg-black p-8 text-white">
      <h1 className="text-4xl font-bold neon-blue mb-6 text-center">Resources</h1>

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-gray-950 p-6 rounded-xl glow border border-cyan-400/50">
          <h2 className="text-2xl neon-blue font-bold mb-2">Setup Guide</h2>
          <p>Step-by-step instructions to configure your LEDs and connect them with this app.</p>
          <a href="/downloads/setup.pdf" className="neon-blue hover:underline mt-2 block">Download PDF</a>
        </div>

        <div className="bg-gray-950 p-6 rounded-xl glow border border-cyan-400/50">
          <h2 className="text-2xl neon-blue font-bold mb-2">Animations</h2>
          <p>Learn how to create cool LED animations with our examples.</p>
          <a href="/downloads/animations.zip" className="neon-blue hover:underline mt-2 block">Download ZIP</a>
        </div>
      </div>
    </div>
  );
}
