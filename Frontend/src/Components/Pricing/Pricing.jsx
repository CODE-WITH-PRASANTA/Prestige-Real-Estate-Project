import { useEffect, useMemo, useState } from "react";
import "./Pricing.css";

export default function Pricing() {
  const [billing, setBilling] = useState("yearly"); // "yearly" | "monthly"

  const plans = useMemo(
    () => [
      {
        id: "standard",
        name: "Standard",
        desc: "Manage up to 10 listings with essential features for small teams and businesses.",
        monthly: 99,
        yearly: 79,
        badge: "",
        features: [
          "10 Listing Per Login",
          "Up to 100 Users",
          "Enquiry on Listing",
          "24 Hrs Support",
          "Basic Custom Review",
          "Simple Impact Reporting",
          "Quick Onboarding & Account",
          "No API Access",
          "Basic Transaction Tracking",
          "Dreams Estate Branding",
        ],
      },
      {
        id: "professional",
        name: "Professional",
        desc: "Advanced tools & analytics to scale faster with bigger teams and higher volume.",
        monthly: 199,
        yearly: 159,
        badge: "Most Popular",
        features: [
          "50 Listing Per Login",
          "500+ Active Users",
          "Enquiry On Every Listing",
          "Priority 24 Hrs Support",
          "Advanced Custom Review",
          "Standard Impact Reporting",
          "Quick Onboarding & Account",
          "Partial API Access",
          "Basic Transaction Tracking",
          "Partial Custom Branding",
        ],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        desc: "Unlimited listings, full API access, 24/7 support, and white-label branding.",
        monthly: 399,
        yearly: 319,
        badge: "",
        features: [
          "Unlimited Listings Per Login",
          "1000+ Active Users",
          "Enquiry Enabled On Listings",
          "Dedicated 24 Hrs Support",
          "Full Custom Review Tools",
          "Advanced Impact Reporting",
          "Personalized Onboarding & Account",
          "Full Api Access",
          "Full Transaction Tracking",
          "White-Label Branding",
        ],
      },
    ],
    []
  );

  const priceOf = (p) => (billing === "yearly" ? p.yearly : p.monthly);

  // Ultra: scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("inView");
        });
      },
      { threshold: 0.15 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="pricing" id="pricing">
      <div className="priceWrap">
        <div className="pricingTop">
          <div>
            <h2>Pricing &amp; Subscriptions</h2>
            <div className="pricingLine" />
            <p>Checkout our package, choose your package wisely.</p>
          </div>

          <div className="billingToggle" role="group" aria-label="Billing Toggle">
            <span className={billing === "yearly" ? "active" : ""}>Yearly</span>

            <button
              type="button"
              className={`switch ${billing === "monthly" ? "on" : ""}`}
              onClick={() =>
                setBilling((b) => (b === "yearly" ? "monthly" : "yearly"))
              }
              aria-label="Toggle billing monthly/yearly"
            >
              <span className="knob" />
            </button>

            <span className={billing === "monthly" ? "active" : ""}>Monthly</span>
          </div>
        </div>

        <div className="priceGrid">
          {plans.map((p, idx) => (
            <article
              key={p.id}
              className={`priceCard reveal ${idx === 0 ? "delay-1" : idx === 1 ? "delay-2" : "delay-3"}`}
            >
              {p.badge ? <div className="pc-badge">{p.badge}</div> : null}

              <h3 className="pc-name">{p.name}</h3>
              <p className="pc-desc">{p.desc}</p>

              <div className="pc-priceRow">
                <span className="pc-price">${priceOf(p)}</span>
                <span className="pc-per">/month</span>
              </div>

              <div className="pc-divider" />

              <div className="pc-features">
                <h4>Key Features</h4>
                <ul>
                  {p.features.map((f, i) => (
                    <li key={i}>
                      <span className="check" aria-hidden="true">
                        ✓
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="pc-btn" type="button">
                Get a Quote
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}