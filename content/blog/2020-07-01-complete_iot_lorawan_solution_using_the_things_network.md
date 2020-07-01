---
title: Complete IoT LoRaWAN Solution Using The Things Network
date: 2019-05-16T03:13:37.891Z
description: Set up your SODAQ ONE V3 board to manage uplink and downlink
  messages with Ubidots using TTN as LoRaWAN network.
image: /assets/ttn-n-ubidots.png
---

Original source: https://www.hackster.io/mariacarlinahernandez/complete-iot-lorawan-solution-using-the-things-network-9956ac

![](https://downloads.intercomcdn.com/i/o/105394700/1789f86cbfd666e816b21dd3/cl682frfYlZ7c2gz3gqg1nUV1looTPBnw6g3-cvr5yQVzMX3zeALQgPGyDZ_FzM2PDpcKTv4BsgsPFm-NnSQyB4PElpeY_eWoG1569nRlq7NmTEeAf7ZRFvl3WiSwhGfVeylpC6P)

The ONE V3 is one of the hardware boards offered by [SODAQ](https://sodaq.com/), a hardware company with a vision of enabling people and businesses by connecting their devices to the internet efficiently and off-grid.

This amazing and easy-to-use board allows us to create several kinds of IoT applications such as Smart Agriculture, Fleet Tracking, Smart cities, and more. This board stands out thanks to its efficient use of battery life, achieved  through a well-managed interruptions logic.

Some hardware features include:

- Arduino compatible
- Deep Sleep Mode: 23uA
- Highly integrated board files
- Atmel SAMD21 32 bits ARM Cortex M0+ microcontroller
- Microchip RN2903A LoRa module
- uBlox EVA-8M GPS
- LSM303AGR ultra-low-power 3D magnetometer and 3D accelerometer
- Charge controller and on-board rechargeable coin cell battery

We highly recommend checking out the [SODAQ official documentation](https://support.sodaq.com/sodaq-one/sodaq-one/) to learn more about the **ONE V3**, such as sample codes that you can use later, hardware specifications for this flavor and also for other SODAQ boards' family.

Now it's time to start hacking! This guide is going to provide you all the basics to start managing uplink & downlink messages with the ONE V3, Ubidots and TTN.

**IMPORTANT NOTE:** The sample codes provided in this guide are not designed to manage battery as efficiently as possible. Their main purpose is to show the management of uplink & downlink message using [The Things Network library](https://github.com/TheThingsNetwork/arduino-device-lib).

## Requirements

- [SODAQ ONE V3.](https://shop.sodaq.com/sodaq-one-eu-rn2483-v3.html)
- [The Things Network (TTN) account.](https://thethingsnetwork.org/)
- [LoRaWAN Gateway already configured with TTN.](https://www.thethingsnetwork.org/docs/gateways/)
- [Ubidots account.](https://industrial.ubidots.com/accounts/signup_industrial/)

## Step-by-Step

1.  Setting up Arduino IDE
2.  TTN Device registration
3.  Uplink messages management
4.  Sending messages to TTN
5.  Custom payload setup
6.  Ubidots integration setup
7.  Data verification
8.  Downlink messages management
9.  Variable creation
10. Downlink Event creation in Ubidots
11. Data verification
12. Demo
13. Summary

## 1\. Setting up Arduino IDE

1.  To be able to work with the **SODAQ ONE V3** in the **Arduino IDE**, you need to install the SODAQ Platform using the preconfigured **Arduino Board Manager** by assigning the following URL in the Preferences menu:

```
http://downloads.sodaq.net/package_sodaq_samd_index.json
```

2\. With the SODAQ platform installed, select the SODAQ device you are working with. In this case, we are working with a "**SODAQ ONE**". To select the board from your Arduino IDE, select **Tools > Board > SODAQ ONE**

![](https://downloads.intercomcdn.com/i/o/105394702/cb988c3fb5b47aa5b97f322d/q7IV_7HlYjomNTx5YMqUYo_vKj0m18ApABaFpsAS9h6BWwlRJcWNYUjy0E1wQxRUaX7CNXD0CvQqr4VmLmdL1kn7Uts5qYCenGRT7bBllrmg1pQtPd3MUibEWMEokDKouPIGWKa6)

3\. Install "[The Things Network](https://github.com/TheThingsNetwork/arduino-device-lib)" library.

**NOTE**: If you are not familiar with adding new boards or installing libraries within the Arduino IDE, refer to [this article for additional guidance](https://help.ubidots.com/technical-resources/setting-up-the-arduino-ide-for-ubidots).

## 2\. TTN Device registration

To start managing the device's data with TTN LoRaWAN network server, you ought to register the SODAQ ONE V3 within an application. But, you will need the hardware EUI which is the unique identifier of your board. The steps below show how to get the credentials required, plus the device registration process.

1\. Upload the following code into the board to get the hardware EUI to register your device. Once the code is uploaded, open the serial monitor and write the command `sys get hweui` to obtain the device EUI.

**NOTE**: The serial monitor configuration ought to be "**Both NL & CR**"

```
/* * Compatible with: * SODAQ MBILI * SODAQ Autonomo * SODAQ ONE * SODAQ ONE BETA * SODAQ EXPLORER */#include "Arduino.h"#if defined(ARDUINO_AVR_SODAQ_MBILI)#define debugSerial Serial #define loraSerial Serial1#elif defined(ARDUINO_SODAQ_AUTONOMO) || defined(ARDUINO_SODAQ_ONE) || defined(ARDUINO_SODAQ_ONE_BETA)#define debugSerial SerialUSB #define loraSerial Serial1#elif defined(ARDUINO_SODAQ_EXPLORER)#define debugSerial SerialUSB#define loraSerial Serial2#else// please select a sodaq board#endifvoid setup() {  // Enable LoRa module  #if defined(ARDUINO_SODAQ_AUTONOMO)  pinMode(BEE_VCC, OUTPUT);  digitalWrite(BEE_VCC, HIGH); //set input power BEE high  #elif defined(ARDUINO_AVR_SODAQ_MBILI)  pinMode(20, OUTPUT);  digitalWrite(20, HIGH); //set input power BEE high  #endif  // Hard reset the RN module  #if defined(LORA_RESET)  pinMode(LORA_RESET, OUTPUT);  digitalWrite(LORA_RESET, LOW);  delay(100);  digitalWrite(LORA_RESET, HIGH);  delay(100);  #endif  while ((!debugSerial) && (millis() < 10000)){    // wait 10 seconds for serial monitor  }    debugSerial.begin(57600);  loraSerial.begin(57600);     debugSerial.println("Please send command");}void loop() {      //send and receive data with serial     if (debugSerial.available()){      //debugSerial.print("SEND:    ");      while (debugSerial.available()) {        uint8_t inChar = debugSerial.read();        //debugSerial.write(inChar);        loraSerial.write(inChar);      }     }     if (loraSerial.available()){      //debugSerial.print("RECEIVE: ");      while (loraSerial.available()) {        uint8_t inChar = loraSerial.read();        debugSerial.write(inChar);      }     }}
```

_(source code:_ [_https://support.sodaq.com/sodaq-one/loraone-lora-basic-sketch/_](https://support.sodaq.com/sodaq-one/loraone-lora-basic-sketch/)_)_

Once the code is uploaded into the board, you should receive the following result after requesting the hardware EUI:

![](https://downloads.intercomcdn.com/i/o/105394703/2d3348016b6352444e5d92f6/9OI5GoT3GehaBVqFid6q2hHjwg8c0fSYa1zsYSK_0sAkoCjOTjZfFmi71ijt8pm_ftDpdS01skwxY6-SgQtqjf-Axp7AJ_THAGjRW7PkRc8lpGgCVPXuYMhBu_ot-gIIGbeDCn9_)

Now with the hardware EUI obtained, it's time to register a device within an application on TTN.

2\. First, go to the TTN console and enter to the application section to add a new application. To create the application, just press "**add application**":

![](https://downloads.intercomcdn.com/i/o/105394704/3e08824344be3f79178995f5/_pXxWqRh--gnFOPPwfiOVRqbFQT2hr582dovctMdeKKLQyr6wdPMXCHknI4OPPuo_TKaZ9V9YfihnBgSr50Ldfv9uCYFz-64lEDt-XveBQJZ2vIg7vsJ3wER4HdrjryeHWUCxO1-)

Then, in the following page assign the parameters below:

- **Application ID**: The unique identifier of your application on the network.
- **Description** (_optional_): a human readable description.
- **Handler registration:** handler where you want to register the application.

Once the application is created, you will be redirected to the application overview.

3\. To register a device, go to the device tab. Then press "**Register Device**"

![](https://downloads.intercomcdn.com/i/o/105394706/82b785d07e41ff03593f19c2/BYsrWJTzvb_oJboqFM15J6hbnLOPx8yJrwa8WGmJmTqSLh3eNkV2rniC7YL4ldaQty1t1ssl1KB0lKp4m9uKSoefg5FBfuo5lqa01Ia60hpQf6nVYKmZV8qIe5hR6sML3DA6E00M)

Then, in the following page assign the parameters below:

- **Device ID**: the unique identifier for the device in the application. The device ID will be immutable.
- **Device EUI**: the unique identifier for the device on the network.

The rest of parameters (App Key, and App EUI) are automatically assigned by TTN.

Once the device's registration its done, you will be redirected to the device overview. At this point, the device's status is "_never seen_" because we are not sending any message yet.

![](https://downloads.intercomcdn.com/i/o/105394707/83b14a49ac18c2f626ba2ef0/rIrDJpnBB6K927erJBhRvbBnH8Z3wfhe_72kBYgnz4s1BbBsIUfohQSTW7GJILvtixbperII2nL2NI2vVLDdVUkDuEHoKgi7NZFLAK3ikjuB0UtV1m1QL1-55cwjNJAWHmv702ob)

## 3\. Uplink messages management

To start sending data (uplink messages) to Ubidots, you need to establish some configurations in the TTN side. Please follow the steps below carefully to establish the proper communication between your device, TTN, and Ubidots.

- **Sending messages to TTN**

1.  Copy the following code and place it in the Arduino IDE. Once the code is pasted, you need to assign the parameters **App EUI**, **App Key,** and **freqPlan**.

The **App EUI** and **App Key** can be found in the device's overview. The **freqPlan** is the zone where your device is going to be deployed.

**PRO TIP:** At the bottom of the device's overview an "**example code**" can be found ready to replace it into the code.

![](https://downloads.intercomcdn.com/i/o/105394708/68e56efc6e62856dae2a71af/EA2JNviUZfZKXD0Hb8OYq_ujdlngFzDUE1RuJ1zWthTgagIY5Dl1FNzm_4fk_TZxk00MYfb3DYH0DvxH1rbW8A_MbM5F7coe0hASE9kSP3L8VOm04qQASMmKYibfZoZjHMx5Zrwq)

```
#include <TheThingsNetwork.h>// Define inputs/outputs pins#define relay 10#define potentiometer A11// Set your AppEUI and AppKeyconst char *appEui = "0000000000000000";const char *appKey = "00000000000000000000000000000000";#define loraSerial Serial1#define debugSerial SerialUSB// Replace REPLACE_ME with TTN_FP_EU868 or TTN_FP_US915#define freqPlan REPLACE_ME // assign your freq. zoneTheThingsNetwork ttn(loraSerial, debugSerial, freqPlan);void setup(){  loraSerial.begin(57600);  debugSerial.begin(9600);  // Wait a maximum of 10s for Serial Monitor  while (!debugSerial && millis() < 10000)    ;  // status & join requests  debugSerial.println("-- STATUS");  ttn.showStatus();  debugSerial.println("-- JOIN");    ttn.join(appEui, appKey);  // Handle downlink data  ttn.onMessage(message);  pinMode(relay, OUTPUT);  pinMode(potentiometer, INPUT);}void loop(){  debugSerial.println("-- LOOP");  uint32_t potentiometer_value = analogRead(potentiometer);  debugSerial.println(potentiometer_value);  // Prepare payload of 2 byte to report potentiometer values  byte payload[2];  payload[0] = highByte(potentiometer_value);  payload[1] = lowByte(potentiometer_value);  // Send potentiometer value  ttn.sendBytes(payload, sizeof(payload));  delay(10000);}/*  * Declaration for the downlink message received */void message(const uint8_t *payload, size_t size, port_t port){  debugSerial.println("-- MESSAGE");  debugSerial.print("Received " + String(size) + " bytes on port " + String(port) + ":");  if (payload[0] == 1) {    digitalWrite(relay, HIGH);  } else {    digitalWrite(relay, LOW);  }  debugSerial.println();}
```

2\. Once the parameters have been assigned properly, upload the code into the board by pressing the upload button located at the left-upper side of the Arduino IDE interface.

3\. Open the Serial Monitor to debug the code; check once the join request is accepted, and every time a new value is being sent to TTN. Now, you'll see the device's status activated.

![](https://downloads.intercomcdn.com/i/o/105394709/0c31a989f9e1f6027fbb3380/bh6nf-UBMjD_KEDy_igvIHAtyyd9CnjEoXjlQ-LFa6R6vEyoXvW5wopmTghkCKaoetBt52Yzxetgqr8jY-BX1bjonAJCEIx3LrRl29TYQODchbuAQasSMRuoL2UPku-bT6V7eR3B)

4\. Verify if the data which have been sent are being received properly at TTN. To do this, refer to the "**Data**" tab:

![](https://downloads.intercomcdn.com/i/o/105394711/549f9750ede53b23cb8cffec/oWtDEH6dmAJDpthBrW0c9w_sHnaL2Mt6aRGRwttAFxP9mviExMiBioqNDvldkehnETzEqkpwbhgsOrl9MFm6b-1pfaEwOgMRvQyb_ngHgu1h2IrmNqwbvenoxaiF6vtPot4yLoro)

- **Custom payload setup**

1\. Go to the Application overview, and refer to the "**Payload Formats**" tab. Then, assign the following code into the decoder section to format the payload in one allowed by Ubidots, which a JSON object.

![](https://downloads.intercomcdn.com/i/o/105394714/24051282f8b6f0b492166ca0/QkfvpBnNHAfk9_B6R9Skn4HQ1wvzp-IhhIw_776I56jwUH8vSmZ7_u9egBnCm7YHpIA0DosZC0xWcZ71rh0cy5k7BQ42p0vqJuAeSBwvQC0xq9AmzoGkNPpnyiKeXLpzzuqIv8We)

```
function Decoder(bytes, port) {  // Decode an uplink message from a buffer  var potentiometer = (bytes[0] << 8) | bytes[1];  return {    potentiometer: potentiometer  };}
```

2\. [OPTIONAL] Once you have the decoder code defined in TTN, you can test the payload which is being sent from the device to verify if the decoded value is the right one.

As you can see the value sent from my device is equal to: `03 FF`

![](https://downloads.intercomcdn.com/i/o/105394715/3655d308b4e76b999003c360/TudR5hgItaZFTj9X-r8pu-EkJd37jJ2eDmHRlmy2VPA0NwdhYZfT3YUWbf79tf09dwrLObx0Xnpk4yZQX1lqBgXjkhyNfFrsJy0b9t1CfMYGygTGW65p1sRRsyCH7nM28LgK1Jwa)

Then, assign the same payload sent and the result should be the initial integer printed in the serial monitor:

![](https://downloads.intercomcdn.com/i/o/105394716/899e271d0e60f53a6df17d37/62DJyYh925d36FgmtGDI1UVVbq3J2yiVouAiIvGSPghHC-jPbORyVSYNkIPwTn4Aeh3x5kOenz1kxwlFjpOxso3KX-DyOR6jG3Pz0Y99zwCkGcGWjP9L5JLSepNzN2kNLW5tdQMo)

3\. To finish, press the "**Save payload functions**" button. At this point, if you refer to the data section you will notice how the data is being automatically decoded after saving the decoder function.

![](https://downloads.intercomcdn.com/i/o/105394717/95f193406bdaaabfe5d7e5c5/vX_9Re4DbUzgyxgjQi75Qg7tsq0jKtULDdXIecsEKDnMP_0-LbD88Wvytj90jAxkud-OahDBGWie2l2ghTgBXVjaCTyzXTwnDzCMskpRaxhkO70_ib0HfY92nzM_mgco-QOX86CP)

- **Ubidots integration setup**

1\. Go to the "**Integration**" tab to add a new integration. To create a new integration, just press "**add integration**"

![](https://downloads.intercomcdn.com/i/o/105394719/5006c80e423013651e9f4352/4H4ZYdhItjf6C8TvWcm8TsLWd8S_xcQymOIQ72YWySa2j9EUD1Jnn440wNRjWHqtUctDPWYVaCGpGdUR1-XEFq9Aa_bxy_3UDFr54rXW0nFV0Sw0l6K_H0Wd-1s8RIjVIeUEiE7Z)

Then, select **Ubidots** as integration:

![](https://downloads.intercomcdn.com/i/o/105394720/107ac6a5595c1b1955093f6b/mRlWxJtYuKufDLEKnSl3r5xOdfvOOG1YTaAzHY0UWw3oc0HlaQ36Toq8Nsex6LCjTyGMcTxgFrpmuUnNydp7ZrO-rehOZc1DQbD7qRDirl4fDfCxhNCcTShwDY-DDuRplrjKgQXy)

In the next window, assign the following parameters:

- **Process ID**: The unique identifier desired for the integration process
- **Access Key**: The app access key
- **Token**: Your Ubidots account Token. ([_refer to this guide to know where to find it._](https://help.ubidots.com/user-guides/find-your-token-from-your-ubidots-account))

With all the parameters assigned, your integration should look like the one below:

![](https://downloads.intercomcdn.com/i/o/105394722/4149c1d24aa1f1b9a2e58911/dtMzW21-H4cMO24oCQzHbKex8JiAz7gtdoFMggm4t3tnYS2-HJWmqaoqgEi7CIXnA9B8-S_fRYX0S08P97lZS77FWYNDtGLiXdbGMCf56ykaUaLphU-ALqQRx1dZb6039FBubQNG)

To finish, press "**Add integration**". You'll be redirected to the integration overview:

![](https://downloads.intercomcdn.com/i/o/105394724/e6e63ca96e5d5d0587fef68f/_vaqtdeD5WpUn0deaQf6mg5vNd8NzashxrqlyeQyqc7J3YMBPb1aEZ44M-PcLEyVE2VY0Gdcff-NRDxizzHZFldZxwQjAkGVrbpgvBkEghlH9ZPm3mrmvmgsxCDp5llB2j-1hNEO)

At this point, once a new value is received in TTN from the device, a new device is going to be automatically created into your Ubidots account.

- **Data verification**

1\. Go to the device section of your Ubidots account (**Devices > Devices**) to verify the new device created identified with the device EUI.

![](https://downloads.intercomcdn.com/i/o/105394730/547f3a3881903d24ffc36bbb/pY39vPEPOz4ZGKqegIxVSOD9spVYy-w-cAiLLKmzUSN1NUIIvr7J-bBlbX-BHu5rZDVdJVE2cbuatUS9j_a6aIowWI9Ddnwm6lD5HNxBsZitPtX07p7Mw_xlkeGrozZflgawjYQX)

Select the device created to verify the variable in charge of receiving the analog inputs of the board, which in this case is the variable called "**Potentiometer**":

![](https://downloads.intercomcdn.com/i/o/105394736/6dceb5c78fffc06ab58a8eeb/SZiJhkt-zvcuh9lm_F6WmowtNPINl4rxIT0JY6SCVasZTViwLbNlsUIx4QgSvgZeIg9-BTOsc6RIMlLJ9uoxB9Eej9j5O9M_UXGamTS5EIvdj7icx2e3hQD4D-zeHwrOo5M4mubK)

![](https://downloads.intercomcdn.com/i/o/105394739/f59d2d19b15ea7f08f176303/pAP0ba7iCGluwuYngE4lhjIFPQBLuyNhO8JUWyLBk7rMltb5pO8ghKTlH6AiIjOCuuSukwbYb_2G4oRCSiK_u0gybD91TL21THp4iLeTG6VA8O_q79tOEQUy6Xw3jU6b6n3_Uj56)

2\. [ OPTIONAL - **PRO TIP**]: If you are using multiple devices to transmit data, we recommend editing the device name, assigning a [friendly and readable name](https://help.ubidots.com/user-guides/how-to-adjust-the-device-name-and-variable-name) for easier identification:

![](https://downloads.intercomcdn.com/i/o/105394740/5565b3f1870aa20000a23e71/ljQrDjKOjex8c6PZcuM9g_j_5N4JqS4Y5i22E04KkyumpWLbdToQLRTSWvzc7AugfU6zJjDXQh1sQQEdUEHoNq6DmOgLwnGxui0KiduiVmaGFZmFFjBu28qB01vQ3HnWPav0nJ5E)

## 4\. Downlink messages management

To manage downlink messages with Ubidots & TTN, you need to create a new Ubidots Event conditioning a specific variable to trigger the TTN Downlink event. For a detailed explanation about the integration, please refer to [this guide](https://help.ubidots.com/user-guides/events-manage-downlink-messages-with-ttn-and-ubidots).

- **Variable creation**

1\. Create a new raw variable called "**relay**" into the device automatically created after the integration setup. Having as result an empty variable, like the one shown below:

![](https://downloads.intercomcdn.com/i/o/105394742/55f8894f921c50bf4e48913f/rj4odDtb-j4hWx3KWgwbMTn1MS4yTsmef6En8MwkAzCrlFGTaYYvq7nWuNyamj7lCOvHyyf9Xx77PmuRadh1va0khqlJflBXDXHbv-HfzKsDVkDFhubmr0peta6xQr943Y_0ENMQ)

- **Downlink Event creation in Ubidots**

1.  Go to the Event section (**Data > Events**) of your Ubidots account, press the plus orange icon located at the right upper corner to create a new event.

2\. For the trigger logic select the variable previously created "**Relay**" with the following condition: **If the variable's value (relay activated) is equal to 1, then trigger the action.**

Reference to the image below for a better understanding.

![](https://downloads.intercomcdn.com/i/o/105394744/978557671b6d296d214f3f6b/ppEqZ2mv1HYopLIZ6hwQkgTDhjf_kZJ41Kag6sXemIbWiMPR1EfjCp7Q4JvNSlqyC7plIPvZKE-_UznMPtLVO6mUB5U6bvSBlkvbRrO9DEKRTN6MfGQtnZKq0AsG97tysumnH2wv)

**NOTE**: To learn more about the Ubidots Event Logic, refer to [this guide](https://help.ubidots.com/user-guides/events-creating-conditional-events-and-alerts).

To continue, press the right arrow icon located at the bottom-left side of the page.

3\. Select "**TTN Downlink**" as action.

![](https://downloads.intercomcdn.com/i/o/105394745/82266daf76d3946d0770e7dc/rStlh8IKGvRflK3MSOZyXnFkckKJPlwB43pKtYwnXSCRhAwuTET2XisgxT8KyDl5HivJCDcrM8pCr7TgGNA_rovzPqR71ZrqXXk4y77TUNiJP37nSEhPNpuG7TOxtvCXXPqMtF9E)

4\. Assign all the parameters required based on your application. To learn more about where to find the parameters needed in TTN, please refer to their [official documentation](https://help.ubidots.com/user-guides/events-manage-downlink-messages-with-ttn-and-ubidots).

**IMPORTANT NOTE:** The downlink event requires a new generic **HTTP integration** in TTN, different than the uplink one previously created using the **Ubidots integration** to allow the incoming messages from Ubidots.

5\. Taking as reference the use case of a relay, the expected behavior is to schedule a downlink message every time the relay change its status. Then, once a new uplink message is received the scheduled message is sent to the device to change the relay's status.

To do this, in the "**Active trigger**" section, assign the raw value desired to be sent once the variable's value relay is activated (_equal to 1_). It's important to highlight that the raw value needs to be encoded in **base64**

- **Activation trigger - Payload Raw**: 1 - "AQ=="

![](https://downloads.intercomcdn.com/i/o/105394746/69e920971deded4110a42bcc/vKwv1POV3UM7bLcXvf5BCpzUjHvHW0I04hIkSM_fW8eHOmVndynQZtm558weca1eorVg0RPtP1zmNINygfV0-xOuawA_8nH6yZBz5JjuG1Ej8IzWpbQHxf5isk2G5-0C-cNFNTO7)

Similarly, in the "**Back to normal**" section, assign the raw value desired to be sent once the variable's value relay is deactivated (equal to 0).

- **Back to normal - Payload Raw:** 0 - "AA=="

![](https://downloads.intercomcdn.com/i/o/105394747/4ef89396c98e40dfc0e99a89/XPlV6qM1EuwKEmP8LMoePHmW-5p796X-90D32j_2l_sw6zYzEmZR75Bh5j_g98zht1xcH3sHIudlI5w1R9CxPictPbN1AVJWSK8MGHhIDGu4fAsX-HN94a-8-96nydzWo1b8AuPV)

To finish, press the green check icon to save the changes. Then, press the right arrow to finish the event creation.

![](https://downloads.intercomcdn.com/i/o/105394748/9cd934ca530965208a4a13b4/HQ1m4fXHB8JXQ9qWOQLL3Pi613-_DrrJb4O_RTik48lyL0l-gicMT0MQP_nXDR6WG_36EuqTNqFhzanJamOtcSNtApncSHmDlFZ8R20txEa0rIxZRNxhMoG8m2GAQE2M4rtX825v)

- **Data verification**

Now with the downlink integration finished, [create a switch widget](https://help.ubidots.com/user-guides/create-dashboards-and-widgets) related to the relay variable to change its status, and verify how the message is being received in TTN data section. Also, you'll notice how the message is being received in the device too.

![](https://downloads.intercomcdn.com/i/o/105394749/dbe7890f579732afcc6f554c/54KW3m7ptgY5G_85xVdCgJBt40xIezTkG-mgNmomOzSyOcdfxAslm6-4hk99fAzI6fUdHnWMXiiVPFodrL7yvtgIwh0kq8qTD4o_x0bWYQTTQ5ZFbUydgjxMWtT2npOE4aTPEq-w)

## 5\. Demo

Final behavior using TTN & Ubidots to manage uplink/downlink messages:

![](https://downloads.intercomcdn.com/i/o/105396733/f676dee114cfe85b6424090e/ezgif.com-video-to-gif.gif)

## 6\. Summary

LPWAN applications are having a huge impact on the IoT ecosystem, and much more if the integrations required are rapidly to set up, just by [using a few clicks](https://industrial.ubidots.com/accounts/signup_industrial). All of these makes the management of "things" easier for the IoT community, empowering more IoT engineers to grow their deployments fast and reliably

Other users also found helpful:

- [Configure a Multitech Conduit Gateway to forward data to The Things Network (TTN)](https://help.ubidots.com/developer-guides/configure-a-multitech-conduit-gateway-to-forward-data-to-the-things-network-ttn)
- [UbiFunctions: Integrate data from the Sensoterra Platform to Ubidots](https://help.ubidots.com/developer-guides/ubifunctions-integrate-data-from-the-sensoterra-platform-to-ubidots)
- [Connect a SODAQ Autonomo using WiFi with Ubidots over HTTP](https://help.ubidots.com/connect-your-devices/connect-a-sodaq-autonomo-using-wifi-with-ubidots-over-http)
