import React, { useEffect } from "react";
import {
  View,
  Text,
  Platform,
  PermissionsAndroid,
  NativeModules,
  NativeEventEmitter,
  FlatList,
} from "react-native";
import BleManager from "react-native-ble-manager";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native";

const ExploreScreen = ({ navigation }) => {
  const [isScanning, setScanning] = useState(false);
  const [devices, setDevices] = useState([]);
  const BleManagerModule = NativeModules.BleManager;
  const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

  //scan available devices
  const handleGetAvailableDevices = () => {
    BleManager.getDiscoveredPeripherals().then((peripherals) => {
      // Success code
      if (peripherals.length === 0) {
        console.log("No device found");
        startScanning();
      } else {
        console.log(peripherals);
        //first filter out devices with required ID
        const filteredDevices = peripherals.filter(
          (item) =>
            item.name !== null &&
            (item.id == "E4:65:B8:83:DC:62" ||
              item.id == "E4:65:B8:83:F6:AA" ||
              item.id == "E4:65:B8:83:D8:8E")
        );
        setDevices((prevDevices) => {
          // Combine previous devices with new ones (avoid duplicates)
          const newDevices = filteredDevices.filter(
            (newDevice) =>
              !prevDevices.some((device) => device.id === newDevice.id)
          );
          return [...prevDevices, ...newDevices];
        });
      }
    });
  };

  useEffect(() => {
    let stopListener = BleManagerEmitter.addListener(
      "BleManagerStopScan",
      () => {
        setScanning(false);
        handleGetAvailableDevices();
        console.log("stop scan");
      }
    );
    return () => stopListener.remove();
  }, []);
 

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

  //code to start scan
  const startScanning = () => {
    if (!isScanning) {
      BleManager.scan([], 10, true)
        .then(() => {
          // Success code
          console.log("Scan started");
        })
        .catch((err) => {
          console.error(err);
        });
      setScanning(true);
    }
  };
  useEffect(() => {
    BleManager.start({ showAlert: false }).then(() => {
      // Success code
      console.log("Module initialized");
    });
  });
  useEffect(() => {
    BleManager.enableBluetooth()
      .then(() => {
        // Success code
        console.log("The bluetooth is already enabled or the user confirm");
        requestPermission();
      })
      .catch((error) => {
        // Failure code
        console.log("The user refuse to enable bluetooth");
      });
  }, []);

  useEffect(() => {
    // Set up the repeated scanning every 5 seconds
    const interval = setInterval(() => {
      if (!isScanning) {
        startScanning();
      }
    }, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [isScanning]);
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.bleCard}>
        <Text>{item.name}</Text>
        <Text>{item.id}</Text>
        <Text>{item.rssi}</Text>
      </View>
    );
  };

  //FE
  return (
    <View>
      <View style={StyleSheet.container}>
        {isScanning ? (
          <View style={styles.ripple}>
            <Text> Scanning...</Text>
            <ActivityIndicator size="large" style={styles.ripple} />
          </View>
        ) : (
          <View>
            <FlatList
              data={devices}
              keyExtractor={(item) => item.id || item.uuid}
              renderItem={renderItem}
            />
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  txt: {
    color: "black",
  },
  container: {
    flex: 1,
  },
  ripple: {
    flex: 1,
    justifyContent: "Center",
    alignItems: "center",
  },
  bleCard: {
    width: "90%",
    padding: 10,
    alignSelf: "center",
    marginVerical: 10,
    backgroundColor: "grey",
    elevation: 5,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default ExploreScreen;
