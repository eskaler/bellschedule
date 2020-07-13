#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WiFiMulti.h> 
#include <ESP8266mDNS.h>
#include <ESP8266WebServer.h>

#include <ArduinoJson.h>
#include <TimeLib.h>

#define PIN_BELL 5
#define PIN_LEDCONNECTED 4
#define PIN_BUTTON 0

class Bell {
public:
  int h = -1;
  int m = -1;
};
class Profile {
public:
  Bell bells[50];
  int bellsCount;
};

Profile profiles[5];
int profilesCount = 0;
int schedule[7] = {0,0,0,0,0,0,0};
Bell NEXTBELL;
Bell PREVBELL;
int bellDuration;

String weekdays[7] = {"BC", "/7H", "BT", "CP", "4T", "/7T", "C6" };

ESP8266WiFiMulti wifiMulti;     
ESP8266WebServer server(80);    
void handleRoot();              

bool systemReady = false;

void setup(void){

  pinMode(PIN_LEDCONNECTED, OUTPUT);
  digitalWrite(PIN_LEDCONNECTED, LOW);
  pinMode(PIN_BELL, OUTPUT);
  digitalWrite(PIN_BELL, LOW);

  pinMode(PIN_BUTTON, INPUT_PULLUP);  
   
  Serial.begin(115200);         
  delay(10);

  wifiMulti.addAP("TP-LINK_FB402A");   // add Wi-Fi networks you want to connect to
  wifiMulti.addAP("WIFI-24", "41073345");   
  wifiMulti.addAP("ap", "11112222");
  wifiMulti.addAP("WIFIMIFI", "105352575");

  Serial.println("Connecting ...");
  int i = 0;
  while (wifiMulti.run() != WL_CONNECTED) { // Wait for the Wi-Fi to connect: scan for Wi-Fi networks, and connect to the strongest of the networks above
    delay(250);
    Serial.print('.');
  }
  Serial.println('\n');
  Serial.print("Connected to ");
  Serial.println(WiFi.SSID());               
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP());            
  digitalWrite(PIN_LEDCONNECTED, HIGH);

  if (MDNS.begin("esp8266")) {              // Start the mDNS responder for esp8266.local
    Serial.println("mDNS responder started");
  } else {
    Serial.println("Error setting up MDNS responder!");
  }

  
  server.on("/schedule", HTTP_POST, handleSchedule); 
  server.begin();                            
  Serial.println("HTTP server started");

  
  Serial.println("Waiting for schedule");
  while(!systemReady){
    if(wifiMulti.run() != WL_CONNECTED){
      setup();
    }
    Serial.print(".");
    server.handleClient();                     
    delay(1000);
  }

  Serial.println("Turning off wifi");
  WiFi.forceSleepBegin();
  digitalWrite(PIN_LEDCONNECTED, LOW);
  Serial.println("Turned off");
  
}

void loop(void){
  ring(getNextBell());
    
  for(int i = 0; i < 6; i++){
    if (digitalRead(PIN_BUTTON) == LOW) {
      blinkLed(3);
      digitalWrite(PIN_BELL, HIGH);
      delay(3000);
      digitalWrite(PIN_BELL, LOW);
      systemReady=false;
      setup();
    };    
    delay(5000);
    blinkLed(1);
  }
  
}

void blinkLed(int times){
  while(times != 0){
    digitalWrite(PIN_LEDCONNECTED, HIGH);
    delay(50);
    digitalWrite(PIN_LEDCONNECTED, LOW);
    delay(50);
    times--;  
  }
  return;
}

Bell getNextBell() {
  Serial.println("getNextBell() called");
  if(profilesCount != 0){
    int week = weekday();
    Serial.print(" weekday: ");
    Serial.print(week);
    Serial.print(" profile scheduled: ");
    int profileId = schedule[week-1];
    Serial.print(profileId);

    if(profileId != -1){
      Profile daySchedule = profiles[profileId];
      int h = hour();
      int m = minute();
      Serial.print(" h:");
      Serial.print(h);
      Serial.print(" m:");
      Serial.print(m);
      Serial.print(" s");
      Serial.print(second());
      Serial.print("\n");
      for(int i = 0; i < daySchedule.bellsCount; i++){
        Serial.print("bellh:");
        Serial.print(daySchedule.bells[i].h);
        Serial.print("bellm:");
        Serial.print(daySchedule.bells[i].m);
        Serial.print("\n");
        if(h == daySchedule.bells[i].h and m == daySchedule.bells[i].m){
          Serial.println("got hit!");  
          return daySchedule.bells[i];
        }
      }
    }
    else{
      Serial.println("Guess there are no bells today!");
    }
  }
  Bell nextBell;
  return nextBell;
}

void ring(Bell bell){
  Serial.print("ring() called\nh:");
  Serial.print(bell.h);
  Serial.print(" m:");
  Serial.print(bell.m);
  Serial.print("\nPREVBELL h: ");
  Serial.print(PREVBELL.h);
  Serial.print(" m:");
  Serial.print(PREVBELL.m);
  Serial.print("\n");
  if(bell.h != -1 and bell.m != -1 and !(bell.h == PREVBELL.h and bell.m == PREVBELL.m)){
    Serial.println("RINGING STARTS!");
    digitalWrite(PIN_BELL, HIGH);
    delay(bellDuration * 1000);
    digitalWrite(PIN_BELL, LOW);
    Serial.println("RINGING STOPS!");
    PREVBELL = bell;
  }
}


void handleSchedule(){
  Serial.println("/schedule called");
  if (server.hasArg("plain")== false){ //Check if body received
    server.send(200, "text/plain", "Body not received");
    return;
  }
  else{
//    Serial.println(hour(), minute());
    
    StaticJsonDocument<20000> doc;
    deserializeJson(doc, server.arg("plain"));
                    //hr                //min                //sec              //day             //month              //year
    setTime(int(doc["date"][0]),int(doc["date"][1]),int(doc["date"][2]),int(doc["date"][3]),int(doc["date"][4]),int(doc["date"][5]));
    
    profilesCount = doc["profiles"][0][0]; 
    bellDuration = int(doc["bellDuration"]);
    
    Serial.println(profilesCount);
    
    for(int i = 1; i < profilesCount; i++){
      Serial.print("profile: "),
      Serial.print(i);
      Serial.print(" profileLen: ");
      int profileCount = int(doc["profiles"][i][0]);
      Profile newProfile;
      
      Serial.print(profileCount);
      Serial.print('\n');
      int k = 0;
      for(int j = 1; j < profileCount; j+=2){
        Bell newBell;
        newBell.h = int(doc["profiles"][i][j]);
        newBell.m = int(doc["profiles"][i][j+1]);
        Serial.print(newBell.h);
        Serial.print(':');
        Serial.print(newBell.m);
        Serial.print('\n');
        newProfile.bells[k] = newBell;
        k++;
      }
      newProfile.bellsCount = k; 
      profiles[i-1] = newProfile;
    }
    for(int d = 0; d < 7; d++){   
      Serial.print(int(doc["schedule"][d]));  
      Serial.print(" sch before: ");  
      Serial.print(schedule[d]);
      schedule[d] = int(doc["schedule"][d]);
      Serial.print(" sch after: ");  
      Serial.print(schedule[d]);
      Serial.print("\n");  
    };
    Bell newPrevBell;
    PREVBELL = newPrevBell;
    systemReady = true;
    
    server.send(200, "text/html", scheduleHtml());
  }
  
}


String scheduleHtml() {  
  
  String htmlResponse = "";
  Bell nextBell = getNextBell();
  htmlResponse += nextBell.h;
  htmlResponse += " ";
  htmlResponse += nextBell.m;
  htmlResponse += " (";
  htmlResponse += weekday();
  htmlResponse += " ";
  htmlResponse += weekdays[weekday()-1];
  htmlResponse += ") ";
  htmlResponse += hour();
  htmlResponse += ":";
  htmlResponse += minute();
  htmlResponse += ":";
  htmlResponse += second();
  htmlResponse += "<p>";
  for(int d = 0; d < 7; d++){
    htmlResponse += d;
    htmlResponse += " ";
    htmlResponse += weekdays[d];
    htmlResponse += "(";
    htmlResponse += schedule[d];
    htmlResponse += ") --- ";
  }
  htmlResponse += "</p>";
  for(int i = 0; i < profilesCount-1; i++){
    htmlResponse += "<p>";
    htmlResponse += i;
    htmlResponse += ' ';
    htmlResponse += profiles[i].bellsCount;
    htmlResponse += "</p><ol>";
    for(int j = 0; j < profiles[i].bellsCount-1; j++){
      htmlResponse += "<li>";
      htmlResponse += profiles[i].bells[j].h;
      htmlResponse += ':'; 
      htmlResponse += profiles[i].bells[j].m;
      htmlResponse += "</li>";
    }
    htmlResponse += "</ol>";
  }
  return htmlResponse;
}
