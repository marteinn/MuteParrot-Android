import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    ActivityIndicator,
    TouchableOpacity,
    Image
} from 'react-native';
import {connect} from 'react-redux'
import {writeSetting} from '../actions/settings';
import NavigatorUtils from '../utils/NavigatorUtils';

class Intro extends Component {
    _onOkPressHandler() {
        this.props.dispatch(writeSetting('firstOpening', false));

        let routes = this.props.navigator.getCurrentRoutes();

        NavigatorUtils.jumpToOrPush({
            name: 'latest'
        }, this.props.navigator);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logoImage}
                    source={require('../img/logo_mp.png')}
                    resizeMode={Image.resizeMode.cover}
                    />

                <View style={styles.textContainer}>
                    <Text style={styles.text}>MuteParrot is a tool that lets you listen to the latest music besed on the best reviews.</Text>
                    <Text style={[styles.text, styles.sublineText]}>We release up to 10 releases every weekday.</Text>
                </View>

                <TouchableOpacity onPress={this._onOkPressHandler.bind(this)}>
                    <View style={styles.okContainer}>
                        <Text style={styles.okText}>Start discovering!</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#13212F',
    },
    logoImage: {
        width: 200,
        height: 200,
        paddingLeft: 40,
        paddingRight: 40,
    },
    textContainer: {
        marginTop: 25,
    },
    text: {
        fontSize: 15,
        paddingLeft: 40,
        paddingRight: 40,
        color: '#FFF',
        textAlign: 'center',
        color: '#99FFFF',
    },
    sublineText: {
        marginTop: 10,
    },
    okContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        backgroundColor: '#99FFFF',
        paddingTop: 5,
        paddingLeft: 35,
        paddingBottom: 5,
        paddingRight: 35,
        borderRadius: 15,
        height: 35,
    },
    okText: {
        color: '#000'
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
    }
}

Intro = connect(mapStateToProps)(Intro);

Intro.defaultProps = {
    isFetching: false,
    items: [],
    visited: []
}

export default Intro;
