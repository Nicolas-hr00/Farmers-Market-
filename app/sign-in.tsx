import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function SignInScreen () {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [ email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);

    async function handleSignIn() {
        setMessage('');
        setIsSigningIn(true);

        try { 
            const { error } = await supabase.auth.signInWithPassword ({
                email: email.trim(),
                password,
            });

            if (error ) { 
                setMessage(error.message);
                return;
            }
            setMessage('Signed in successfully.')
        } catch (error ) { 
            setMessage(error instanceof Error ? error.message : 'Sign in failed');
        } finally { 
            setIsSigningIn(false);
        }
    } 


    return (
        
        <SafeAreaView style= { styles.container}> 
              <View style={styles.content } > 
                <Text style = {styles.title}>Welcome back!!</Text>
                <Text style = {styles.subtitle}>Sign in to your market account</Text>

              
              <TextInput style = {styles.input} 
                 placeholder="Email Address"
                 value = {email}
                 onChangeText={setEmail}
                 keyboardType='email-address'
                 autoCapitalize="none"
                 autoCorrect = {false}
                
                />
                <View style={styles.passwordRow} >
                    <TextInput
                        style= {styles.passwordInput}
                        placeholder='Password'
                        secureTextEntry = {!passwordVisible}
                        value = {password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                    />
                    <Pressable 
                        onPress={() => setPasswordVisible(!passwordVisible )}
                        accessibilityRole='button'
                        accessibilityLabel = {passwordVisible ? 'Hide password' : 'Show Password'}
                    >

                        <Text style = {styles.eye}>👁</Text>


                    </Pressable>

                </View>

                
                    <Text style={styles.buttonText}>Sign in</Text>
                     <Pressable 
                         style = {({ pressed}) => [
                                styles.button, 
                                pressed && styles.buttonPressed,
                                isSigningIn && styles.buttonDisabled,
                            ]}
                        onPress = {handleSignIn}
                        disabled = {isSigningIn}
                        >    
                         <Text style={styles.buttonText}> {isSigningIn ? 'Signnig in...' : 'Sign in' }</Text>
                    </Pressable>

                        {message ? <Text style= {styles.message}>{message}</Text> : null}

              </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create ({ 
    container: {
        flex:1,
        backgroundColor: '#F8F5EC',
    },
    content: {
        flex:1, 
        justifyContent: 'center',
        padding:24,
    }, 
    title: { 
        color: '#234735',
        fontSize: 32, 
        fontWeight: '700',
    },
    subtitle: {
        color: '#657267',
        fontSize: 16, 
        marginTop:8, 
        marginBottom: 28,
    },

    input: { 
        backgroundColor: '#FFFEF9',
        borderColor: '#D9DFD3',
        borderWidth: 1,
        borderRadius: 12, 
        padding: 16,
        fontSize: 16,
        marginBottom: 14,
    },
    button: {
         backgroundColor: '#537D4A',
         borderRadius: 12,
         padding: 16,
         alignItems: 'center',
         marginTop: 8,
    },
    buttonText: { 
        color: '#FFFEF9',
        fontSize: 17,
        fontWeight: '700'
    },
    passwordRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFEF9',
        borderColor: '#D9DFD3',
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 14,
        paddingRight: 16,
    },
    secureTextEntry: { 
        
    },
    passwordInput: {
        flex: 1,
        padding:16,
        fontSize: 16,
    },
    buttonPressed: {
        opacity: 0.85,
        transform: [{ scale : 0.98}],
    },
    eye: {

    },
    buttonDisabled: {
        opacity: 0.6,
    },
    message: { 
         color: '#234735',
         fontSize: 15,
         marginTop: 16,
    }
}) 