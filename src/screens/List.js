// import { Body, Container, Content, Header, Heading, Left, List, ListItem, Thumbnail } from "native-base";
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
} from "react-native";
import { appStyles } from "../config/AppStyle";
import MyFontsSize from '../config/FontStyles'
import MYColors from '../config/Colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from "react-redux";
import { Avatar, Header, Icon, ListItem } from "react-native-elements";
import Accordion from 'react-native-collapsible/Accordion';


class ListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSections: [],
        }
    }
    componentDidMount() {
        this.props.dispatch(fetchList());
    }
    // _renderSectionTitle = (section) => {
    //     return (
    //         <View style={{}}>
    //             <Text style={{}}>{section.name}</Text>
    //         </View>
    //     );
    // };

    _renderHeader = (l) => {
        return (
            <View style={{}}>
                <ListItem topDivider>
                    <Avatar source={{ uri: l.avatar }} rounded />
                    <ListItem.Content>
                        <ListItem.Subtitle>{l.name}</ListItem.Subtitle>
                        <ListItem.Title>{l.author}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </View>
        );
    };

    _renderContent = (l) => {
        return (
            <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginLeft: wp('15%') }}>
                <ListItem.Subtitle>{l.description}</ListItem.Subtitle>
                <View style={{ height: hp('1%') }}></View>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Icon name='circle' raised color={MYColors.menuColor7} size={MyFontsSize.xsmallText.fontSize}></Icon><Text>{l.currentPeriodStars}</Text>
                    <View style={{ width: wp('2%') }}></View>
                    <Icon name='star' raised color={MYColors.menuColor1} size={MyFontsSize.xsmallText.fontSize}></Icon><Text>{l.stars}</Text>
                    <View style={{ width: wp('2%') }}></View>
                    <Icon name='code-fork' raised type='font-awesome' size={MyFontsSize.xsmallText.fontSize}></Icon><Text>{l.forks}</Text>
                </View>
                <View style={{ height: hp('1%') }}></View>
            </View>
        );
    };

    _updateSections = (activeSections) => {
        this.setState({ activeSections });
    };

    render() {
        const { error, loading, DummyData } = this.props;
        console.log("DummyData :: " + JSON.stringify(this.props.DummyData));
        return (
            <>
                {/* <SafeAreaView> */}
                <View style={{ ...StyleSheet.absoluteFill, backgroundColor: MYColors.lightColor }}>
                    <Header
                        statusBarProps={{ barStyle: 'default', translucent: true }}
                        barStyle="default"
                        containerStyle={{ backgroundColor: MYColors.lightColor, height: 'auto', borderBottomColor: '#ccc' }}
                        centerComponent={{
                            text: 'Trending', style: {
                                fontSize: MyFontsSize.mediumMenu.fontSize,
                                // flex: 1,
                                width: wp('100%'),
                                textAlign: "center",
                                fontWeight: 'bold'
                            }
                        }}
                        rightComponent={
                            <Icon name={"logout"}
                                // type='font-awesome'
                                onPress={() => {
                                    this.props.navigation.replace("LoginScreen");
                                }}
                                color={MYColors.hintDarkColor} />
                        }
                    />
                    <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        style={appStyles.scrollView}>
                        <Accordion
                            sections={DummyData}
                            activeSections={this.state.activeSections}
                            // renderSectionTitle={this._renderSectionTitle}
                            renderHeader={this._renderHeader}
                            renderContent={this._renderContent}
                            onChange={this._updateSections}
                        />

                    </ScrollView>
                </View>
                {/* </SafeAreaView> */}
            </>
        );
    }
}


function mapStateToProps(state) {
    const { error, loading, DummyData } = state;
    // console.log("DATA: " + JSON.stringify(DummyData))
    return {
        error, loading, DummyData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ListScreen);


function fakeGetList() {
    var promise = fetch("https://private-anon-029c76b0e7-githubtrendingapi.apiary-mock.com/repositories")
        .then(res => res.json())
        .then((responseJson) => {
            return responseJson
        });
    return promise;
}

export function fetchList() {
    // console.log(13);
    return dispatch => {
        // console.log(1);
        dispatch(fetchListBegin());
        return fakeGetList()
            .then(
                list => {
                    // console.log("list :: " + list);
                    dispatch(fetchListSuccess(list));
                    return list;
                },
                error => {
                    dispatch(fetchListFailure(error))
                }
            );
    };
}

export const FETCH_LIST_BEGIN = "FETCH_LIST_BEGIN";
export const FETCH_LIST_SUCCESS =
    "FETCH_LIST_SUCCESS";
export const FETCH_LIST_FAILURE =
    "FETCH_LIST_FAILURE";

export const fetchListBegin = () => ({
    type: FETCH_LIST_BEGIN
});

export const fetchListSuccess = list => ({
    type: FETCH_LIST_SUCCESS,
    payload: { list }
});

export const fetchListFailure = error => ({
    type: FETCH_LIST_FAILURE,
    payload: { error }
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});