import "./Stats.css";

export default function Stats() {
  const data = [
    { id: 1, num: "50K", text: "Listings Added", icon: "📋" },
    { id: 2, num: "3000+", text: "Agents Listed", icon: "👥" },
    { id: 3, num: "2000+", text: "Sales Completed", icon: "📈" },
    { id: 4, num: "5000+", text: "Users", icon: "⭐" }
  ];

  return (
    <section className="stats">
      <div className="stats-container">
        {data.map((item) => (
          <div className="stats-card" key={item.id}>
            <div className="stats-icon">{item.icon}</div>
            <div>
              <h2>{item.num}</h2>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}