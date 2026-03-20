import React from "react";
import "./BeautifulRoom.css";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaStar,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCamera,
  FaTag,
} from "react-icons/fa";

const BeautifulRoom = () => {
  const base = "beautifulRoom";

  const roomData = [
    {
      id: 1,
      title: "Beautiful Condo Room",
      category: "Condo",
      listedOn: "25 May 2025",
      location: "25, Willow Apartment, USA",
      price: 400,
      duration: "Month",
      rating: 5.0,
      bedrooms: 2,
      baths: 2,
      sqft: 350,
      agent:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      badgeColor: "purple",
    },
    {
      id: 2,
      title: "Serenity Condo Suite",
      category: "Suite",
      listedOn: "18 Apr 2025",
      location: "17, Grov Tower, New York, USA",
      price: 500,
      duration: "Month",
      rating: 5.0,
      bedrooms: 2,
      baths: 1,
      sqft: 400,
      agent:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      image:
        "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=80",
      badgeColor: "green",
    },
    {
      id: 3,
      title: "Downtown Luxe Room",
      category: "Luxue",
      listedOn: "12 Apr 2025",
      location: "88, Springs Lane, Austin, USA",
      price: 450,
      duration: "Month",
      rating: 5.0,
      bedrooms: 2,
      baths: 1,
      sqft: 460,
      agent:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      badgeColor: "purple",
    },
    {
      id: 4,
      title: "Modern Haven Suite",
      category: "Condo",
      listedOn: "25 May 2025",
      location: "42, Hill Residence, Austin, USA",
      price: 600,
      duration: "Month",
      rating: 5.0,
      bedrooms: 4,
      baths: 2,
      sqft: 520,
      agent:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      badgeColor: "purple",
    },
  ];

  return (
    <section className={base}>
      <div className={`${base}__container`}>
        <div className={`${base}__grid`}>
          {roomData.map((room) => (
            <article className={`${base}__card`} key={room.id}>
              <div className={`${base}__imageWrap`}>
                <img
                  src={room.image}
                  alt={room.title}
                  className={`${base}__image`}
                />

                <div className={`${base}__topBadges`}>
                  <button className={`${base}__iconBtn ${base}__iconBtn--pink`}>
                    <FaCamera />
                  </button>
                  <button
                    className={`${base}__iconBtn ${base}__iconBtn--orange`}
                  >
                    <FaTag />
                  </button>
                </div>

                <button className={`${base}__wishlistBtn`}>
                  <FaHeart />
                </button>

                <div className={`${base}__agentThumb`}>
                  <img src={room.agent} alt="Agent" />
                </div>

                <div className={`${base}__imageOverlay`}></div>
              </div>

              <div className={`${base}__content`}>
                <div className={`${base}__metaRow`}>
                  <span
                    className={`${base}__category ${base}__category--${room.badgeColor}`}
                  >
                    {room.category}
                  </span>
                  <span className={`${base}__listedOn`}>
                    Listed on : {room.listedOn}
                  </span>
                </div>

                <h3 className={`${base}__title`}>{room.title}</h3>

                <div className={`${base}__location`}>
                  <FaMapMarkerAlt />
                  <span>{room.location}</span>
                </div>

                <div className={`${base}__priceRating`}>
                  <div className={`${base}__priceWrap`}>
                    <span className={`${base}__price`}>${room.price}</span>
                    <span className={`${base}__duration`}> / {room.duration}</span>
                  </div>

                  <div className={`${base}__rating`}>
                    <div className={`${base}__stars`}>
                      {[...Array(5)].map((_, index) => (
                        <FaStar key={index} />
                      ))}
                    </div>
                    <span>{room.rating}</span>
                  </div>
                </div>

                <div className={`${base}__divider`}></div>

                <div className={`${base}__features`}>
                  <div className={`${base}__featureItem`}>
                    <span className={`${base}__featureIcon`}>
                      <FaBed />
                    </span>
                    <span>{room.bedrooms} Bedroom</span>
                  </div>

                  <div className={`${base}__featureItem`}>
                    <span className={`${base}__featureIcon`}>
                      <FaBath />
                    </span>
                    <span>{room.baths} Bath</span>
                  </div>

                  <div className={`${base}__featureItem`}>
                    <span className={`${base}__featureIcon`}>
                      <FaRulerCombined />
                    </span>
                    <span>{room.sqft} Sq Ft</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeautifulRoom;