import React, { useEffect, useState } from "react";
import "./BuyDetails.css";
import { useParams } from "react-router-dom";

import API from "../../api/axios";

import DetailsHero from "../../Components/DetailsHero/DetailsHero";
import Treding from "../../Components/Treding/Treding";
import Empty from "../../Components/Empty/Empty";
import BeautifulRoom from "../../Components/BeautifulRoom/BeautifulRoom";

const BuyDetails = () => {
  const base = "buyDetails";

  const { id } = useParams(); // 👈 get id from URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH DATA
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await API.get(`/property/${id}`);
        setProperty(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // ⏳ Loading state
  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  // ❌ Not found
  if (!property) {
    return <h2 style={{ textAlign: "center" }}>Property not found</h2>;
  }

  return (
    <div className={base}>
      <section className={`${base}__hero`}>
        <DetailsHero data={property} />
      </section>

      <section className={`${base}__mainSection`}>
        <div className={`${base}__container`}>
          <div className={`${base}__content`}>
            
            <div className={`${base}__left`}>
              <Treding data={property} />
            </div>

            <aside className={`${base}__right`}>
              <div className={`${base}__sticky`}>
                <Empty data={property} />
              </div>
            </aside>

          </div>
        </div>
      </section>

      <section className={`${base}__bottomSection`}>
        <div className={`${base}__container`}>
          <BeautifulRoom data={property} />
        </div>
      </section>
    </div>
  );
};

export default BuyDetails;