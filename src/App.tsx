import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from '@/pages/login/LoginPage'
import AccountVerificationPage from '@/pages/verification/AccountVerificationPage'
import LandingPage from '@/pages/LandingPage'
import StudentDashboardPage from './pages/student/dashboard/StudentDashboardPage'
import StudentAnalyticsPage from './pages/student/exams/StudentExamsPage'
import InstructorDashboardPage from './pages/instructor/dashboard/InstructorDashboardPage'
import InstructorExamsPage from './pages/instructor/exams/InstructorExamsPage'
import InstructorListStudentPage from './pages/instructor/students/InstructorListStudentPage'
import AdminDashboardPage from './pages/admin/dashboard/AdminDashboardPage'
import AdminAccountsPage from './pages/admin/accounts/AdminAccountsPage'
import AdminCoursesPage from './pages/admin/courses/AdminCoursesPage'
import AuthLayout from './layout/AuthLayout'
import ProfilePage from './pages/profile/ProfilePage'
import RequireRole from '@/components/RequireRole'
import { IconClipboardCheckFilled, IconDashboard, IconUsers, IconBook } from '@tabler/icons-react'

const studentNavigatioItems = [
  { label: "Dashboard", icon: IconDashboard, path: "/student" },
  { label: "My Exams", icon: IconClipboardCheckFilled, path: "/student/exams" },
]

const instructorNavigationItems = [
  { label: "Dashboard", icon: IconDashboard, path: "/instructor" },
  { label: "Exams", icon: IconClipboardCheckFilled, path: "/instructor/exams" },
  { label: "Students", icon: IconUsers, path: "/instructor/students" },
]

const adminNavigationItems = [
  { label: "Dashboard", icon: IconDashboard, path: "/admin" },
  { label: "Accounts", icon: IconUsers, path: "/admin/accounts" },
  { label: "Courses", icon: IconBook, path: "/admin/courses" },
]

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<AccountVerificationPage />} />

        {/* Routes for student */}
        <Route
          path="/student"
          element={
            <RequireRole allowedRoles={["Student"]}>
              <AuthLayout navigationItems={studentNavigatioItems}>
                <StudentDashboardPage />
              </AuthLayout>
            </RequireRole>
          }
        />
        <Route
          path="/student/exams"
          element={
            <RequireRole allowedRoles={["Student"]}>
              <AuthLayout navigationItems={studentNavigatioItems}>
                <StudentAnalyticsPage />
              </AuthLayout>
            </RequireRole>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireRole allowedRoles={["Admin", "Instructor", "Student"]}>
              <AuthLayout navigationItems={studentNavigatioItems}>
                <ProfilePage />
              </AuthLayout>
            </RequireRole>
          }
        />

        {/* Routes for instructor */}
        <Route
          path="/instructor"
          element={
            <RequireRole allowedRoles={["Instructor"]}>
              <AuthLayout navigationItems={instructorNavigationItems}>
                <InstructorDashboardPage />
              </AuthLayout>
            </RequireRole>
          }
        />
        <Route
          path="/instructor/exams"
          element={
            <RequireRole allowedRoles={["Instructor"]}>
              <AuthLayout navigationItems={instructorNavigationItems}>
                <InstructorExamsPage />
              </AuthLayout>
            </RequireRole>
          }
        />
        <Route
          path="/instructor/students"
          element={
            <RequireRole allowedRoles={["Instructor"]}>
              <AuthLayout navigationItems={instructorNavigationItems}>
                <InstructorListStudentPage />
              </AuthLayout>
            </RequireRole>
          }
        />

        {/* Routes for admin */}
        <Route
          path="/admin"
          element={
            <RequireRole allowedRoles={["Admin"]}>
              <AuthLayout navigationItems={adminNavigationItems}>
                <AdminDashboardPage />
              </AuthLayout>
            </RequireRole>
          }
        />
        <Route
          path="/admin/accounts"
          element={
            <RequireRole allowedRoles={["Admin"]}>
              <AuthLayout navigationItems={adminNavigationItems}>
                <AdminAccountsPage />
              </AuthLayout>
            </RequireRole>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <RequireRole allowedRoles={["Admin"]}>
              <AuthLayout navigationItems={adminNavigationItems}>
                <AdminCoursesPage />
              </AuthLayout>
            </RequireRole>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
