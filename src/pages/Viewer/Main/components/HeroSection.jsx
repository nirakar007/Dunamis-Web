// Hero Section Component
function HeroSection() {
  return (
    <div className="rounded object-fit bg-gradient-to-b from-cyan-600 to-blue-500 text-white z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center z-20">
          <div className="">
            <h1 className="text-4xl font-bold mb-4">
              Learn something new everyday.
            </h1>
            <p className="text-lg mb-8 opacity-90">
              If you are determined to learn, the world will conspire to educate
              you.
            </p>
            <button className="bg-white text-blue-400 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Learning Today
            </button>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Students learning together"
              className="rounded-lg w-full h-80 object-cover"
            />
          </div>
          {/* <div className="overflow-hidden z-0">
            <Waves
              lineColor="#fff"
              backgroundColor="rgba(255, 255, 255, 0.1)"
              waveSpeedX={0.01}
              waveSpeedY={0.01}
              waveAmpX={40}
              waveAmpY={20}
              friction={0.2}
              tension={0.01}
              maxCursorMove={120}
              xGap={36}
              yGap={46}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
