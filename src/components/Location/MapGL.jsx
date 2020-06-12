import React, { useEffect, useRef, useState, useContext } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { CoordenadasContext } from '../../context/location-context'

const styles = {
  width: "80vw",
  height: "calc(100vh - 80px)",
  margin: "20px 0 0 0"
};

const MapboxGLMap = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const [coord, setCoordenadas] = useContext(CoordenadasContext)
  const [zoom] = useState(12)

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZXplY2FycmFzY29zYSIsImEiOiJja2FoNnFkZmYwZ3N5MnBvMXNtdGx6c3QyIn0.xR9FIATQVNcdykGIGpITsA';
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [coord.lat, coord.lng],
        zoom: zoom
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
      });

      map.on('click', () => { 
          setCoordenadas({lat:map.getCenter().lat.toFixed(4), lng: map.getCenter().lng.toFixed(4), })
     });  
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map, coord, setCoordenadas, zoom]);

  return <div ref={el => (mapContainer.current = el)} style={styles} />;
};

export default MapboxGLMap;