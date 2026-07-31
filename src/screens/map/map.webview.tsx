import { WebView } from "react-native-webview";

export const createMapHtml = (latitude: number, longitude: number) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Map Circle</title>

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
      #map {
        border: 5px solid black;
        border-radius: 50%;
      }
    </style>
  </head>

  <body>
    <div id="map">
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

    <script>
      const map = L.map('map').setView(
        [${latitude}, ${longitude}],
        17
      );

      L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 20
        }
      ).addTo(map);

      L.marker(
        [${latitude}, ${longitude}]
      ).addTo(map);
    </script>
    </div>
  </body>
</html>
`;

export const MapWebView = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
  return (
    <WebView
      webviewDebuggingEnabled
      style={{ height: 300, width: 300, backgroundColor: "grey" }}
      originWhitelist={["*"]}
      testID="map-webview"
      accessibilityLabel="map-webview"
      userAgent="MapCircle"
      source={{
        html: createMapHtml(latitude, longitude) as any,
      }}
    />
  );
};
