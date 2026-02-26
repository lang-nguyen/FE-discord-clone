import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Main Content Routes will go here eventually */}
          <Route index element={
            <div className="flex h-full items-center justify-center text-gray-400">
              Main content goes here
            </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App