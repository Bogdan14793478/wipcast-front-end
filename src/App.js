import logo from "./logo.svg";
import Shop from "./components/Shop/Shop";
import "./App.css";
import axios from "axios";
import react, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Features from "./components/Features/Features";
import Blog from "./components/Blog/Blog";
import Picks from "./components/Picks/Picks";
import World from "./components/World/World";
import Contact from "./components/Contact/Contact";
import { Container } from "@material-ui/core";

function App() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  useEffect(() => {
    const token = localStorage.getItem("passport") || "";

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    if (user === null && token.length > 0) {
      axios.get("http://127.0.0.1:9001/api/user", config).then((result) => {
        if (result.data) {
          sessionStorage.setItem("user", JSON.stringify(result.data));
          setUser(result.data);
        } else {
          sessionStorage.removeItem("user");
        }
      });
    }
  }, [user]);
  console.log(user);

  const AppRoute = ({ component: Component, layout: Layout, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) => (
          <Layout {...props}>
            <Component {...props} {...rest} />
          </Layout>
        )}
      />
    );
  };

  const AuthLayout = (props) => (
    <div className="app-wrapper">{props.children}</div>
  );

  const MainLoyaut = (props) => {
    if (props.children.props.isSucure && !user) {
      return <Redirect to="/" />;
    }
    return (
      <Container maxWidth="lg">
        <Header title={"Wipcast"} currentUser={user} />
        {props.children}
      </Container>
    );
  };

  return (
    <BrowserRouter>
      <Switch>
        <AppRoute
          path="/register"
          layout={AuthLayout}
          component={Register}
          setUser={setUser}
        />
        <AppRoute
          path="/login"
          layout={AuthLayout}
          component={Login}
          setUser={setUser}
        />

        <AppRoute exact path="/" layout={MainLoyaut} component={Home} />
        <AppRoute path="/features" layout={MainLoyaut} component={Features} />
        <AppRoute path="/shop" layout={MainLoyaut} component={Shop} />
        <AppRoute path="/blog" layout={MainLoyaut} component={Blog} />
        <AppRoute path="/picks" layout={MainLoyaut} component={Picks} />
        <AppRoute path="/world" layout={MainLoyaut} component={World} />
        <AppRoute path="/contact" layout={MainLoyaut} component={Contact} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
