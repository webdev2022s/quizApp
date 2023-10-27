function Header({ logo }) {
  return (
    <header className="app-header">
      <img src={logo} alt="logo" className="App-logo" />
      <h1>React Quiz</h1>
    </header>
  );
}

export default Header;
