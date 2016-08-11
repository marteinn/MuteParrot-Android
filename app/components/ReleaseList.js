import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ListView,
    TouchableHighlight,
    RefreshControl
} from 'react-native';
import {connect} from 'react-redux'
import moment from 'moment';
import {fetchReleases} from '../actions/releases';
import ReleaseRow from './ReleaseRow';
import SectionHeader from './SectionHeader';


class ReleaseList extends React.Component {
    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });
        this.state = {
            dataSource: ds.cloneWithRows([props.items]),
            refreshing: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.items !== this.props.items) {
            let sectionData = this._formatSections(nextProps.items);

            this.setState({
                items: nextProps.items,
                //dataSource: this.state.dataSource.cloneWithRows(nextProps.items)
                dataSource: this.state.dataSource.cloneWithRowsAndSections(sectionData)
            })
        }
    }

    _formatSections(data) {
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

    _onRowPressHandler(item) {
        this.props.onListPress(item);
    }

    _onRefresh() {
        console.log('onRefresh!');
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
                onEndReached={this.props.onEndReached.bind(this)}
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

ReleaseList.defaultProps = {
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
});

export default ReleaseList;
