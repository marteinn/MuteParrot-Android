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
                <ReleaseList
                    style={styles.listContainer}
                    items={this.props.items}
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
        items
    }
}


Latest = connect(mapStateToProps)(Latest);

Latest.defaultProps = {
    isFetching: false,
    items: []
}

export default Latest;
