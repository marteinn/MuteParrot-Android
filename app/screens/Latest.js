import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView
} from 'react-native';
import {connect} from 'react-redux'
import {fetchReleases} from '../actions/releases';
import ReleaseList from '../components/ReleaseList';

class Latest extends Component {
    componentDidMount() {
        this.props.dispatch(fetchReleases('latest'));
    }

    onReleaseListPressHandler(item) {
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

    onEndReachedHandler() {
        if (this.props.isFetching) {
            return;
        }

        this.props.dispatch(fetchReleases('latest'));
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <Text style={styles.navbarTitleText}>Latest releases</Text>
                </View>
                <ReleaseList
                    style={styles.listContainer}
                    items={this.props.items}
                    visited={this.props.visited}
                    onListPress={this.onReleaseListPressHandler.bind(this)}
                    onEndReached={this.onEndReachedHandler.bind(this)}
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
    navbar: {
        height: 50,
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
});

const mapStateToProps = (state, ownProps) => {
    let categoryState = Object.assign({
        isFetching: false,
        ids: []
    }, state.releasesByCategory.latest);

    let items = categoryState.ids.map((id) => state.releases[id]);

    return {
        isFetching: categoryState.isFetching,
        items,
        visited: state.visited,
    }
}


Latest = connect(mapStateToProps)(Latest);

Latest.defaultProps = {
    isFetching: false,
    items: [],
    visited: []
}

export default Latest;
