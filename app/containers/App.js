import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator,
    ActivityIndicator
} from 'react-native';
import {connect} from 'react-redux'
import Intro from '../screens/Intro';
import Latest from '../screens/Latest';
import Detail from '../screens/Detail';
import Popular from '../screens/Popular';
import Editorial from '../screens/Editorial';
import Favorites from '../screens/Favorites';
import {fetchCountry} from '../actions/country';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.country === null) {
            this.props.dispatch(fetchCountry());
        }
    }

    _navigatorConfigureSceneHandler(route, routeStack) {
        return Navigator.SceneConfigs.PushFromRight;
    }

    _navigatorRenderSceneHandler(route, navigator) {
        switch(route.name) {
            case 'intro':
                return <Intro style={styles.contentContainer} navigator={navigator} {...route.passProps} />;
            case 'latest':
                return <Latest style={styles.contentContainer} navigator={navigator} {...route.passProps} />;
            case 'detail':
                return <Detail style={styles.contentContainer} navigator={navigator} {...route.passProps} />;
            case 'favorites':
                return <Favorites style={styles.contentContainer} navigator={navigator} {...route.passProps} />;
            case 'editorial':
                return <Editorial style={styles.contentContainer} navigator={navigator} {...route.passProps} />;
            case 'popular':
                return <Popular style={styles.contentContainer} navigator={navigator} {...route.passProps} />;
            default:
                return null;
        }
    }

    _renderPlaceholderView() {
        return (
            <View style={styles.preloaderContainer}>
                <ActivityIndicator size="large" color="#99FFFF" />
            </View>
        );
    }

    render() {
        let routes = [
            {title: 'Latest', name: 'latest', index: 1},
            {title: 'Popular', name: 'popular', index: 2},
            {title: 'Editorial', name: 'editorial', index: 3},
            {title: 'Favorites', name: 'favorites', index: 4},
        ];

        if (this.props.settings.firstOpening) {
            routes.unshift({
                title: 'Intro',
                name: 'intro',
                index: 0
            });
        }

        if (this.props.country === null) {
            return this._renderPlaceholderView();
        }

        return (
            <Navigator
                style={styles.container}
                initialRoute={routes[0]}
                initialRouteStack={routes}
                renderScene={this._navigatorRenderSceneHandler.bind(this)}
                configureScene={this._navigatorConfigureSceneHandler.bind(this)}
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
    },
    preloaderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#13212F',
    },
});

const mapStateToProps = (state, ownProps) => {
    let country = null;
    let settings = state.settings;

    if (state.country) {
        country = state.country.code;
    }

    return {
        country,
        settings,
    };
}


App = connect(mapStateToProps)(App);

App.defaultProps = {
    country: null,
}

export default App;
