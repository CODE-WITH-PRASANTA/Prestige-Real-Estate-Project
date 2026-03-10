import { useEffect, useMemo, useRef, useState } from "react";
import "./PropertyType.css";

import office from "../../assets/icons/office.png";
import villa from "../../assets/icons/villa.png";
import apartment from "../../assets/icons/apartment.png";
import house from "../../assets/icons/house.png";

export default function PropertyType() {

  const trackRef = useRef(null);
  const autoRef = useRef(null);

  const [activeIndex,setActiveIndex] = useState(0);

  const items = useMemo(() => [
    { id:1,title:"Offices",count:"45 Properties",icon:office },
    { id:2,title:"Villas",count:"28 Properties",icon:villa },
    { id:3,title:"Apartment",count:"35 Properties",icon:apartment },
    { id:4,title:"Houses",count:"30 Properties",icon:house },
    { id:5,title:"Offices",count:"52 Properties",icon:office },
    { id:6,title:"Villas",count:"19 Properties",icon:villa },
    { id:7,title:"Apartment",count:"41 Properties",icon:apartment },
    { id:8,title:"Houses",count:"26 Properties",icon:house }
  ],[]);

  const slide = (dir) => {

    const track = trackRef.current;
    const card = track.querySelector(".ptS-card");

    const gap = 16;
    const cardW = card.getBoundingClientRect().width + gap;

    track.scrollBy({
      left: dir * cardW,
      behavior:"smooth"
    });

  };

  // detect active slide
  useEffect(()=>{

    const track = trackRef.current;

    const handleScroll = () => {

      const card = track.querySelector(".ptS-card");
      const gap = 16;

      const cardW = card.getBoundingClientRect().width + gap;

      const index = Math.round(track.scrollLeft / cardW);

      setActiveIndex(index);

    };

    track.addEventListener("scroll",handleScroll);

    return ()=> track.removeEventListener("scroll",handleScroll);

  },[]);


  return (
    <section className="ptS">

      <div className="ptS-wrap">

        <div className="ptS-left">

          <h2>
            Explore by <br/> Property Type
          </h2>

          <p>
            Whether you're looking for a cozy apartment,
            luxurious villa, or commercial investment.
          </p>

          <div className="ptS-arrows">
            <button onClick={()=>slide(-1)}>←</button>
            <button onClick={()=>slide(1)}>→</button>
          </div>

        </div>

        <div className="ptS-right">

          <div className="ptS-track" ref={trackRef}>

            {items.map((it)=>(
              <div className="ptS-card" key={it.id}>

                <div className="ptS-icon">
                  <img src={it.icon} alt={it.title}/>
                </div>

                <div className="ptS-meta">
                  <h3>{it.title}</h3>
                  <span>{it.count}</span>
                </div>

              </div>
            ))}

          </div>

          {/* Pagination Dots */}
          <div className="ptS-dots">

            {items.map((_,i)=>(
              <span
                key={i}
                className={activeIndex === i ? "active" : ""}
              />
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}