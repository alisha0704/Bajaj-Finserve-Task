import { useState } from 'react';
import JsonForm from '../components/Jsonform';
import MultiSelectDropdown from '../components/Multiselectdropdown';

interface Option {
  value: string;
  label: string;
}

const Home = () => {
  const [response, setResponse] = useState<any>(null);
  const [filteredResponse, setFilteredResponse] = useState<any>(null);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const handleJsonSubmit = async (json: any) => {
    try {
      const res = await fetch('/api/your-endpoint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json),
      });

      const data = await res.json();
      setResponse(data);
      setDropdownVisible(true);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleDropdownChange = (selectedOptions: Option[]) => {
    if (!response) return;

    const selectedValues = selectedOptions.map(option => option.value);
    let filteredData = { ...response };

    if (!selectedValues.includes('alphabets')) {
      delete filteredData.alphabets;
    }

    if (!selectedValues.includes('numbers')) {
      delete filteredData.numbers;
    }

    if (!selectedValues.includes('highestLowercaseAlphabet')) {
      delete filteredData.highestLowercaseAlphabet;
    }

    setFilteredResponse(filteredData);
  };

  return (
    <> 
     <div className="flex justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Bajaj Task</h1>
    </div>
    <div>
      <h1>JSON Input and Multi-Select Example</h1>
      <JsonForm onSubmit={handleJsonSubmit} />
      {dropdownVisible && (
        <MultiSelectDropdown onChange={handleDropdownChange} />
      )}
      {filteredResponse && (
        <div>
          <h2>Filtered Response:</h2>
          <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
        </div>
      )}
    </div>
    </>
  );
};

export default Home;
