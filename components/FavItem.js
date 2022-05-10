import React from 'react';
import {connect} from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    Image, TouchableOpacity,
} from 'react-native';
import {compose} from "redux";
import {graphql} from "react-apollo";
import { GET_SINGLE_ITEM } from "../graphQL/Queries";

function SearchResultItem(props) {

    /** Fetches item info from Query**/
    let data = props.GetSingleItem;
    if(data.error){
        return(<Text>{ data.error.message }</Text>)
    }
    else if(data.loading){
        return(<Text>Loading...</Text>)
    }
    data = data.listing;
    const {
        id, name, picture_url, neighbourhood,
        beds, price, minimum_nights
    } = data;

    return(
        <TouchableOpacity onPress = { () => { props.onItemChosen(id); props.navigation.navigate('SingleItem')}}>
            <View style = {styles.listingGrid}>
                <View style = {styles.imageGrid}>
                    <Image style = {styles.images} source={{uri: picture_url }} />
                </View>
                <View style = {styles.textGrid}>
                    <View style = {styles.titleGrid}>
                        <Text style = {styles.titleText} numberOfLines={2}>
                            {name}
                        </Text>
                    </View>
                    <Text style = {styles.descText}>Price: { price }</Text>
                    <View style = {styles.descGrid}>
                        <Text style = {styles.descText}>{ neighbourhood }</Text>
                    </View>
                    <Text style = {styles.descText}>Beds: { beds } | Nights: { minimum_nights }</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    listingGrid: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 12,
    },
    imageGrid: {
        flex: 2,
        flexDirection: 'column',
    },
    textGrid: {
        flex: 3,
        flexDirection: 'column',
        marginLeft: 12,
    },
    titleGrid: {
        flexDirection: 'row',
    },
    descGrid: {
        flexDirection: 'row',
    },
    images: {
        width: "100%",
        height: 100
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 14,
    },
    descText: {
        fontSize: 12,
    }
});

/** Sets functions needed to update Redux store with reducers declared in store/reducer.js **/
const mapDispatchToProps = (dispatch) => {
    return{
        onItemChosen: (val) => dispatch({type: 'ITEM_CHOSEN', val: val})
    }
};

/** connects the store to component export **/
export default compose(
    connect(null, mapDispatchToProps),
    graphql(GET_SINGLE_ITEM, {
        name: "GetSingleItem",
        options:(props) => {
            return{
                variables: {
                    id: props.id
                }
            }
        }
    })
)(SearchResultItem);