#include <WiFi.h>
#include <FastLED.h>
#include <ArduinoJson.h>
#include <WebServer.h>

#define LED_PIN 5
#define NUM_LEDS 30
CRGB leds[NUM_LEDS];

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

WebServer server(80);

struct LEDSettings {
  String color;
  int brightness;
  String animation;
} ledSettings;

CRGB hexToCRGB(String hex) {
  long number = (long) strtol(hex.c_str() + 1, NULL, 16);
  return CRGB((number >> 16) & 0xFF, (number >> 8) & 0xFF, number & 0xFF);
}

void handleSetLED() {
  if (!server.hasArg("plain")) {
    server.send(400, "application/json", "{\"message\":\"No body\"}");
    return;
  }

  String body = server.arg("plain");
  StaticJsonDocument<200> doc;
  deserializeJson(doc, body);

  ledSettings.color = doc["color"] | "#00ffff";
  ledSettings.brightness = doc["brightness"] | 50;
  ledSettings.animation = doc["animation"] | "Static";

  server.send(200, "application/json", "{\"message\":\"LED updated\"}");
}

void setup() {
  Serial.begin(115200);
  FastLED.addLeds<WS2812, LED_PIN, GRB>(leds, NUM_LEDS);
  FastLED.setBrightness(ledSettings.brightness);

  WiFi.begin(ssid, password);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected! IP: " + WiFi.localIP().toString());

  server.on("/set-led", HTTP_POST, handleSetLED);
  server.begin();
}

void loop() {
  server.handleClient();

  CRGB color = hexToCRGB(ledSettings.color);
  for (int i = 0; i < NUM_LEDS; i++) {
    leds[i] = color;
  }
  FastLED.setBrightness(ledSettings.brightness);
  FastLED.show();

  delay(50);
}
