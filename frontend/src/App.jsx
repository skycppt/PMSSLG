import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

import AdminLayout from "./layouts/AdminLayout";
import Books from "./pages/Books";
import Publications from "./pages/Publications";



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

    </Routes>
    

  );

}

export default App;