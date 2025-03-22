import FocusTracker from './components/FocusTracker';
import Focus from './component/Timer.jsx';
import { BookOpen, Brain, Clock } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 rounded-xl p-2">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Focus Buddy
              </h1>
            </div>
            {/* <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Dashboard</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Settings</a>
            </nav> */}
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Stay Focused While Learning
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We'll help you maintain focus and send gentle reminders when you get distracted
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
              <Brain className="w-6 h-6" />
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Focus Tracking</h3>
              <p className="text-gray-600">Track your focus levels in real-time</p>
            </div>
            <FocusTracker />
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Focus Timer</h3>
              <p className="text-gray-600">Stay productive with our smart timer</p>
            </div>
            <Focus />
          </div>
        </div>

        {/* Stats Section
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-4 text-white">
              <div className="text-3xl font-bold mb-1">100%</div>
              <div className="text-indigo-100 text-sm">Focus Score</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-gray-900">2.5h</div>
              <div className="text-sm text-gray-600">Focus Time</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-gray-900">3</div>
              <div className="text-sm text-gray-600">Sessions</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-600">Breaks</div>
            </div>
          </div>
        </div> */}
      </main>
    </div>
  );
}

export default App;