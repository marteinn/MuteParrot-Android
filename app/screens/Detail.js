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
    ActivityIndicator,
    BackAndroid,
    Modal,
} from 'react-native';
import {connect} from 'react-redux'
import {toggleFavorite} from '../actions/favorites';

class Detail extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            renderPlaceholderOnly: true,
            streamModalVisible: false,
        };

        this._hardwareBackPressHandler = this._hardwareBackPressHandler.bind(this);
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });

        BackAndroid.addEventListener('hardwareBackPress',
            this._hardwareBackPressHandler);
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress',
            this._hardwareBackPressHandler);
    }

    _hardwareBackPressHandler() {
        console.log('hardwareBackPressHandler');
        this.props.navigator.pop();
        return true;
    }

    _onBackPressHandler() {
        this.props.navigator.pop();
    }

    _onToggleFavoriteHandler() {
        this.props.dispatch(toggleFavorite(this.props.release.slug));
    }

    _onPlayPressHandler() {
        if (this.props.release.streams.length > 1) {
            this.setState({
                streamModalVisible: true,
            });
        } else {
            this._openStream(this.props.release.streams[0]);
        }
    }

    _onStreamItemPressHandler(stream) {
        this._openStream(stream);

        this.setState({
            streamModalVisible: false,
        });
    }

    _closeStreamModalHandler() {
        this.setState({
            streamModalVisible: false,
        });
    }

    _openStream(stream) {
        switch (stream.source) {
            case 'spotify':
                this._openSpotifyStream(stream);
                break;

            default:
                this._openStreamLink(stream);
                break;
        }
    }

    _openStreamLink(stream) {
        Linking.openURL(stream.link)
            .catch(err => console.error('An error occurred', err));
    }

    _openSpotifyStream(stream) {
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

    setModalVisible(visible) {
        this.setState({streamModalVisible: visible});
    }

    _renderStreamModal() {
        return (
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={this._closeStreamModalHandler.bind(this)}
                >
                <View style={styles.streamModal}>
                    <View style={styles.streamModalContainer}>
                        <Text style={styles.streamTitleText}>Streams</Text>

                        {this.props.release.streams.map((stream) => {
                            return (
                                <TouchableOpacity key={stream.slug} onPress={this._onStreamItemPressHandler.bind(this, stream)}>
                                    <View style={styles.streamContainer}>
                                        <Text>► {stream.name} ({stream.source})</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}

                        <TouchableOpacity onPress={this._closeStreamModalHandler.bind(this)}>
                            <View style={styles.streamCloseContainer}>
                                <Text style={styles.streamCloseText}>Close</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        )
    }

    render() {
        //if (this.state.renderPlaceholderOnly) {
            //return this._renderPlaceholderView();
        //}

        return (
            <View style={styles.container}>
                {this.state.streamModalVisible ? this._renderStreamModal() : null}

                <View style={styles.navbar}>
                    <TouchableHighlight onPress={this._onBackPressHandler.bind(this)}>
                        <View style={styles.backContainer}>
                            <Text style={styles.backText}>Back</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={this._onToggleFavoriteHandler.bind(this)}>
                        <View style={styles.favouriteContainer}>
                            <Text style={styles.favouriteText}>Favourite ({this.props.favorite ? '1' : '0'})</Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <View style={styles.contentContainer}>
                    <TouchableHighlight onPress={this._onPlayPressHandler.bind(this)}>
                        <View style={styles.coverContainer}>
                            <Image source={{uri: this.props.release.cover}} style={styles.coverImage} resizeMode={Image.resizeMode.contain} />
                        </View>
                    </TouchableHighlight>

                    <View style={styles.releaseContainer}>
                        <Text style={styles.nameText}>{this.props.release.name}</Text>
                        <Text style={styles.artistText}>{this.props.release.artist}</Text>
                    </View>

                    <TouchableHighlight onPress={this._onPlayPressHandler.bind(this)}>
                        <View style={styles.playContainer}>
                            <Text style={styles.playText}>PLAY</Text>
                        </View>
                    </TouchableHighlight>

                    <View style={styles.rankingContainer}>
                        <Text style={styles.rankingLabelText}>Grade: </Text>
                        <View style={styles.rankingSymbolContainer}>
                            <Text style={styles.rankingSymbolText}>{this.props.release.average_ranking}</Text>
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
    streamModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    streamModalContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
    },
    streamContainer: {
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#99FFFF',
        paddingTop: 5,
        paddingLeft: 35,
        paddingBottom: 5,
        paddingRight: 35,
        borderRadius: 35,

        marginBottom: 10,
    },
    streamTitleText: {
        fontWeight: 'bold',
        marginBottom: 20,
    },
    streamCloseContainer: {
        height: 45,
    },
    streamCloseText: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#13212F'
    },
    preloaderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#13212F',
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#99FFFF',
        paddingTop: 5,
        paddingLeft: 35,
        paddingBottom: 5,
        paddingRight: 35,
        borderRadius: 15,
        height: 35,
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
    let favorite = state.favorites.includes(release.slug);

    return {
        release,
        favorite,
    };
}

Detail = connect(mapStateToProps)(Detail);


export default Detail;
