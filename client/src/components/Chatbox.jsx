import "../styles/components/ChartBox.css";

function ChartBox() {
  const data = [40, 70, 50, 90, 60, 80];

  return (
    <div className="chart-box">

      <div className="chart-header">
        <h4>Revenue</h4>
        <h2>₹25,000</h2>
      </div>

      <div className="chart-bars">
        {data.map((value, index) => (
          <div key={index} className="bar-wrapper">
            <div
              className="bar"
              style={{ height: `${value}%` }}
            ></div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default ChartBox;