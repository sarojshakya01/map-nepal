// const map = L.map('map').setView([37.8, -96], 4);
const baseAPIURL = "https://result.election.gov.np/JSONFiles/JSONMap/geojson/LL/DCODE_1"
const MapOptions = {
  center: [28.3, 84.4],
  zoom: L.Browser.mobile ? 6 : 7,
  minZoom: L.Browser.mobile ? 6 : 7,
  maxZoom: 10,
  snapZoom: 0.25,
  doubleClickZoom: false,
  inertia: true,
  inertiaDeceleration: 500,
  scrollWheelZoom: true,

  attributionControl: false,
};

const map = L.map("map", MapOptions);

const defaultStyle = {
  color: "black",
  weight: 1,
  opacity: 1,
  fill: true,
  fillColor: "green",
  fillOpacity: 1,
  fillRule: "evenodd",
};

const zoominfo = {
  level1Zoom: false,
  level2Zoom: false,
};
const drawmaps = (d) => {};
fetch("data/states_data.json")
  .then((response) => response.json())
  .then((data) => {
    const polylines = [];
    data.features.forEach((d) => {
      const latLngs = L.GeoJSON.coordsToLatLngs(d.geometry.coordinates, 2);
      const polyline = L.polyline(latLngs, defaultStyle);
      polylines.push(polyline);
      polyline.addTo(map);

      polyline.on("mouseover", (e) => {
        polylines.forEach((pline) => {
          pline.setStyle(defaultStyle);
        });
        const layer = e.target;
        layer.setStyle({
          weight: 2,
          fillColor: "gray",
        });
      });
      polyline.on("mouseout", (e) => {
        polylines.forEach((pline) => {
          pline.setStyle(defaultStyle);
        });
      });
      polyline.on("click", (e) => {
        fetch("data/state" + d.properties.STATE_C + "_data.json")
          .then((response) => response.json())
          .then((data) => {
            data.features.forEach((d) => {
                const latLngs = L.GeoJSON.coordsToLatLngs(
                  d.geometry.coordinates,
                  2
                );
              if (!zoominfo.level1Zoom) {
                map.setZoomAround(latLngs[0][0][0], map._zoom + 1);
              } else {
                map.setZoomAround(latLngs[0][0][0], map._zoom);
              }
              zoominfo.level1Zoom = true;
              const polyline = L.polyline(latLngs, defaultStyle);
              polylines.push(polyline);
              polyline.addTo(map);

              polyline.on("mouseover", (e) => {
                polylines.forEach((pline) => {
                  pline.setStyle(defaultStyle);
                });
                const layer = e.target;
                layer.setStyle({
                  weight: 2,
                  fillColor: "gray",
                });
              });
              polyline.on("mouseout", (e) => {
                polylines.forEach((pline) => {
                  pline.setStyle(defaultStyle);
                });
              });
              polyline.on("click", (e) => {
                fetch("data/state" + d.code + "_data.json")
                  .then((response) => response.json())
                  .then((data) => {
                    data.features.forEach((d) => {
                      const latLngs = L.GeoJSON.coordsToLatLngs(
                        d.geometry.coordinates,
                        2
                      );
                      if (!zoominfo.level2Zoom) {
                        map.setZoomAround(latLngs[0][0][0], map._zoom + 1);
                      } else {
                        map.setZoomAround(latLngs[0][0][0], map._zoom);
                      }
                      zoominfo.level2Zoom = true;
                      const polyline = L.polyline(latLngs, defaultStyle);
                      polylines.push(polyline);
                      polyline.addTo(map);

                      polyline.on("mouseover", (e) => {
                        polylines.forEach((pline) => {
                          pline.setStyle(defaultStyle);
                        });
                        const layer = e.target;
                        layer.setStyle({
                          weight: 2,
                          fillColor: "gray",
                        });
                      });
                      polyline.on("mouseout", (e) => {
                        polylines.forEach((pline) => {
                          pline.setStyle(defaultStyle);
                        });
                      });
                      polyline.on("click", (e) => {
                        fetch("data/state" + d.code + "_data.json")
                          .then((response) => response.json())
                          .then((data) => {});
                      });
                    });
                  });
              });
            });
          });
      });
    });
  })
  .catch((err) => {
    console.error(err);
  });
