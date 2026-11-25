import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

type AccountRole = 'customer' | 'vendor'




export default function SignUpScreen () { 

    const [name, setName] = useState ('');
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState ('');
    const [role, setRole] = useState <AccountRole> ('customer');
    const [businessName, setBusinessName] = useState('');
    const [marketLocation, setMarketLocation] = useState('');
    const [businessDescription,setBusinessDescription] = useState('');
    const [website, setWebsite] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
  

    async function handleSignUp() {
      setMessage('');

      if (!name.trim() || !email.trim() || !password) {
        setMessage('Please enter your name, email, and password.');
        return;
      }

      if (role === 'vendor' && (!businessName.trim() || !marketLocation.trim())) {
        setMessage('Vendors need to enter a business name and maket location.');
        return;
      }

      setIsSubmitting(true);

      try { 
         const {data, error} = await supabase.auth.signUp ({
            email: email.trim(),
            password, 
            options : {
              data : {
                full_name: name.trim(),
                requested_role: role,
                business_name: role === 'vendor' ? businessName.trim() : null ,
                market_location: role === 'vendor' ? marketLocation.trim() : null,
                business_description: 
                   role === 'vendor' ? businessDescription.trim() || null : null,
                   website: role === 'vendor' ? website.trim() || null : null,
              }
            }
         });

          if (error) { 
            setMessage(error.message);
            return;
          }
          const vendorMessage =
            role === 'vendor' ? ' Your vendor application is pending review.' : '';

        if (data.session) { 
          setMessage(`Account created successfully.${vendorMessage}`);
        }
        else {
            setMessage(`Account created. Check your email to confirm it.${vendorMessage}`,
            );
        } 
      }catch(error) {
           setMessage(error instanceof Error ? error.message : 'Could not create your account.',

           );
      }finally { 
            setIsSubmitting(false);
        
      }
    }


    return (

<KeyboardAvoidingView  
  style={styles.keyboardAvoidingView}
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  
  >
 <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
    <ScrollView
    contentContainerStyle={styles.content}
    keyboardShouldPersistTaps="handled"
     >
      <Text style={styles.eyebrown}>JOIN YOUR LOCAL MARKET</Text>
      <Text style={styles.title}>Create Your Account</Text>
      <Text style={styles.subtitle}> Shop fresh from local vendors or share what your grow</Text>

      < Text style= {styles.label}> Choose your account</Text>
      
      <View style= {styles.roleRow}>

        <Pressable
          onPress={() => setRole('customer')}
          style = {[
            styles.roleCard,
            role === 'customer' && styles.roleSelected,
          ]}

          accessibilityRole= "button"
          accessibilityState={{selected: role === 'customer'}}
        >
          <Text style= {styles.roleTitle}>Shop local</Text>
          <Text style= {styles.roleSubtitle}>Place Orders</Text>
        </Pressable>


          <Pressable 
              onPress= {()=> setRole('vendor')}
              style = {[
                 styles.roleCard, 
                 styles.secondRoleCard,
                 role === 'vendor' && styles.roleSelected
              ]}
              accessibilityRole = "button"
              accessibilityState={{selected: role === 'vendor'}}
          >
            <Text style = {styles.roleTitle}>Sell local</Text>
            <Text style = {styles.roleSubtitle}>Manage products</Text>
          </Pressable>
      </View>

      <Text style={styles.label}>Full name</Text>

        <TextInput 
          style={styles.input}
          placeholder='Your name'
          value ={name}
          onChangeText={setName}
          autoCapitalize="words"
          autoCorrect= {false}
          returnKeyType="next"
        />

       


        <Text style={styles.label}> Email Address </Text>
         <TextInput
            style={styles.input}
           placeholder='you@example.com'
           value={email}
           onChangeText={setEmail}
           keyboardType='email-address'
           autoCapitalize='none'
           autoCorrect={false}
           returnKeyType="next"
         
         
         />
    <Text style= {styles.label}>Password</Text>
        <TextInput
          style= {styles.input}
          placeholder='Create a password'
          value = {password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize= "none"
          returnKeyType= "done"
        />


        {role === 'vendor' ? ( 
          <View style = {styles.vendorSection}>
              <Text style={styles.sectionTitle}>Vendor Aplication</Text>
              <Text style={styles.sectionNote}>Vendor aplication are reviewed before products can be published</Text>


            <Text style={styles.label}>Business name </Text>
            <TextInput 
              style={styles.input}
              placeholder='Your farm or business name'
              value={businessName}
              onChangeText={setBusinessName}
              autoCapitalize='words'
            />

            <Text style={styles.label}>Market location</Text>
            <TextInput
              style={styles.input}
              placeholder='Market name or location'
              value={marketLocation}
              onChangeText={setMarketLocation}
              autoCapitalize='words'
              returnKeyType="next"
            />

           <Text style ={styles.label}>About your business</Text>
           <TextInput 
            style= {[styles.input, styles.descriptionInput]}
            placeholder='What do  you grow, make, or sell ?'
            value= {businessDescription}
            onChangeText={setBusinessDescription}
            multiline
            textAlignVertical='top'
           />

          <Text style={styles.label}> Website or social link (optional)</Text>
          <TextInput 
            style={styles.input}
            placeholder = "https:// or social profile"
            value={website}
            onChangeText={setWebsite}
            keyboardType={"url"}
            autoCapitalize="none" 
            autoCorrect={false}           
          />
          </View>
        ) :null}

        

        <Pressable 
          style = {({ pressed}) => [
            styles.submitButton,
            pressed && styles.submitPressed,
            isSubmitting && styles.submitDisabled
          ]}
          onPress= {handleSignUp}
          disabled = {isSubmitting}
        >
           <Text style= {styles.submitText}>
              {isSubmitting ? 'Create account...' : 'Create account'} 
           </Text>

        </Pressable>

        {message ? <Text style={styles.message}> {message} </Text> : null}
  </ScrollView>
  </SafeAreaView>
</KeyboardAvoidingView>

    );
} 

const styles = StyleSheet.create ({ 
    container: { 
        flex:1 
    },

    content: { 
         flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 32,
    },
    title: 
     {
          color: '#234735',
          fontSize: 32,
          fontWeight: '700'
     },
     input: {
        backgroundColor: '#FFFEF9',
        borderColor: '#D9DFD3', 
        borderWidth: 1 ,
        borderRadius:12, 
        padding: 16,
        fontSize: 16,
        marginBottom:14,
     },
     eyebrown: {
         color: '#537D4A',
         fontSize: 12,
         fontWeight: '700',
         letterSpacing: 1.5,
         marginBottom: 8,
     },
     subtitle:  {
       color: '#657267',
       fontSize: 16,
       lineHeight:23,
       marginTop: 8,
       marginBottom: 24,
     },
     label: {
       color: '#234735',
       fontSize: 14,
       fontWeight: '700',
       marginBottom: 8,
     },
    roleRow: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    roleCard: {
      flex:1,
      minHeight:88,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFEF9',
      borderColor: '#D9DFD3',
      borderWidth:1,
      borderRadius:14,
      padding:10,
      marginRight:8
    },
    roleSelected: {
        backgroundColor: '#E4ECD9',
        borderColor: '#537D4A',
        borderWidth:2,
    },
    roleTitle: { 
      color: '#234735',
      fontSize: 15,
      fontWeight: '700'
    },
    roleSubtitle: {
        color: '#657267',
        fontSize: 12,
        marginTop:4,
    },
    submitButton: {
      alignItems: 'center',
      backgroundColor: '#537D4A',
      borderRadius:14,
      padding: 16,
      marginTop:4,
    },
    submitPressed: { 
      opacity: 0.85,
      transform: [{scale: 0.98}]
    },
    submitText: { 
      color: '#FFFEF9',
      fontSize: 17,
      fontWeight: '700'
    },
    secondRoleCard: {
       marginRight: 0,
       marginLeft: 6,
    },
    vendorSection: {
       marginTop:8
    },
    sectionTitle: {
      color: '#234735',
      fontSize:20,
      fontWeight: '700',
      marginBottom:6,
    },
    sectionNote: { 
      color: '#657267',
      fontSize: 14,
      lineHeight: 20, 
      marginBottom:18,
    },
    descriptionInput: { 
      minHeight: 96,
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    submitDisabled: { 
      opacity: 0.6
    },
    message: {
      color: '#234735',
      fontSize: 14,
      lineHeight: 20,
      marginTop: 16,
    }
})