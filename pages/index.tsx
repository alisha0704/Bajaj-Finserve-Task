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
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Bajaj Task</h1>
      <div className="w-full max-w-xl">
      <div className="mb-6 text-xl font-bold text-gray-800 bg-gray-100 p-4 rounded-lg shadow-md border border-gray-200">
      JSON Input and Multi-Select Example
      </div>

        <JsonForm onSubmit={handleJsonSubmit} />
        {dropdownVisible && (
          <div className="mt-4">
            <MultiSelectDropdown onChange={handleDropdownChange} />
          </div>
        )}
        {filteredResponse && (
          <div className="mt-6 bg-white p-4 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Filtered Response:</h2>
            <pre className="bg-gray-200 p-2 rounded">{JSON.stringify(filteredResponse, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
