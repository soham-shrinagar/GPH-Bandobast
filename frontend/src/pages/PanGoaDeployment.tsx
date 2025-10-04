import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = (import.meta.env.VITE_BASE_URL as string) || ""; 

const policeStations = [
  "Verna Police Station",
  "Anjuna Police Station",
  "Calangute Police Station",
  "Mapusa Police Station",
  "Cuncolim Police Station",
  "Old Goa Police Station",
  "Margao Town Police Station",
  "Bicholim Police Station",
  "Colva Police Station",
  "Vasco Police Station",
  "Porvorim Police Station",
];

interface Personnel {
  id: number;
  personnelId: string;
  name: string;
  phoneNumber: string;
  stationName: string;
}

const PanGoaDeployment: React.FC = () => {
  const [selectedStations, setSelectedStations] = useState<string[]>([]);
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setSelectedStations(selected);
  };

  const fetchPersonnel = async () => {
    if (selectedStations.length === 0) {
      alert("Please select at least one police station.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/api/personnel`, {
        params: { stationName: selectedStations.join(",") },
      });

      const data = res.data;

      if (Array.isArray(data)) {
        setPersonnel(data);
      } else {
        console.warn("Unexpected /api/personnel response:", data);
        setPersonnel([]);
      }
    } catch (err) {
      console.error("Error fetching personnel:", err);
      setPersonnel([]);
      alert("Failed to fetch personnel. Check server console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-yellow-50">
      {/* Header (same as dashboard) */}
      <div className="bg-green-700 text-white py-4 px-6 shadow-md flex justify-between items-center rounded-b-lg">
        <h1 className="text-xl font-bold">Personnel Deployment Tool</h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/notification")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md shadow"
          >
            Message
          </button>
          <button
            onClick={() => {
                navigate("/main")
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow"
          >
            Home
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 p-6 gap-6">
        {/* Left Column */}
        <div className="flex-1 space-y-6">
          {/* Top Card: Selection */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6">
            <div className="bg-white">
              <h2 className="text-lg font-semibold mb-2">Pan Goa Deployment</h2>
              <p className="text-sm text-gray-600 mb-4">
                Select one or more police stations and click Go to list personnel.
                To select multiple (ctrl + select)
              </p>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Police Stations
              </label>
              <select
                multiple
                value={selectedStations}
                onChange={handleSelectChange}
                className="w-full h-48 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {policeStations.map((station) => (
                  <option key={station} value={station}>
                    {station}
                  </option>
                ))}
              </select>

              <div className="pt-4">
                <button
                  onClick={fetchPersonnel}
                  disabled={loading}
                  className={`py-2 px-4 rounded-md text-white font-medium ${
                    loading
                      ? "bg-green-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  } focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition-colors`}
                >
                  {loading ? "Loading..." : "Go"}
                </button>
              </div>
            </div>
          </div>

          {/* Personnel List (card identical style) */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="bg-green-600 text-white px-4 py-2 font-semibold">
              Station Personnel
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-green-100">
                    <tr>
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">Personnel ID</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Phone</th>
                      <th className="px-4 py-2">Station</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(personnel) && personnel.length > 0 ? (
                      personnel.map((p) => (
                        <tr key={p.id} className="border-b hover:bg-green-50">
                          <td className="px-4 py-2">{p.id}</td>
                          <td className="px-4 py-2">{p.personnelId}</td>
                          <td className="px-4 py-2">{p.name}</td>
                          <td className="px-4 py-2">{p.phoneNumber}</td>
                          <td className="px-4 py-2">{p.stationName}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                          No personnel found for the selected stations
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Action Buttons (same visual positions as dashboard) */}
          <div className="flex gap-4">
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 shadow">
              Upload File
            </button>
            <button className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 shadow">
              Pan Goa Deployment
            </button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 shadow">
              Deploy
            </button>
          </div>
        </div>

        {/* Right Map Placeholder (same shape as dashboard) */}
        <div className="w-1/2 bg-white border border-gray-200 rounded-lg shadow-md flex items-center justify-center text-gray-500 font-semibold text-lg">
          Map
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white text-center py-3 border-t text-gray-600 text-sm">
        Government of Goa • Police Department
      </div>
    </div>
  );
};

export default PanGoaDeployment;
