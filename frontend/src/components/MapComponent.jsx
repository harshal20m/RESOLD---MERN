import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapComponent = ({ coordinates }) => {
	const mapContainerRef = useRef(null);

	useEffect(() => {
		mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

		const map = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: "mapbox://styles/mapbox/streets-v12",
			center: coordinates,
			zoom: 9,
		});

		new mapboxgl.Marker().setLngLat(coordinates).addTo(map);

		return () => map.remove();
	}, [coordinates]);

	return <div id="map" ref={mapContainerRef} style={{ width: "100%", height: "400px" }} />;
};

export default MapComponent;
