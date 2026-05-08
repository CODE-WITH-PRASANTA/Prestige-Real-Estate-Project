import React from "react";
import "./Description.css";

const Description = ({ data, setData }) => {
  const base = "property-description";

  return (
    <section className={base}>
      <div className={`${base}__container`}>
        {/* LEFT TEXT */}

        <div className={`${base}__left`}>
          <h2 className={`${base}__title`}>Description</h2>

          <p className={`${base}__desc`}>
            A beautifully designed home combining style and function, ideal for
            modern lifestyles and peaceful, long-term living.
          </p>
        </div>

        {/* RIGHT CARD */}

        <div className={`${base}__card`}>
          <div className={`${base}__field`}>
            <label>Description of Property</label>

            <textarea
              value={data || ""}
              onChange={(e) => setData(e.target.value)}
              placeholder="Write property description here..."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;