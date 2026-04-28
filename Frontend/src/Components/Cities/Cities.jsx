import { useMemo, useRef, useState, useEffect } from "react";
import API, { IMG_URL } from "../../api/axios";
import "./Cities.css";

export default function Cities() {
  const sectionRef = useRef(null);

  const [cities, setCities] = useState([]);
  const [perPage, setPerPage] = useState(6);
  const [page, setPage] = useState(0);

  /* ================= FETCH FROM BACKEND ================= */
  const fetchCities = async () => {
    try {
      const res = await API.get("/gallery?page=1");

      const formatted = res.data.data.map((item) => ({
        id: item._id,
        name: item.cityName,
        count: `${item.properties} Properties`,
        img: `${IMG_URL}${item.image}`,
      }));

      setCities(formatted);
    } catch (err) {
      console.error("Cities Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  /* ================= RESPONSIVE ================= */
  const getPerPage = () => {
    const w = window.innerWidth;
    if (w <= 768) return 1;
    if (w <= 1024) return 3;
    return 6;
  };

  useEffect(() => {
    setPerPage(getPerPage());

    const resize = () => {
      setPerPage(getPerPage());
      setPage(0);
    };

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ================= PAGINATION ================= */
  const pages = useMemo(() => {
    const arr = [];
    for (let i = 0; i < cities.length; i += perPage) {
      arr.push(cities.slice(i, i + perPage));
    }
    return arr;
  }, [cities, perPage]);

  /* 🔥 Prevent invalid page after resize/data change */
  useEffect(() => {
    if (page >= pages.length) {
      setPage(0);
    }
  }, [pages.length]);

  const prev = () => {
    if (page > 0) setPage(page - 1);
  };

  const next = () => {
    if (page < pages.length - 1) setPage(page + 1);
  };

  /* ================= LOADING ================= */
  if (!cities.length) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  return (
    <section className="cities" ref={sectionRef}>
      <h2>Cities With Listing</h2>
      <p className="sub">Destinations we love the most</p>

      <div className="cities-slider">
        <button className="nav left" onClick={prev}>
          ‹
        </button>

        <div
          className="track"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {pages.map((group, i) => (
            <div className="page" key={i}>
              {group.map((city) => (
                <div className="city-card" key={city.id}>
                  <img src={city.img} alt={city.name} />

                  <div className="city-overlay"></div>

                  <div className="city-text">
                    <span className="city-tag">Top City</span>
                    <h3>{city.name}</h3>
                    <p>{city.count}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <button className="nav right" onClick={next}>
          ›
        </button>
      </div>

      {/* PAGINATION */}
      <div className="cities-pagination">
        <button onClick={prev} disabled={page === 0}>
          ‹
        </button>

        {pages.map((_, i) => (
          <button
            key={i}
            className={page === i ? "active" : ""}
            onClick={() => setPage(i)}
          >
            {i + 1}
          </button>
        ))}

        <button onClick={next} disabled={page === pages.length - 1}>
          ›
        </button>
      </div>
    </section>
  );
}