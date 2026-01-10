import { BrowserRouter } from "react-router";
import ProjectRoutes from "./features/routes/ProjectRoutes";
import Header from "./features/shared/Header";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <ProjectRoutes />
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
