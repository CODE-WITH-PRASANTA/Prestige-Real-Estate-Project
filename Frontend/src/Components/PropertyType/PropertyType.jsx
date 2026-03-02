import "./PropertyType.css";

function PropertyType() {
  return (
    <section className="property">
      <div className="property-left">
        <h2>Explore by <br />Property Type</h2>

        <p>
          Whether you're looking for a cozy apartment, a luxurious villa,
          or a commercial investment, we’ve got you covered.
        </p>

        <div className="arrows">
          <button>{"←"}</button>
          <button>{"→"}</button>
        </div>
      </div>

      <div className="property-right">

        <div className="p-card">
          <img src="/icons/office.png" alt="" />
          <h3>Offices</h3>
          <span>45 Properties</span>
        </div>

        <div className="p-card">
          <img src="/icons/villa.png" alt="" />
          <h3>Villas</h3>
          <span>28 Properties</span>
        </div>

        <div className="p-card">
          <img src="/icons/apartment.png" alt="" />
          <h3>Apartment</h3>
          <span>35 Properties</span>
        </div>

        <div className="p-card">
          <img src="/icons/apartment.png" alt="" />
          <h3>Apartment</h3>
          <span>30 Properties</span>
        </div>

      </div>
    </section>
  );
}

export default PropertyType;