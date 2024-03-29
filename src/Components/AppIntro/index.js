/** @format */

import React, { PureComponent } from 'react';
import { View, Image, Text, Dimensions, Animated, Platform, StatusBar, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from './styles';
import { Config } from '@common';
import { connect } from 'react-redux';
import { finishIntro } from '@redux/actions';



import {
  Card,
  Header,
  Actions,
  ContentContainer,
  GradientBackgrounds,
} from 'react-native-onboarding-component';


const { width: deviceWidth } = Dimensions.get('window');

const pages = Config.intro;
import Indicator from './Indicator';

class AppIntro extends PureComponent {

  constructor(props) {
    super(props);
  
    this.state = {
      currentIndex: 0,
    };
    this.scrollX = new Animated.Value(0);
  }

  onScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const currentIndex = Math.round(contentOffset.x / deviceWidth);
    if (this.state.currentIndex !== currentIndex) {
      this.setState({ currentIndex });
    }
  }

  scrollTo = (index) => {
    this.scrollView._component.scrollTo({
      x: (deviceWidth * index),
      animated: true,
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor="#4a416e"
          barStyle="light-content"
        />
        <GradientBackgrounds
          colors={pages.map(page => page.backgroundColor)}
          scrollX={this.scrollX}
          style={{ height: '56%' }}
        />
        <Animated.ScrollView
          horizontal
          ref={(scrollView) => { this.scrollView = scrollView; }}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={1}

          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.scrollX } } }],
            { useNativeDriver: true,
              listener: this.onScroll,
            },
          )}
        >
          {pages.map((page, index) => (
            <View
              key={`pages-${index}`}
              style={[styles.card, { width: deviceWidth, flexDirection: 'column', paddingTop: 40 }]}
            >
              <Header style={{backgroundColor: 'transparent'}}>
                <Image
                  style={styles.introImage}
                  source={page.source}
                />
              </Header>

              <ContentContainer style={styles.bottomView}>
                <Text style={styles.description}>
                  {page.description}
                </Text>
              </ContentContainer>
            </View>
          ))}
        </Animated.ScrollView>

        <View style={styles.row}>
          <View style={styles.indicatorWrap}>
            <Indicator items={pages} scrollX={this.scrollX}/>
          </View>

          <TouchableOpacity onPress={()=>this.props.finishIntro()}>
            <Text style={styles.btnText}>SKIP</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{
            if (this.state.currentIndex + 1 === pages.length) {
              this.props.finishIntro()
            }else{
              const next = this.state.currentIndex + 1;
              this.scrollTo(next);
            }
          }}>
            <Text style={styles.btnText}>{pages[this.state.currentIndex].button}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({}) => {
  return {

  };
}

export default connect(null, {finishIntro})(AppIntro);