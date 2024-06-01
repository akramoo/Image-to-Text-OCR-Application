import React from 'react';

const LanguageSelector = ({ language, setLanguage }) => (
  <div className="mb-4">
    <label htmlFor="language" className="block mb-2">Select Language:</label>
    <select
      id="language"
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="form-select"
    >
      <option value="eng">English</option>
      <option value="spa">Spanish</option>
      <option value="fra">French</option>
      <option value="deu">German</option>
      {/* Add more languages as needed */}
    </select>
  </div>
);

export default LanguageSelector;
