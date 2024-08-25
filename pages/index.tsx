import { useEffect, useState } from "react";
import JsonForm from "../components/Jsonform";
import MultiSelectDropdown from "../components/Multiselectdropdown";
import { ApiResponse } from "@/lib/types";

interface Option {
  value: string;
  label: string;
}

const Home = () => {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [filteredResponse, setFilteredResponse] = useState<any>(null);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const handleJsonSubmit = async (json: any) => {
    try {
      const res = await fetch("/api/bfhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json),
      });

      const data = await res.json() as ApiResponse;
      setResponse(data);
      
      const filteredOptions = filterOptionsByApiResponse(selectedOptions, data)
      setFilteredResponse(filteredOptions);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  function filterOptionsByApiResponse(options: Option[], apiResponse: ApiResponse): Record<string, string> {
    // Convert ApiResponse keys to a Set for faster lookups
    console.log(apiResponse, options)
    const apiResponseKeys = new Set(Object.keys(apiResponse));
  
    // Filter options based on whether the label exists as a key in the ApiResponse
    const filteredOptions = options.reduce<Record<string, string>>((acc, option) => {
      if (apiResponseKeys.has(option.value)) {
        acc[option.value] = apiResponse[option.value as keyof ApiResponse] as string;
      }
      return acc;
    }, {});
  
    return filteredOptions;
  }

  useEffect(() => {
    if (!selectedOptions.length || !response) {
      return;
    }
    setFilteredResponse(filterOptionsByApiResponse(selectedOptions, response));

  }, [selectedOptions]);

  const handleDropdownChange = (selectedOptions: Option[]) => {
    setSelectedOptions(selectedOptions);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Bajaj Task</h1>
      <div className="w-full max-w-xl flex flex-col gap-4">
        <div className="mb-6 text-xl font-bold text-gray-800 bg-gray-100 p-4 rounded-lg shadow-md border border-gray-200">
          JSON Input and Multi-Select Example
        </div>
        <div className="mt-4">
          <MultiSelectDropdown onChange={handleDropdownChange} />
        </div>

        <JsonForm onSubmit={handleJsonSubmit} />
        {filteredResponse && (
          <div className="mt-6 bg-white p-4 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Filtered Response:</h2>
            <pre className="bg-gray-200 p-2 rounded">
              <RenderJson data={filteredResponse} />
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

const RenderJson = ({ data }: any) => {
  return (
    <div>
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          {Array.isArray(value) ? (
            <span>
              {key}: {value.join(', ')}
            </span>
          ) : (
            <span>
              {key}: {(value as any).toString()}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
