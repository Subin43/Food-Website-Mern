import { Route, Routes } from 'react-router-dom';
import Food from './components/Food';
import Dessert from './category/Dessert';
// import Restaurant from './category/Resturant'; // Fix the typo in the import path
import TodayDeals from './category/TodayDeals';
import Cart from './Menu/Cart';
import { useState } from 'react';
import Invite from './components/Nav/Invite';
import Order from './components/Nav/Order';
import Help from './components/Nav/Help';
import Signin from './components/Signin';
import Login from './components/Login';
import Signout from './components/Nav/Signout';
import { AuthProvider } from './Menu/AuthProvider';
import Wallet from './components/Nav/Wallet';
import Payment from './components/Payment';
import Favourites from './components/Nav/Favourites';
import FinalPage from './components/FinalPage';
import Starters from './category/Starters';
// import Footer from './components/Footer';
// import HeadlineCards from './components/HeadlineCards';
// import Navbar from './components/Navbar';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders,setOrders] = useState([])

  const addToFavorites = (item) => {
    setFavorites((prevFavorites) => {
      // Avoid adding duplicate items to favorites
      if (!prevFavorites.some(favItem => favItem._id === item._id)) {
        return [...prevFavorites, item];
      }
      return prevFavorites;
    });
  };

  const removeFromFavorites = (item) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter(favItem => favItem._id !== item._id)
    );
  };

  const orderHistory = (item) => {
    setOrders((prevOrders) => {
      // Avoid adding duplicate items to favorites
      if (!prevOrders.some(orderItem => orderItem._id === item._id)) {
        return [...prevOrders, item];
      }
      return prevOrders;
    });
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((cartItem) => cartItem.id === item.id);
      if (itemExists) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (item) => {
    setCartItems((prevItems) =>
      prevItems.reduce((acc, cartItem) => {
        if (cartItem.id === item.id) {
          if (cartItem.quantity > 1) {
            acc.push({ ...cartItem, quantity: cartItem.quantity - 1 });
          }
        } else {
          acc.push(cartItem);
        }
        return acc;
      }, [])
    );
  };

  return (
    <AuthProvider>
    <Routes>
      <Route path='/' element={<Food addToCart={addToCart}/>} />
      <Route path='/signup' element={<Signin />} />
      <Route path='/login' element={<Login />} />
      <Route path='/my-orders' element={<Order />} />
      <Route path='/help' element={<Help />} />
      <Route path='/invite' element={<Invite />} />
      <Route path='/signout' element={<Signout/>} />
      <Route path='/wallet' element={<Wallet/>} />
      <Route path='/payment' element={<Payment/>} />
      <Route path='/favourites' element={<Favourites favorites={favorites} removeFromFavorites={removeFromFavorites} orders={orders} />} />
      <Route path='/final' element={<FinalPage/>} />
      <Route path='/dessert' element={<Dessert addToCart={addToCart} addToFavorites={addToFavorites}/>} />
      {/* <Route path='/restaurant' element={<Restaurant addToCart={addToCart} />} /> */}
      <Route path='/starters' element={<Starters addToCart={addToCart} addToFavorites={addToFavorites}/>} />
      <Route path='/special-deals' element={<TodayDeals addToCart={addToCart} addToFavorites={addToFavorites} />} />
      <Route path='/cart' element={<Cart cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} orderHistory={orderHistory}/>} />
    </Routes>
    </AuthProvider>
  );
}

export default App;
