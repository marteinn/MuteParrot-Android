import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    Linking,
    InteractionManager,
    ActivityIndicator
} from 'react-native';
import {connect} from 'react-redux'

class Detail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {renderPlaceholderOnly: true};
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
    }

    onBackPressHandler() {
        this.props.navigator.pop();
    }

    onPlayPressHandler() {
        let streams = this.props.release.streams;
        let slug = streams[0].slug;

        let url = `https://open.spotify.com/album/${slug}`;

        Linking.openURL(url)
            .catch(err => console.error('An error occurred', err));
    }

    _renderPlaceholderView() {
        return (
            <View style={styles.preloaderContainer}>
                <ActivityIndicator size="large" color="#99FFFF" />
            </View>
        );
    }

    render() {
        //if (this.state.renderPlaceholderOnly) {
            //return this._renderPlaceholderView();
        //}

        return (
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableHighlight onPress={this.onBackPressHandler.bind(this)}>
                        <View style={styles.backContainer}>
                            <Text style={styles.backText}>Back</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight>
                        <View style={styles.favouriteContainer}>
                            <Text style={styles.favouriteText}>Favourite (1)</Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <View style={styles.contentContainer}>
                    <TouchableHighlight onPress={this.onPlayPressHandler.bind(this)}>
                        <View style={styles.coverContainer}>
                            <Image source={{uri: this.props.release.cover}} style={styles.coverImage} resizeMode={Image.resizeMode.contain} />
                        </View>
                    </TouchableHighlight>

                    <View style={styles.releaseContainer}>
                        <Text style={styles.nameText}>{this.props.release.name}</Text>
                        <Text style={styles.artistText}>{this.props.release.artist}</Text>
                    </View>

                    <TouchableHighlight onPress={this.onPlayPressHandler.bind(this)}>
                        <View style={styles.playContainer}>
                            <Text style={styles.playText}>PLAY</Text>
                        </View>
                    </TouchableHighlight>

                    <View style={styles.rankingContainer}>
                        <Text style={styles.rankingLabelText}>Grade: </Text>
                        <View style={styles.rankingSymbolContainer}>
                            <Text style={styles.rankingSymbolText}>{this.props.release.list_ranking/10}</Text>
                        </View>
                    </View>

                    <View style={styles.genresContainer}>
                        {this.props.release.genres.map((genre, index) => {
                            return (
                                <View style={styles.genreContainer} key={index}>
                                    <Text style={styles.genreText}>{genre.name}</Text>
                                </View>
                            );
                        })}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#13212F'
    },
    preloaderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#13212F'
    },
    navbar: {
        height: 50,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    backContainer: {
        padding: 10,
    },
    backText: {
        color: '#FFF',
    },
    favouriteContainer: {
        padding: 10,
    },
    favouriteText: {
        color: '#FFF',
    },
    contentContainer: {
        padding: 10,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column'
    },
    coverContainer: {
        marginTop: 20,
        marginBottom: 20
    },
    coverImage: {
        width: 300,
        height: 300,
        borderRadius: 180
    },
    releaseContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    genresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    genreContainer: {
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        padding: 5,
        backgroundColor: '#FFF',
    },
    genreText: {
        fontSize: 12,
    },
    playContainer: {
        backgroundColor: '#99FFFF',
        paddingTop: 5,
        paddingLeft: 35,
        paddingBottom: 5,
        paddingRight: 35,
        borderRadius: 15,
    },
    playText: {
        color: '#000'
    },
    rankingContainer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 30,
    },
    rankingLabelText: {
        color: '#99FFFF',
    },
    rankingSymbolText: {
        color: '#99FFFF',
    },
    rankingSymbolContainer: {
        marginLeft: 5,
        borderWidth: 1,
        borderColor: '#99FFFF',
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 90
    },
    nameText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 30
    },
    artistText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 15
    },
    text: {
        color: '#FFFFFF'
    },
});

const mapStateToProps = (state, ownProps) => {
    let release = state.releases[ownProps.slug];

    return {
        release
    };
}

Detail = connect(mapStateToProps)(Detail);


export default Detail;
