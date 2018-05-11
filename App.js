/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Animated
} from 'react-native';

HEADER_MAX_HEIGHT = 100
HEADER_MIN_HEIGHT = 60
PROFILE_IMAGE_MAX_HEIGHT = 80
PROFILE_IMAGE_MIN_HEIGHT = 40

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            //value of y starts with 0
            scrollY: new Animated.Value(0)
        }
    }
    render() {


        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT], //starts with 0, and distance of the user can scroll, which we get the value from the header
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT], //it starts with max height, and the minimum is not less than the min height
            extrapolate: 'clamp'//makes the header stops at the min height when we scroll
        })
        const profileImageHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
            extrapolate: 'clamp'
        })

        const profileImageMarginTop = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [HEADER_MAX_HEIGHT - (PROFILE_IMAGE_MAX_HEIGHT / 2), HEADER_MAX_HEIGHT + 5],
            extrapolate: 'clamp'
        })
        //makes the image goes below the header
        const headerZindex = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, 120],
            outputRange: [0, 0, 1000],
            extrapolate: 'clamp'
        })

        const headerTitleBottom = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
                HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
                HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT
                + 26
            ],
            outputRange: [-20, -20, -20, 0],
            extrapolate: 'clamp'
        })




        return (

            <View style={{ flex: 1, backgroundColor: 'white'}} >
                //Header
                <Animated.View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    //backgroundColor: '#FF9265',
                    backgroundColor: 'lightskyblue',
                    height: headerHeight,
                    zIndex: headerZindex,
                    // elevation: headerZindex,//required for android
                    alignItems: 'center'
                }}>

                    <Animated.View style={{ position: 'absolute', bottom: headerTitleBottom }}>
                        <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginBottom: 5 }}>Bruce Lee</Text>
                    </Animated.View>
                </Animated.View>

                //Scrollview
                <ScrollView style={{ flex: 1 }}
                    scrollEventThrottle={16} //makes the height of the header decreases along with the image, default is 1
                    //native function for scroll
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
                    )}
                >
                    //Start of image
                    <Animated.View style={{
                        height: profileImageHeight,
                        width: profileImageHeight,
                        borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
                        borderColor: 'white',
                        borderWidth: 3,
                        overflow: 'hidden',
                        marginTop: profileImageMarginTop,
                        marginLeft: 10,

                    }}>
                        <Image source={require('./assets/me.jpg')}

                            style={{ flex: 1, width: null, height: null }}//height and width null to make the image fit in the circle
                        ></Image>
                    </Animated.View>
                    //End of image

                    //Name text
                    <View><Text style={{ fontWeight: 'bold', fontSize: 25, paddingLeft: 10 }}>Bruce Lee</Text></View>

                    //to not make the image go back to the main postion bcs there is no data, so we just create a view
                    <View style={{ height: 1000 }}></View>

                </ScrollView>
            </View >
        );
    }
}

export default App;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  }
});
