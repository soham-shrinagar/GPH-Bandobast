import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;

interface Personnel {
  id: number;
  personnelId: string;
  name: string;
  phoneNumber: string;
  stationName: string;
}

interface Geofence {
  id: number;
  name: string;
  type: string;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [geofences, setGeofences] = useState<Geofence[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login-email");
          return;
        }

        // Get officer info
        const officerRes = await fetch(`${baseUrl}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!officerRes.ok) {
          console.error("Failed to fetch officer");
          navigate("/login-email");
          return;
        }

        const officer = await officerRes.json();

        // Get personnel by officer's station
        const personnelRes = await fetch(
          `${baseUrl}/api/personnel?stationName=${officer.stationName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const personnelData = await personnelRes.json();

        // Get geofences for this officer
        const geofenceRes = await fetch(
          `${baseUrl}/api/geofences?officerId=${officer.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const geofenceData = await geofenceRes.json();

        setPersonnel(personnelData);
        setGeofences(geofenceData);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login-email", { replace: true });
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50 flex flex-col">
      {/* Header */}
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
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 p-6 gap-6">
        {/* Left Section */}
        <div className="flex-1 space-y-6">
          {/* Personnel Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="bg-green-600 text-white px-4 py-2 font-semibold">
              Station Personnel
            </div>
            <table className="w-full text-left border-collapse">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-4 py-2">Select</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">Station</th>
                </tr>
              </thead>
              <tbody>
                {personnel.length > 0 ? (
                  personnel.map((p) => (
                    <tr key={p.id} className="border-b hover:bg-green-50">
                      <td className="px-4 py-2">
                        <input type="checkbox" />
                      </td>
                      <td className="px-4 py-2">{p.name}</td>
                      <td className="px-4 py-2">{p.phoneNumber}</td>
                      <td className="px-4 py-2">{p.stationName}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-3 text-center text-gray-500">
                      No personnel found for this station
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Geofence Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="bg-yellow-500 text-white px-4 py-2 font-semibold">
              Assigned Geofences
            </div>
            <table className="w-full text-left border-collapse">
              <thead className="bg-yellow-100">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Select</th>
                </tr>
              </thead>
              <tbody>
                {geofences.length > 0 ? (
                  geofences.map((g) => (
                    <tr key={g.id} className="border-b hover:bg-yellow-50">
                      <td className="px-4 py-2">{g.name}</td>
                      <td className="px-4 py-2">{g.type}</td>
                      <td className="px-4 py-2">
                        <input type="radio" name="geofenceSelect" />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-4 py-3 text-center text-gray-500">
                      No geofences assigned
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 shadow">
              Upload File
            </button>
            <button
              onClick={() => navigate("/pan-goa-deployment")}
              className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 shadow"
            >
              Pan Goa Deployment
            </button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 shadow">
              Deploy
            </button>
          </div>
        </div>

        {/* Map Placeholder */}
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
}
