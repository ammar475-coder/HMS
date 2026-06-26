import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/Login'
import ProtectedRoute from './routes/ProtectedRoute'

// Doctor pages
import DoctorDashboard from './pages/doctor/DoctorDashboard'
import PatientConsultation from './pages/doctor/PatientConsultation'
import Diagnosis from './pages/doctor/Diagnosis'
import Prescription from './pages/doctor/Prescription'
import LabOrder from './pages/doctor/LabOrder'
import RadiologyOrder from './pages/doctor/RadiologyOrder'
import FollowUpManager from './pages/doctor/FollowUpManager'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* Doctor module */}
        <Route path="/doctor" element={
          <ProtectedRoute allowedRole="doctor">
            <DoctorDashboard />
          </ProtectedRoute>
        }/>
        <Route path="/doctor/consultation/:token" element={
          <ProtectedRoute allowedRole="doctor">
            <PatientConsultation />
          </ProtectedRoute>
        }/>
<Route path="/doctor/diagnosis/:token" element={
  <ProtectedRoute allowedRole="doctor">
    <Diagnosis />
  </ProtectedRoute>
}/>
<Route path="/doctor/prescription/:token" element={
  <ProtectedRoute allowedRole="doctor">
    <Prescription />
  </ProtectedRoute>
}/>
<Route path="/doctor/lab-order/:token" element={
  <ProtectedRoute allowedRole="doctor">
    <LabOrder />
  </ProtectedRoute>
}/>
<Route path="/doctor/radiology-order/:token" element={
  <ProtectedRoute allowedRole="doctor">
    <RadiologyOrder />
  </ProtectedRoute>
}/>
<Route path="/doctor/followup/:token" element={
  <ProtectedRoute allowedRole="doctor">
    <FollowUpManager />
  </ProtectedRoute>
}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App