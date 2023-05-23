import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Route } from 'react-router-dom' ;

import Home from './screens/home';
import ProductsList from './screens/productsList';
import Cart from './screens/cart';
import CreditCard from './components/payment/creditCard';
import Ticket from './screens/ticket';
import LogIn from './screens/logIn';
import SearchResults from './screens/searchResults';
import Register from './screens/register';

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={LogIn} />
        <Route path="/products/:idCategory" component={ProductsList} />
        <Route path="/cart" component={Cart} />
        <Route path="/card" component={CreditCard} />
        <Route path="/ticket/:idTicket" component={Ticket} />
        <Route path="/search/:product" component={SearchResults} />
        <Route path="/register" component={Register}  />
      </Router>
    </div>
  );
}

export default App;
