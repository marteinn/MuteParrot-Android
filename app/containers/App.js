import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator,
    ActivityIndicator
} from 'react-native';
import {connect} from 'react-redux'
import Latest from '../screens/Latest';
import Detail from '../screens/Detail';
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

    navigatorRenderScene(route, navigator) {
        switch(route.name) {
            case 'latest':
                return <Latest style={styles.contentContainer} navigator={navigator} {...route.passProps} />
            case 'detail':
                return <Detail style={styles.contentContainer} navigator={navigator} {...route.passProps} />
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
        const routes = [
            {title: 'Latest', name: 'latest', index: 0},
            //{title: 'Detail', name: 'detail', index: 1},
        ];

        if (this.props.country === null) {
            return this._renderPlaceholderView();
        }

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

    if (state.country) {
        country = state.country.code;
    }

    return {
        country
    };
}


App = connect(mapStateToProps)(App);

App.defaultProps = {
    country: null,
}

export default App;
