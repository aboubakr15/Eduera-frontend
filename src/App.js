import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { router } from "./routes/router";

function App() {
  return (
    <AuthProvider>
      <div className="w-full min-h-screen">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}

export default App;
