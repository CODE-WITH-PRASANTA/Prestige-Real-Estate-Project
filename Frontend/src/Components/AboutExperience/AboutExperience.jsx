import React from "react";
import "./AboutExperience.css";
import person from "../../assets/Main-1.webp"; // 🔁 replace with your image

const AboutExperience = () => {
  return (
    <section className="AboutExperience">

      <div className="AboutExperience-container">

        {/* LEFT IMAGE */}
        <div className="AboutExperience-left">
          <img src={person} alt="agent" />
        </div>

        {/* RIGHT CONTENT */}
        <div className="AboutExperience-right">

          {/* ITEM 1 */}
          <div className="AboutExperience-item">
            <div className="AboutExperience-number">1</div>
            <div className="AboutExperience-text">
              <h3>Over 25 Years of Experience</h3>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
              </p>
            </div>
          </div>

          {/* ITEM 2 */}
          <div className="AboutExperience-item">
            <div className="AboutExperience-number">2</div>
            <div className="AboutExperience-text">
              <h3>Leaders in Sell and Rent Houses</h3>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
              </p>
            </div>
          </div>

          {/* ITEM 3 */}
          <div className="AboutExperience-item">
            <div className="AboutExperience-number">3</div>
            <div className="AboutExperience-text">
              <h3>Want a House or Sell one</h3>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
              </p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};

export default AboutExperience;