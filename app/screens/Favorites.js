import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    ActivityIndicator,
    ToolbarAndroid
} from 'react-native';
import {connect} from 'react-redux'
import {
    fetchReleases,
    fetchMoreReleases,
} from '../actions/releases';
import Toolbar from '../components/Toolbar';
import ReleaseList from '../components/ReleaseList';
import FooterNav from '../components/FooterNav';
import NavigatorUtils from '../utils/NavigatorUtils';

class Favorites extends Component {
    componentDidMount() {
        this.props.dispatch(fetchReleases('latest'));
    }

    _onReleaseListPressHandler(item) {
        if (! this.props.navigator) {
            console.log('Missing navigator props');
            return;
        }

        this.props.navigator.push({
            name: 'detail',
            passProps: {
                slug: item.slug
            }
        });
    }

    _onEndReachedHandler() {
        if (this.props.isFetching) {
            return;
        }

        this.props.dispatch(fetchMoreReleases('latest'));
    }

    _onListRefreshHandler() {
        if (this.props.isFetching) {
            return;
        }

        this.props.dispatch(fetchReleases('latest'));
    }

    _onFooterNavPressHandler(item) {
        NavigatorUtils.jumpToOrPush({
            name: item.name
        }, this.props.navigator);
    }

    _renderPlaceholderView() {
        return (
            <View style={styles.placeholderContainer}>
                <Image
                    style={{width: 48, height: 48, marginBottom: 20}}
                    source={require('../img/ic_star_white_24dp.png')}
                    resizeMode={Image.resizeMode.cover}
                />
                <Text style={styles.placeholderText}>Releases you star will show up here</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Toolbar
                    style={styles.toolbar}
                    title='Your Favorites'
                />
                {! this.props.items.length ? this._renderPlaceholderView() : null}

                {this.props.items.length ?
                    <ReleaseList
                        style={styles.listContainer}
                        items={this.props.items}
                        visited={this.props.visited}
                        onListPress={this._onReleaseListPressHandler.bind(this)}
                        onEndReached={this._onEndReachedHandler.bind(this)}
                    />
                : null}
                <FooterNav
                    selected='favorites'
                    onPress={this._onFooterNavPressHandler.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#13212F',
        backgroundColor: '#13212F',
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    toolbar: {
    },
    listContainer: {
        flex: 1,
    },
    loader: {
        fontSize: 10,
        textAlign: 'center',
        //margin: 10,
    },
    placeholderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#13212F',
    },
    placeholderText: {
        color: '#FFF'
    }
});

const formatSections = (data) => {
    return {
        'Favorites': data,
    };
}

const mapStateToProps = (state, ownProps) => {
    let items = state.favorites.map((id) => state.releases[id]);

    return {
        isFetching: false,
        items,
        visited: state.visited,
    }
}


Favorites = connect(mapStateToProps)(Favorites);

Favorites.defaultProps = {
    isFetching: false,
    items: [],
    visited: []
}

export default Favorites;
