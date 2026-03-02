import "./Blog.css";
import blog1 from "../../assets/blog1.jpg";
import blog2 from "../../assets/blog2.jpg";
import blog3 from "../../assets/blog3.jpg";

export default function Blog() {
  return (
    <>
      {/* ================= BLOG SECTION ================= */}
      <section className="blog">
        <div className="blog-wrap">

          <div className="blog-head">
            <h2>Latest Blog</h2>
            <div className="blog-line"></div>
            <p>
              Explore our featured blog posts on premium properties for sales & rents.
            </p>
          </div>

          <div className="blog-grid">

            {/* CARD 1 */}
            <div className="blog-card">
              <div className="blog-img">
                <img src={blog1} alt="" />
              </div>

              <div className="blog-content">
                <div className="blog-meta">
                  <span className="tag">Property</span>
                  <span>Susan Culli</span>
                  <span>10 Apr 2025</span>
                </div>

                <h3>Location is Everything</h3>
                <p>
                  The value of a property largely depends on where it’s located.
                </p>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="blog-card">
              <div className="blog-img">
                <img src={blog2} alt="" />
              </div>

              <div className="blog-content">
                <div className="blog-meta">
                  <span className="tag purple">Villa</span>
                  <span>Shelly Cox</span>
                  <span>24 Apr 2025</span>
                </div>

                <h3>Real Estate is a Investment</h3>
                <p>
                  Unlike stocks, real estate usually grows in value over time.
                </p>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="blog-card">
              <div className="blog-img">
                <img src={blog3} alt="" />
              </div>

              <div className="blog-content">
                <div className="blog-meta">
                  <span className="tag purple">Godown</span>
                  <span>Eva Jones</span>
                  <span>27 Sep 2025</span>
                </div>

                <h3>Market Trends Matter</h3>
                <p>
                  Staying informed about housing market trends helps you make smarter decisions.
                </p>
              </div>
            </div>

          </div>

          <div className="blog-btn-wrap">
            <button className="blog-btn">Explore All →</button>
          </div>

        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="newsletter">
        <div className="newsletter-wrap">

          <div>
            <h2>Sign Up for Our Newsletter</h2>
            <p>Receive news, stay updated, and special offers.</p>
          </div>

          <div className="newsletter-form">
            <input type="email" placeholder="Enter Email Address" />
            <button>Subscribe</button>
          </div>

        </div>
      </section>
    </>
  );
}