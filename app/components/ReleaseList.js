import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ListView,
    TouchableHighlight,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import {connect} from 'react-redux'
import {fetchReleases} from '../actions/releases';
import ReleaseRow from './ReleaseRow';


class ReleaseList extends React.Component {
    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });

        this.state = {
            items: this.props.items,
            dataSource: ds.cloneWithRows(this.props.items),
            refreshing: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.items !== this.props.items) {
            this.setState({
                items: nextProps.items,
                dataSource: this.state.dataSource.cloneWithRows(nextProps.items)
            })
        }
    }

    _onRowPressHandler(item) {
        this.props.onListPress(item);
    }

    _onRefresh() {
        this.props.onListRefresh();
    }

    _renderRow(item, sectionId, rowId) {
        let visited = this.props.visited.includes(item.slug);

        return (
            <ReleaseRow release={item} visited={visited} onRowPress={this._onRowPressHandler.bind(this)} />
        );
    }

    _refreshControl() {
        return (
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
            />
        );
    }

    _onRenderFooter() {
        if (! this.props.isFetching) {
            return null;
        }

        return (
            <View style={styles.footerPreloaderContainer}>
                <ActivityIndicator size="large" color="#222222" />
            </View>
        );
    }

    render() {
        let refreshControl = null;

        if (this.props.onListRefresh) {
            refreshControl = this._refreshControl();
        }

        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
                renderSeparator={(sectionId, rowId) => <View key={`${sectionId}separator${rowId}`} style={styles.separator} />}
                renderFooter={this._onRenderFooter.bind(this)}
                onEndReached={this.props.onEndReached.bind(this)}
                onEndReachedThreshold={200}
                refreshControl={refreshControl}
n
            />
        );
    }
}

ReleaseList.defaultProps = {
    items: [],
    visited: [],
    isFetching: false,
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    sectionText: {
        color: '#FFFFFF'
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#13212F',
    },
    footerPreloaderContainer: {
        backgroundColor: '#FFF',
        paddingTop: 20,
        paddingBottom: 20
    }
});

export default ReleaseList;
