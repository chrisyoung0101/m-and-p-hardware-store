import './App.css';
import InventorySearch from './components/InventorySearch';
import SalesSearch from './components/SalesSearch';
import CombinedSearch from './components/CombinedSearch';

function App() {
  return (
    <>
      <div className="App">
        <h1>M & P Hardware Store</h1>
      </div>

      <InventorySearch />
      <SalesSearch />
      <CombinedSearch />
    </>
  );
}

export default App;
