import prisma from "../db/dbclient.js"; // adjust path to your Prisma client
export async function getOfficerInfo(req, res) {
    try {
        const officer = await prisma.officer.findUnique({
            where: { id: req.userId },
            select: {
                id: true,
                officerId: true,
                name: true,
                email: true,
                phoneNumber: true,
                stationName: true,
            },
        });
        if (!officer)
            return res.status(404).json({ message: "Officer not found" });
        res.json(officer);
    }
    catch (err) {
        console.error("Error fetching officer:", err);
        res.status(500).json({ message: "Server error" });
    }
}
export async function getPersonnel(req, res) {
    try {
        const { stationName } = req.query;
        if (!stationName) {
            return res.status(400).json({ message: "stationName is required" });
        }
        let stations = [];
        if (Array.isArray(stationName)) {
            // e.g. ?stationName=A&stationName=B
            stations = stationName.flatMap((s) => String(s).split(",").map((x) => x.trim()));
        }
        else {
            stations = String(stationName)
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);
        }
        if (stations.length === 0) {
            return res.json([]);
        }
        const personnel = await prisma.personnel.findMany({
            where: {
                stationName: { in: stations },
            },
            select: {
                id: true,
                personnelId: true,
                name: true,
                phoneNumber: true,
                stationName: true,
            },
        });
        return res.json(personnel ?? []);
    }
    catch (err) {
        console.error("Error fetching personnel:", err);
        return res.status(500).json({ message: "Server error" });
    }
}
export async function getGeofences(req, res) {
    try {
        const { officerId } = req.query;
        if (!officerId)
            return res.status(400).json({ message: "officerId is required" });
        const idNum = Number(officerId);
        if (Number.isNaN(idNum))
            return res.status(400).json({ message: "officerId must be a number" });
        const geofences = await prisma.geofence.findMany({
            where: { officerId: idNum },
            select: {
                id: true,
                name: true,
                type: true,
                center_lat: true,
                center_long: true,
                radius: true,
                polygon: true,
            },
        });
        res.json(geofences ?? []);
    }
    catch (err) {
        console.error("Error fetching geofences:", err);
        res.status(500).json({ message: "Server error" });
    }
}
//# sourceMappingURL=serviceControl.js.map