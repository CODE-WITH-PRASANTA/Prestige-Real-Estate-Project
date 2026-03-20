import React, { useMemo, useState } from "react";
import "./Treding.css";
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaBed,
  FaBath,
  FaCar,
  FaBuilding,
  FaTv,
  FaSnowflake,
  FaTshirt,
  FaCheckCircle,
  FaDumbbell,
  FaSwimmingPool,
  FaBolt,
  FaGlassMartiniAlt,
  FaParking,
  FaSun,
  FaDoorOpen,
  FaVectorSquare,
  FaDownload,
  FaEye,
  FaPlus,
  FaThumbsUp,
  FaThumbsDown,
  FaHeart,
  FaReply,
  FaListAlt,
  FaTag,
  FaStar,
} from "react-icons/fa";
import { MdMicrowave, MdBalcony, MdWaterDrop, MdKitchen } from "react-icons/md";

const Treding = () => {
  const sliderImages = [
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1000&q=80",
  ];

  const [activeImage, setActiveImage] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [descExpanded, setDescExpanded] = useState(false);

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % sliderImages.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const features = [
    { icon: <FaBed />, label: "Bedrooms: 3" },
    { icon: <FaBath />, label: "Bathrooms: 2" },
    { icon: <FaCar />, label: "Parking: 1" },
    { icon: <MdBalcony />, label: "Balcony: Yes" },
    { icon: <FaBuilding />, label: "Floor: 5th of 12" },
    { icon: <FaVectorSquare />, label: "Wardrobe :1" },
    { icon: <FaTv />, label: "TV : 4" },
    { icon: <MdWaterDrop />, label: "Water Purifier : 2" },
    { icon: <MdMicrowave />, label: "Microwave : 2" },
    { icon: <FaSnowflake />, label: "AC : 4" },
    { icon: <FaBuilding />, label: "Fridge : 1" },
    { icon: <FaTshirt />, label: "Curtains : yes" },
  ];

  const aboutPoints = [
    "100 meters from school. 3km away from bypass.",
    "First floor - 2 large bedrooms with attached bathrooms.",
    "Spacious and well-Equipped kitchen.",
    "Inviting living room with balcony.",
    "Terrace with breathtaking views.",
    "Independent electric and water connections.",
  ];

  const amenities = [
    { icon: <FaDumbbell />, label: "Gym" },
    { icon: <FaSwimmingPool />, label: "Swimming Pool" },
    { icon: <FaBolt />, label: "Power Backup" },
    { icon: <FaGlassMartiniAlt />, label: "Clubhouse" },
    { icon: <FaParking />, label: "Visitor Parking" },
    { icon: <FaSun />, label: "Natural Light" },
    { icon: <FaDoorOpen />, label: "Airy Rooms" },
    { icon: <MdKitchen />, label: "Spacious Interior" },
  ];

  const floorPlans = [
    "Balcony Plan",
    "Front Hall",
    "Kitchen",
  ];

  const faqs = [
    {
      q: "Does offer free cancellation for a full refund?",
      a: "Yes, selected bookings support full refund cancellation before the deadline mentioned in the booking terms.",
    },
    {
      q: "Is there a pool?",
      a: "Yes, the property includes access to a swimming pool and leisure area.",
    },
    {
      q: "Are pets allowed?",
      a: "Small pets are allowed depending on property policy and advance approval.",
    },
    {
      q: "Is airport shuttle service offered?",
      a: "Airport shuttle can be arranged on request with additional charges.",
    },
    {
      q: "What are the check-in and check-out times?",
      a: "Check-in starts from 2:00 PM and check-out is until 11:00 AM.",
    },
  ];

  const reviewBars = useMemo(
    () => [
      { label: "5 Star Ratings", value: 247, percent: 94 },
      { label: "4 Star Ratings", value: 145, percent: 68 },
      { label: "3 Star Ratings", value: 600, percent: 56 },
      { label: "2 Star Ratings", value: 560, percent: 45 },
      { label: "1 Star Ratings", value: 400, percent: 24 },
    ],
    []
  );

  return (
    <section className="treding">
      <div className="treding-container">
        {/* top gallery */}
        <div className="treding-top">
          <div className="treding-topBar">
            <div className="treding-badges">
              <span className="treding-badge treding-badgeTrending">
                <FaListAlt /> Trending
              </span>
              <span className="treding-badge treding-badgeFeatured">
                <FaTag /> Featured
              </span>
            </div>

            <div className="treding-visits">Total No of Visits : 45</div>
          </div>

          <div className="treding-heroImageWrap">
            <img
              src={sliderImages[activeImage]}
              alt="property"
              className="treding-heroImage"
            />
          </div>

          <div className="treding-thumbRow">
            <button className="treding-thumbArrow" onClick={prevImage} type="button">
              <FaChevronLeft />
            </button>

            <div className="treding-thumbGrid">
              {sliderImages.slice(0, 6).map((img, index) => (
                <button
                  key={index}
                  className={`treding-thumbItem ${
                    activeImage === index ? "active" : ""
                  }`}
                  onClick={() => setActiveImage(index)}
                  type="button"
                >
                  <img src={img} alt={`thumb-${index}`} />
                </button>
              ))}
            </div>

            <button className="treding-thumbArrow" onClick={nextImage} type="button">
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* description */}
        <div className="treding-box">
          <div className="treding-boxHeader">
            <h2>Description</h2>
            <FaChevronDown />
          </div>
          <div className="treding-boxBody">
            <p className="treding-paragraph">
              This property is mostly wooded and sits high on a hilltop overlooking
              the Mohawk River Valley. Located right in the heart of Upstate NYs
              Amish farm Country, this land is certified organic making it extremely
              rare! Good road frontage on a paved county road with utilities make it
              an amazing setting for your dream country getaway! If you like views,
              you must see this property!
              {descExpanded && (
                <>
                  {" "}
                  This property is mostly wooded and sits high on a hilltop
                  overlooking the Mohawk River Valley. Spacious surroundings,
                  premium interior design, peaceful environment, and elegant
                  lifestyle features make it perfect for luxury living.
                </>
              )}
            </p>

            <button
              className="treding-readMore"
              onClick={() => setDescExpanded(!descExpanded)}
              type="button"
            >
              {descExpanded ? "Read Less" : "Read More"} <FaChevronDown />
            </button>
          </div>
        </div>

        {/* features */}
        <div className="treding-box">
          <div className="treding-boxHeader">
            <h2>Property Features</h2>
            <FaChevronDown />
          </div>
          <div className="treding-boxBody">
            <div className="treding-featureGrid">
              {features.map((item, index) => (
                <div className="treding-featureItem" key={index}>
                  <span className="treding-featureIcon">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* about */}
        <div className="treding-box">
          <div className="treding-boxHeader">
            <h2>About Property</h2>
            <FaChevronDown />
          </div>
          <div className="treding-boxBody">
            <p className="treding-paragraph">
              This property is mostly wooded and sits high on a hilltop overlooking
              the Mohawk River Valley.
            </p>

            <div className="treding-aboutList">
              {aboutPoints.map((item, index) => (
                <div className="treding-aboutItem" key={index}>
                  <span className="treding-aboutCheck">
                    <FaCheckCircle />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* amenities */}
        <div className="treding-box">
          <div className="treding-boxHeader">
            <h2>Amenities</h2>
            <FaChevronDown />
          </div>
          <div className="treding-boxBody">
            <div className="treding-amenityGrid">
              {amenities.map((item, index) => (
                <div className="treding-amenityItem" key={index}>
                  <span className="treding-featureIcon">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* floor plan */}
        <div className="treding-box">
          <div className="treding-boxHeader">
            <h2>Floor Plan</h2>
            <FaChevronDown />
          </div>
          <div className="treding-boxBody">
            <div className="treding-floorList">
              {floorPlans.map((item, index) => (
                <div className="treding-floorItem" key={index}>
                  <span>{item}</span>
                  <div className="treding-floorActions">
                    <button type="button">
                      <FaDownload />
                    </button>
                    <button type="button">
                      <FaEye />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* gallery */}
        <div className="treding-box">
          <div className="treding-boxHeader">
            <h2>Gallery</h2>
            <FaChevronDown />
          </div>
          <div className="treding-boxBody">
            <div className="treding-galleryGrid">
              {galleryImages.map((img, index) => (
                <div className="treding-galleryItem" key={index}>
                  <img src={img} alt={`gallery-${index}`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* faq */}
        <div className="treding-box">
          <div className="treding-boxHeader">
            <h2>Frequently Asked Questions</h2>
            <FaChevronDown />
          </div>
          <div className="treding-boxBody">
            <div className="treding-faqList">
              {faqs.map((item, index) => (
                <div
                  className={`treding-faqItem ${openFaq === index ? "active" : ""}`}
                  key={index}
                >
                  <button
                    className="treding-faqQuestion"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    type="button"
                  >
                    <span>{item.q}</span>
                    <span className="treding-faqPlus">
                      <FaPlus />
                    </span>
                  </button>

                  {openFaq === index && (
                    <div className="treding-faqAnswer">{item.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* reviews */}
        <div className="treding-box">
          <div className="treding-boxHeader">
            <h2>Reviews</h2>
            <FaChevronDown />
          </div>
          <div className="treding-boxBody">
            <div className="treding-reviewTop">
              <h3>Reviews (45)</h3>
              <button className="treding-reviewBtn" type="button">
                <FaReply /> Write a Review
              </button>
            </div>

            <div className="treding-reviewStats">
              <div className="treding-ratingCard">
                <h4>Customer Reviews & Ratings</h4>
                <div className="treding-ratingScore">
                  <strong>4.9</strong>
                  <span>/ 5.0</span>
                </div>
                <div className="treding-ratingStars">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <p>Based On 2,459 Reviews</p>
              </div>

              <div className="treding-ratingBars">
                {reviewBars.map((item, index) => (
                  <div className="treding-barRow" key={index}>
                    <span>{item.label}</span>
                    <div className="treding-barTrack">
                      <div
                        className="treding-barFill"
                        style={{ width: `${item.percent}%` }}
                      ></div>
                    </div>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="treding-commentList">
              <div className="treding-commentCard">
                <div className="treding-commentTop">
                  <div className="treding-commentUser">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                      alt="Joseph Massey"
                    />
                    <div>
                      <h4>Joseph Massey</h4>
                      <div className="treding-commentMeta">
                        <span>2 days ago</span>
                        <span>•</span>
                        <span className="treding-commentStars">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </span>
                        <span>Unforgettable Stay!</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="treding-commentText">
                  This hotel exceeded my expectations! The pool, spa, and dining
                  options were top-notch, and the room had every amenity I could
                  ask for. It felt like a true getaway.
                </p>

                <div className="treding-commentActions">
                  <span>
                    <FaThumbsUp /> 21
                  </span>
                  <span>
                    <FaThumbsDown /> 50
                  </span>
                  <span className="love">
                    <FaHeart /> 45
                  </span>
                </div>
              </div>

              <div className="treding-commentCard">
                <div className="treding-commentTop">
                  <div className="treding-commentUser">
                    <img
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
                      alt="Jeffrey Jones"
                    />
                    <div>
                      <h4>Jeffrey Jones</h4>
                      <div className="treding-commentMeta">
                        <span>2 days ago</span>
                        <span>•</span>
                        <span className="treding-commentStars">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </span>
                        <span>Excellent service!</span>
                      </div>
                    </div>
                  </div>

                  <button className="treding-replyBtn" type="button">
                    <FaReply /> Reply
                  </button>
                </div>

                <p className="treding-commentText">
                  This hotel exceeded my expectations! The pool, spa, and dining
                  options were top-notch, and the room had every amenity I could
                  ask for. It felt like a true getaway.
                </p>

                <div className="treding-commentActions">
                  <span>
                    <FaThumbsUp /> 41
                  </span>
                  <span>
                    <FaThumbsDown /> 70
                  </span>
                  <span className="love">
                    <FaHeart /> 95
                  </span>
                </div>
              </div>

              <div className="treding-commentCard">
                <div className="treding-commentTop">
                  <div className="treding-commentUser">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
                      alt="Jessie Alves"
                    />
                    <div>
                      <h4>Jessie Alves</h4>
                      <div className="treding-commentMeta">
                        <span>2 days ago</span>
                        <span>•</span>
                        <span className="treding-commentStars">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </span>
                        <span>Convenient Location!</span>
                      </div>
                    </div>
                  </div>

                  <button className="treding-replyBtn" type="button">
                    <FaReply /> Reply
                  </button>
                </div>

                <p className="treding-commentText">
                  The location was perfect for exploring the city, and the views
                  from our room were breathtaking. It made our trip so much more
                  enjoyable to stay somewhere central and scenic.
                </p>

                <div className="treding-commentActions">
                  <span>
                    <FaThumbsUp /> 11
                  </span>
                  <span>
                    <FaThumbsDown /> 60
                  </span>
                  <span className="love">
                    <FaHeart /> 35
                  </span>
                </div>

                <div className="treding-commentReplyBox">
                  <div className="treding-commentTop">
                    <div className="treding-commentUser">
                      <img
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                        alt="Adrian Hendriques"
                      />
                      <div>
                        <h4>Adrian Hendriques</h4>
                        <div className="treding-commentMeta">
                          <span>2 days ago</span>
                          <span>•</span>
                          <span className="treding-commentStars">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                          </span>
                          <span>Excellent service!</span>
                        </div>
                      </div>
                    </div>

                    <button className="treding-replyBtn" type="button">
                      <FaReply /> Reply
                    </button>
                  </div>

                  <p className="treding-commentText">
                    Thank you so much for your kind words! We're thrilled to hear
                    that our location and views made your trip even more enjoyable.
                    We hope to welcome you back soon for another scenic stay!
                  </p>

                  <div className="treding-commentActions">
                    <span>
                      <FaThumbsUp /> 10
                    </span>
                    <span>
                      <FaThumbsDown /> 21
                    </span>
                    <span className="love">
                      <FaHeart /> 46
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Treding;