import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import VideoMap from "./pages/VideoMap";

const Home = () => (
  <div style={{textAlign: "center", padding: "20px"}}>
    <img src="http://www.bm-bauer.at/Stempel%20Bauer.jpg" alt="Logo von Michael Bauer"/>
  </div>
);

const notFound = () => (
  <div style={{textAlign: "center", padding: "20px"}}>
    404 - not found
  </div>
);

export default function App() {
  return ( 
    <Router>
      <Switch>
        <Route path="/fahrt/:id" component={VideoMap} exact />
        <Route path="/" component={Home} exact />
        <Route path="*" component={notFound} />
      </Switch>
    </Router>
  );
}
