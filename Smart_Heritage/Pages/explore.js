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
  Button, ScrollView,
} from "react-native";
import BleManager from "react-native-ble-manager";


const ExploreScreen = ({ navigation }) => {
  const handleInfoPress = (name) => {
    navigation.navigate("buildingInfoName",{name});
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
            const highestRssiDevice = combinedDevices.reduce((max, device) =>
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
    <View>
      <View style={styles.bleCard}>
        <Text>{item.name}</Text>
        <Text>{item.id}</Text>
        <Text>{item.rssi}</Text>
      </View>
      <Button 
  title={`You are near " ${item.name} " CLICK TO VIEW INFO`} 
onPress={()=>{handleInfoPress(item.name)}} 
/>
    </View>
  );

  // UI
  return (
    <View style={styles.container}>
      {isScanning ? (
        <View style={styles.ripple}>
          <Text>Scanning...</Text>
          <ActivityIndicator size="large" style={styles.ripple} />
        </View>
      ) : (
        <FlatList
          data={devices}
          keyExtractor={(item) => item.id || item.uuid}
          renderItem={renderItem}
        />
      )}
      
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ripple: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bleCard: {
    width: "90%",
    padding: 10,
    alignSelf: "center",
    marginVertical: 10,
    backgroundColor: "grey",
    elevation: 5,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
 
});

export default ExploreScreen;
