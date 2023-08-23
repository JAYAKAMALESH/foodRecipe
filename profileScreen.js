import React from 'react';
import { View, Text, Button, StyleSheet, Image, ImageBackground } from 'react-native';
import { useUserContext } from './userProvider'; 
import { fooddata } from './food data';
export default function ProfileScreen({ navigation, route }) {
  const {currentUser}=useUserContext();
  const { setIsLoggedInfun, setIsLoggedIn } = route.params
  setIsLoggedIn(true)

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ width: '100%', height: '100%' }}
        imageStyle={{ opacity: 0.2 }}
        source={{
          uri: 'https://img.freepik.com/free-vector/sketches-arabic-food-pattern_23-2147543047.jpg?w=740&t=st=1691477289~exp=1691477889~hmac=27bccfc79885fddb3f837c7a8f6b19035da84439a913e1e29f1edadb205b3da7',
        }}
      > 
        <View style={styles.profileCard}>
        <View style={styles.profileDetailLeft}>
        <View style={styles.profileImage}>
          <Image style={{width:70,height:70}} source={{uri:'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png'}}/>
        </View>
        <View>
        <Text style={{textAlign:'center',fontWeight:'bold',margin:20,}}>{currentUser.name}</Text>
        </View>
        </View>
        <View style={styles.profileDetails}>
          <View style={styles.favourite}>
           <Text style={{fontWeight:'bold',fontSize:20}}>{currentUser.favouriteItems.length}</Text>
           <Text>Favourites</Text>
          </View>
          <View style={styles.itemCount}>
            <Text style={{fontWeight:'bold',fontSize:20}}>{fooddata.length}</Text>
            <Text>Food Items</Text>
          </View>
        </View>
        </View>
        
        <Button title="Logout" onPress={() => {
          setIsLoggedIn(true);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        }
        }
        />
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    width:'100%',
    height:'100%'
  },
  profileImage:{
   alignItems:'center',
  },
  profileCard:{
    flexDirection:'row',
    width:'100%',
    backgroundColor:'white'
  },
  profileDetails:{
    width:'60%',
    marginTop:100,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    gap:25
  },
  profileDetailLeft:{
    marginTop:100,
    width:'40%',
    borderRightWidth:0.5,
    margin:10,
  },
  favourite:{
    alignItems:'center',
  },
  itemCount:{
    alignItems:'center',
  }
})