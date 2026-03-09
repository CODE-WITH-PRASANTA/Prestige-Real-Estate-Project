import { useState } from "react";
import "./Blog.css";
import blog1 from "../../assets/blog1.jpg";
import blog2 from "../../assets/blog2.jpg";
import blog3 from "../../assets/blog3.jpg";

export default function Blog() {

  const [page,setPage] = useState(0)

  const blogs = [
    {
      img:blog1,
      tag:"Property",
      author:"Susan Culli",
      date:"10 Apr 2025",
      title:"Location is Everything",
      text:"The value of a property largely depends on where it’s located."
    },
    {
      img:blog2,
      tag:"Villa",
      author:"Shelly Cox",
      date:"24 Apr 2025",
      title:"Real Estate is a Investment",
      text:"Unlike stocks, real estate usually grows in value over time."
    },
    {
      img:blog3,
      tag:"Godown",
      author:"Eva Jones",
      date:"27 Sep 2025",
      title:"Market Trends Matter",
      text:"Staying informed about housing market trends helps you make smarter decisions."
    }
  ]

  const prev = ()=> setPage(p=>Math.max(0,p-1))
  const next = ()=> setPage(p=>Math.min(blogs.length-1,p+1))

  return (
    <>
      {/* BLOG SECTION */}

      <section className="blog">

        <div className="blog-wrap">

          <div className="blog-head">
            <h2>Latest Blog</h2>
            <div className="blog-line"></div>
            <p>
              Explore our featured blog posts on premium properties for sales & rents.
            </p>
          </div>

          <div className="blog-slider">

            <button className="blog-nav left" onClick={prev}>‹</button>

            <div
              className="blog-track"
              style={{transform:`translateX(-${page*100}%)`}}
            >

              {blogs.map((b,i)=>(
                <div className="blog-card" key={i}>

                  <div className="blog-img">
                    <img src={b.img} alt="" />
                  </div>

                  <div className="blog-content">

                    <div className="blog-meta">
                      <span className="tag">{b.tag}</span>
                      <span>{b.author}</span>
                      <span>{b.date}</span>
                    </div>

                    <h3>{b.title}</h3>
                    <p>{b.text}</p>

                  </div>

                </div>
              ))}

            </div>

            <button className="blog-nav right" onClick={next}>›</button>

          </div>

          {/* dots */}

          <div className="blog-dots">
            {blogs.map((_,i)=>(
              <span
                key={i}
                className={i===page ? "dot active":"dot"}
                onClick={()=>setPage(i)}
              />
            ))}
          </div>

          <div className="blog-btn-wrap">
            <button className="blog-btn">Explore All →</button>
          </div>

        </div>

      </section>

      {/* NEWSLETTER */}

      <section className="newsletter">

        <div className="newsletter-wrap">

          <div>
            <h2>Sign Up for Our Newsletter</h2>
            <p>Receive news, stay updated, and special offers.</p>
          </div>

          <div className="newsletter-form">
            <input type="email" placeholder="Enter Email Address"/>
            <button>Subscribe</button>
          </div>

        </div>

      </section>

    </>
  );
}