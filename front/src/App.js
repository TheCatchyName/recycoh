import { useState, useEffect } from "react";
import Notif from "./components/Notif";
import SignIn from "./components/LoginForm";
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers, setUser } from "./reducers/userReducer";
import { initializeProducts, setProducts } from "./reducers/productReducer";
import BlogList from "./components/BlogList";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useMatch,
} from "react-router-dom";
import NewBlog from "./components/NewBlog";
import NavigationBar from "./components/NavigationBar";
import { Navigate } from "react-router-dom";
import { initializeAllUsers } from "./reducers/allUsersReducer";
import BlogView from "./components/BlogView";
import UserView from "./components/UserView";
import ProductView from "./components/ProductView";
import ExampleBlog from "./components/ExampleBlog";
import RegisterUser from "./components/RegisterUser";
import About from "./components/About";
import ErrorPage from "./components/ErrorPage";
import BlogEdit from "./components/BlogEdit";
import Scanner from "./components/Scanner";
import NewRecycle from "./components/NewRecycle"

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);
  const allUsers = useSelector((state) => state.allUsers);
  const products = useSelector((state) => state.product.products);
  const [theme, setTheme] = useState(
    localStorage.getItem("color-theme")
      ? JSON.parse(localStorage.getItem("color-theme"))
      : true
  );

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeAllUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeProducts());
  }, [dispatch]);

  const match = useMatch("/posts/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;
  const match2 = useMatch("/posts/edit/:id");
  const blog1 = match2
    ? blogs.find((blog) => blog.id === match2.params.id)
    : null;

  const match1 = useMatch("/users/:id");
  const userInView = match1
    ? allUsers.find((user) => user.username === match1.params.id)
    : null;

  const matchProduct = useMatch("/products/:id");
  const product = matchProduct ? (products && products.find((product) => product.id === matchProduct.params.id)) : null;
  // const matchProductEdit = useMatch("/products/edit/:id");
  // const productEdit = matchProductEdit
  //   ? products.find((product) => product.id === matchProductEdit.params.id)
  //   : null;
  const matchProductToRecycle = useMatch("/recycle/:id");
  const productToRecycle = matchProductToRecycle ? (products && products.find((product) => product.id === matchProductToRecycle.params.id)) : null;

  const handleThemeSwitch = (event) => {
    event.preventDefault();
    setTheme(!theme);
    localStorage.setItem("color-theme", JSON.stringify(!theme));
  };

  return (
    <div className={theme ? "dark" : ""}>
      <div>
        <div>
          <NavigationBar
            user={user}
            handleThemeSwitch={handleThemeSwitch}
            theme={theme}
          />

          <Routes>
            <Route path="/create" element={<NewBlog />} />
            <Route
              path="/"
              element={<BlogList user={user} setUser={setUser} />}
            />
            <Route
              path="/login"
              element={user ? <Navigate replace to="/" /> : <SignIn />}
            />
            <Route path="/posts/:id" element={<BlogView blog={blog} />} />
            <Route
              path="/users/:id"
              element={<UserView userInView={userInView} />}
            />
            <Route path="/example" element={<ExampleBlog />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/posts/edit/:id" element={<BlogEdit blog={blog1} />} />
            <Route path="/products/:id" element={<ProductView product={product} />} />
            <Route path="/recycle/:id" element={<NewRecycle props={productToRecycle} />} />
          </Routes>
        </div>
        <Notif />
      </div>
    </div>
  );
};

export default App;
