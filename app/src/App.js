import {useState} from 'react';
import './App.css';
import Chart from './components/LineChart/Chart';
import config from './config';

function App() {
  const [data, setData] = useState([]);
  const [type, setType] = useState('');
  const [value, setValue] = useState('xcnRate');
  const [symbol, setSymbol] = useState('ousdc');
  const [startTimestamp, setStartTimestamp] = useState('2023-08-01T00:00:00');
  const [endTimestamp, setEndTimestamp] = useState('2023-09-01T00:00:00');
  const [valueType, setValueType] = useState('value');

  async function fetchData() {
    try {
      const result = await fetch(
        `http://${config.apiHost}:${config.apiPort}/api/timeseries/${type}?${new URLSearchParams({
          value,
          valueType,
          startTimestamp,
          endTimestamp,
          symbol,
        })}`,
        {
          mode: 'cors',
        }
      );

      const a = await result.json();

      setData(a.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <Chart data={data}/>
      <div>
        <button onClick={fetchData}>Update chart</button>
        <form>
          <select value={valueType} onChange={(e) => setValueType(e.target.value)}>
            <option value="value">Value</option>
            <option value="percent">Percent</option>
          </select>
        </form>
        <form>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Default</option>
            <option value="markets">Markets</option>
            <option value="marketVolumeLog">MarketVolumeLog</option>
          </select>
        </form>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
        <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)}/>
        <input type="text" value={startTimestamp} onChange={(e) => setStartTimestamp(e.target.value)}/>
        <input type="text" value={endTimestamp} onChange={(e) => setEndTimestamp(e.target.value)}/>
      </div>
    </div>
  );
}

export default App;
