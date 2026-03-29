import "../styles/components/Loader.css";

function Loader() {
  return (
    <div className="loader-container" role="status" aria-live="polite">
      <div className="loader"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
}

export default Loader;