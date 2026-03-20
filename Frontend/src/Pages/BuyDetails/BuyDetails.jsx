import React from "react";
import "./BuyDetails.css";

import DetailsHero from "../../Components/DetailsHero/DetailsHero";
import Treding from "../../Components/Treding/Treding";
import Empty from "../../Components/Empty/Empty";
import BeautifulRoom from "../../Components/BeautifulRoom/BeautifulRoom";

const BuyDetails = () => {
  const base = "buyDetails";

  return (
    <div className={base}>
      <section className={`${base}__hero`}>
        <DetailsHero />
      </section>

      <section className={`${base}__mainSection`}>
        <div className={`${base}__container`}>
          <div className={`${base}__content`}>
            <div className={`${base}__left`}>
              <Treding />
            </div>

            <aside className={`${base}__right`}>
              <div className={`${base}__sticky`}>
                <Empty />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className={`${base}__bottomSection`}>
        <div className={`${base}__container`}>
          <BeautifulRoom />
        </div>
      </section>
    </div>
  );
};

export default BuyDetails;