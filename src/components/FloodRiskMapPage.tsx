import React, { useState } from 'react';
import { ArrowLeft, MapPin, AlertTriangle, CheckCircle } from 'lucide-react';

interface FloodRiskMapPageProps {
  onBack: () => void;
}

const FloodRiskMapPage: React.FC<FloodRiskMapPageProps> = ({ onBack }) => {
  const [state, setState] = useState('');
  const [place, setPlace] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [error, setError] = useState('');

  // Available states and their cities
  const statesData = {
    'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga'],
    'Uttar Pradesh': ['Varanasi', 'Allahabad', 'Kanpur', 'Lucknow', 'Gorakhpur'],
    'Uttarakhand': ['Haridwar', 'Rishikesh', 'Dehradun', 'Roorkee'],
    'West Bengal': ['Kolkata', 'Howrah', 'Murshidabad', 'Malda'],
    'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro']
  };

  // Get available places based on selected state
  const availablePlaces = state ? statesData[state as keyof typeof statesData] || [] : [];

  // Reset place when state changes
  const handleStateChange = (newState: string) => {
    setState(newState);
    setPlace('');
    setShowMap(false);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!state || !place) {
      setError('Please select both state and place.');
      setShowMap(false);
      return;
    }
    
    // Validate state and place
    if (state === 'Bihar' && place === 'Patna') {
      setShowMap(true);
      setError('');
    } else {
      setError(`Currently, only Bihar (Patna) is available. Data for ${state} (${place}) is coming soon!`);
      setShowMap(false);
    }
  };

  const handleReset = () => {
    setState('');
    setPlace('');
    setShowMap(false);
    setError('');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(20,184,166,0.15)_1px,transparent_1px)] bg-[length:30px_30px]"></div>
      </div>

      {/* Header */}
      <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-white hover:text-cyan-300 transition-colors duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Dashboard</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="glass-effect rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="flex items-center space-x-3 mb-6">
            <MapPin className="h-8 w-8 text-cyan-400 animate-pulse-slow" />
            <div>
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">Flood Risk Map</h1>
              <p className="text-gray-300 mt-1">Interactive flood risk visualization for your area</p>
            </div>
          </div>

          {!showMap ? (
            <div className="space-y-6">
              {/* Info Banner */}
              <div className="glass-effect border border-cyan-400/30 rounded-lg p-4 flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p className="font-medium text-white mb-1">Currently Available Location</p>
                  <p>This service is currently available for <span className="text-cyan-400 font-semibold">Bihar (Patna)</span> only. More locations coming soon!</p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-300 mb-2">
                    Select State
                  </label>
                  <select
                    id="state"
                    value={state}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className="w-full px-4 py-3 glass-effect border border-white/20 rounded-lg text-white bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 cursor-pointer"
                    required
                  >
                    <option value="" className="bg-slate-800">Select a state...</option>
                    {Object.keys(statesData).map((stateName) => (
                      <option key={stateName} value={stateName} className="bg-slate-800">
                        {stateName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="place" className="block text-sm font-medium text-gray-300 mb-2">
                    Select Place/City
                  </label>
                  <select
                    id="place"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    disabled={!state}
                    className="w-full px-4 py-3 glass-effect border border-white/20 rounded-lg text-white bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                  >
                    <option value="" className="bg-slate-800">
                      {state ? 'Select a city...' : 'First select a state'}
                    </option>
                    {availablePlaces.map((cityName) => (
                      <option key={cityName} value={cityName} className="bg-slate-800">
                        {cityName}
                      </option>
                    ))}
                  </select>
                </div>

                {error && (
                  <div className="glass-effect border border-red-400/30 rounded-lg p-4 flex items-start space-x-3 bg-red-500/10">
                    <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-300">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/50"
                >
                  View Flood Risk Map
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Success Banner */}
              <div className="glass-effect border border-green-400/30 rounded-lg p-4 flex items-start space-x-3 bg-green-500/10">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-green-300">
                    <span className="font-semibold">Location Found:</span> {place}, {state}
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                >
                  Change Location
                </button>
              </div>

              {/* Map Container */}
              <div className="glass-effect border border-white/20 rounded-lg p-4">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-cyan-400" />
                  <span>Interactive Flood Risk Map - {place}, {state}</span>
                </h2>
                
                <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                  <iframe
                    src="https://www.arcgis.com/apps/instant/basic/index.html?appid=1e2107f7a72443659d5ddef3355681f2"
                    className="absolute top-0 left-0 w-full h-full rounded-lg border-2 border-cyan-400/30"
                    style={{ border: '0' }}
                    allowFullScreen
                    title="Flood Risk Map - Patna, Bihar"
                  />
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="glass-effect border border-white/20 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-medium text-white">High Risk</span>
                    </div>
                    <p className="text-xs text-gray-300">Areas prone to severe flooding</p>
                  </div>
                  
                  <div className="glass-effect border border-white/20 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm font-medium text-white">Medium Risk</span>
                    </div>
                    <p className="text-xs text-gray-300">Moderate flood possibility</p>
                  </div>
                  
                  <div className="glass-effect border border-white/20 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-white">Low Risk</span>
                    </div>
                    <p className="text-xs text-gray-300">Relatively safe areas</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FloodRiskMapPage;
