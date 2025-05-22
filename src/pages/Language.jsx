import React, { useEffect, useState } from "react";

export default function Language() {
  const [languages, setLanguages] = useState([]);
  const [languageName, setLanguageName] = useState("");
  const [languageLevel, setLanguageLevel] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/language");
    const data = await response.json();
    console.log(data);
    setLanguages(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/language", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        languageName,
        languageLevel,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      fetchData();
    }
    setLanguageName("");
    setLanguageLevel("");
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3000/language/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      fetchData();
    }
  };

  const handleEdit = async (id) => {
    const response = await fetch(`http://localhost:3000/language/${id}`);
    const data = await response.json();
    console.log(data);
    setIsAdded(true);
    setLanguageName(data.languageName);
    setLanguageLevel(data.languageLevel);

    const validateEdit = async () => {
      const responseForm = await fetch(`http://localhost:3000/language/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          languageName,
          languageLevel,
        }),
      });
      if (responseForm.ok) {
        const data = await response.json();
        console.log(data);
      }
      fetchData();
      setIsAdded(false);
    };
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Langue</h1>
        <button className="btn btn-primary" onClick={setIsAdded}>
          +
        </button>
      </div>
      <table className="table table-zebra">
        <tbody>
          <tr>
            <th>Langue</th>
            <th>Level</th>
            <th>Action</th>
          </tr>
          {languages.map((language) => (
            <tr key={language._id}>
              <td>{language.languageName}</td>
              <td>{language.languageLevel}</td>
              <td className="flex gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(language._id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => handleDelete(language._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isAdded && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            value={languageName}
            onChange={(e) => setLanguageName(e.target.value)}
            required
            placeholder="Language name"
            className="input input-bordered w-full max-w-xs"
          />
          <select
            value={languageLevel}
            onChange={(e) => setLanguageLevel(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option defaultValue value="Select a level" hidden>
              Select a level
            </option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <button className="btn btn-primary w-fit">Add</button>
          <button className="btn btn-primary w-fit">Edit</button>
        </form>
      )}
    </div>
  );
}
