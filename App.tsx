import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {MotiView, MotiText} from 'moti';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

export default function App() {
  const [showInputs, setShowInputs] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpEnabled, setIsSignUpEnabled] = useState(false);

  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.2, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInputs(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showInputs) {
      const timer = setTimeout(() => {
        setShowButtons(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showInputs]);

  useEffect(() => {
    setIsSignUpEnabled(email.length > 0 && password.length > 0);
  }, [email, password]);

  return (
    <LinearGradient
      style={styles.container}
      colors={['#8007d9', '#333']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <View style={styles.topView}>
        <MotiView
          from={{translateY: -100, opacity: 0}}
          animate={{translateY: 0, opacity: 1}}
          transition={{type: 'timing', duration: 1000}}>
          <Animated.View style={animatedStyle}>
            <MotiText style={styles.topText}>🚀 Aw3s0m3 Pr0j3ct 🚀</MotiText>
          </Animated.View>
        </MotiView>
      </View>
      <View style={styles.formContainer}>
        {showInputs && (
          <>
            <MotiView
              from={{translateX: -100, opacity: 0}}
              animate={{translateX: 0, opacity: 1}}
              transition={{type: 'timing', duration: 1500}}
              style={[styles.input, isSignUpEnabled && styles.inputValid]}>
              <TextInput
                placeholder="📧 Email"
                style={styles.textInput}
                placeholderTextColor="#333"
                value={email}
                onChangeText={setEmail}
              />
            </MotiView>
            <MotiView
              from={{translateX: 100, opacity: 0}}
              animate={{translateX: 0, opacity: 1}}
              transition={{type: 'timing', duration: 1500}}
              style={[styles.input, isSignUpEnabled && styles.inputValid]}>
              <TextInput
                placeholder="🔒 Password"
                style={styles.textInput}
                placeholderTextColor="#333"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </MotiView>
          </>
        )}
        {showButtons && (
          <MotiView
            from={{translateY: 100, opacity: 0}}
            animate={{translateY: 0, opacity: 1}}
            transition={{type: 'timing', duration: 1500}}
            style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.buttonContainer}
              disabled={!isSignUpEnabled}>
              <View
                style={[
                  styles.buttonStyle,
                  styles.buttonEnable,
                  !isSignUpEnabled && styles.disabledButton,
                ]}>
                <Text style={styles.buttonText}>Sign Up ✍️</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <View style={[styles.buttonStyle, styles.buttonEnable]}>
                <Text style={styles.buttonText}>Sign In 🔑</Text>
              </View>
            </TouchableOpacity>
          </MotiView>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  formContainer: {
    top: -80,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topView: {
    marginTop: 100,
    alignItems: 'center',
  },
  topText: {
    fontSize: 24,
    color: '#fff',
  },
  input: {
    width: '80%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  inputValid: {
    borderColor: '#36092b',
    borderWidth: 3,
  },
  textInput: {
    height: 50,
    padding: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonStyle: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  signUpButton: {
    backgroundColor: '#ccc',
  },
  buttonEnable: {
    backgroundColor: '#4B0082',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
