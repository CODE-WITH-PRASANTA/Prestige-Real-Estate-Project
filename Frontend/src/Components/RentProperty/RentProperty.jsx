import React, { useMemo, useState } from "react";
import "./RentProperty.css";
import { Link } from "react-router-dom";
import {
  FiChevronDown,
  FiHeart,
  FiMapPin,
  FiFilter,
  FiSearch,
  FiPhone,
  FiCamera,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
} from "react-icons/fi";

import locationIcon from "../../assets/location2.webp";

import img1 from "../../assets/interior2.webp";
import img2 from "../../assets/about-us-01.webp";
import img3 from "../../assets/about-us-02.webp";
import img4 from "../../assets/about-us-03.webp";

const galleryImages = [img1, img2, img3, img4];

const baseProperties = [
  {
    title: "Ratna Arcade, Gandamunda",
    subtitle: "3 BHK Flat for rent in Pokhariput, Bhubaneswar",
    price: "₹30,000",
    deposit: "+ Deposit 3 months rent",
    area: "1,260 sqft (117 sqm)",
    areaType: "Carpet Area",
    bhk: "3 BHK",
    baths: "2 Baths",
    highlights: ["Top Floor", "Full Power Backup"],
    desc: "This property is close to hospital, close to market, close to airport and offers a peaceful premium residential environment for families.",
    time: "2w ago",
    postedBy: "Owner",
    tag: "FURNISHED",
    verified: false,
    withPhotos: true,
    withVideos: false,
    images: galleryImages,
  },
  {
    title: "Utkal Greenex",
    subtitle: "3 BHK Flat for rent in Sundarpada, Bhubaneswar",
    price: "₹28,000",
    deposit: "+ Deposit 2 months rent",
    area: "1,605 sqft (149 sqm)",
    areaType: "Super Built-up Area",
    bhk: "3 BHK",
    baths: "2 Baths",
    highlights: ["North Facing", "Swimming Pool Available"],
    desc: "Offering a spacious 3 BHK flat spanning 1605 sq.ft. on the 8th floor with elegant interiors and strong ventilation.",
    time: "4w ago",
    postedBy: "Owner",
    tag: "",
    verified: false,
    withPhotos: true,
    withVideos: true,
    images: [img2, img3, img4, img1],
  },
  {
    title: "Achyuta Bhawan, Lane 4",
    subtitle: "3 Bedroom House for rent in Satabdi Nagar, Bhubaneswar",
    price: "₹23,000",
    deposit: "+ Deposit 2 months rent",
    area: "1,500 sqft (139 sqm)",
    areaType: "Plot Area",
    bhk: "3 BHK",
    baths: "2 Baths",
    highlights: ["Verified", "Independent House"],
    desc: "This unfurnished 3 BHK independent house offers 1500 sq.ft. of well-laid space ideal for families who value privacy.",
    time: "3w ago",
    postedBy: "Owner",
    tag: "VERIFIED",
    verified: true,
    withPhotos: true,
    withVideos: false,
    images: [img3, img4, img1, img2],
  },
  {
    title: "Annapurna Elegance",
    subtitle: "3 BHK Builder Floor for rent in Patia, Bhubaneswar",
    price: "₹45,000",
    deposit: "+ Deposit 2 months rent",
    area: "2,200 sqft (204 sqm)",
    areaType: "Plot Area",
    bhk: "3 BHK",
    baths: "3 Baths",
    highlights: ["1st out of 3 Floors", "North Facing", "+2"],
    desc: "This beautiful 3 BHK builder floor for rent in Patia offers premium comfort, spacious living zones, and polished interiors.",
    time: "Yesterday",
    postedBy: "Owner",
    tag: "FURNISHED",
    verified: false,
    withPhotos: true,
    withVideos: true,
    images: [img4, img1, img2, img3],
  },
  {
    title: "Baramunda, Bhubaneswar",
    subtitle: "5 Bedroom House for rent in Baramunda, Bhubaneswar",
    price: "₹1.35 Lac",
    deposit: "+ Deposit ₹4,20,000",
    area: "2,400 sqft (223 sqm)",
    areaType: "Plot Area",
    bhk: "5 BHK",
    baths: "5 Baths",
    highlights: ["Private Garden", "Full Power Backup", "+1"],
    desc: "Fully furnished 5 BHK independent building villa type house for rent with spacious interiors and premium lifestyle appeal.",
    time: "Dealer · 4w ago",
    postedBy: "Dealer",
    tag: "FURNISHED",
    verified: false,
    withPhotos: true,
    withVideos: true,
    images: [img1, img4, img3, img2],
  },
  {
    title: "Officers Enclave Apartment",
    subtitle: "3 BHK Flat for rent in Damodarpur, Bhubaneswar",
    price: "₹20,000",
    deposit: "+ Deposit 2 months rent",
    area: "2,300 sqft (214 sqm)",
    areaType: "Carpet Area",
    bhk: "3 BHK",
    baths: "3 Baths",
    highlights: ["East Facing", "Newly Constructed", "+2"],
    desc: "This 3 BHK flat comes with 3 bathrooms set in 2300 sq.ft. carpet area and suits families wanting a spacious home.",
    time: "1w ago",
    postedBy: "Owner",
    tag: "VERIFIED",
    verified: true,
    withPhotos: true,
    withVideos: false,
    images: [img2, img1, img4, img3],
  },
];

const propertyList = Array.from({ length: 100 }, (_, index) => {
  const item = baseProperties[index % baseProperties.length];
  return {
    ...item,
    id: index + 1,
  };
});

const sectionData = [
  {
    title: "Budget",
    options: ["No min", "No max"],
    type: "select",
  },
  {
    title: "No. of Bedrooms",
    options: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK"],
  },
  {
    title: "Posted by",
    options: ["Owner", "Dealer"],
  },
  {
    title: "Furnishing status",
    options: ["Furnished", "Verified"],
  },
];

function PropertyCard({ item, savedItems, toggleSave }) {
  const [activeImage, setActiveImage] = useState(0);
  const [direction, setDirection] = useState("next");
  const isSaved = savedItems.includes(item.id);

  const prevImage = () => {
    setDirection("prev");
    setActiveImage((prev) => (prev === 0 ? item.images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setDirection("next");
    setActiveImage((prev) => (prev === item.images.length - 1 ? 0 : prev + 1));
  };

  const jumpToImage = (index) => {
    setDirection(index > activeImage ? "next" : "prev");
    setActiveImage(index);
  };

  return (
    <div className="rent-card ultra-card">
      <div className="rent-card-image-wrap premium-gallery">
        {item.tag && <span className="rent-badge">{item.tag}</span>}

        <button
          className={`rent-heart-btn ${isSaved ? "saved" : ""}`}
          onClick={() => toggleSave(item.id)}
          aria-label="Save property"
          type="button"
        >
          <FiHeart />
        </button>

        <div className="gallery-main">
          <div className={`gallery-image-stage slide-${direction}`} key={activeImage}>
            <img
              src={item.images[activeImage]}
              alt={item.title}
              className="rent-card-image"
            />
          </div>

          <div className="gallery-overlay"></div>

          <button
            className="gallery-arrow gallery-arrow-left"
            onClick={prevImage}
            type="button"
          >
            <FiChevronLeft />
          </button>

          <button
            className="gallery-arrow gallery-arrow-right"
            onClick={nextImage}
            type="button"
          >
            <FiChevronRight />
          </button>

          <div className="rent-image-slider-dots">
            {item.images.map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${activeImage === index ? "active-dot" : ""}`}
                onClick={() => jumpToImage(index)}
                type="button"
              />
            ))}
          </div>

          <div className="rent-image-count">
            <FiCamera />
            <span>
              {activeImage + 1}/{item.images.length}
            </span>
          </div>

          {item.id % 5 === 0 && (
            <div className="rent-image-overlay-note">
              2 people already contacted yesterday
            </div>
          )}
        </div>

        <div className="gallery-thumbs">
          {item.images.map((img, index) => (
            <button
              key={index}
              className={`thumb-card ${activeImage === index ? "active-thumb" : ""}`}
              onClick={() => jumpToImage(index)}
              type="button"
            >
              <img src={img} alt={`thumb-${index + 1}`} />
            </button>
          ))}
        </div>
      </div>

      <div className="rent-card-content">
        <div className="rent-card-top">
          <div>
            <h3>{item.title}</h3>
            <p>{item.subtitle}</p>
          </div>
          {item.tag && <span className="rent-top-tag">{item.tag}</span>}
        </div>

        <div className="rent-card-stats">
          <div>
            <h4>
              {item.price}
              <span>/month</span>
            </h4>
            <p>{item.deposit}</p>
          </div>

          <div>
            <h4>{item.area}</h4>
            <p>{item.areaType}</p>
          </div>

          <div>
            <h4>{item.bhk}</h4>
            <p>{item.baths}</p>
          </div>
        </div>

        <div className="rent-highlights">
          <strong>Highlights :</strong>
          {item.highlights.map((hl, index) => (
            <span key={index}>{hl}</span>
          ))}
        </div>

        <p className="rent-desc">{item.desc}</p>

        <div className="rent-card-bottom">
          <div className="rent-time">
            <span>{item.time}</span>
            <p>{item.postedBy}</p>
          </div>

          <div className="rent-actions">
            <Link to="/rent/details" className="rent-view-details-btn">
              <FiEye />
              View Details
            </Link>

            <button className="rent-view-btn" type="button">
              View Number
            </button>

            <button className="rent-contact-btn" type="button">
              <FiPhone />
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExploreSection() {
  return (
    <div className="explore-bhubaneswar-box">
      <div className="explore-header">
        <div>
          <h3>Explore Bhubaneswar</h3>
          <p>
            Showing for <strong>Rent — Apartments</strong>
          </p>
        </div>
        <button type="button">View Bhubaneswar Overview</button>
      </div>

      <div className="explore-grid">
        <div className="explore-column">
          <h4>Popular localities</h4>

          {[
            ["Patia", "₹19K - 36K /mo.", "18%"],
            ["Cuttack Puri Road", "₹11K - 24K /mo.", "6%"],
            ["Chandrasekharpur", "₹20K - 32K /mo.", "6%"],
          ].map((item, index) => (
            <div className="explore-item" key={index}>
              <div className="explore-icon">
                <img src={locationIcon} alt="location" />
              </div>

              <div className="explore-text">
                <h5>{item[0]}</h5>
                <p>{item[1]}</p>
                <a href="/">View Properties</a>
              </div>

              <span>{item[2]} Searches</span>
            </div>
          ))}

          <a href="/" className="explore-more">
            View 131 localities
          </a>
        </div>

        <div className="explore-column">
          <h4>Top rated localities</h4>

          {[
            ["Janpath Road", "₹21K - 33K /mo.", "4.5 ★", "60+ reviews"],
            ["Chandrasekharpur", "₹20K - 32K /mo.", "4.4 ★", "90+ reviews"],
            ["Sailashree Vihar", "₹19K - 29K /mo.", "4.4 ★", "29 reviews"],
          ].map((item, index) => (
            <div className="explore-item" key={index}>
              <div className="explore-icon">
                <img src={locationIcon} alt="location" />
              </div>

              <div className="explore-text">
                <h5>{item[0]}</h5>
                <p>{item[1]}</p>
                <a href="/">View Properties</a>
              </div>

              <div className="explore-rating-wrap">
                <span className="explore-rating">{item[2]}</span>
                <small>{item[3]}</small>
              </div>
            </div>
          ))}

          <a href="/" className="explore-more">
            View 83 localities
          </a>
        </div>
      </div>
    </div>
  );
}

export default function RentProperty() {
  const cardsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [savedItems, setSavedItems] = useState([]);
  const [selectedChips, setSelectedChips] = useState([]);
  const [selectedBedrooms, setSelectedBedrooms] = useState([]);
  const [selectedPostedBy, setSelectedPostedBy] = useState([]);
  const [selectedSpecial, setSelectedSpecial] = useState([]);

  const toggleSave = (id) => {
    setSavedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const toggleChip = (chip) => {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((item) => item !== chip) : [...prev, chip]
    );
    setCurrentPage(1);
  };

  const toggleOption = (category, value) => {
    const map = {
      bedrooms: [selectedBedrooms, setSelectedBedrooms],
      postedBy: [selectedPostedBy, setSelectedPostedBy],
      special: [selectedSpecial, setSelectedSpecial],
    };

    const [state, setState] = map[category];

    setState(
      state.includes(value)
        ? state.filter((item) => item !== value)
        : [...state, value]
    );

    setCurrentPage(1);
  };

  const filteredProperties = useMemo(() => {
    let filtered = [...propertyList];

    if (selectedChips.includes("Owner")) {
      filtered = filtered.filter((item) => item.postedBy === "Owner");
    }

    if (selectedChips.includes("Verified")) {
      filtered = filtered.filter((item) => item.verified);
    }

    if (selectedChips.includes("Furnished")) {
      filtered = filtered.filter((item) => item.tag === "FURNISHED");
    }

    if (selectedChips.includes("With Photos")) {
      filtered = filtered.filter((item) => item.withPhotos);
    }

    if (selectedChips.includes("With Videos")) {
      filtered = filtered.filter((item) => item.withVideos);
    }

    if (selectedBedrooms.length > 0) {
      filtered = filtered.filter((item) => selectedBedrooms.includes(item.bhk));
    }

    if (selectedPostedBy.length > 0) {
      filtered = filtered.filter((item) => selectedPostedBy.includes(item.postedBy));
    }

    if (selectedSpecial.includes("Furnished")) {
      filtered = filtered.filter((item) => item.tag === "FURNISHED");
    }

    if (selectedSpecial.includes("Verified")) {
      filtered = filtered.filter((item) => item.verified);
    }

    return filtered;
  }, [selectedChips, selectedBedrooms, selectedPostedBy, selectedSpecial]);

  const totalPages = Math.ceil(filteredProperties.length / cardsPerPage);

  const currentCards = useMemo(() => {
    const start = (currentPage - 1) * cardsPerPage;
    return filteredProperties.slice(start, start + cardsPerPage);
  }, [currentPage, filteredProperties]);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const paginationRange = useMemo(() => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i += 1) pages.push(i);
      return pages;
    }

    pages.push(1);

    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 2) {
      start = 2;
      end = 4;
    }

    if (currentPage >= totalPages - 1) {
      start = totalPages - 3;
      end = totalPages - 1;
    }

    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i += 1) pages.push(i);
    if (end < totalPages - 1) pages.push("...");
    pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages]);

  return (
    <section className="rent-page">
      <div className="luxury-bg-shape luxury-bg-shape-1"></div>
      <div className="luxury-bg-shape luxury-bg-shape-2"></div>

      <div className="rent-wrapper">
        <aside className="rent-sidebar">
          <div className="rent-filter-card premium-filter-card">
            <div className="filter-premium-head">
              <span className="filter-premium-badge">Luxury Filters</span>
              <h3>Refine Your Search</h3>
              <p>Discover premium rentals tailored to your preference.</p>
            </div>

            {sectionData.map((section, index) => (
              <div className="rent-filter-section" key={index}>
                <div className="rent-filter-header">
                  <h4>{section.title}</h4>
                  <FiChevronDown />
                </div>

                <div className="rent-filter-options">
                  {section.type === "select" ? (
                    <div className="rent-budget-row">
                      {section.options.map((item, i) => (
                        <select key={i}>
                          <option>{item}</option>
                        </select>
                      ))}
                    </div>
                  ) : section.title === "No. of Bedrooms" ? (
                    section.options.map((item, i) => (
                      <button
                        key={i}
                        type="button"
                        className={selectedBedrooms.includes(item) ? "filter-active" : ""}
                        onClick={() => toggleOption("bedrooms", item)}
                      >
                        {item}
                      </button>
                    ))
                  ) : section.title === "Posted by" ? (
                    section.options.map((item, i) => (
                      <button
                        key={i}
                        type="button"
                        className={selectedPostedBy.includes(item) ? "filter-active" : ""}
                        onClick={() => toggleOption("postedBy", item)}
                      >
                        {item}
                      </button>
                    ))
                  ) : (
                    section.options.map((item, i) => (
                      <button
                        key={i}
                        type="button"
                        className={selectedSpecial.includes(item) ? "filter-active" : ""}
                        onClick={() => toggleOption("special", item)}
                      >
                        {item}
                      </button>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <div className="rent-main">
          <div className="premium-results-hero">
            <div className="rent-breadcrumb">Home / Rent / Bhubaneswar</div>

            <div className="rent-results-header">
              <h2>
                {filteredProperties.length} results | Property for Rent in Bhubaneswar
              </h2>

              <div className="rent-insight-box premium-insight">
                <div className="rent-insight-left">
                  <FiMapPin />
                  <span>Get to know more about Bhubaneswar</span>
                </div>
                <a href="/">View Insights</a>
              </div>

              <div className="rent-chip-sort-row">
                <div className="rent-chips">
                  {["Owner", "Verified", "Furnished", "With Photos", "With Videos"].map(
                    (chip, index) => (
                      <button
                        key={index}
                        type="button"
                        className={selectedChips.includes(chip) ? "chip-active" : ""}
                        onClick={() => toggleChip(chip)}
                      >
                        {chip}
                      </button>
                    )
                  )}
                </div>

                <button className="rent-sort-btn" type="button">
                  <FiFilter />
                  Sort By
                  <FiChevronDown />
                </button>
              </div>
            </div>
          </div>

          <div className="rent-card-list">
            {currentCards.length > 0 ? (
              currentCards.map((item) => (
                <PropertyCard
                  key={item.id}
                  item={item}
                  savedItems={savedItems}
                  toggleSave={toggleSave}
                />
              ))
            ) : (
              <div className="empty-results">
                <h3>No properties found</h3>
                <p>Try removing some filters to see more results.</p>
              </div>
            )}

            <ExploreSection />

            {totalPages > 0 && (
              <div className="rent-pagination">
                <div className="pagination-status">
                  Page {currentPage} of {totalPages}
                </div>

                <button
                  className="pagination-text-btn"
                  onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  type="button"
                >
                  {"< Previous"}
                </button>

                <div className="pagination-numbers">
                  {paginationRange.map((page, index) =>
                    page === "..." ? (
                      <span key={index} className="pagination-ellipsis">
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        className={`pagination-number ${currentPage === page ? "active" : ""}`}
                        onClick={() => goToPage(page)}
                        type="button"
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  className="pagination-text-btn"
                  onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  type="button"
                >
                  {"Next >"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}