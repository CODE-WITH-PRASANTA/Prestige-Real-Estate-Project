import "./BecomeAgent.css";
import building from "../../assets/cta-building.png"; // ✅ put image in src/assets

export default function BecomeAgent() {
  return (
    <section className="ba">
      <div className="ba-wrap">
        {/* background shapes */}
        <span className="ba-slab ba-slab1" aria-hidden="true" />
        <span className="ba-slab ba-slab2" aria-hidden="true" />

        {/* dots */}
        <span className="ba-dot ba-dot1" aria-hidden="true" />
        <span className="ba-dot ba-dot2" aria-hidden="true" />

        {/* content */}
        <div className="ba-content">
          <h2>Become a Real Estate Agent</h2>
          <p>
            At Dream Estate, we provide the tools, training, and support you
            need to succeed in the competitive real estate market.
          </p>
        </div>

        {/* right */}
        <div className="ba-right">
          <a className="ba-btn" href="#register">
            Register Now
          </a>

          <div className="ba-building" aria-hidden="true">
            <img src={building} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}