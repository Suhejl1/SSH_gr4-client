import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { commerce } from "./lib/commerce";
import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";
import ProductView from "./components/ProductView/ProductView";
import Manga from "./components/Manga/Manga";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login&Signup/login";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style.css";
import Fiction from "./components/Fiction/Fiction";
import Biography from "./components/Bio/Biography";
import SignUp from "./components/Login&Signup/signup";
import AddBook from "./components/AddBook/add-book";
import CheckUsers from "./components/CheckUsers/check-users";
import Faq from "./components/Faq/faq"; // Import the FAQ component
import axios from 'axios';
import Wishlist from "./components/Wishlist/Wishlist";
import { jwtDecode } from "jwt-decode"; // Corrected import
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [mangaProducts, setMangaProducts] = useState([]);
  const [fictionProducts, setFictionProducts] = useState([]);
  const [bioProducts, setBioProducts] = useState([]);
  const [featureProducts, setFeatureProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [wishlist, setWishlist] = useState({});

  const userRole = sessionStorage.getItem('role');

  console.log('User role:', userRole);

  if (userRole) {
    axios.interceptors.request.use(
      (config) => {
        const token = sessionStorage.getItem('token');
        console.log("Bearer token:", token);
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/books`);
      const data = response.data;
      setProducts(data);
    } catch (error) {
      console.error("Error fetching the products:", error);
    }
  };

  const fetchMangaProducts = async () => {
    const { data } = await commerce.products.list({
      category_slug: ["manga"],
    });
    setMangaProducts(data);
  };

  const fetchFeatureProducts = async () => {
    const { data } = await commerce.products.list({
      category_slug: ["featured"],
    });
    setFeatureProducts(data);
  };

  const fetchFictionProducts = async () => {
    const { data } = await commerce.products.list({
      category_slug: ["fiction"],
    });
    setFictionProducts(data);
  };

  const fetchBioProducts = async () => {
    const { data } = await commerce.products.list({
      category_slug: ["biography"],
    });
    setBioProducts(data);
  };

  const fetchCart = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userEmail = decodedToken.sub;
      console.log("hello");

      const userResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/byEmail/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const userId = userResponse.data;
      console.log("UserResponse: ", userResponse);

      const cartResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCart(cartResponse.data);
    } catch (error) {
      console.error('Error fetching cart', error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userEmail = decodedToken.sub;
      console.log(userEmail);

      const userResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/byEmail/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const userId = userResponse.data;
      console.log("UserResponse: ", userResponse);

      // Fetch wishlist using the retrieved user ID
      const wishlistResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/wishlists/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setWishlist(wishlistResponse.data);
    } catch (error) {
      console.error('Error fetching wishlist', error);
    }
  };

  const handleAddToCart = async (bookId, quantity = 1) => {
    try {
      const token = sessionStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userEmail = decodedToken.sub;  // Ensure the token contains userId
      console.log(userEmail);

      const userResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/byEmail/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const userId = userResponse.data;
      console.log("UserResponse: ", userResponse);

      const cartItem = {
        cartId: userId,
        productItemId: bookId, // Ensure field name matches backend expectation
        quantity: quantity
      };

      await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/cart`, cartItem, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchCart(); // Update the cart
    } catch (error) {
      console.error('Error adding to cart', error);
    }
  };

  const handleUpdateCartQty = async (bookId, quantity) => {
    try {
      const token = sessionStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userEmail = decodedToken.sub;
      console.log(userEmail);

      const userResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/byEmail/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const userId = userResponse.data;
      console.log("UserResponse: ", userResponse);

      const cartItem = {
        cartId: userId,
        productItemId: bookId, // Ensure field name matches backend expectation
        quantity: quantity
      };

      const cartResponse = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/cart/update/${cartItem.cartId}/${cartItem.productItemId}/${cartItem.quantity}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      fetchCart(); // Update the cart
    } catch (error) {
      console.error('Error updating cart quantity', error);
    }
  };

  const handleRemoveFromCart = async (bookId) => {
    try {
      const token = sessionStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userEmail = decodedToken.sub;
      console.log(userEmail);

      const userResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/byEmail/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const userId = userResponse.data;
      console.log("UserResponse: ", userResponse);

      const cartResponse = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/cart/${userId}/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      fetchCart(); // Update the cart
    } catch (error) {
      console.error('Error removing from cart', error);
    }
  };

  const handleEmptyCart = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userEmail = decodedToken.sub;
      console.log(userEmail);

      const userResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/byEmail/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const userId = userResponse.data;
      console.log("UserResponse: ", userResponse);

      const cartResponse = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/cart/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      fetchCart(); // Update the cart
    } catch (error) {
      console.error('Error emptying cart', error);
    }
  };

  const handleAddToWishlist = async (bookId) => {
    try {
      const token = sessionStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userEmail = decodedToken.sub;
      console.log(userEmail);

      const userResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/byEmail/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const userId = userResponse.data;
      console.log("UserResponse: ", userResponse);

      const wishlistResponse = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/wishlists/${userId}/${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      fetchWishlist(); // Update the wishlist
    } catch (error) {
      console.error('Error adding to wishlist', error);
    }
  };

  const handleRemoveFromWishlist = async (bookId) => {
    try {
      const token = sessionStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userEmail = decodedToken.sub;
      console.log(userEmail);

      const userResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/byEmail/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const userId = userResponse.data;
      console.log("UserResponse: ", userResponse);

      const wishlistResponse = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/wishlists/${userId}/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      fetchWishlist(); // Update the wishlist
    } catch (error) {
      console.error('Error removing from wishlist', error);
    }
  };

  const handleEmptyWishlist = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userEmail = decodedToken.sub;
      console.log(userEmail);

      const userResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/byEmail/${userEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const userId = userResponse.data;
      console.log("UserResponse: ", userResponse);

      const wishlistResponse = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/wishlists/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      fetchWishlist(); // Update the wishlist
    } catch (error) {
      console.error('Error clearing wishlist', error);
    }
  };



  const handleCaptureCheckout = async (newOrder) => {
    console.log("The new Order Item:", newOrder);
    try {
      const token = sessionStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userEmail = decodedToken.sub;
      console.log(userEmail);


      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/orders`,
        newOrder,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 201) {
        setOrder(response.data);

      } else {
        console.error('Error placing order:', response.data);
        setErrorMessage('Failed to place order');
      }
    } catch (error) {
      console.error('Network error:', error);
      setErrorMessage('Failed to place order');
    }
  };




  useEffect(() => {
    fetchProducts();
    fetchWishlist();
    fetchCart();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Router>
      <div>
        <CssBaseline />
        <Navbar
          totalItems={cart.total_items}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/home">
            <Products
              products={products}
              featureProducts={featureProducts}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              handleUpdateCartQty
            />
          </Route>
          <Route path="/products">
            <Products
              products={products}
              featureProducts={featureProducts}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              handleUpdateCartQty
            />
          </Route>
          <Route path="/cart">
            <Cart
              cart={cart}
              onUpdateCartQty={handleUpdateCartQty}
              onRemoveFromCart={handleRemoveFromCart}
              onEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route path="/wishlist">
            <Wishlist
              wishlist={wishlist}
              onRemoveFromWishlist={handleRemoveFromWishlist}
              onEmptyWishlist={handleEmptyWishlist}
            />
          </Route>
          <Route path="/checkout" exact>
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          </Route>
          <Route path="/product-view/:id" exact>
            <ProductView />
          </Route>
          <Route path="/manga" exact>
            <Manga
              mangaProducts={mangaProducts}
              onAddToCart={handleAddToCart}
              handleUpdateCartQty
            />
          </Route>
          <Route path="/fiction" exact>
            <Fiction
              fictionProducts={fictionProducts}
              onAddToCart={handleAddToCart}
              handleUpdateCartQty
            />
          </Route>
          <Route path="/biography" exact>
            <Biography
              bioProducts={bioProducts}
              onAddToCart={handleAddToCart}
              handleUpdateCartQty
            />
          </Route>
          <Route path="/faq">
            <Faq />
          </Route>
          {userRole === 'ADMIN' ? (
            <>
              <Route path="/add-book">
                <AddBook />
              </Route>
              <Route path="/users">
                <CheckUsers />
              </Route>
            </>
          ) : (
            <>
              <Route path="/add-book">
                <Redirect to="/home" />
              </Route>
              <Route path="/users">
                <Redirect to="/home" />
              </Route>
            </>
          )}
        </Switch>
        <ToastContainer />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
