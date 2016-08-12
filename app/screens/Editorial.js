import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    ActivityIndicator,
    ToolbarAndroid
} from 'react-native';
import {connect} from 'react-redux'
import {
    fetchReleases,
    fetchMoreReleases,
} from '../actions/releases';
import ReleaseList from '../components/ReleaseList';
import FooterNav from '../components/FooterNav';
import NavigatorUtils from '../utils/NavigatorUtils';

class Editorial extends Component {
    componentDidMount() {
        this.props.dispatch(fetchReleases('editorial'));
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

        this.props.dispatch(fetchMoreReleases('editorial'));
    }

    _onListRefreshHandler() {
        if (this.props.isFetching) {
            return;
        }

        this.props.dispatch(fetchReleases('editorial'));
    }

    _onFooterNavPressHandler(item) {
        NavigatorUtils.jumpToOrPush({
            name: item.name
        }, this.props.navigator);
    }

    _renderPlaceholderView() {
        return (
            <View style={styles.placeholderContainer}>
                <Text style={styles.placeholderText}>No favourites found!</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {! this.props.items.length ? this._renderPlaceholderView() : null}

                {this.props.items.length ?
                    <ReleaseList
                        style={styles.listContainer}
                        items={this.props.items}
                        visited={this.props.visited}
                        onListPress={this._onReleaseListPressHandler.bind(this)}
                        onEndReached={this._onEndReachedHandler.bind(this)}
                        onListRefresh={this._onListRefreshHandler.bind(this)}
                    />
                : null}
                <FooterNav
                    style={{height: 45}}
                    selected='editorial'
                    onPress={this._onFooterNavPressHandler.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#13212F',
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    toolbar: {
        height: 56,
        //backgroundColor: '#E6E6E6',
    },
    navbar: {
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    navbarTitleText: {
        color: '#FFF',
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
    let categoryState = Object.assign({
        isFetching: false,
        ids: []
    }, state.releasesByCategory.editorial);

    let items = categoryState.ids.map((id) => state.releases[id]);

    return {
        isFetching: false,
        items,
        visited: state.visited,
    }
}


Editorial = connect(mapStateToProps)(Editorial);

Editorial.defaultProps = {
    isFetching: false,
    items: [],
    visited: []
}

export default Editorial;
