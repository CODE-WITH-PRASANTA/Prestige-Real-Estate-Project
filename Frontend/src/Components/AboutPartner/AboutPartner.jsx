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
        <h2>
          Trusted Partners Supporting Prestige Real Estate Properties
        </h2>

        <div className="aboutPartner-line"></div>

        <p>
          At Prestige Real Estate Properties, we work closely with reliable partners
          and service providers to deliver a smooth and secure real estate experience.
          From verified property listings and secure payment solutions to customer
          support and digital tools, every partnership is built on trust and quality.
          <br /><br />
          Our network helps us offer better services for home buyers, property
          investors, and businesses across India. Whether you're searching for a
          residential property, a commercial space, or a long-term investment, our
          partners play a key role in making the process simple, transparent, and
          dependable.
        </p>

        <div className="aboutPartner-slider">
          <div className="aboutPartner-track">
            {loop.map((p, idx) => (
              <div className="aboutPartner-card" key={`${p.id}-${idx}`}>
                <img
                  src={p.img}
                  alt={`${p.name} partner - Prestige Real Estate Properties`}
                />
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}