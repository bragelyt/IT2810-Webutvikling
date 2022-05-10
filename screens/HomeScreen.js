import React, {useState} from 'react';
import { connect } from "react-redux";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Button,
  Slider,
  SafeAreaView, AsyncStorage,
} from 'react-native';
import {
  SearchBar,
  CheckBox,
} from 'react-native-elements';
import SearchResult from "../components/SearchResult";


const HomeScreen = (props) => {

  const [search, setSearch] = useState("");
  const [beds, setBeds] = useState(0);
  const [nights, setNights] = useState(20);
  const [sorter, setSorter] = useState("beds");
  const [pages, setPages] = React.useState(props.pages[props.pages.length-1]);

  if(props.favorites === null){
    setFavorites()
        .then(favs => props.setFavorites(favs))
  }


  const addNewPage  = () => {
    if(props.lastPage){
      return
    }
    let newPages = props.pages;
    newPages.push(pages+1);
    props.onPagination(newPages);
    setPages(pages + 1);
  };


  const handleSearch = () =>{
    props.onSearch(search, beds, nights, sorter);
    props.setPages([0])
    setPages(0)
  };


  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <ScrollView
          onScroll = {(e) => {
            let paddingToBottom = 10;
            paddingToBottom += e.nativeEvent.layoutMeasurement.height;
            if(e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
              addNewPage()
            }
          }}
          scrollEventThrottle = {500}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
        <View style={styles.logoContainer}>
          <Image
              source={require('../assets/images/AptScroller.png')}
              style={styles.logoImage}
          />
        </View>
        <View style={styles.sliderContainer}>
          <SearchBar
              containerStyle={{backgroundColor: 'white', borderColor: "black", borderWidth: 1, borderRadius: 8}}
              placeholder="Search for District..."
              onChangeText={val => setSearch(val)}
              value={search}
              onBlur={() => handleSearch()}
          />
          <CheckBox
              center
              title = { "Number of beds: " + beds }
              checked = { sorter === "beds" }
              onPress = {() => {setSorter("beds") }}
          />
          <Slider
              value={ beds }
              onValueChange={val => setBeds(val)}
              minimumValue={0} maximumValue={16} step={1}
          />
          <CheckBox
              center
              title = { "Number of nights: " + (nights===20 ? ">20" : nights) }
              checked = { sorter === "minimum_nights" }
              onPress = {() => {setSorter("minimum_nights")}}
          />
          <Slider
              value={ nights }
              onValueChange={val => setNights(val)}
              minimumValue={0} maximumValue={20} step={1}
          />
          <Button title="Search" onPress={() => handleSearch()}/>
        </View>
        <View>
          {
            props.pages.map(page => (
              <View key={"page:"+page}  style={styles.resultsContainer}>
                <SearchResult key={ page } page={ page } navigation = { props.navigation }/>
              </View>
            ))
          }
        </View>
      </ScrollView>
    </View>
  </SafeAreaView>
  );
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
    marginTop: 30,
    alignItems: 'center',
    marginBottom: 20,
    flex:1
  },
  logoImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  sliderContainer: {
    marginHorizontal: 20,
    marginBottom: 20
  },
  resultsContainer: {
    marginHorizontal: 20,
  }
});

/** Fetcher stored favs from AsyncStorage if exists and updates Redux accordingly **/
async function setFavorites() {
  let newFavs = []
  try {
    const favs = await AsyncStorage.getItem("FAVS");
    if (favs !== null){
      return(JSON.parse(favs))
    }
  }
  catch (error) {
    console.log(error);
  }
  return newFavs
};

/** no header in view**/
HomeScreen.navigationOptions = {
  header: null,
};

/** Connect chosen states from redux to props of exported function **/
const mapStateToProps = (state) => {
  return{
    search: state.search,
    pages: state.pages,
    sorter: state.sorter,
    favorites: state.favorites,
  }

};

/** Connects Redux state update functions to props of exported function **/
const mapDispatchToProps = (dispatch) => {
  return{
    onSearch: (search, beds, nights, sorter) => dispatch({type: 'SEARCH', search: search, minBeds: beds, minNights: nights, sorter: sorter}),
    setPages: (pages) => dispatch({type: "PAGES", pages: pages}),
    onPagination: (pages) => dispatch({type:"PAGES", pages: pages}),
    onLastPage: (val) => dispatch({type: 'LAST_PAGE', val: val}),
    setFavorites: (favorites) => dispatch({type: 'SET_FAVORITES', favorites: favorites}),
  }
};

/** connects the store to component export **/
export default connect(
    mapStateToProps, mapDispatchToProps
)(HomeScreen);