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
    <form onSubmit={handleSubmit}>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter valid JSON"
        rows={6}
        cols={50}
      />
      <button type="submit">Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default JsonForm;
