import React from "react";
import {
    Platform, SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import UserFavListings from "../components/UserFavListings"


const UserScreen = (props) => {
    return(
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.logoContainer}>
                        <Ionicons
                            name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
                            size={80}
                            style={styles.logoContainer}
                            color="#000"
                        />
                    </View>
                    <View style ={styles.titleGrid}>
                        <Text style={styles.titleText}>User Page</Text>
                    </View>
                    <View style = { styles.favGrid }>
                        <Text style = { styles.infoText }>
                            Your favourites:
                        </Text>
                        <View style = { styles.favListings }>
                            <UserFavListings navigation = { props.navigation } />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "#000",
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logoContainer:{
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
        flex:1
    },
    titleGrid: {
        marginTop: 0,
        flex: 1,
        alignContent: "center",
    },
    favGrid: {
        marginTop: 20,
    },
    favListings: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 18,
        alignContent: "center",
    },
    titleText: {
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
    },
    infoText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
});

/** No header on view**/
UserScreen.navigationOptions = {
    header: null,
};

export default (UserScreen);