import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { connect } from "react-redux";
import { compose } from "redux";
import { graphql } from "react-apollo";
import { GET_SEARCH_RESULTS } from "../graphQL/Queries";
import SearchResultItem from "./SearchResultItem";

const SearchResult = (props) => {
    /** Fetches item info from Query dependent on page**/
    function displayListings() {
        let data = props.GetSearchResults;
        if(data.error){
            return(<Text>{ data.error.message }</Text>) //{ data.error.message }
        }
        else if(data.loading){
            return(<Text style={{textAlign: "center"}}>Loading...</Text>)
        }
        else if(data.listings.length === 0){
            if (props.lastPage === false) {
                props.onLastPage(true)
            }
        }
        else{
            return data.listings.map(listing => (
                    <SearchResultItem key = { listing.id } data = { listing } navigation = { props.navigation }/>
                )
            )
        }
    };

    return(
        <View style={ styles.resultGrid }>
            { displayListings() }
        </View>
    )
};

const styles = StyleSheet.create({
    resultGrid: {
        margin: 0
    },
})

/** Connect chosen states from redux to props of exported function **/
const mapStateToProps = (state) => {
    return{
        search: state.search,
        minBeds: state.minBeds,
        minNights: state.minNights,
        sorter: state.sorter,
        lastPage: state.lastPage,
    }
};

/** Connects Redux state update functions to props of exported function **/
const mapDispatchToProps = (dispatch) => {
    return{
        onLastPage: (val) => dispatch({type: 'LAST_PAGE', val: val}),
    }
};

/** connects the store to component export **/
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    graphql(GET_SEARCH_RESULTS, {
        name: "GetSearchResults",
        options:(props) => {
            return{
                variables: {
                    neighbourhood: props.search,
                    beds: props.minBeds,
                    minimum_nights: props.minNights,
                    sorter: props.sorter,
                    page: props.page,
                }
            }
        }
    })
)(SearchResult);