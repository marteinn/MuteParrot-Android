import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ListView,
    RefreshControl
} from 'react-native';

class FooterNav extends React.Component {
    constructor(props) {
        super(props);
    }

    _onIconPressHandler(item) {
        if (! this.props.onPress) {
            console.log('onPress is not binded on FooterNav');
            return;
        }

        this.props.onPress(item);
    }

    _renderIcon(item, index, size) {
        let selected = this.props.selected === item.name;
        let iconStyles = [
            styles.iconContainer
        ];

        if (selected) {
            iconStyles.push(styles.iconSelected);
        }

        if (index !== size-1) {
            iconStyles.push(styles.iconSeparator);
        }

        return (
            <TouchableOpacity key={item.name} style={styles.iconContainer} onPress={this._onIconPressHandler.bind(this, item)}>
                 <View style={iconStyles}>
                    <Text style={styles.iconText}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const items = [
            {
                name: 'latest',
                title: 'Latest',
            },
            {
                name: 'favorites',
                title: 'Favorites',
            }
        ];

        return (
            <View style={styles.container}>
                {items.map((item, index) => this._renderIcon(item, index, items.length))}
            </View>
        );
    }
}

FooterNav.defaultProps = {
    selected: null,
};

const styles = StyleSheet.create({
    container: {
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderColor: '#CCC',
    },
    iconContainer: {
        flex: 1,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    iconSelected: {
        backgroundColor: '#E6E6E6',
    },
    iconSeparator: {
        borderRightWidth: 1,
        borderColor: '#CCC',
    },
    iconText: {
    }
})

export default FooterNav;
