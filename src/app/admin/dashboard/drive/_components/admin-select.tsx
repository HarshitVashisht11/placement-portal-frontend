import { useState } from "react";

const AdminSelection = ({ attributes } : any) => {
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  const toggleAttribute = (attribute: any) => {
    setSelectedAttributes((prev: any) =>
      prev.includes(attribute)
        ? prev.filter((attr: any) => attr !== attribute)
        : [...prev, attribute]
    );
  };

  const handleDownload = async () => {
    const response = await fetch("/api/download-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attributes: selectedAttributes }),
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "student_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  if(attributes.length == 0) {
    return null;
  }

  return (
    <div>
      {attributes.map((attr: any) => (
        <div key={attr.key}>
          <input
            type="checkbox"
            onChange={() => toggleAttribute(attr.label)}
            // checked={selectedAttributes.includes(attr.label)}
          />
          <label>{attr.label}</label>
        </div>
      ))}
      <button onClick={handleDownload}>Download Data</button>
    </div>
  );
};


export default AdminSelection;
