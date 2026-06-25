import { WebView } from "react-native-webview";

export const createMapHtml = (latitude: number, longitude: number) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />

    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    />

    <style>
      html, body, #map {
        width: 100%;
        height: 100%;
        margin: 0;
      }
    </style>
  </head>

  <body>
    <div id="map"></div>

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

    <script>
      const map = L.map('map').setView(
        [${latitude}, ${longitude}],
        15
      );

      L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 19
        }
      ).addTo(map);

      L.marker(
        [${latitude}, ${longitude}]
      ).addTo(map);
    </script>

  </body>
</html>
`;

export const MapWebView = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
  return (
    <WebView
      style={{ flex: 1, backgroundColor: "grey" }}
      originWhitelist={["*"]}
      source={{
        html: createMapHtml(latitude, longitude) as any,
      }}
    />
  );
};
