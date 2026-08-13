import { WebView } from "react-native-webview";
import { webEvents } from "./map.constants";
import { ActivityMessage } from "./map";

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

      window.addEventListener("message", (event) => {
        const message = JSON.parse(event.data);

        console.log("[webview] received", JSON.stringify(message));
      });

      const webEvents = ${JSON.stringify(webEvents)};
      const throttledWebEvents = ["pointermove", "wheel", "scroll"];
      const lastSent = {};

      const notifyNative = (eventType) => {
        if (throttledWebEvents.includes(eventType)) {
          const now = Date.now();

          if (now - (lastSent[eventType] || 0) < 100) {
            return;
          }

          lastSent[eventType] = now;
        }

        const message = {
          type: "USER_ACTIVITY",
          source: "webview",
          event: eventType,
        };

        console.log("[webview] detected", JSON.stringify(message));
        window.ReactNativeWebView.postMessage(JSON.stringify(message));
      };

      for (const eventType of webEvents) {
        window.addEventListener(
          eventType,
          () => notifyNative(eventType)
        );
      }

    </script>
    </div>
  </body>
</html>
`;

export const MapWebView = ({
  latitude,
  longitude,
  webViewRef,
  reportActivity,
}: {
  latitude: number;
  longitude: number;
  webViewRef: React.RefObject<WebView | null>;
  reportActivity: (message: ActivityMessage) => void;
}) => {
  return (
    <WebView
      ref={webViewRef}
      webviewDebuggingEnabled
      style={{ height: 300, width: 300, backgroundColor: "grey" }}
      originWhitelist={["*"]}
      testID="map-webview"
      accessibilityLabel="map-webview"
      userAgent="MapCircle"
      source={{
        html: createMapHtml(latitude, longitude) as any,
      }}
      onMessage={(event) => {
        let message: ActivityMessage;

        try {
          message = JSON.parse(event.nativeEvent.data);
        } catch {
          console.warn("[native] failed to parse webview message", event.nativeEvent.data);

          return;
        }

        if (message.type === "USER_ACTIVITY") {
          reportActivity(message);
        }
      }}
    />
  );
};
