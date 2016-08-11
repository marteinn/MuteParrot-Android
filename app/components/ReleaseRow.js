import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Image
} from 'react-native';

class ReleaseRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visited: props.visited,
        };
    }

    setNativeProps(nativeProps) {
        this._root.setNativeProps(nativeProps);
    }

    _onPressHandler(item) {
        this.props.onRowPress(this.props.release);

        this.setState({
            visited: true
        });
    }

    _renderVisitedIcon() {
        return (
            <View style={styles.visitedIconContainer}>
                <Text>✓</Text>
            </View>
        );
    }

    render() {
        return (
            <TouchableHighlight onPress={this._onPressHandler.bind(this)}>
                <View style={styles.item} ref={component => this._root = component} {...this.props}>
                    <Image source={{uri: this.props.release.cover}} style={styles.cover} />
                    <View style={styles.textContainer}>
                        <View style={styles.topContainer}>
                            <Text style={styles.releaseText} numberOfLines={1}>{this.props.release.name}</Text>
                            <Text style={styles.artistText} numberOfLines={1}>{this.props.release.artist}</Text>
                        </View>
                        <View style={styles.footerContainer}>
                            <Text style={styles.createdText}>Grade: {this.props.release.average_ranking}</Text>
                        </View>
                    </View>
                    {this.state.visited ? this._renderVisitedIcon() : null}
                </View>
            </TouchableHighlight>

        )
    }
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF'
    },
    cover: {
        height: 100,
        width: 100
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        marginRight: 12,
        justifyContent: 'space-between',
    },
    topContainer: {
        marginTop: 12
    },
    footerContainer: {
        marginBottom: 12
    },
    artistText: {
        fontSize: 15,
        color: '#222221',
    },
    releaseText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222221',
    },
    createdText: {
        fontSize: 15,
        color: '#222221',
    },
    visitedIconContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        marginRight: 10,
    },
});

export default ReleaseRow;
