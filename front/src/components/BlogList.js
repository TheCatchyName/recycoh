import React, { useState } from "react";
import { useSelector } from "react-redux";
import Blog from "../components/Blog";
import { Select } from "flowbite-react";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const [sortBy, setSorting] = useState({ criteria: "likes", order: "desc" });
  const [searchQuery, setSearchQuery] = useState("");
  const blogs1 = [...blogs];

  const sortBlogs = (criteria, order, blogs) => {
    const sortedBlogs = [...blogs];
    sortedBlogs.sort((a, b) => {
      if (criteria === "likes") {
        return order === "asc" ? a.likes - b.likes : b.likes - a.likes;
      } else if (criteria === "dateCreated") {
        const dateA = new Date(a.dateCreated);
        const dateB = new Date(b.dateCreated);
        if (order === "asc") {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      } else if (criteria === "comments") {
        const commentsA = a.comments.length;
        const commentsB = b.comments.length;
        return order === "asc" ? commentsA - commentsB : commentsB - commentsA;
      } else {
        return 0;
      }
    });
    return sortedBlogs;
  };

  const handleSortByCriteria = (newCriteria) => {
    if (newCriteria === sortBy.criteria) {
      setSorting({
        ...sortBy,
        order: sortBy.order === "asc" ? "desc" : "asc",
      });
    } else {
      setSorting({
        criteria: newCriteria,
        order: "desc",
      });
    }
  };

  const filteredBlogs = blogs1.filter((blog) => {
    const title = blog.title.toLowerCase();
    const content = blog.content.toLowerCase();
    const query = searchQuery.toLowerCase();
    return title.includes(query) || content.includes(query);
  });

  const sortedBlogs = sortBlogs(sortBy.criteria, sortBy.order, filteredBlogs);

  return (
    <div className="">
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 min-h-screen">
        <div className="flex justify-between px-4 mx-auto max-w-6xl ">
          <article className="mx-auto w-full max-w-6xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <h1 class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
                Posts
              </h1>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    color: "white",
                  }}
                >
                  Sort By:{" "}
                </span>
                <Select
                  value={sortBy.criteria}
                  onChange={(e) => handleSortByCriteria(e.target.value)}
                  style={{
                    marginRight: "10px",
                    marginLeft: "10px",
                  }}
                >
                  <option value="likes">Likes</option>
                  <option value="dateCreated">Recent</option>
                  <option value="comments">Comments</option>
                </Select>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Search by keyword"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <address className="flex items-center mb-6 not-italic"></address>
            </header>
            {sortedBlogs.length > 0 ? (
              sortedBlogs.map((blog) => <Blog key={blog.id} blog={blog} />)
            ) : (
              <article className="p-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                <footer className="flex justify-between items-center"></footer>
                <p className="text-gray-500 dark:text-gray-400">
                  No posts yet... Create one!
                </p>
              </article>
            )}
          </article>
        </div>
      </main>
    </div>
  );
};

export default BlogList;
