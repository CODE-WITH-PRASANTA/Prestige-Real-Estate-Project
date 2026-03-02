import { useState } from "react";
import "./Pricing.css";

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="pricing">
      <div className="pricing-top">
        <div>
          <h2>Pricing & Subscriptions</h2>
          <div className="line">
            <span></span>
            <span></span>
          </div>
          <p>Checkout our package, choose your package wisely.</p>
        </div>

        <div className="toggle">
          <span className={!yearly ? "active" : ""}>Yearly</span>
          <div
            className={`switch ${yearly ? "on" : ""}`}
            onClick={() => setYearly(!yearly)}
          >
            <div className="circle"></div>
          </div>
          <span className={yearly ? "active" : ""}>Monthly</span>
        </div>
      </div>

      <div className="pricing-cards">

        <div className="card">
          <h3>Standard</h3>
          <p>Manage up to 10 listings with essential features for small teams.</p>
          <h1>${yearly ? "79" : "99"} <span>/month</span></h1>
        </div>

        <div className="card popular">
          <div className="badge">Most Popular</div>
          <h3>Professional</h3>
          <p>Manage up to 25 listings with advanced tools & analytics.</p>
          <h1>${yearly ? "159" : "199"} <span>/month</span></h1>
        </div>

        <div className="card">
          <h3>Enterprise</h3>
          <p>Unlimited listings, full API access & 24/7 premium support.</p>
          <h1>${yearly ? "299" : "399"} <span>/month</span></h1>
        </div>

      </div>
    </section>
  );
}