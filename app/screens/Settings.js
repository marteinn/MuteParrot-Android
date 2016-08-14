import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Picker,
    ActivityIndicator,
    ToolbarAndroid
} from 'react-native';
import {connect} from 'react-redux'
import {writeSetting} from '../actions/settings';
import {writeCountry} from '../actions/country';
import {fetchCountries} from '../actions/countries';
import Toolbar from '../components/Toolbar';
import ReleaseList from '../components/ReleaseList';
import FooterNav from '../components/FooterNav';
import NavigatorUtils from '../utils/NavigatorUtils';

class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            country: 'java',
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchCountries());
    }

    _onCountryValueChangeHandler(value) {
        this.props.dispatch(writeCountry(value));
    }

    _onStreamValueChangeHandler(value) {
        this.props.dispatch(writeSetting('stream', value));
    }

    _onFooterNavPressHandler(item) {
        NavigatorUtils.jumpToOrPush({
            name: item.name
        }, this.props.navigator);
    }

    render() {
        let countries = this.props.countries.map((country, index) => {
            return <Picker.Item key={index} label={country.name} value={country.code} />
        });

        let streamServices = [
            {
                name: 'All',
                id: 'spotify,itunes',
            },
            {
                name: 'Spotify',
                id: 'spotify'
            },
            {
                name: 'iTunes',
                id: 'itunes',
            }
        ];


        let streamItems = streamServices.map((item, index) => {
            return <Picker.Item key={index} label={item.name} value={item.id} />
        });

        return (
            <View style={styles.container}>
                <Toolbar
                    style={styles.toolbar}
                    title='Settings'
                />
                <View style={styles.contentContainer}>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.inputLabelText}>Your country</Text>
                            <Picker
                                style={styles.inputSelector}
                                selectedValue={this.props.country}
                                onValueChange={this._onCountryValueChangeHandler.bind(this)}>
                            {countries}

                        </Picker>
                    </View>

                    <View style={styles.sectionContainer}>
                        <Text style={styles.inputLabelText}>Streaming service</Text>
                        <Picker
                            style={styles.inputSelector}
                            selectedValue={this.props.settings.stream}
                            onValueChange={this._onStreamValueChangeHandler.bind(this)}>
                            {streamItems}
                        </Picker>
                    </View>
                </View>
                <FooterNav
                    style={{height: 45}}
                    selected='settings'
                    onPress={this._onFooterNavPressHandler.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    toolbar: {
    },
    contentContainer: {
        flex: 1,
    },
    inputLabelText: {
        //color: '#FFF'
    },
    inputSelector: {
        //color: '#FFF'
    },
    sectionContainer: {
        paddingTop: 10,
        paddingLeft: 20,
        paddingBottom: 10,
        paddingRight: 20,
        borderTopWidth: 1,
        borderColor: '#CCC',
    }
});

const mapStateToProps = (state, ownProps) => {
    let settings = state.settings;

    return {
        settings,
        country: state.country.code,
        countries: state.countries,
    }
}


Settings = connect(mapStateToProps)(Settings);

Settings.defaultProps = {
    country: {},
}

export default Settings;
