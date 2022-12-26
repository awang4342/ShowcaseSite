import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Verification from "./components/Verification";
import CreateAccount from "./components/CreateAccount";
import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import SubmitProject from "./components/SubmitProject";

const Routing = () => {
  const routes = useRoutes([
      { path: '/', element: <Home /> },
      { path: '/aboutme', element: <About /> },
      { path: '/login', element: <Login /> },
      { path: '/submit', element: <SubmitProject /> },
      { path: '/verification', element: <Verification /> },
      { path: '/createaccount', element: <CreateAccount /> }
  ]);

  return routes;
};


const App = () => {
  document.body.style = 'background-color: rgb(245, 245, 245);';
  return (
    <div className="background">
      <Router>
        <Header />
        <Routing />
      </Router>
    </div>
  );
};

export default App;

