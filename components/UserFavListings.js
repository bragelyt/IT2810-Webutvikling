import React from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";
import {connect} from "react-redux";

import FavItem from "./FavItem";

const UserFavListings = (props) => {

    const displayListings = () => {
        if(props.favorites.length === 0){
            return(<Text style = { styles.favText }>
                You have no favorites
            </Text>)
        }
        return(<View>
            {
                props.favorites.map((id) =>
                    <FavItem id = { id } key = { id } navigation = { props.navigation } /> )
            }
        </View>)
    };

    /** Runs the displayfunciton shown described over **/
    return (
        <View>
            {displayListings()}
        </View>
    )
};

const styles = StyleSheet.create({
    favText: {
        marginTop: 30,
        fontSize: 16,
        textAlign: "center",
    },
});

/** Fetches Redux store state and puts into class props ***/
const mapStateToProps = (state) => {
    return{
        favorites: state.favorites,
    }

};

/** connects the store to component export **/
export default connect(mapStateToProps)(UserFavListings);
