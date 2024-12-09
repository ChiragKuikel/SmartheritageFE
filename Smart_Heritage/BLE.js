import { BleManager } from "react-native-ble-plx";
class BLEServiceInstance {
  
    constructor() {
      this.manager = new BleManager()
    }
  }
  
  export const BLEService = new BLEServiceInstance()