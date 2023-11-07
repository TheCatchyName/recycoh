import { Spinner, Footer, Button } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { setNotification } from "../reducers/notificationReducer";
import { updateProduct, deleteProduct, commentProduct } from "../reducers/productReducer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Comment from "./Comment";
import BlogFooter from "./BlogFooter";

const ProductView = ({ product }) => {
  console.log("page load");
  const user = useSelector((state) => state.users);
  const allUsers = useSelector((state) => state.allUsers);
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.products);
  console.log("product: ");
  console.log(product);
  if (product === undefined) {
    return <Spinner />;
  }

  const comments = product.comments ? product.comments : [];
  const user1 = allUsers.find((user) => user.id === product.user);

  const handleUpdateProduct = async (productObject) => {
    if (!user) {
      navigate("/login");
    }
    try {
      const updatedProduct = {
        ...productObject,
        likes: product.likes + 1,
      };
      await dispatch(updateProduct(updatedProduct));
    } catch (error) {
      const notif = {
        message: error.response.data.error,
        type: "error",
      };
      dispatch(setNotification(notif, 2500));
    }
  };
  const handleDeleteProduct = async (id) => {
    const product1 = products.filter((b) => b.id === id);
    if (!user) {
      navigate("/login");
    }
    if (window.confirm(`Do you want to delete this post?`)) {
      try {
        await dispatch(deleteProduct(id));
        const notif = {
          message: "Successfully deleted post",
          type: "success",
        };
        dispatch(setNotification(notif, 2500));
        navigate("/");
      } catch (error) {
        const notif = {
          message: error.message,
          type: "error",
        };
        dispatch(setNotification(notif, 2500));
      }
    }
  };

  const commentFormSubmit = (event) => {
    event.preventDefault();
    setNewComment("");
    handleComment(newComment, product.id);
  };

  const handleComment = async (comment, id) => {
    if (!user) {
      navigate("/login");
    }
    try {
      await dispatch(commentProduct(comment, id));
      const notif1 = {
        message: "Comment added successfully",
        type: "success",
      };
      dispatch(setNotification(notif1, 2500));
    } catch (error) {
      const notif2 = {
        message: error.message,
        type: "failure",
      };
      dispatch(setNotification(notif2, 2500));
    }
  };

  return (
    <div className="">
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {product.name}
              </h1>
              <address className="flex items-center mb-6 not-italic">
                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <div>
                    <a
                      href={
                        `/users/${product.user.username}` ||
                        `/users/${user1.username}`
                      }
                      rel="author"
                      className="text-lg font-bold text-gray-900 dark:text-white"
                    >
                      u/
                      {product.user.username || user1.username}
                    </a>
                    <p className="text-base font-light text-gray-500 dark:text-gray-400">
                      Posted on{" "}
                      {new Date(product.dateCreated).toLocaleDateString("en-GB")}
                    </p>
                    <p className="inline mr-2 text-sm font-light text-gray-500 dark:text-gray-400">
                      {product.likes} {product.likes === 1 ? "like" : "likes"}
                    </p>{" "}
                    <p className="inline  text-sm font-light text-gray-500 dark:text-gray-400">
                      {comments.length}{" "}
                      {comments.length === 1 ? "comment" : "comments"}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-6">
                      <Button onClick={() => handleUpdateProduct(product)}>
                        <FavoriteIcon className="h-6 w-6" />
                      </Button>
                      {user &&
                      (user.id === product.user.id || user.id === product.user) ? (
                        <>
                          <Button
                            href={`/posts/edit/${product.id}`}
                            color="warning"
                          >
                            <EditIcon className="h-6 w-6" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteProduct(product.id)}
                            color="failure"
                          >
                            <DeleteIcon className="h-6 w-6" />
                          </Button>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </address>
            </header>
          </article>
        </div>
      </main>

      <BlogFooter />
    </div>
  );
};

export default ProductView;
