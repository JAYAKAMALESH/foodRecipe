import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, ImageBackground, Image, Modal, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useUserContext } from './userProvider';
import axios from 'axios';


export default function LoginScreen({ navigation,route}) {
  const {handleLoginStatus,}=route.params;
  const { setCurrentUser } = useUserContext();
  //for login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //for signin page
   const [usernameSignin, setusernameSignin]=useState();
   const [nameSignin, setnameSignin]= useState();
   const [passwordSignin, setpasswordSignin] =useState();
   const [emailSignin, setemailSignin] =useState();
   const [phoneSignin, setphoneSignin] =useState();
  const [loginMessage, setloginMessage]=useState(null);
  const [signInError, setSignInError]= useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginLoading, setLoginLoading] =useState(false);

  const handleSignInModal = async () => {
    // Perform validation checks
    if (!nameSignin || !usernameSignin || !passwordSignin || !emailSignin || !phoneSignin) {
      setSignInError('All fields are required');
      return;
    }
    if (nameSignin.length < 4) {
      setSignInError('Name must be 4 character length');
      return;
    }
    if (usernameSignin.length < 4) {
      setSignInError('Username must be 4 character length');
      return;
    }
    if (passwordSignin.length < 4) {
      setSignInError('Password must be 4 character length');
      return;
    }
    
    // Validate email using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailSignin)) {
      setSignInError('Invalid email format');
      return;
    }
    
    // Validate phone using regex
    const phoneRegex = /^[0-9]{10}$/; // Assuming a 10-digit phone number
    if (!phoneRegex.test(phoneSignin)) {
      setSignInError('Invalid phone number');
      return;
    }
  
    // Clear any previous error messages
    setSignInError(null);
    setIsLoading(true);
    // Validation passed, proceed with the API call
    try {
      const response = await axios.post('http://192.168.1.5:5000/signin', {
        username: usernameSignin,
        password: passwordSignin,
        name: nameSignin,
        email: emailSignin,
        phone: phoneSignin,
      });
  
      const data = response.data;
      console.log(data);
  
      if (data.success) {
        Alert.alert(
          'Account Created!',
          'Now you can login with your username and password',
          [{ text: 'OK', onPress: () => setModalVisible(false) }]
        );
      } else {
        setSignInError(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setSignInError('An error occurred during signin');
      Alert.alert(
        'Failed signin!',
        'try again to signin',
        [{text:'ok', onPress:()=> setModalVisible(false)}]
      )
      onModalClose();
    }
    finally {
      // Set loading state back to false
      setIsLoading(false);
      onModalClose();
    }
  };
  
  const onModalClose=()=>{
    setSignInError(null)
    setemailSignin(null)
    setphoneSignin(null)
    setnameSignin(null)
    setusernameSignin(null)
    setpasswordSignin(null)
    setModalVisible(!modalVisible);
  } 


  const handleLogin = async () => {
    setloginMessage(null)
    setLoginLoading(true)
    console.log("username length is ",username.length)
    console.log("password length is",password.length)
    if(username.length==0 || password.length==0){
      setLoginLoading(false);
      setloginMessage("username or password cannot be empty")
      return;
    }
    try {
        const response = await axios.post('http://192.168.1.5:5000/login', {
            username,
            password,
        });

        const data = response.data;
        console.log(data)

        if (data.success) {
            setCurrentUser(data.user)
            setLoginLoading(false)
            navigation.navigate('bottomNavigator'); 
            handleLoginStatus();
        } else {
            setLoginLoading(false)
            setloginMessage(data.message);
        }
    } catch (error) {
        setloginMessage(error)
        console.error('Error during login:', error);
    }
};
  return (
    <ImageBackground
    style={{ width: '100%', height: '100%' }}
    imageStyle={{ opacity: 0.2 }}
    source={{
      uri: 'https://img.freepik.com/free-vector/sketches-arabic-food-pattern_23-2147543047.jpg?w=740&t=st=1691477289~exp=1691477889~hmac=27bccfc79885fddb3f837c7a8f6b19035da84439a913e1e29f1edadb205b3da7',
    }}
  >
    <View style={styles.container}>
      <View style={styles.logo}>
       <Image style={{width:250,height:250,marginTop:30,}} source={{uri:'https://i.ibb.co/2Wn3X2X/Chef-bro.png'}}></Image>
       <Text style={{fontWeight:'bold',fontSize:30}}>My Recipe</Text>
      </View>
      <View style={styles.form}>
        <View style={{marginTop:10, gap:10}}>
        <Text style={{textAlign:'center',color:'red',fontWeight:'bold',marginTop:10}}>{loginLoading&&<ActivityIndicator size="small" color="#0000ff" />}{loginMessage}</Text>
      <TextInput
        style={styles.input}
        label="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button mode="contained" onPress={()=>handleLogin()}>
        Log In
      </Button>
      <Text style={{textAlign:'center'}}>If you don't have a account click SignIn</Text>
      <Button mode="contained" onPress={()=>setModalVisible(true)}>
        sign In
      </Button>
      </View>
      </View>
  {/* ... your existing code ... */}
  <Modal visible={modalVisible} onRequestClose={() => {
          onModalClose();
        }} animationType="fade">
  <KeyboardAvoidingView
    style={styles.modalContainer}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >
      <View styles={styles.modalForm}>
      <Text style={{textAlign:'center',fontWeight:'bold', fontSize:20, margin:10,}}>SignIn</Text>
      <Text style={{textAlign:'center', fontWeight:'bold',color:'red',marginBottom:10,}}>{signInError}</Text>
      {isLoading && <ActivityIndicator size="Big" color='#682f8a' />}
      <ScrollView>
      <TextInput
        label="Name"
        value={nameSignin}
        onChangeText={setnameSignin}
        style={styles.input}
      />
      <TextInput
        label="Username"
        value={usernameSignin}
        onChangeText={setusernameSignin}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={passwordSignin}
        onChangeText={setpasswordSignin}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        label="Phone Number"
        value={phoneSignin}
        onChangeText={setphoneSignin}
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={emailSignin}
        onChangeText={setemailSignin}
        style={styles.input}
      />
    <Button mode="contained" style={{ marginTop: 15 }} onPress={handleSignInModal}>
      Sign In
    </Button>
    </ScrollView>   
      </View>
    </KeyboardAvoidingView>
  </Modal>
  </View>
    </ImageBackground>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    width:'100%',
    height:'100%',
  },
  logo:{
    height:'40%',
    width:'100%',
    alignItems:'center',
  },
  form:{
    borderTopLeftRadius:80,
    borderTopRightRadius:80,
    backgroundColor:'rgba(234, 215, 245, 0.7)',
    width:'100%',
    padding:20,
    gap:15,
    height:'60%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    gap:15,
    borderRadius:20,
    backgroundColor: 'rgba(234, 215, 245, 0.7)', // Adjust the background color and opacity as needed
  },
  input:{
    marginTop:10,
    borderWidth:1,
    borderColor:'grey',
    elevation:10,
    borderRadius:5
  }
});
