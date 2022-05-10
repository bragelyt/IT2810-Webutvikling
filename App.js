import React from 'react';
import { Platform, StatusBar, StyleSheet, View} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo';
import Reducer from './reducer/Reducer'

import AppNavigator from './navigation/AppNavigator';

const App = () => {

  const store = createStore(Reducer);

  //apollo client setup
  const cache = new InMemoryCache();
  const client = new ApolloClient({
    uri:'http://it2810-01.idi.ntnu.no:4000/graphql',
    cache
  });

  return (
      <ApolloProvider client = { client }>
        <Provider store = { store }>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </Provider>
      </ApolloProvider>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App