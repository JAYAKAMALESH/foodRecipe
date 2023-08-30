import React, { useEffect, useState } from 'react';
import { View, Modal, Text, StyleSheet, Alert, KeyboardAvoidingView,ActivityIndicator, Image, ImageBackground, Pressable, TouchableOpacity, Linking } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useUserContext } from './userProvider'; 
import { fooddata } from './food data';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';


export default function ProfileScreen({ navigation, route }) {
  const { currentUser, setcurrentUser } = useUserContext();
  const [usernameUpdate, setusernameUpdate]=useState(currentUser.username);
  const [nameUpdate, setnameUpdate]= useState(currentUser.name);
  const [passwordUpdate, setpasswordUpdate] =useState(currentUser.password);
  const [emailUpdate, setemailUpdate] =useState(currentUser.email);
  const [phoneUpdate, setphoneupdate] =useState(currentUser.phone);
  const [UpdateError, setUpdateError]= useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  const { setIsLoggedInfun, setIsLoggedIn } = route.params;


  const handleupdateModal = async () => {
    // Perform validation checks
    if (!nameUpdate || !usernameUpdate || !passwordUpdate || !emailUpdate || !phoneUpdate) {
      setUpdateError('All fields are required');
      return;
    }
    if (nameUpdate.length < 4) {
      setUpdateError('Name must be 4 character length');
      return;
    }
    if (usernameUpdate.length < 4) {
      setUpdateError('Username must be 4 character length');
      return;
    }
    if (passwordUpdate.length < 4) {
      setUpdateError('Password must be 4 character length');
      return;
    }
    
    // Validate email using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailUpdate)) {
      setUpdateError('Invalid email format');
      return;
    }
    
    // Validate phone using regex
    const phoneRegex = /^[0-9]{10}$/; // Assuming a 10-digit phone number
    if (!phoneRegex.test(phoneUpdate)) {
      setUpdateError('Invalid phone number');
      return;
    }
  
    // Clear any previous error messages
    setUpdateError(null);
    setIsLoading(true);
    // Validation passed, proceed with the API call
    try {
      const response = await axios.post('http://192.168.1.5:5000/update-user', {
        userid:currentUser.userid,
        username: usernameUpdate,
        password: passwordUpdate,
        name: nameUpdate,
        email: emailUpdate,
        phone: phoneUpdate,
      });
  
      const data = response.data;
      console.log( "the data",data);
  
      if (data.success) {
        Alert.alert(
          'Details Updated!',
          'user details are update',
          [{ text: 'OK', onPress: () => setModalVisible(false) }]
        );
          setIsLoggedIn(true);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
      } else {
        setUpdateError(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setUpdateError('An error occurred during signin');
      Alert.alert(
        'Failed to update!',
        'try again to update',
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
    setUpdateError(null)
    setModalVisible(!modalVisible);
  } 


  useEffect(() => {
    setIsLoggedIn(true);
  }, []);


  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ width: '100%', height: '100%' }}
        imageStyle={{ opacity: 0.1 }}
        source={{
          uri: 'https://img.freepik.com/free-vector/sketches-arabic-food-pattern_23-2147543047.jpg?w=740&t=st=1691477289~exp=1691477889~hmac=27bccfc79885fddb3f837c7a8f6b19035da84439a913e1e29f1edadb205b3da7',
        }}
      > 
        <View style={styles.header}>
          <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }}>User Profile</Text>
        </View>
        <View style={styles.profileCard}>
          <View style={styles.profileDetailLeft}>
            <View style={styles.profileImage}>
              <Image style={{ width: 70, height: 70 }} source={{ uri: 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png' }} />
            </View>
            <View>
              <Text style={{ textAlign: 'center', fontWeight: 'bold', margin: 20 }}>{currentUser.name}</Text>
            </View>
          </View>
          <View style={styles.profileDetails}>
            <View style={styles.favourite}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{currentUser.favouriteItems.length}</Text>
              <Text>Favourites</Text>
            </View>
            <View style={styles.itemCount}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{fooddata.length}</Text>
              <Text>Food Items</Text>
            </View>
          </View>
        </View>
        <View style={styles.logout}>
          <TouchableOpacity style={styles.button} onPress={() => {
            setIsLoggedIn(true);
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }}>
            <Text style={{ textAlign: 'center', color: 'white' }}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.aboutus}>
          <View style={styles.aboutheader}>
          <Text style={{ textAlign: 'center', marginTop: 10, marginStart:'42%'}}>About</Text>
          <View>
            <TouchableOpacity style={{borderWidth:1,marginStart:'56%',width:30,marginTop:5,}}
            onPress={()=>setModalVisible(true)}
            >
              <AntDesign name="edit" size={25} color="black" />
            </TouchableOpacity>
          </View>
          </View>
          <View style={styles.about}>
            <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>name:</Text>
            <Text>{currentUser.name}</Text>
          </View>
          <View style={styles.about}>
            <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Phone:</Text>
            <Text>{currentUser.phone}</Text>
          </View>
          <View style={styles.about}>
            <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>username:</Text>
            <Text>{currentUser.username}</Text>
          </View>
          <View style={styles.about}>
            <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Email id:</Text>
            <Text>{currentUser.email}</Text>
          </View>
        </View>
        <View style={{ marginTop: '1%' }}>
          <Text style={{ color: 'grey', textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Food Recipe | V- 1.0.0</Text>
          <Text style={{ color: 'grey', textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>contact Us</Text>
        </View>
        <View style={styles.contactus}>
          <Pressable onPress={() => Linking.openURL("https://www.instagram.com/_.im_jk/")}>
            <Entypo name="instagram" size={25} color="black" />
          </Pressable>
          <Pressable onPress={() => Linking.openURL("https://www.linkedin.com/in/jayakamalesh-k-78bb0121b")}>
            <AntDesign name="linkedin-square" size={28} color="black" /> 
          </Pressable>
          <Pressable onPress={() => Linking.openURL("https://twitter.com/Jayakamalesh1")}>
            <FontAwesome name="twitter-square" size={28} color="black" /> 
          </Pressable>
          <Pressable onPress={() => Linking.openURL("https://github.com/JAYAKAMALESH")}>
            <FontAwesome name="github-square" size={28} color="black" /> 
          </Pressable>
        </View>
        <View>
  <Modal visible={modalVisible} onRequestClose={() => {
    onModalClose();
  }} animationType="fade">
<KeyboardAvoidingView
style={styles.modalContainer}
behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
>
<View styles={styles.modalForm}>
<Text style={{textAlign:'center',fontWeight:'bold', fontSize:20, margin:10,}}>Update details</Text>
<Text style={{textAlign:'center', fontWeight:'bold',color:'red',marginBottom:10,}}>{UpdateError}</Text>
{isLoading && <ActivityIndicator size="Big" color='#682f8a' />}
<TextInput
  label="Name"
  value={nameUpdate}
  onChangeText={setnameUpdate}
  style={styles.input}
/>
<TextInput
  label="Username"
  value={usernameUpdate}
  onChangeText={setusernameUpdate}
  style={styles.input}
/>
<TextInput
  label="Password"
  value={passwordUpdate}
  onChangeText={setpasswordUpdate}
  secureTextEntry
  style={styles.input}
/>
<TextInput
  label="Phone Number"
  value={phoneUpdate}
  onChangeText={setphoneupdate}
  style={styles.input}
/>
<TextInput
  label="Email"
  value={emailUpdate}
  onChangeText={setemailUpdate}
  style={styles.input}
/>
<Button mode="contained" style={{ marginTop: 15 }} onPress={handleupdateModal}>
Update
</Button>

</View>
</KeyboardAvoidingView>
</Modal>
</View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    alignItems:'center',
    width:'100%',
    height:'100%',
    backgroundColor:'rgb(234, 215, 245)',

  },
  profileImage:{
   alignItems:'center',
  },
  profileCard:{
    flexDirection:'row',
    width:'100%',

    borderBottomWidth:1,
    borderColor:'grey',
  },
  profileDetails:{
    width:'60%',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    gap:25
  },
  profileDetailLeft:{
    width:'40%',
    borderRightWidth:0.5,
    margin:10,
  },
  favourite:{
    alignItems:'center',
  },
  itemCount:{
    alignItems:'center',
  },
  aboutus:{
    height:280,
    marginTop:20,
    borderWidth:1,
    margin:4,
    backgroundColor:'white',
    opacity:0.8,
    // backgroundColor:'rgba(234, 215, 245, 0.8)',
  },
  logout:{
    height:30,
    width:'100%',
    backgroundColor:'rgba(234, 215, 245, 0.8)',
    alignItems:'center',
    padding:10,

  },
  button:{
    borderWidth:1,
    borderRadius:10,
    color:'white',
    justifyContent:'center',
    backgroundColor:'#682f8a',
    width:'100%',
    height:30,
  },
  header:{
    height:100,
    backgroundColor:'#682f8a',
    alignItems:'center',
    justifyContent:'center',
  },
  contactus:{
    marginTop:15,
    flexDirection:'row',
    justifyContent:'space-around',
    width:'100%',
  },
  about:{
    marginStart:10,
    marginTop:10,
    borderBottomWidth:1,
    marginEnd:15,
  },
  aboutheader:{
    flexDirection:'row',
    alignItems:'center',
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
})