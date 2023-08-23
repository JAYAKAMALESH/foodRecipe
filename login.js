import React, { useState } from 'react';
import { View, StyleSheet, Text, ImageBackground, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useUserContext } from './userProvider'; 


export default function LoginScreen({ navigation,route}) {
  const {handleLoginStatus,}=route.params;
  const { users, setCurrentUser } = useUserContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setloginMessage]=useState(null);

  const handleLogin = () => {
    const user = users.find(user => user.username === username);
    setCurrentUser(user)
    if (user && user.password === password) {
      navigation.navigate('bottomNavigator');
      handleLoginStatus();
    } else {
      setloginMessage('invalid credentials')
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
       <Image style={{width:250,height:250}} source={{uri:'https://i.ibb.co/2Wn3X2X/Chef-bro.png'}}></Image>
       <Text style={{fontWeight:'bold',fontSize:30}}>My Recipe</Text>
      </View>
      <View style={styles.form}>
        <View style={{marginTop:30, gap:10}}>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button mode="contained" onPress={handleLogin}>
        Log In
      </Button>
      <Text style={{textAlign:'center',color:'red',fontWeight:'bold',marginTop:10}}>{loginMessage}</Text>
      </View>
      </View>
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
    backgroundColor:'rgba(112, 97, 140, 0.7)',
    width:'100%',
    padding:20,
    gap:15,
    height:'60%',
  }
});
