import React from 'react';
import { View, Text, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Page = ({ width, height, children }) => (
  <View style={{ width, height }}>
    {children}
  </View>
);

const PageContent = ({ children }) => (
  <View style={styles.content}>
    <View style={{ flex: 0 }}>
      {children}
    </View>
  </View>
);

const PageData = ({ isLight, isDone, disableWhenDone, backgroundColor, image, title, subtitle, action, next, ...rest }) => (
  <Page {...rest}>
    <PageContent>
      <View style={styles.image}>
        {image}
      </View>
      <Text style={{ ...styles.title, ...(isLight ? styles.titleLight : {}) }}>
        {title}
      </Text>
      <Text style={{ ...styles.subtitle, ...(isLight ? styles.subtitleLight : {}) }}>
        {subtitle}
      </Text>
      {action &&
        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            styles.btn,
            { backgroundColor: (disableWhenDone && isDone()) || action.disabled ? (isLight ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)') : (isLight ? 'black' : 'white') }
          ]}
          resizeMode={'contain'}
          onPress={() => {
              if ((disableWhenDone && isDone()) || action.disabled) {
                next()
              } else {
                action.tap().then(() => {
                  if (isDone()) {
                    next()
                  }
                })
              }
            }
          }
        >
          {action.disabled &&
            <ActivityIndicator
              animating={action.disabled}
              style={styles.btnloader}
              color={backgroundColor}
            />
          }
          <Text style={[styles.btntxt, {color: backgroundColor}]}>
            {isDone() && disableWhenDone && <MaterialIcon name='check' size={16} />}
            {(disableWhenDone && isDone()) ? ` ${action.labelDone}` : action.label}
          </Text>
        </TouchableOpacity>
      }
    </PageContent>
  </Page>
);

const styles = {
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 0,
    paddingBottom: 60,
    alignItems: 'center',
  },
  title: {
    fontFamily: (Platform.OS === 'ios') ? 'Nunito-Bold' : 'Nunito Bold',
    textAlign: 'center',
    fontSize: 26,
    color: '#fff',
    paddingBottom: 15,
  },
  titleLight: {
    color: '#000',
  },
  subtitle: {
    fontFamily: (Platform.OS === 'ios') ? 'Nunito-Regular' : 'Nunito Regular',
    textAlign: 'center',
    fontSize: 16,
    paddingRight: 20,
    paddingLeft: 20,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  subtitleLight: {
    color: 'rgba(0, 0, 0, 0.7)',
  },
  btn: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    margin: 40,
    borderRadius: 40
  },
  btntxt: {
    fontFamily: (Platform.OS === 'ios') ? 'Nunito-Bold' : 'Nunito Bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 5
  },
  btnloader: {
    padding: 0,
    marginRight: 20
  }
};

export default PageData;
