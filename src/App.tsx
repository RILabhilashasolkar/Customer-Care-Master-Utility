import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { RbacProvider } from './context/RbacContext'
import { DashboardFilterProvider } from './context/DashboardFilterContext'
import { AuthGuard } from './components/guards/AuthGuard'
import { PermissionGuard } from './components/guards/PermissionGuard'
import { LoginPage } from './pages/Login/LoginPage'
import { DashboardPage } from './pages/Dashboard/DashboardPage'
import { Customer360Page } from './pages/Customer360/Customer360Page'
import { Retailer360Page } from './pages/Retailer360/Retailer360Page'
import { OrderTrackerPage } from './pages/OrderTracker/OrderTrackerPage'
import { TicketListPage } from './pages/TicketManagement/TicketListPage'
import { TicketDetailPage } from './pages/TicketManagement/TicketDetailPage'
import { StoreLocatorPage } from './pages/StoreLocator/StoreLocatorPage'
import { EmailDashboardPage } from './pages/EmailDashboard/EmailDashboardPage'
import { AdminPage } from './pages/Admin/AdminPage'

function AccessDenied() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900">Access Denied</h2>
        <p className="text-gray-500 mt-2">You don't have permission to view this page.</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter basename="/Customer-Care-Master-Utility">
      <AuthProvider>
        <RbacProvider>
          <DashboardFilterProvider>
            <Routes>
              {/* Public */}
              <Route path="/login" element={<LoginPage />} />

              {/* Root redirect */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {/* Dashboard */}
              <Route
                path="/dashboard/*"
                element={
                  <AuthGuard>
                    <PermissionGuard moduleId="dashboard" fallback={<AccessDenied />}>
                      <DashboardPage />
                    </PermissionGuard>
                  </AuthGuard>
                }
              />

              {/* Customer 360 */}
              <Route
                path="/customer360"
                element={
                  <AuthGuard>
                    <PermissionGuard moduleId="customer360" fallback={<AccessDenied />}>
                      <Customer360Page />
                    </PermissionGuard>
                  </AuthGuard>
                }
              />

              {/* Retailer 360 */}
              <Route
                path="/retailer360"
                element={
                  <AuthGuard>
                    <PermissionGuard moduleId="retailer360" fallback={<AccessDenied />}>
                      <Retailer360Page />
                    </PermissionGuard>
                  </AuthGuard>
                }
              />

              {/* Order Tracker */}
              <Route
                path="/orders"
                element={
                  <AuthGuard>
                    <PermissionGuard moduleId="orderTracker" fallback={<AccessDenied />}>
                      <OrderTrackerPage />
                    </PermissionGuard>
                  </AuthGuard>
                }
              />

              {/* Ticket List */}
              <Route
                path="/tickets"
                element={
                  <AuthGuard>
                    <PermissionGuard moduleId="ticketManagement" fallback={<AccessDenied />}>
                      <TicketListPage />
                    </PermissionGuard>
                  </AuthGuard>
                }
              />

              {/* Ticket Detail */}
              <Route
                path="/tickets/:id"
                element={
                  <AuthGuard>
                    <PermissionGuard moduleId="ticketManagement" fallback={<AccessDenied />}>
                      <TicketDetailPage />
                    </PermissionGuard>
                  </AuthGuard>
                }
              />

              {/* Email Dashboard */}
              <Route
                path="/email-dashboard/*"
                element={
                  <AuthGuard>
                    <PermissionGuard moduleId="emailDashboard" fallback={<AccessDenied />}>
                      <EmailDashboardPage />
                    </PermissionGuard>
                  </AuthGuard>
                }
              />

              {/* Store Locator */}
              <Route
                path="/store-locator"
                element={
                  <AuthGuard>
                    <PermissionGuard moduleId="storeLocator" fallback={<AccessDenied />}>
                      <StoreLocatorPage />
                    </PermissionGuard>
                  </AuthGuard>
                }
              />

              {/* Admin */}
              <Route
                path="/admin"
                element={
                  <AuthGuard>
                    <PermissionGuard moduleId="admin" fallback={<AccessDenied />}>
                      <AdminPage />
                    </PermissionGuard>
                  </AuthGuard>
                }
              />

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </DashboardFilterProvider>
        </RbacProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
