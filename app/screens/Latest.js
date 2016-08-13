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
import moment from 'moment';
import SectionReleaseList from '../components/SectionReleaseList';
import FooterNav from '../components/FooterNav';
import NavigatorUtils from '../utils/NavigatorUtils';

class Latest extends Component {
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

    _onFooterNavPressHandler(item) {
        NavigatorUtils.jumpToOrPush({
            name: item.name
        }, this.props.navigator);
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


    _renderPlaceholderView() {
        return (
            <View style={styles.preloaderContainer}>
                <ActivityIndicator size="large" color="#99FFFF" />
            </View>
        );
    }

    render() {
        if (! Object.keys(this.props.items).length) {
            return this._renderPlaceholderView();
        }

        return (
            <View style={styles.container}>
                <SectionReleaseList
                    style={styles.listContainer}
                    items={this.props.items}
                    visited={this.props.visited}
                    onListPress={this._onReleaseListPressHandler.bind(this)}
                    onEndReached={this._onEndReachedHandler.bind(this)}
                    onListRefresh={this._onListRefreshHandler.bind(this)}
                />
                <FooterNav
                    style={{height: 45}}
                    selected='latest'
                    onPress={this._onFooterNavPressHandler.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    preloaderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#13212F',
    },
});


const formatSections = (data) => {
    let sectionData = {};
    let today = moment().format('YYYY-MM-DD');
    data.map((item) => {
        let key = item.published.substr(0, 10);

        if (key === today) {
            key = 'Today';
        }

        if (! sectionData[key]) {
            sectionData[key] = [];
        }

        sectionData[key].push(item);
    });

    return sectionData;
}

const mapStateToProps = (state, ownProps) => {
    let categoryState = Object.assign({
        isFetching: false,
        ids: []
    }, state.releasesByCategory.latest);

    let items = categoryState.ids.map((id) => state.releases[id]);
    items = formatSections(items);

    return {
        isFetching: categoryState.isFetching,
        items,
        visited: state.visited,
    }
}


Latest = connect(mapStateToProps)(Latest);

Latest.defaultProps = {
    isFetching: false,
    items: {},
    visited: []
}

export default Latest;
