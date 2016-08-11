import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

class ReleaseRow extends React.Component {
    setNativeProps(nativeProps) {
        this._root.setNativeProps(nativeProps);
    }

    render() {
        return (
            <View style={styles.item} ref={component => this._root = component} {...this.props}>
                <Image source={{uri: this.props.release.cover}} style={styles.photo} />
                <View style={styles.textContainer}>
                    <View style={styles.topContainer}>
                        <Text style={styles.releaseText} numberOfLines={1}>{this.props.release.name}</Text>
                        <Text style={styles.artistText} numberOfLines={1}>{this.props.release.artist}</Text>
                    </View>
                    <View style={styles.footerContainer}>
                        <Text style={styles.createdText}>Grade: {this.props.release.list_ranking/10}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF'
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
    },
    releaseText: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    createdText: {
        fontSize: 15
    },
    photo: {
        height: 100,
        width: 100
    }
});

export default ReleaseRow;
