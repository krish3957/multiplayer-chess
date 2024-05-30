import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Landing from './screens/Landing'
import Game from './screens/Game'

function App() {

  return (
    <div className='w-full h-[90vh]'>
      <Router>
        <Routes>
          <Route path='/'
            element={
              <Landing />
            } />
          <Route path='/game' element={<Game />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
