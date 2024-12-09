import { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

const DownloadData = () => {
  const [returned, setReturned] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch("http://192.168.18.45:5028/api/controller", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log("Fetched Data:", json); // Debug
      if (Array.isArray(json)) {
        setReturned(json);
      } else {
        console.error("API response is not an array.");
        setError("Unexpected response format.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setError("Failed to fetch data.");
    }
  };

  return (
    <View>
      {error ? (
        <Text style={styles.txt}>{error}</Text>
      ) : returned.length > 0 ? (
        <FlatList
          data={returned}
          keyExtractor={(item) => item.areaID?.toString() || Math.random().toString()} // Ensure a unique key
          renderItem={({ item }) => (
            <View style={styles.bleCard}>
              <Text style={styles.txt}>Area ID: {item.areaID}</Text>
              <Text style={styles.txt}>Name: {item.name}</Text>
              <Text style={styles.txt}>Description: {item.description}</Text>
              <Text style={styles.txt}>Location: {item.location}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.txt}>No data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  txt: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
  bleCard: {
    width: "90%",
    padding: 10,
    alignSelf: "center",
    marginVertical: 10, // Fixed typo
    backgroundColor: "grey",
    elevation: 5,
    borderRadius: 5,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});

export default DownloadData;
