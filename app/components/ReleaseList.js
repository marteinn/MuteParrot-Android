import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ListView,
    TouchableHighlight
} from 'react-native';
import {connect} from 'react-redux'
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
            dataSource: ds.cloneWithRows([props.items])
        };
    }

    formatSections(data) {
        let sectionData = {};
        data.map((item) => {
            let key = item.published.substr(0, 10);

            if (! sectionData[key]) {
                sectionData[key] = [];
            }

            sectionData[key].push(item);
        });

        return sectionData;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.items !== this.props.items) {
            let sectionData = this.formatSections(nextProps.items);

            this.setState({
                items: nextProps.items,
                //dataSource: this.state.dataSource.cloneWithRows(nextProps.items)
                dataSource: this.state.dataSource.cloneWithRowsAndSections(sectionData)
            })
        }
    }

    onRowPressHandler(item) {
        this.props.onListPress(item);
    }

    render() {
        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(item, sectionId, rowId) => {
                    return (
                        <TouchableHighlight onPress={this.onRowPressHandler.bind(this, item)}>
                            <ReleaseRow release={item} />
                        </TouchableHighlight>
                    )
                }}
                renderSeparator={(sectionId, rowId) => <View key={`${sectionId}separator${rowId}`} style={styles.separator} />}
                renderSectionHeader={(sectionData, sectionId) => <SectionHeader title={sectionId} />}
                onEndReached={this.props.onEndReached.bind(this)}
            />
        );
    }
}

ReleaseList.defaultProps = {
    items: []
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
