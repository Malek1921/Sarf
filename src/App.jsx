import { BrowserRouter, useLocation } from "react-router";
import ProjectRoutes from "./features/routes/ProjectRoutes";
import Header from "./features/shared/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <ProjectRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
