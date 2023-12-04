import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./contexts/dataContext";
import { AuthProvider } from "./contexts/authContext";
import NotFoundPage from "./components/notFound/notFound";
import { createRoutesNoPageLayout, createRoutesWithPageLayout, routesNoPageLayout, routesWithPageLayout } from "./util/router";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <div>
            <Routes>
              {createRoutesWithPageLayout(routesWithPageLayout)}
              {createRoutesNoPageLayout(routesNoPageLayout)}
              <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
          </div>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
