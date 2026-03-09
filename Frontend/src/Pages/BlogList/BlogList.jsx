import React from "react";
import "./BlogList.css";

import blog1 from "../../assets/blog1.jpg";
import blog2 from "../../assets/blog2.jpg";
import blog3 from "../../assets/p2.jpg";

import top1 from "../../assets/p7.jpg";
import top2 from "../../assets/p3.jpg";
import top3 from "../../assets/p4.jpg";
import top4 from "../../assets/p6.jpg";

import author1 from "../../assets/t1.jpg";
import author2 from "../../assets/t2.jpg";
import author3 from "../../assets/t3.jpg";

export default function BlogList() {
  const blogPosts = [
    {
      id: 1,
      category: "Property",
      image: blog1,
      title: "The most popular cities for homebuyers",
      desc: "The majority have, although there are many other lorem ipsum passages available.",
      author: "Maria Ramirez",
      authorImg: author1,
      date: "27 Sep 2025",
    },
    {
      id: 2,
      category: "Vila",
      image: blog2,
      title: "How to become financially independent",
      desc: "Quia omnis velit. Cupiditate et perspiciatis. Asperiores dolor magnam fuga voluptatum beatae.",
      author: "Laura Mincey",
      authorImg: author2,
      date: "20 Oct 2025",
    },
    {
      id: 3,
      category: "Guest House",
      image: blog3,
      title: "Discover how our future is actually shaped by real estate.",
      desc: "Although there are numerous types of lorem ipsum passages accessible, most of them contain...",
      author: "Cecilia Newsome",
      authorImg: author3,
      date: "15 Nov 2025",
    },
  ];

  const categories = [
    { name: "Property", count: 15 },
    { name: "Vila", count: 22 },
    { name: "House", count: 14 },
    { name: "Guest House", count: 14 },
    { name: "Factory", count: 74 },
    { name: "Godown", count: 75 },
  ];

  const topArticles = [
    {
      id: 1,
      image: top1,
      title: "Great Business Tips in 2025",
      date: "27 Sep 2025",
    },
    {
      id: 2,
      image: top2,
      title: "8 Amazing Tricks About Build...",
      date: "05 Oct 2025",
    },
    {
      id: 3,
      image: top3,
      title: "Excited News About Buildings.",
      date: "27 Sep 2025",
    },
    {
      id: 4,
      image: top4,
      title: "City for homebuyers.",
      date: "10 Dec 2025",
    },
  ];

  return (
    <>
      {/* TOP BANNER */}
      <section className="blog-banner">
        <div className="blog-banner-overlay"></div>

        <div className="banner-shape banner-shape-left"></div>
        <div className="banner-shape banner-shape-top"></div>
        <div className="banner-lines"></div>

        <div className="blog-banner-content">
          <h1>Blog List</h1>
          <div className="blog-breadcrumb">
            <span>🏠 Home</span>
            <span className="sep">›</span>
            <span>Blog List</span>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="blog-list-page">
        <div className="blog-list-container">
          {/* LEFT */}
          <div className="blog-main">
            {blogPosts.map((post) => (
              <div className="blog-card" key={post.id}>
                <div className="blog-card-img">
                  <img src={post.image} alt={post.title} />
                </div>

                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span className="blog-tag">{post.category}</span>

                    <div className="blog-author-date">
                      <div className="blog-author">
                        <img src={post.authorImg} alt={post.author} />
                        <span>{post.author}</span>
                      </div>

                      <div className="blog-date">📅 {post.date}</div>
                    </div>
                  </div>

                  <h3>{post.title}</h3>
                  <p>{post.desc}</p>
                </div>
              </div>
            ))}

            <button className="load-more-btn">↻ Load More</button>
          </div>

          {/* RIGHT */}
          <aside className="blog-sidebar">
            <div className="sidebar-box">
              <h3>Filter</h3>
              <input
                type="text"
                placeholder="Search"
                className="sidebar-search"
              />
            </div>

            <div className="sidebar-box">
              <h3>Categories</h3>
              <ul className="category-list">
                {categories.map((item, index) => (
                  <li key={index}>
                    <span>{item.name}</span>
                    <span>{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sidebar-box">
              <h3>Top Article</h3>
              <div className="top-articles">
                {topArticles.map((article) => (
                  <div
                    className="top-article-card"
                    key={article.id}
                    style={{ backgroundImage: `url(${article.image})` }}
                  >
                    <div className="top-article-overlay">
                      <h4>{article.title}</h4>
                      <p>{article.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}