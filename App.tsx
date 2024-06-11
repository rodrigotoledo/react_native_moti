import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function App() {
  const [showInputs, setShowInputs] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpEnabled, setIsSignUpEnabled] = useState(false);

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
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.topText}>Aw3s0m3 Pr0j3ct</Text>
        {showInputs && (
          <>
            <View style={styles.input}>
              <TextInput
                placeholder="Email"
                style={styles.textInput}
                placeholderTextColor="#333"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.input}>
              <TextInput
                placeholder="Password"
                style={styles.textInput}
                placeholderTextColor="#333"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </>
        )}
        {showButtons && (
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.buttonContainer}
              disabled={!isSignUpEnabled}>
              <View
                style={[
                  styles.buttonStyle,
                  styles.buttonEnable,
                  !isSignUpEnabled && styles.disabledButton,
                ]}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <View style={[styles.buttonStyle, styles.buttonEnable]}>
                <Text style={styles.buttonText}>Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4B0082'
  },
  topText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 20,
  },
  formContainer: {
    width: '80%',
  },
  input: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  textInput: {
    height: 50,
    padding: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
