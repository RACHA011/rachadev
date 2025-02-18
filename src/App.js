import './App.css';
import AppRouter from './router/AppRouter';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div className="app">
      <AppRouter />
    </div>
  );
}

export default App;
