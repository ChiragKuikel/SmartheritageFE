import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  PermissionsAndroid,
  NativeModules,
  NativeEventEmitter,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import BleManager from "react-native-ble-manager";
import assets from "../assets/assets";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

const tabNavigator2 = () => {
  <Tab.Navigator
    initialRouteName="homeName"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let rn = route.name;
        if (rn === homeName) {
          iconName = focused ? "home" : "home-outline";
        } else if (rn === Download) {
          iconName = focused ? "list" : "list-outline";
        } else if (rn === settingsName) {
          iconName = focused ? "settings" : "settings-outline";
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name={homeName} component={HomePage} />
    <Tab.Screen name={Download} component={DownloadData} />
    {/*<Tab.Screen name={settingsName} component={{}} /> Removing settings for now coz no functionality*/}
    <Tab.Screen name={aboutName} component={AboutPage} />
  </Tab.Navigator>;
};
const ExploreScreen = ({ navigation }) => {
  const tab = createBottomTabNavigator();
  const homeName = "Home";
  const Download = "Download";
  const settingsName = "Settings";
  const aboutName = "Aboutus";

  const imageMap = {
    "Krishna Mandir": require("../assets/Krishnamandir.jpg"),
    "Bhimsen Temple": require("../assets/bhimsenmandir.jpg"),
    "Taleju Bhawani Temple": require("../assets/talejubhawanimandir.jpg"),
    KrishnaMandir: require("../assets/Krishnamandir.jpg"),
  };
  const handleInfoPress = (name) => {
    navigation.navigate("buildingInfoName", { name });
  };

  const [isScanning, setScanning] = useState(false);
  const [devices, setDevices] = useState([]);

  const BleManagerModule = NativeModules.BleManager;
  const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

  // Start scanning for BLE devices
  const startScanning = () => {
    if (!isScanning) {
      BleManager.scan([], 5, true)
        .then(() => {
          console.log("Scan started");
          setScanning(true);
        })
        .catch((err) => {
          console.error("Scan error:", err);
        });
    }
  };

  // Fetch and update discovered devices
  const handleGetAvailableDevices = () => {
    BleManager.getDiscoveredPeripherals()
      .then((peripherals) => {
        if (peripherals.length === 0) {
          console.log("No device found");
          startScanning();
        } else {
          console.log("Discovered Peripherals:", peripherals);

          // Filter devices based on specific IDs
          const filteredDevices = peripherals.filter(
            (item) =>
              item.name !== null &&
              (item.id === "E4:65:B8:83:DC:62" ||
                item.id === "E4:65:B8:83:F6:AA" ||
                item.id === "E4:65:B8:83:D8:8E")
          );

          setDevices((prevDevices) => {
            // Update RSSI for existing devices and add new ones
            const updatedDevices = filteredDevices.map((newDevice) => {
              const existingDevice = prevDevices.find(
                (device) => device.id === newDevice.id
              );
              return existingDevice
                ? { ...existingDevice, rssi: newDevice.rssi }
                : newDevice;
            });

            // Merge updated devices with previous devices
            const combinedDevices = [
              ...updatedDevices,
              ...prevDevices.filter(
                (prevDevice) =>
                  !updatedDevices.some(
                    (updatedDevice) => updatedDevice.id === prevDevice.id
                  )
              ),
            ];

            // Find the device with the highest RSSI
            const highestRssiDevice = combinedDevices.reduce(
              (max, device) =>
                device.rssi > (max?.rssi ?? -Infinity) ? device : max,
              { rssi: -Infinity }
            );

            console.log("Highest RSSI Device:", highestRssiDevice);
            return highestRssiDevice ? [highestRssiDevice] : [];
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching peripherals:", error);
      });
  };

  // Permissions for BLE
  const requestPermission = async () => {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    ]);

    if (granted) {
      startScanning();
    }
  };

  // Listener for stop scan event
  useEffect(() => {
    const stopListener = BleManagerEmitter.addListener(
      "BleManagerStopScan",
      () => {
        setScanning(false);
        handleGetAvailableDevices();
        console.log("Scan stopped");
      }
    );
    return () => stopListener.remove();
  }, []);

  // Initialize BLE Manager
  useEffect(() => {
    BleManager.start({ showAlert: false })
      .then(() => {
        console.log("BLE Module initialized");
      })
      .catch((err) => console.error("Error initializing BLE module:", err));
  }, []);

  // Enable Bluetooth and request permissions
  useEffect(() => {
    BleManager.enableBluetooth()
      .then(() => {
        console.log("Bluetooth is enabled");
        requestPermission();
      })
      .catch((error) => {
        console.error("Bluetooth enabling error:", error);
      });
  }, []);

  // Periodic scanning
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isScanning) {
        startScanning();
      }
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval
  }, [isScanning]);

  // Render a single BLE device
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.bleCard}
      onPress={() => {
        handleInfoPress(item.name); //item.name huna parne ho
      }}
    >
      <Image source={imageMap[item.name]} style={styles.buildingimage} />
      <Text style={{ fontSize: 18, left: 5, fontWeight: "bold" }}>
        {`You are near " ${item.name} " `}
      </Text>
      <Text style={{ position: "absolute", bottom: 0, right: 10, fontSize: 9 }}>
        CLICK TO VIEW INFO
      </Text>
    </TouchableOpacity>
  );

  // UI
  return (
    <View style={styles.container}>
      {isScanning ? (
        <View style={styles.ripple}>
          <Text style={{ color: "white" }}>Scanning...</Text>
          <ActivityIndicator size="small" style={styles.ripple} />
        </View>
      ) : (
        <Text style={styles.rippleText}>Scanning stopped...</Text>
      )}

      <FlatList
        data={devices} //datadevices huna parne ho yesma
        keyExtractor={(item) => item.id || item.uuid}
        renderItem={renderItem}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a434e",
  },
  ripple: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  rippleText: {
    display: "flex",
    textAlign: "right",
    color: "white",
  },
  bleCard: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 10,
    margin: 15,
    height: 350,
    justifyContent: "center",
    position: "relative,",
  },
  buildingimage: {
    width: "95%",
    alignSelf: "center",
    height: 300,
    borderRadius: 20,
    overflow: "hidden",
  },
});

export default ExploreScreen;
