import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Product from './pages/Product';
import Addproduct from './pages/Addproduct';
import Editproduct from './pages/Editproduct';
import Client from './client/Client';
import Addclient from './client/Addclient';
import Editclient from './client/Editclient';
import Home from './components/home';
import Products from './ecom/Product';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Product} />
        <Route path="/add-product" component={Addproduct} />
        <Route path="/edit-product/:id" component={Editproduct} />
        <Route path="/client" component={Client} />
        <Route path="/add-client" component={Addclient} />
        <Route path="/edit-client/:id" component={Editclient} />
        <Route path="/map" component={Home} />
        <Route path="/product-list" component={Products} />
      </Switch>
    </Router>
  );
}

export default App;
