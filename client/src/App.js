import { useContext, useEffect } from "react";

import Header from "./components/layout/Header";
import Contacts from "./components/contacts/Contacts";
import AddContact from "./components/contacts/AddContact";
import EditContact from "./components/contacts/EditContact";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alerts from "./components/layout/Alerts";

import { HashRouter as Router, Route, Switch } from "react-router-dom";
import ContactState from "./context/contacts/contactState";
import AuthState from "./context/auth/authState";
import AlertState from "./context/alert/alertState";
import AuthContext from "./context/auth/authContext";

import setAuthToken from "./utils/setAuthToken";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <div className="App">
              <Header branding="Contact Manager" />
              <div className="container">
                <Alerts />
                <Switch>
                  <Route exact path="/" component={Contacts} />
                  <Route exact path="/add" component={AddContact} />
                  <Route exact path="/edit/:id" component={EditContact} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </div>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
