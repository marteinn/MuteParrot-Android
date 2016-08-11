import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ListView
} from 'react-native';

const SectionHeader = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.sectionText}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 12,
        //backgroundColor: '#99FFFF'
    },
    sectionText: {
        //color: '#13212F',
        color: '#99FFFF'
    }
});

export default SectionHeader;
