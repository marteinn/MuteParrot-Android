import React, {Component} from 'react';
import {StyleSheet, Text, View, Navigator} from 'react-native';
import Latest from '../screens/Latest';
import Detail from '../screens/Detail';

class App extends Component {
    navigatorRenderScene(route, navigator) {
        console.log(route);

        switch(route.name) {
            case 'latest':
                return <Latest style={styles.contentContainer} navigator={navigator} {...route.passProps} />
            case 'detail':
                return <Detail style={styles.contentContainer} navigator={navigator} {...route.passProps} />
            default:
                return null;
        }
    }

    render() {
        const routes = [
            {title: 'Latest', name: 'latest', index: 0},
            //{title: 'Detail', name: 'detail', index: 1},
        ];

        return (
            <Navigator
                style={styles.container}
                initialRoute={routes[0]}
                initialRouteStack={routes}
                renderScene={this.navigatorRenderScene}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#13212F'
    },
    contentContainer: {
        flex: 1
    }
});

export default App;
