
import FocusTracker from './components/FocusTracker';
import Focus from './component/Timer.jsx';

import { BookOpen } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center space-x-3">
          <BookOpen className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">Focus Buddy</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Stay Focused While Learning</h2>
          <p className="mt-2 text-lg text-gray-600">
            We'll help you maintain focus and send gentle reminders when you get distracted
          </p>
        </div>
        
        {/* Focus Tracker Component */}
        <FocusTracker />
        
        {/* Timer Component */}
        <div className="mt-8">
          <Focus />
        </div>
      </main>
    </div>
  );
}

export default App;
