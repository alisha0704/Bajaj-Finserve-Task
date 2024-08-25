import React, { useState } from 'react';

interface JsonFormProps {
  onSubmit: (json: any) => void;
}

const JsonForm: React.FC<JsonFormProps> = ({ onSubmit }) => {
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const json = JSON.parse(input);
      setError(null); // Clear error if input is valid
      onSubmit(json);
    } catch (err) {
      setError('Invalid JSON format.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter valid JSON"
        rows={6}
        className="w-full max-w-xl p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-400"
      >
        Submit
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default JsonForm;

