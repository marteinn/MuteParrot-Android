import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ListView,
    Image,
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
                    <View style={styles.iconWrapperContainer}>
                        <Image
                            source={item.icon}
                            resizeMode={Image.resizeMode.cover}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const items = [
            {
                name: 'latest',
                title: 'Latest',
                icon: require('../img/ic_today_black_24dp.png'),
            },
            {
                name: 'popular',
                title: 'Popular',
                icon: require('../img/ic_whatshot_black_24dp.png'),
            },
            {
                name: 'editorial',
                title: 'Editorial',
                icon: require('../img/ic_trending_up_black_24dp.png'),
            },
            {
                name: 'favorites',
                title: 'Favorites',
                icon: require('../img/ic_star_border_black_24dp.png'),
            },
            {
                name: 'settings',
                title: 'Settings',
                icon: require('../img/ic_more_vert_black_24dp.png'),
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
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderColor: '#CCC',
    },
    iconContainer: {
        height: 55,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    iconWrapperContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
