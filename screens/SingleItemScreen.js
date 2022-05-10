import React from 'react';
import { connect } from "react-redux";
import { compose } from "redux";
import { graphql } from "react-apollo";
import { GET_SINGLE_ITEM } from "../graphQL/Queries";
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Button,
    SafeAreaView,
    AsyncStorage,
} from "react-native";


const SingleItemScreen = (props) => {


    /** Funcitons for removing and adding favorites from database. Also updates AsyncStorage **/
    const removeFavorite = () => {
        let favs = [...props.favorites];
        favs = favs.filter((value) => value !== props.item_chosen);
        props.setFavorites(favs);
        setAsyncStore(favs)
    };

    const addFavorite = () => {
        let favs = [...props.favorites];
        favs.push(props.item_chosen);
        props.setFavorites(favs);
        setAsyncStore(favs);
    };

    /** Toggle favourite button dependent on item is favorite of loged in user **/
    /** Remove button if user not logged in **/
    const favButton = () => {
        if (props.favorites.includes(props.item_chosen)) {
            return(
                <Button title={"Remove from favorites"} size="small" onPress= { () => removeFavorite()} />
            )
        }
        else {
            return (
                <Button title={"Add as favorite"} size="small" onPress={() => addFavorite()}/>
            )
        }
    };


    let data = props.GetSingleItem;
    if(data.error){
        return(<Text>{ data.error.message }</Text>)
    }
    else if(data.loading){
        return(<Text>Loading...</Text>)
    }
    data = data.listing;


    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <ScrollView>
                    <View style = {styles.grid} >
                        <View style = {styles.imageGrid}>
                            <Image style = {styles.image} source={{uri: data.picture_url}} />
                        </View>
                        <View style = { styles.titleGrid }>
                            <Text style={ styles.titleText } >{ data.name }</Text>
                            <Text>Cost: { data.price }</Text>
                        </View>
                        <View style = {styles.infoGrid}>
                            <View style={styles.infoTextGrid}>
                                <Text style={ styles.infoText }>{ data.host_name }</Text>
                                <Text style={ styles.infoText }>Answers { data.host_response_time }</Text>
                                <Text style={ styles.infoText }>{ data.host_is_superhost==='t' ? 'Superhost': 'Not a Superhost' }</Text>
                            </View>
                            <View style={styles.infoImageGrid}>
                                <Image style = {styles.infoImage} source={{uri: data.host_picture_url}} />
                            </View>
                        </View>
                        <View style = {styles.infoGrid}>
                            <View style={styles.infoImageGrid}>
                                <Image style = {styles.infoImage} source={{uri: data.picture_url}} />
                            </View>
                            <View style={styles.infoTextGrid}>
                                <Text style={ styles.infoText }>{ data.room_type }</Text>
                                <Text style={ styles.infoText }>Beds: {data.beds}</Text>
                                <Text style={ styles.infoText }>Minimum nights: {data.minimum_nights}</Text>
                            </View>
                        </View>
                            { favButton() }
                        <View style = { styles.textGrid }>
                            <Text style={ styles.infoText }>Description: </Text>
                            <Text style={ styles.descText }>{ data.description }</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
};

/** Updates AsyncStorage to reflect new favs**/
async function setAsyncStore(favs){
    try {
        await AsyncStorage.setItem('FAVS', JSON.stringify(favs));
        await console.log(await AsyncStorage.getItem("FAVS"))
    }
    catch (error) {
        console.log(error)
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    safeContainer: {
        flex: 1,
        backgroundColor: "#000",
    },
    grid: {
        backgroundColor: "white",
        flexDirection: 'column',
    },
    imageGrid: {
        flex: 2,
        flexDirection: 'row',
    },
    textGrid: {
        flex: 1,
        flexDirection: 'column',
        fontWeight: "bold",
        marginLeft: 12,
        marginRight: 12,
        marginTop: 12,
    },
    infoGrid: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 12,
    },
    infoTextGrid: {
        flex: 2,
        alignItems: "center",
        marginTop: 12,
        marginBottom: 12
    },
    infoImageGrid: {
        flex: 1,
        marginLeft: 12,
        marginRight: 12,
    },
    image: {
        width: "100%",
        height: 200,
    },
    titleGrid: {
        alignItems: "center",
        margin: 12,
    },
    titleText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
    infoText: {
        fontSize: 16,
        fontWeight: "bold"
    },
    infoImage: {
        width: "100%",
        height: 100,
    },
    descText: {
    }
});


/** Pushes current state from redux into props of component **/
const mapStateToProps = (state) => {
    return {
        item_chosen: state.item_chosen,
        favorites: state.favorites,
    }
};

/** Removes header form  view **/
SingleItemScreen.navigationOptions = {
    header: null,
};


/** Connects Redux state update functions to props of exported function **/
const mapDispatchToProps = (dispatch) => {
    return{
        setFavorites: (favorites) => dispatch({type: 'SET_FAVORITES', favorites: favorites}),
    }
};


/**Under we have all the queries used by item page for loading and gathering information from database**/
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    graphql(GET_SINGLE_ITEM, {
        name: "GetSingleItem",
        options:(props) => {
            return{
                variables: {
                    id: props.item_chosen
                }
            }
        }
    }),
)(SingleItemScreen);