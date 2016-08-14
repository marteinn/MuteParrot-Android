import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    ToolbarAndroid
} from 'react-native';

const Toolbar = (props) => {
    return (
        <View style={styles.toolbarContainer}>
            <ToolbarAndroid
                style={styles.toolbar}
                title={props.title}
                titleColor='#FFF'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    toolbarContainer: {
        //borderBottomWidth: 1,
        //borderColor: '#CCC',
    },
    toolbar: {
        height: 55,
        backgroundColor: '#FFF',
        backgroundColor: '#13212F',
    },
});

export default Toolbar;
