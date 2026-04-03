import { useEffect, useState } from "react";
import { getTechnicians } from "./technicianService";

export const useTechnicians = () => {
  const [TECHNICIANS, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTechnicians();
        setTechnicians(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { TECHNICIANS, loading };
};
