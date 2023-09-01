import AutoGrid from "./components/AutoGrid";

function App() {
  const appStyles = {
    backgroundColor: "lightblue",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    width: '900px',
    margin:'auto'
  };
  return (
    <>
    <div style={appStyles}>
      <AutoGrid></AutoGrid>
      </div>
    </>
  );
}

export default App;
