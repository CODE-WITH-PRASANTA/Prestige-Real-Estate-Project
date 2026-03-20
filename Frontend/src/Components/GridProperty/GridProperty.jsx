import React from "react";
import "./GridProperty.css";
import {
  FaBed,
  FaBath,
  FaRegHeart,
  FaMapMarkerAlt,
  FaStar,
  FaThLarge,
  FaListUl,
  FaMapMarkedAlt,
  FaChevronDown,
  FaTag,
  FaSyncAlt,
  FaRulerCombined,
} from "react-icons/fa";

const GridProperty = () => {
  const properties = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      title: "Serenity Condo Suite",
      address: "17, Grove Towers, New York, USA",
      price: "$21000",
      rating: "5.0",
      reviews: "20 Reviews",
      bedroom: "4 Bedroom",
      bath: "4 Bath",
      area: "350 Sq Ft",
      listed: "16 Jan 2023",
      category: "Apartment",
      featured: true,
      isNew: true,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
      title: "Loyal Apartment",
      address: "25, Willow Crest Apartment, USA",
      price: "$1940",
      rating: "4.6",
      reviews: "36 Reviews",
      bedroom: "2 Bedroom",
      bath: "2 Bath",
      area: "350 Sq Ft",
      listed: "02 May 2025",
      category: "Apartment",
      featured: true,
      isNew: false,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=80",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      title: "Grand Villa House",
      address: "10, Oak Ridge Villa, USA",
      price: "$1370",
      rating: "4.9",
      reviews: "25 Reviews",
      bedroom: "4 Bedroom",
      bath: "3 Bath",
      area: "520 Sq Ft",
      listed: "28 Apr 2025",
      category: "Villa",
      featured: true,
      isNew: false,
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1400&q=80",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      title: "Palm Cove Bungalows",
      address: "42, Pine Residency, Miami, USA",
      price: "$1370",
      rating: "4.8",
      reviews: "26 Reviews",
      bedroom: "5 Bedroom",
      bath: "3 Bath",
      area: "700 Sq Ft",
      listed: "16 Mar 2025",
      category: "Bungalow",
      featured: false,
      isNew: false,
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80",
      avatar:
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80",
      title: "Blue Horizon Villa",
      address: "76, Golden Oaks, Dallas, USA",
      price: "$2000",
      rating: "4.9",
      reviews: "19 Reviews",
      bedroom: "2 Bedroom",
      bath: "1 Bath",
      area: "400 Sq Ft",
      listed: "08 Mar 2025",
      category: "Villa",
      featured: false,
      isNew: false,
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1400&q=80",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
      title: "Wanderlust Lodge",
      address: "91, Birch Residences, Boston, USA",
      price: "$1950",
      rating: "4.7",
      reviews: "45 Reviews",
      bedroom: "3 Bedroom",
      bath: "2 Bath",
      area: "550 Sq Ft",
      listed: "25 Feb 2025",
      category: "Lodge",
      featured: false,
      isNew: false,
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1400&q=80",
      avatar:
        "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=300&q=80",
      title: "Cedar Grove Residences",
      address: "42, Pine Residency, Miami, USA",
      price: "$2470",
      rating: "4.2",
      reviews: "14 Reviews",
      bedroom: "4 Bedroom",
      bath: "4 Bath",
      area: "680 Sq Ft",
      listed: "30 Mar 2025",
      category: "Residency",
      featured: false,
      isNew: false,
    },
  ];

  return (
    <section className="gridProperty">
      <div className="gridProperty-container">
        <div className="gridProperty-toolbar">
          <div className="gridProperty-result">
            Showing result <span>06</span> of <span>125</span>
          </div>

          <div className="gridProperty-toolbarRight">
            <div className="gridProperty-selectWrap">
              <label>Sort By</label>
              <div className="gridProperty-select">
                <span>Default</span>
                <FaChevronDown />
              </div>
            </div>

            <div className="gridProperty-selectWrap">
              <label>Price Range</label>
              <div className="gridProperty-select">
                <span>Low to High</span>
                <FaChevronDown />
              </div>
            </div>

            <div className="gridProperty-viewBtns">
              <button className="gridProperty-viewBtn">
                <FaListUl />
              </button>
              <button className="gridProperty-viewBtn active">
                <FaThLarge />
              </button>
              <button className="gridProperty-viewBtn">
                <FaMapMarkedAlt />
              </button>
            </div>
          </div>
        </div>

        <div className="gridProperty-grid">
          {properties.map((item) => (
            <div className="gridProperty-card" key={item.id}>
              <div className="gridProperty-imageWrap">
                <img
                  src={item.image}
                  alt={item.title}
                  className="gridProperty-image"
                />

                <div className="gridProperty-overlay"></div>

                <div className="gridProperty-topBadges">
                  {item.isNew && (
                    <span className="gridProperty-badge gridProperty-badgeNew">
                      <FaSyncAlt /> New
                    </span>
                  )}

                  {item.featured && (
                    <span className="gridProperty-badge gridProperty-badgeFeatured">
                      <FaTag /> Featured
                    </span>
                  )}
                </div>

                <button className="gridProperty-heartBtn">
                  <FaRegHeart />
                </button>

                <div className="gridProperty-price">{item.price}</div>

                <div className="gridProperty-agent">
                  <img src={item.avatar} alt="agent" />
                </div>
              </div>

              <div className="gridProperty-content">
                <div className="gridProperty-rating">
                  <span className="gridProperty-stars">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </span>
                  <span className="gridProperty-ratingText">
                    {item.rating} ({item.reviews})
                  </span>
                </div>

                <h3 className="gridProperty-title">{item.title}</h3>

                <div className="gridProperty-location">
                  <FaMapMarkerAlt />
                  <span>{item.address}</span>
                </div>

                <div className="gridProperty-features">
                  <div className="gridProperty-featureItem">
                    <span className="gridProperty-featureIcon">
                      <FaBed />
                    </span>
                    <span>{item.bedroom}</span>
                  </div>

                  <div className="gridProperty-featureItem">
                    <span className="gridProperty-featureIcon">
                      <FaBath />
                    </span>
                    <span>{item.bath}</span>
                  </div>

                  <div className="gridProperty-featureItem">
                    <span className="gridProperty-featureIcon">
                      <FaRulerCombined />
                    </span>
                    <span>{item.area}</span>
                  </div>
                </div>

                <div className="gridProperty-meta">
                  <div className="gridProperty-metaItem">
                    <strong>Listed on :</strong> {item.listed}
                  </div>
                  <div className="gridProperty-metaItem">
                    <strong>Category :</strong> {item.category}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="gridProperty-loadMoreWrap">
          <button className="gridProperty-loadMore">
            <FaSyncAlt /> Load More
          </button>
        </div>
      </div>
    </section>
  );
};

export default GridProperty;