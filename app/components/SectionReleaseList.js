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
import SectionHeader from './SectionHeader';


class SectionReleaseList extends React.Component {
    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.state = {
            items: this.props.items,
            dataSource: ds.cloneWithRowsAndSections(this.props.items),
            refreshing: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.items !== this.props.items) {
            this.setState({
                items: nextProps.items,
                //dataSource: this.state.dataSource.cloneWithRows(nextProps.items)
                dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.items)
            })
        }
    }

    _onRowPressHandler(item) {
        this.props.onListPress(item);
    }

    _onRefresh() {
        this.props.onListRefresh();
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

    _renderRow(item, sectionId, rowId) {
        let visited = this.props.visited.includes(item.slug);

        return (
            <ReleaseRow release={item} visited={visited} onRowPress={this._onRowPressHandler.bind(this)} />
        );
    }

    render() {
        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
                renderSeparator={(sectionId, rowId) => <View key={`${sectionId}separator${rowId}`} style={styles.separator} />}
                renderSectionHeader={(sectionData, sectionId) => <SectionHeader title={sectionId} />}
                renderFooter={this._onRenderFooter.bind(this)}
                onEndReached={this.props.onEndReached.bind(this)}
                onEndReachedThreshold={200}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
            />
        );
    }
}

SectionReleaseList.defaultProps = {
    items: [],
    visited: [],
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

export default SectionReleaseList;
