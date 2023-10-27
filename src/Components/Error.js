function Error({ status }) {
  return (
    <div className="loader-container">
      <p>{status}</p>
      <div className="pulsing-4"></div>
    </div>
  );
}

export default Error;
