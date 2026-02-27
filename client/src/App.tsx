import {BrowserRouter, Routes, Route} from "react-router";
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import FileManagementPage from'./pages/FileManagementPage';
import HomePage from './pages/HomePage';
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
          {/* Public routes */ }
            <Route path="/" element={<HomePage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            
         
          {
            /* Protected routes */
            <Route path="/files" element={<FileManagementPage/>}/>
          }
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
