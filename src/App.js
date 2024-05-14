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
import {UserRoleProvider, useUserRole} from "./UserRoleContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import loadingImg from "./assets/loader.gif";
import "./style.css";
import Fiction from "./components/Fiction/Fiction";
import Biography from "./components/Bio/Biography";
import SignUp from "./components/Login&Signup/signup";
import AddBook from "./components/AddBook/add-book"; 
import CheckUsers from "./components/CheckUsers/check-users";

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [mangaProducts, setMangaProducts] = useState([]);
  const [fictionProducts, setFictionProducts] = useState([]);
  const [bioProducts, setBioProducts] = useState([]);
  const [featureProducts, setFeatureProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const {userRole} = useUserRole() // dummy data

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
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
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchFeatureProducts();
    fetchCart();
    fetchMangaProducts();
    fetchFictionProducts();
    fetchBioProducts();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Router>
      <div>
      <UserRoleProvider>
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
              handleUpdateCartQty
            />
          </Route>
          <Route path="/products">
            <Products
              products={products}
              featureProducts={featureProducts}
              onAddToCart={handleAddToCart}
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
          {/* Route protection for admin routes */}
          {userRole === 'ADMIN' && (
            <>
              <Route path="/add-book">
                <AddBook />
              </Route>
              <Route path="/users">
                <CheckUsers />
              </Route>
            </>
          )}

          {/* Redirect to home if user tries to access admin routes without admin role */}
          <Route path="/add-book">
            {userRole !== 'ADMIN' ? <Redirect to="/home" /> : null}
          </Route>
          <Route path="/users">
            {userRole !== 'ADMIN' ? <Redirect to="/home" /> : null}
          </Route>
        </Switch>
        <Footer />
        </UserRoleProvider>
      </div>
    </Router>
  );
};

export default App;