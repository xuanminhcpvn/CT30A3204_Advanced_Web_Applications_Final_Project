import {BrowserRouter, Routes, Route} from "react-router-dom";
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import StartPage from './pages/StartPage';
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DriveHomePage from "./pages/DriveHomePage";
function App() {
  return (
    <>
    <BrowserRouter>
      <div className="App"></div>
      <h1>File Drive App</h1>
      <Routes>
          {/* Public routes */ }
            <Route path="/" element={<StartPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
          {/* Protected routes prevent accessing the route from search bar freely */}
            <Route element={<ProtectedRoute/>}>  
              <Route path="/drive/home" element={<DriveHomePage/>}/>
            </Route>
            
          
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
