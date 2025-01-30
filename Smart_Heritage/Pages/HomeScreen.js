import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    Image,
    Pressable,
    FlatList,
    ScrollView,
    StyleSheet,
    useWindowDimensions,
    Animated,
    TouchableOpacity
} from 'react-native';
import { SearchBar } from "@rneui/themed";
import Icon from 'react-native-vector-icons/MaterialIcons';




const HomeScreen = ({ navigation }) => {
    const [text, setText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const { width } = useWindowDimensions();
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const fetchSearchResults = async (query) => {
        if (query.length < 1) {
            setSearchResults([]);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`http://192.168.254.3:5028/api/AreaSearch/Search?searchTerm=${query}`);
            const textResponse = await response.text(); // Get raw response as text
            console.log("Raw API Response:", textResponse); // Check the response format

            const jsonResponse = JSON.parse(textResponse); // Try to parse it as JSON
            setSearchResults(jsonResponse);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
        setLoading(false);
    };

    const scrollX = useRef(new Animated.Value(0)).current;
    const categoryScrollX = useRef(new Animated.Value(0)).current;
    const scrollY = useRef(new Animated.Value(0)).current;

    const categories = ["Today's Special", "Most Visited", "Most Popular", "New Arrivals", "Trending"];
    const adventureSpots = ["Shivapuri", "Dhap Dam"];
    const todaysSpecial = ["Concerts", "Gigs"];
    const images = [
        require("../Patan3.png"),
        require("../Patan3.png"),
        require("../Patan3.png"),
    ];

    const handleImageScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
    );

    const onImageViewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveImageIndex(viewableItems[0].index);
        }
    };

    const viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 50,
    };

    const handleCategoryScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: categoryScrollX } } }],
        { useNativeDriver: false }
    );

    const onCategoryViewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveCategoryIndex(viewableItems[0].index);
        }
    };

    const renderButton = ({ item }) => (
        <Pressable style={styles.button}>
            <Text style={styles.buttonText}>{item}</Text>
        </Pressable>
    );

    const renderImage = ({ item }) => (
        <Image source={item} style={[styles.img, { width: width * 0.8 }]} />
    );

    const renderCard = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.cardText}>{item}</Text>
        </View>
    );

    const bottomNavTranslateY = scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [0, 100],
        extrapolate: "clamp"
    });

    return (
        <View style={{ flex: 1 }}>
            <Animated.ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingBottom: 80 }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            >
                
                <View style={styles.header}>
                    <Text style={styles.title}>Location</Text>
                    <Text style={styles.subTitle}>Kathmandu ▼</Text>
                </View>
                
                <View style={{ position: "relative", zIndex: 10 }}>
                    <SearchBar
                        placeholder="Search place..."
                        value={text}
                        onChangeText={(value) => {
                            setText(value);
                            fetchSearchResults(value);
                        }}
                        platform="default"
                        lightTheme
                        round
                        containerStyle={styles.searchContainer}
                        inputContainerStyle={styles.searchInput}
                        showLoading={loading}
                    />
                    

                    {searchResults.length > 0 && (
                        <View style={styles.searchResultsContainer}>
                            <FlatList
                                data={searchResults}
                                renderItem={({ item }) => (
                                    <Pressable
                                        style={styles.searchItem}
                                        onPress={() => {
                                            navigation.navigate("DownloadData", { place: item });
                                            setText(""); // Clear search
                                            setSearchResults([]); // Hide results
                                        }}
                                    >
                                        <Text style={styles.searchItemText}>{item.name}</Text>
                                    </Pressable>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                                contentContainerStyle={{ paddingBottom: 10 }}
                            />
                        </View>
                    )}
                    
                </View>
                

                <View style={styles.buttonWrapper}>
                    <FlatList
                        data={categories}
                        renderItem={renderButton}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.buttonContainer}
                        pagingEnabled
                        onScroll={handleCategoryScroll}
                        viewabilityConfig={viewabilityConfig}
                        onViewableItemsChanged={onCategoryViewableItemsChanged}
                    />
                    <View style={styles.dotContainer}>
                        {categories.map((_, index) => (
                            <View
                                key={index}
                                style={[styles.dot, { backgroundColor: index === activeCategoryIndex ? "#a188f8" : "#ccc" }]}
                            />
                        ))}
                    </View>
                </View>

                <View>
                    <FlatList
                        data={images}
                        renderItem={renderImage}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.imageContainer}
                        onScroll={handleImageScroll}
                        viewabilityConfig={viewabilityConfig}
                        onViewableItemsChanged={onImageViewableItemsChanged}
                    />
                    <View style={styles.dotContainer}>
                        {images.map((_, index) => (
                            <View
                                key={index}
                                style={[styles.dot, { backgroundColor: index === activeImageIndex ? "#a188f8" : "#ccc" }]}
                            />
                        ))}
                    </View>
                    {/* Adventure Section */}
                    <Text style={styles.sectionTitle}>Adventure:</Text>
                    <FlatList
                        data={adventureSpots}
                        renderItem={renderCard}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.listContainer}
                    />

                    {/* Today's Special Section */}
                    <Text style={styles.sectionTitle}>Today's Special:</Text>
                    <FlatList
                        data={todaysSpecial}
                        renderItem={renderCard}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.listContainer}
                    />
                    {/* Adventure Section */}
                    <Text style={styles.sectionTitle}>Adventure:</Text>
                    <FlatList
                        data={adventureSpots}
                        renderItem={renderCard}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.listContainer}
                    />

                    {/* Today's Special Section */}
                    <Text style={styles.sectionTitle}>Today's Special:</Text>
                    <FlatList
                        data={todaysSpecial}
                        renderItem={renderCard}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.listContainer}
                    />
                </View>
            </Animated.ScrollView>

            {/* Floating Bottom Navigation Bar */}
            <Animated.View style={[styles.bottomNav, { transform: [{ translateY: bottomNavTranslateY }] }]}>

                {/* <TouchableOpacity style={styles.navItem}><Text style={styles.navText}>Home</Text></TouchableOpacity>
                <TouchableOpacity style={styles.navItem}><Text style={styles.navText}>Statement</Text></TouchableOpacity>
                <TouchableOpacity style={styles.floatingButton}><Text style={styles.floatingButtonText}>+</Text></TouchableOpacity>
                <TouchableOpacity style={styles.navItem}><Text style={styles.navText}>Support</Text></TouchableOpacity>
                <TouchableOpacity style={styles.navItem}><Text style={styles.navText}>More</Text></TouchableOpacity> */}
                <View style={styles.bottomNav}>
                    <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("HomeScreen")}>
                        <Icon name="home" size={30} color="white" />
                        <Text style={styles.navText}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("DownloadData")} >
                        <Icon name="receipt" size={30} right={15} color="white" />
                        <Text style={styles.navText} right={15}>Download</Text>
                    </TouchableOpacity>

                    {/* Floating Button (Inside Cutout) */}
                    <View style={styles.cutoutContainer}>
                        <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate("bluetooth")}>
                            <Text style={styles.floatingButtonText}>📍</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.navItem}>
                        <Icon name="support-agent" size={30} left={15} color="white" />
                        <Text style={styles.navText} left={15}>Support</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navItem}>
                        <Icon name="menu" size={30} color="white" />
                        <Text style={styles.navText}>More</Text>
                    </TouchableOpacity>

                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1a434e",
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 35,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    subTitle: {
        fontSize: 18,
        color: '#fff',
    },
    buttonWrapper: {
        marginVertical: 10,
    },
    buttonContainer: {
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: "#a188f8",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginHorizontal: 5,
        elevation: 2,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    imageContainer: {
        marginBottom: 8,
    },
    img: {
        borderRadius: 12,
        height: 200,
        alignSelf: "center",
        marginHorizontal: 10,
    },
    dotContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 20,
        marginVertical: 10,
    },
    listContainer: {
        paddingHorizontal: 10,
    },
    card: {
        backgroundColor: "#FAF3E0",
        padding: 12,
        borderRadius: 12,
        marginHorizontal: 10,
        elevation: 2,
        alignItems: "center",
        justifyContent: "center",
        width: 120,
    },
    cardText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    searchContainer: {
        width: "90%",
        alignSelf: "center",
        marginVertical: 0,
        backgroundColor: "transparent",
        borderBottomWidth: 0,
        borderTopWidth: 0,
    },
    searchInput: {
        backgroundColor: "#FAF3E0",
        borderRadius: 20,
        padding: 0,
    },
    searchResultsContainer: {
        backgroundColor: "#ffffff",
        position: "absolute",
        top: 60,
        left: 10,
        right: 10,
        borderRadius: 5,
        zIndex: 10,
        elevation: 5,
        maxHeight: 200,
    },
    searchItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#aaaaaa",
    },
    searchItemText: {
        fontSize: 16,
    },

    bottomNav: {
        borderRadius: 20,
        position: "absolute",
        bottom: 1,
        left: 2,
        right: 2,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#1a1a1a",
        paddingVertical: 15,
        height: 70,  // Increase height to accommodate cutout
        //borderTopLeftRadius: 40,  // Create the rounded cutout
        //borderTopRightRadius: 40, // Create the rounded cutout
    },
    navItem: {
        flex: 1,
        alignItems: "center",
    },
    navText: {
        top: 4,
        color: "white",
        fontSize: 14,
    },
    floatingButton: {
        position: "absolute",
        bottom: 0,  // Position it inside the cutout
        left: "58%",
        transform: [{ translateX: -30 }],  // Centers the button
        backgroundColor: "#52796f",
        width: 50,
        height: 50,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        top: 8
    },

    floatingButtonText: {
        color: "white",
        fontSize: 28,
        fontWeight: "bold",
    },
    navBarWrapper: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        alignItems: "center",
    },
    cutoutContainer: {
        position: "absolute",
        top: -30,
        left: "50%",
        marginLeft: -30,
        width: 60,
        height: 63,
        borderRadius: 30,
        backgroundColor: "#1a434e",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default HomeScreen;
