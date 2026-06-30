import { useState, useEffect } from 'react';
import useStore from '../stores/useStore';

export function useGeolocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userLocation, setUserLocation } = useStore();

  const getLocation = () => {
    setLoading(true);
    setError(null);
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLoading(false);
      },
      (err) => {
        setError('Could not get location. Using Miryalaguda center.');
        // Default to Miryalaguda
        setUserLocation({ lat: 17.5558, lng: 80.6198 });
        setLoading(false);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  useEffect(() => { getLocation(); }, []);

  return { userLocation, loading, error, refetch: getLocation };
}
