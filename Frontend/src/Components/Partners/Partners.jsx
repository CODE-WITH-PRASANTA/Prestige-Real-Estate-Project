import "./Partners.css";

import memberstack from "../../assets/memberstack.png";
import payhere from "../../assets/payhere.png";
import headspace from "../../assets/headspace.png";
import livechat from "../../assets/livechat.png";

export default function Partners() {
  const partners = [
    { id: 1, name: "Memberstack", img: memberstack },
    { id: 2, name: "Payhere", img: payhere },
    { id: 3, name: "Headspace", img: headspace },
    { id: 4, name: "LiveChat", img: livechat },
    // you can add more logos here later
  ];

  // duplicate list for seamless loop
  const loop = [...partners, ...partners];

  return (
    <section className="partners">
      <div className="partners-inner">
        <h2>Hundreds of Partners Around the World</h2>
        <div className="partners-line" />
        <p>
          Every day, we build trust through communication, transparency, and results.
        </p>

        <div className="partners-slider">
          <div className="partners-track">
            {loop.map((p, idx) => (
              <div className="partner-card" key={`${p.id}-${idx}`}>
                <img src={p.img} alt={p.name} />
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}