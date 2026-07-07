import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

import AdminLayout from "./layouts/AdminLayout";
import Books from "./pages/Books";
import Publications from "./pages/Publications";
import Members from "./pages/Members";
import Subscriptions from "./pages/Subscriptions";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";



function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>

            <AdminLayout>

              <Dashboard />

            </AdminLayout>

          </ProtectedRoute>
        }
      />
        <Route
          path="/books"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Books />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
            path="/publications"
            element={
            <ProtectedRoute>
              <AdminLayout>
                <Publications />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/members"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Members />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscriptions"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Subscriptions />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
          <Route
            path="/sales"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Sales />
                </AdminLayout>
              </ProtectedRoute>
            }
            />

          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Reports />
                </AdminLayout>
              </ProtectedRoute>
            }
            />

    </Routes>
    

  );

}

export default App;