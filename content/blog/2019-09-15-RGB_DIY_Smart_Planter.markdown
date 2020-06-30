---
title: RGB DIY Smart Planter
date: 2019-09-15T04:22:02.628Z
description: RGB DIY Smart Planter integrated with Ubidots
image: /assets/smart-planter.png
---

Original Source: https://ubidots.com/blog/rgb-smart-planter/

A few weeks ago I decided to buy a succulent for my office desk only because of the benefits they can bring to the environment. In case you don't know, growing succulents or cactuses can benefit you in multiple ways, they help to purify the air, improve humidity of the spaces, and add fresh oxygen to the environment

After a few days of having Lana (Yes, I named it Lana 💕) on my desk, I started feeling that something was missing. As a passionate maker and an IoT Developer Advocate at Ubidots, I decided to create a "Smart Planter" for Lana using our tools.  After a few days of hard work and many issues printing, finally, I ended up with this cool result, and  I was eager to share with you my process 🙆‍♀️💚:

![](https://lh4.googleusercontent.com/yUxlwtjZH5Y0ArZauunx3O2iEXybMlEf4szwEVVEbWGUZ_X1inIdDgK4Yl9LKEvxOFPONTREn1saeOB1fQVFtRK073HVh_1PG10hlknx525zT-lQB6wXnvwFSTWS1n-djPcuOJOB)

This project was inspired by a previous one created by [Paul a Maker 👨‍💻 (3D Printing, Electronics, Software)](https://www.instagram.com/pauls_3d_things/) that I have been following months ago, and I can say I have learned many tips and tricks from him. If you're looking for inspiration for your electronics projects, you should [follow him](https://www.instagram.com/pauls_3d_things/), trust me.

Personally, I really like to find my own inspiration by following projects from someone else, anyway, I'll always find a way to add my own style, give credits, and of course, sharing the end result for other people like me to get inspired as well. 🤓 🤓

This post contains a step-by-step for my project, as well as all the resources needed to replicate the "Smart Planter".

## Requirements

- A succulent or cactus
- [NodeMCU ESP8266](https://www.amazon.com/KeeYees-Internet-Development-Wireless-Compatible/dp/B07PR9T5R5/ref=sr_1_4?keywords=nodemcu%2Besp8266%2Bamica&qid=1567012982&s=gateway&sr=8-4&th=1)
- [DHT11 Temperature/Humidity sensor](https://www.amazon.com/C-J-SHOP-Temperature-Relative-Humidity/dp/B00XAGSSTQ/ref=sr_1_21_sspa?keywords=dht11&qid=1567012855&s=gateway&sr=8-21-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEySlA5RUQ3MDlRV05MJmVuY3J5cHRlZElkPUEwNTIyMTQ5QlZBV0lLMFhIWlNFJmVuY3J5cHRlZEFkSWQ9QTAwOTAxNjlOMlVIMUtJWEg0Rzgmd2lkZ2V0TmFtZT1zcF9tdGYmYWN0aW9uPWNsaWNrUmVkaXJlY3QmZG9Ob3RMb2dDbGljaz10cnVl)
- [Soil moisture sensor](http://wiki.seeedstudio.com/Grove-Moisture_Sensor/)
- [RGB Ring](https://www.amazon.com/ARCELI-WS2812-Integrated-Driver-Arduino/dp/B07JKZXJ8D/ref=sr_1_4?keywords=WS2812+rgb+12+bit+ring&qid=1567013423&s=gateway&sr=8-4)
- [(5) White LEDs](https://www.amazon.com/Transparent-Intensity-Lighting-Electronics-Components/dp/B01AUI4VQU/ref=sr_1_1?keywords=white+leds&qid=1567013131&s=gateway&sr=8-1)
- 220 Ω Resistor
- Wires
- [Breadboard PCB](https://www.amazon.com/uxcell-Prototype-Universal-Printed-Breadboard/dp/B06ZZBTB83/ref=sr_1_2?keywords=pcb+breadboard+7x3+cm&qid=1567013743&s=gateway&sr=8-2)
- [Right-angle male headers](https://www.amazon.com/Simpo-2-54mm-Connector-Plastic-Gold-plated/dp/B07DRDZ18M/ref=sr_1_1_sspa?crid=LFW2FTUJL6O9&keywords=header+right+angle&qid=1567013791&s=gateway&sprefix=header+righ%2Caps%2C320&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFRNldYSlpDUkFFUVkmZW5jcnlwdGVkSWQ9QTAwNzgyODIyREZTMUFJQzZWTllYJmVuY3J5cHRlZEFkSWQ9QTAzMzU2NTFWWTBUMVdHV1I5N0Umd2lkZ2V0TmFtZT1zcF9hdGYmYWN0aW9uPWNsaWNrUmVkaXJlY3QmZG9Ob3RMb2dDbGljaz10cnVl)
- 3D Printer
- Soldering irons
- Solder Wire

## Step-by-Step

1.  _3D Printing_
2.  _Wiring_
3.  _Casing_
4.  _Programming NodeMCU ESP8266_
5.  _Dashboard - Control & Monitor_
6.  _Summary_

## 1\. 3D Printing

My skills for modeling 3D pieces are kind of limited (I'm working on this to create more projects using the 3D printer), but there is an open community called [Thingiverse](https://www.thingiverse.com/) that makes our life easier. It's a thriving design community for discovering, making, and sharing 3D printable things. After looking at many planters designs, I decided to print the following one:

![](https://lh3.googleusercontent.com/5_Tyrf1PMU8gJIhScgiV09mYGk-dk2GTTOaBzA9qllF6EUFxtFCkdlffzc0VcFxn43Wef-wWQd2hg_cpeQthGb5KewTvE4bAzW76culw1jLog4X83NzmiALqZQOh1gVYyokeKFQk)

[Click here to downlink the design - thing:2857938](https://www.thingiverse.com/thing:2857938)

I really liked this design because it was already an IoT planter, and the lamp was a beautiful and cool accessory. Basically, this model was the perfect fit for what I had in mind since the beginning:

- Lamp for remote control.
- Space to place electronics components to add a few sensors.

However, I knew that the space for the electronics wasn't enough for all the functionalities I wanted to include. To solve this, I printed 2 times the bottom piece:

- White piece: To place the NodeMCU ESP8266, sensors, and wires.
- Transparent piece: To place the NeoPixel ring.

Having as a result the masterpiece below:

![](https://lh5.googleusercontent.com/b1Mb9jV2XDpsEVpiLhnVOXBz6ed_fdjnT1yYYaJPeZ8mKulbUG8tHSK-7boYbVWln_Y-vNWzjqeHwJNVfVn_9RlvXFX5F1SdVDYkXr_cCfRPRbkd6uofl6upMlfdT8G36Wodd44z)

NOTE: The NeoPixel ring is not mandatory for this project, it was just an accessory that made it prettier. You can also use only one piece.

## 2\. Wiring

According to the firmware provided in this guide, refer to the diagram and table below to establish a proper connection between the components used.

![](https://lh6.googleusercontent.com/uGt6cPnoMgu1ZH2aTtYh8TKE0PlqN93n_BMCb0Os-_438ncftyf89G-Y_RbDN20uOClhMq0wsG3X1ivmUVP5iYo2mVcrlB2hoZ6gpmIjkaRTqD3X2UCR9MhGyXt9Hhr9UGc7wLdK)

![](https://lh4.googleusercontent.com/ZLE-9TNgKhWhON80Di1vN4BJsINLgK8SaLDaACWg9TPzpQO5f6hcIV1jXe_P8m1eA_XbOEJZCUo1vrPKNx3vG6RoY_rP8nXpLNSvrVYKCNY4Y0Z6d_6Nzu9bMQmZerkcRGP2Duwz)

## 3\. Casing

With the proper wire connections already established, place all the components inside the planter as shown below:

![](https://lh6.googleusercontent.com/87K69vuhy_Jbmh19ClthHASumqXb81Bv8pEgJ1SO3kKYeF9rGKwV8Lgpy2zvaTrJTt-t4Mx7NHGlUjQwHsGkhsjONUdeBUgVeEZz-kpL3gfzCfJU0-R2nzJsjPNQhyB4xRciOczc)

As you can notice, I placed the NodeMCU in a PCB Breadboard with 10 right angle headers. The idea was to establish the connection with the sensors and saving some space for the electronics. To be honest, I could have done a better job organizing the cables. However, the idea was to create a customized PCB for the planter, at a point, everything would be embedded. Also, I drilled the white piece to cross the NeoPixel ring cables through it. To finish, I glued the NeoPixel ring pointing down in the bottom, then, I glued the transparent piece to the white one in order to blur the light. At the end I had this awesome result:

![](https://lh4.googleusercontent.com/WFOzIpynEyPsLkHuSlFtItvTirx4fQeo9jgF8Bz_fjjmkiP9brnDxC7QKuXscks5jpq4wxAlMA36Rvnz9v07UaUKHd-YW7zVrblbmjzgygOsyMU629s9R0EyHHrhdfXMlbTdPE9W)

## 4\. Programming NodeMCU ESP8266

1\. To be able to work with the ESP8266 platform in the Arduino IDE, you'll need to install the ESP8266 platform using the preconfigured Arduino Board Manager. If you're not familiar with adding a board with the Arduino IDE, refer to this[ article for additional guidance](http://help.ubidots.com/technical-resources/setting-up-the-arduino-ide-for-ubidots).

2\. With the ESP8266 platform installed, select the ESP8266 device you are working with. In the case, we are working with a "NodeMCU 1.0". To select your board from the Arduino IDE, select Tools > Board "Generic ESP8266 Module".

3\. Download and install the[ UbidotsMQTTESP8266](https://github.com/ubidots/ubidots-mqtt-esp) library. For a detailed explanation of how to install libraries using the Arduino IDE, refer to[ this guide](http://help.ubidots.com/technical-resources/setting-up-the-arduino-ide-for-ubidots).

4\. Paste the code below into the Arduino IDE. Then, assign your [unique Ubidots TOKEN](https://help.ubidots.com/en/articles/590078-find-your-token-from-your-ubidots-account), SSID (WiFi Name) and Password of the available network.

NOTE: Remember to assign the right pins for the components used in case you use a different connection than the one provided above

[GitHub Repository](https://github.com/ubidots/code-examples/blob/master/IoT-Projects/ESP8266/NeoPixel%20Smart%20Planter/UBIDOTS_ESP8266_RGB_SMART_PLANTER.ino)

```
/*
RGB Smart Planter integrated with Ubidots for Monitoring & Control.

This code works for:

    1) Read two sensors: DHT11, and Soil Moisture.
    2) Publish sensors readings to Ubidots.
    3) Subscribe to multiple variables for remote control.

Libraries required:

- Ubidots ESP8266 MQTT - (https://github.com/ubidots/ubidots-mqtt-esp)
- Adafruit NeoPixel - (https://github.com/adafruit/Adafruit_NeoPixel)
- DHT - (https://github.com/adafruit/DHT-sensor-library)

Made by: Maria Hernández - IoT Developer Advocate @ Ubidots
Revision: José García - Development & Support Manager @ Ubidots

/****************************************
 * Include Libraries
 ****************************************/
#include <Adafruit_NeoPixel.h>
#include <stdio.h>
#include <map>
#include "DHT.h"
#include "UbidotsESPMQTT.h"

/****************************************
 * Define Pins
 ****************************************/
#define LIGHTPIN D1     // Digital pin for Led Lamp.
#define DHTPIN D5       // Digital pin for DHT sensor.
#define NEOPIXELSPIN D6 // Digital pin for NeoPixel Ring.
#define MOISTUREPIN A0  // Analog pin for Moisture Sensor.

/****************************************
 * Define Constants
 ****************************************/
#define TOKEN "BBFF-xxxxxxxxxx" // Assign your Ubidots TOKEN.
#define WIFINAME "xxxxxxxxxx"   // Assign your SSID.
#define WIFIPASS "xxxxxxxxxx"   // Assign your WiFi Password.
#define DEVICE "planter"        // Ubidots Device Label.
#define VAR_PUB_1 "temperature" // Ubidots Variables' label for publishing data.
#define VAR_PUB_2 "humidity"
#define VAR_PUB_3 "soil-moisture"
#define VAR_PUB_4 "heat-index"
#define VAR_SUB_1 "light-1" // Ubidots Variables' label for subscribing to data;\
                            // These variables have to be created at Ubidots.
#define VAR_SUB_2 "light-2"
#define NUMPIXELS 12 // 12 bit NeoPixel Ring
// Uncomment whatever type you're using
#define DHTTYPE DHT11 // DHT 11
//#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321
//#define DHTTYPE DHT21   // DHT 21 (AM2301)

typedef enum
{
  red,
  green,
  blue,
  yellow,
  white,
  black
} NeoPixelColor;

//   R,   G,   B
uint8_t myColors[][6] = {{250, 0, 0},                             // Red.
                         {0, 255, 0},                             // Green.
                         {0, 0, 255},                             // Blue.
                         {255, 255, 0},                           // Yellow.
                         {255, 255, 255},                         // White.
                         {0, 0, 0}};                              // Black.
const uint8_t numberOfVariables = 2;                              // Number of variables for subscription.
char *variableLabels[numberOfVariables] = {VAR_SUB_1, VAR_SUB_2}; // Variables' label for subscription.
float value;                                                      // Store incoming value.
int lastValue;
bool bottomLight;                         // flag to control conditions for the bottom light.
unsigned long initTime;                   // Store the init time.
const long SECONDS_TO_RECONNECT = 180000; // Period to reconnect MQTT connection.

// Comparison functor to map functions.
struct cmp_str
{
  bool operator()(char const *a, char const *b) const
  {
    return strcmp(a, b) < 0;
  }
};

// Map function declaration.
typedef std::function<void()> FunctionType;
typedef std::map<const char *, FunctionType, cmp_str> mapTopicSubscription;

/****************************************
 * Define Instances
 ****************************************/
Ubidots client(TOKEN);
Adafruit_NeoPixel pixels(NUMPIXELS, NEOPIXELSPIN, NEO_GRB + NEO_KHZ800);
DHT dht(DHTPIN, DHTTYPE);
mapTopicSubscription ubiSubTopic;

/****************************************
 * Main Functions
 ****************************************/
void setup()
{
  initTime = millis(); // Save the init time
  Serial.begin(115200);
  pinMode(LIGHTPIN, OUTPUT); // Declare pin mode
  // Defines the mapped functions to handle the subscription event.
  ubiSubTopic[VAR_SUB_1] = &subscriptionHandler1;
  ubiSubTopic[VAR_SUB_2] = &subscriptionHandler2;
  client.ubidotsSetBroker("industrial.api.ubidots.com"); // Sets the broker properly for the
                                                         // business account.
  client.setDebug(true);                                 // Pass a true or false bool value to activate debug messages.
  client.wifiConnection(WIFINAME, WIFIPASS);             // Establish WiFi connection.
  client.begin(callback);
  dht.begin();    // Initializes DHT sensor.
  pixels.begin(); // Initializes NeoPixel Ring.
  pixels.clear(); // Set all pixel colors to 'off'.
  // Establishes subscription with variables defined.
  client.ubidotsSubscribe(DEVICE, VAR_SUB_1);
  client.ubidotsSubscribe(DEVICE, VAR_SUB_2);
}

void loop()
{
  // Re-establishes subscription with variables defined when connection is lost or every 3 minutes.
  if (!client.connected() || abs(millis() - initTime) > SECONDS_TO_RECONNECT)
  {
    initTime = millis();
    client.reconnect();
    client.ubidotsSubscribe(DEVICE, VAR_SUB_1);
    client.ubidotsSubscribe(DEVICE, VAR_SUB_2);
  }

  client.reconnect();

  // Reading temperature, humidity and soil moisture values.a
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  int soilMoisture = analogRead(MOISTUREPIN);
  // Compute heat index in Celsius (isFahreheit = false).
  float heatIndexC = dht.computeHeatIndex(temperature, humidity, false);

  // Check if any reads failed and exit early (to try again).
  if (isnan(humidity) || isnan(temperature))
  {
    Serial.println(F("Failed to read from DHT sensor!"));
  }

  // Controls NeoPixel's colors based on the temperature values.
  if (bottomLight)
  {
    if (inRange(temperature, 0, 16))
      colorWipe(blue, 50);
    if (inRange(temperature, 16, 21))
      colorWipe(green, 50);
    if (inRange(temperature, 21, 26))
      colorWipe(yellow, 50);
    if (inRange(temperature, 26, 40))
      colorWipe(red, 50);
  }

  // Adds variables to be published to Ubidots.
  client.add(VAR_PUB_1, temperature);
  client.add(VAR_PUB_2, humidity);
  client.add(VAR_PUB_3, soilMoisture);
  client.add(VAR_PUB_4, heatIndexC);

  // Publishes all variables added into the device defined.
  client.ubidotsPublish(DEVICE);
  client.loop();

  delay(1000);
}

/****************************************
 * Subscription Functions
 ****************************************/

// Function to be executed when var_sub_1 change its status.
void subscriptionHandler1()
{
  if (value == 1)
  {
    Serial.println("Planter Lamp turned ON.");
    digitalWrite(LIGHTPIN, HIGH);
  }
  else
  {
    Serial.println("Planter Lamp turned OFF.");
    digitalWrite(LIGHTPIN, LOW);
  }
};

// Function to be executed when var_sub_2 change its status.
void subscriptionHandler2()
{
  if (value != lastValue)
  {
    if (value == 1)
    {
      Serial.println("Planter bottom light turned ON.");
      for (int i = 0; i < 3; i++)
      {
        colorWipe(red, 50);
        colorWipe(green, 50);
        colorWipe(blue, 50);
      };
      colorWipe(white, 200);
      bottomLight = true;
    }
    else
    {
      Serial.println("Planter bottom light turned OFF.");
      colorWipe(white, 50);
      colorWipe(black, 200);
      bottomLight = false;
    }
  }
  lastValue = value;
};

/****************************************
 * Auxiliar Functions
 ****************************************/
// Return an int with the length of a char
int strLen(char *s)
{
  int l = 0;
  while (*s != '\0')
  {
    s++;
    l++;
  }
  return (l);
}

// Callback to handle subscription
void callback(char *topic, byte *payload, unsigned int length)
{
  char *variableLabel = (char *)malloc(sizeof(char) * 30);
  getVariableLabelTopic(topic, variableLabel); // Saves the variable label.
  value = btof(payload, length);               // Saves the value of the variable subscribed.
  executeCases(variableLabel);                 // Executes the function handler for the
                                               // variable subscribed.
  free(variableLabel);                         // Free memory.
}

// Parse the topic received to extract the variable label.
void getVariableLabelTopic(char *topic, char *variableLabel)
{
  sprintf(variableLabel, "");
  for (int i = 0; i < numberOfVariables; i++)
  {
    char *resultLv = strstr(topic, variableLabels[i]);
    if (resultLv != NULL)
    {
      uint8_t len = strlen(resultLv);
      char result[100];
      uint8_t i = 0;
      for (i = 0; i < len - 3; i++)
      {
        result[i] = resultLv[i];
      }
      result[i] = '\0';
      snprintf(variableLabel, strLen(result) + 1, "%s", result);
      break;
    }
  }
}

// Cast from an array of chars to float value.
float btof(byte *payload, unsigned int length)
{
  char *demo_ = (char *)malloc(sizeof(char) * 10);
  for (int i = 0; i < length; i++)
  {
    demo_[i] = payload[i];
  }
  return atof(demo_);
}

// Executes the respective "Subscription Function" based on the value received.
void executeCases(char *variableLabel)
{
  if (ubiSubTopic.find(variableLabel) != ubiSubTopic.end())
  {
    mapTopicSubscription::iterator i = ubiSubTopic.find(variableLabel);
    (i->second)();
  }
}

// Fills NeoPixel ring pixels one after another with color.
void colorWipe(NeoPixelColor color, int wait)
{
  int r, g, b;

  r = myColors[color][0];
  g = myColors[color][1];
  b = myColors[color][2];

  for (int i = 0; i < pixels.numPixels(); i++)
  {
    pixels.setPixelColor(i, r, g, b);
    pixels.show();
    delay(wait);
  }
}

// Verifies if the value received is in the expected range
bool inRange(float x, int low, int high)
{
  return ((x - low) > 0 && (high - x) >= 0);
}

```

5\. Verify your code within the Arduino IDE. To do this, in the top left corner of our Arduino IDE you will see the "_Check Mark_" icon; select it to verify your code.

6\. Upload the code into your "NodeMCU 1.0". To do this, choose the "*right-arrow" *icon beside the "_check mark_" icon.

7\. To verify the connectivity of the device and the data sent, open the serial monitor by selecting the "_magnifying glass_" icon in the top right corner of the Arduino IDE to see the connectivity logs as well as the responses from Ubidots server.

8\. After a few seconds of initialization, the code provided will create a new device automatically into your Ubidots account. Go to the device section of your[ Ubidots account](http://industrial.ubidots.com/); you should see new devices automatically created:

![](https://lh3.googleusercontent.com/0aAVO67R8JrUtQsYEa0v4Uei6LF8m7hfhEu9-Fw8KsMnjJtsdrNcQLgh_GIl7ZL9hdOaVama8t8UTeAhtO9JLMOkUjnRj6lmzBhhSu_FGC9a3LuOhLV1B4Fnz16-1Oa7vz-kc6qb)

Enter the device "Planter" and see the variables configured transmitting the data:

![](https://lh5.googleusercontent.com/P7QB24bTBQEBtWw5bDwzHDpsJ21ezui_5ipG8dFAsaix4iSqDdGctR3s7kNIBHSE58CCjM-V8wFUnHlpN1Wa2m6vQW8tXq0yOHXKM_GqsaIVCbafExIJfngRKNTdmf157MiGTXi8)

9\. Then, create two new raw variables to establish the subscription and control the lights remotely. To do this, click "Add Variable > Raw Variable" and assign the variable label defined in the code. For the sample code provided, the variables labels to be created are "light-1" and "light-2".

With the variables successfully created, you should have the following result:

![](https://lh4.googleusercontent.com/61weUhXwPmPozcuWdNtsitn1grkN2hYl3jDxOaJ65Bja_54kwmPNPVLjM-TlacoN9h3S2s3SJ_fToAnfA8VGo8f_pDRc-detQXNWP5OyHfYlyDcG5p8aIjx42FTCzFIwces3kiAb)

## 5\. Dashboard - Control & Monitor

With everything already integrated, it's time to [present the devices' data in a Dashboard](https://help.ubidots.com/en/articles/2400308-create-dashboards-and-widgets). Also, the dashboard will also serve to control the status of both lamps.

1\. To create your first dashboard, go to the Dashboard tab (Data →  Dashboards). Then, select the plus (+) icon in the top-right , then select the desired widget type. You should be able to create dashboards like the one below:

![](https://lh5.googleusercontent.com/QLTZpMBaFKzVngUalJIjU_38rrQq60sT6WtqmWgI0U49RXurd_yNy21itbvUD7pzxiife4P3fWGiIMjgnCKhICjzUNn6IdQqV1MZR7X1BIZbXLBcrXgTaOlq97oMZ8HRn6lFs61e)

More about Ubidots Dashboards: [Application Branding: Custom styles for your dashboards and widgets](https://help.ubidots.com/en/articles/3189001-application-branding-custom-styles-for-your-dashboards-and-widgets)

Ubidots is very intuitive for any user to administer their data, allowing anyone to customize it as much as they want; in case you would like to know more, I really recommend checking out the following guides:

- [Ubidots Basics: Devices, Variables, Dashboards, and Alerts](https://help.ubidots.com/en/articles/854333-ubidots-basics-devices-variables-dashboards-and-alerts)
- [Ubidots Basics: Applications, Organizations, and Users Explained](https://help.ubidots.com/en/articles/887328-ubidots-basics-applications-organizations-and-users-explained)

2\. Ubidots support already integrated events to allow you to send Events, Alerts, and Notifications based on your sensors and actuators data.

[Check out the type of events supported and learn how to set up each of them](https://help.ubidots.com/en/articles/1445537-events-creating-conditional-events-and-alerts):

![](https://ubidots.com/blog/content/images/2019/09/imagen.png)

1.  Email notifications
2.  SMS notifications
3.  Webhook events - [learn more](http://help.ubidots.com/user-guides/events-create-a-webhook)
4.  Telegram notifications
5.  Slack notifications - [learn more](http://help.ubidots.com/user-guides/events-slack-webhook-setup)
6.  Voice Call notifications - [learn more](https://help.ubidots.com/user-guides/events-voice-call-notifications)
7.  Back to Normal notification - [learn more](http://help.ubidots.com/user-guides/back-to-normal-events-and-notifications)
8.  Geofence notifications - [learn more](http://help.ubidots.com/user-guides/creating-a-geofence-alert)

## 6\. Summary

After a couple of hours of making and coding,(and a lot of coffees), I gave life to this Smart Planter:

![](https://res.cloudinary.com/di2vaxvhl/image/upload/v1568565932/RGB_Smart_Planter-optimize.gif)

As I mentioned in the beginning, I made this because I didn't only want a new desk decoration, but also, I felt that something was missing for Lana, I wanted to invent my own way of communicating with her through IoT and data. In case you want other ways to communicate with your plants you can listen to them using the [MIDI Sprout](https://www.midisprout.com/). This is cool, right? 🤩

This is just the V0 of the Smart Planter and there are a few things I want to improve,such as the design, electronics organization with a custom PCB, and integrating with other services such as Google Assistance, Alexa, and Twitter.

I hope you enjoyed this as I did. In case you have any comments or questions about the project, feel free to reach-out! I'm totally open to constructive feedback to enhance this type of projects and share them with you. 😁💚
