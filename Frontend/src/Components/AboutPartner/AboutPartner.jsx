import "./AboutPartner.css";

import memberstack from "../../assets/scapic.webp";
import payhere from "../../assets/payehere.webp";
import headspace from "../../assets/headspace.webp";
import livechat from "../../assets/livechat.webp";

export default function AboutPartner() {
  const partners = [
    { id: 1, name: "Memberstack", img: memberstack },
    { id: 2, name: "Payhere", img: payhere },
    { id: 3, name: "Headspace", img: headspace },
    { id: 4, name: "LiveChat", img: livechat },
  ];

  const loop = [...partners, ...partners];

  return (
    <section className="aboutPartner">
      <div className="aboutPartner-inner">
        <h2>Hundreds of Partners Around the World</h2>

        <div className="aboutPartner-line"></div>

        <p>
          Every day, we build trust through communication, transparency, and
          results.
        </p>

        <div className="aboutPartner-slider">
          <div className="aboutPartner-track">
            {loop.map((p, idx) => (
              <div className="aboutPartner-card" key={`${p.id}-${idx}`}>
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