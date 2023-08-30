import { StyleSheet, Text, Pressable, View, Image, ActivityIndicator, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Rating } from 'react-native-stock-star-rating';
import { useState, useMemo } from 'react';
import { Searchbar } from 'react-native-paper';



export function FoodCard({ title, imageUri, time, rating, onpress, isVeg, foodDescription,loader , onPressIn, onPressOut}, { navigation }) {
  return (

    <TouchableOpacity style={styles.pressable} onPress={onpress} activeOpacity={0.6}  >
     <View style={styles.foodcardOuter}>
      <View style={styles.Foodcard}>
        <View style={styles.foodImgFrame}>
          <Image style={styles.foodImg} source={{ uri: imageUri }} />
        </View>
        <View style={styles.foodDetails}>
          <View style={styles.foodTitle}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5, }}>{title}</Text>
          </View>
          <View style={styles.category}>
            <Image style={{ height: 20, width: 20 }} source={{ uri: isVeg ? 'https://png.pngitem.com/pimgs/s/151-1515150_veg-icon-png-circle-transparent-png.png' : 'https://www.motherskitchennepal.com/wp-content/uploads/2018/06/nonveg_icon.png' }} />
            <Text style={{ color: isVeg ? 'green' : 'red' }}>{isVeg ? ' Veg' : ' Non-Veg'}</Text>
            <Text> | </Text>
            <MaterialIcons name="timer" size={20} color="grey" />
            <Text style={{ color: 'grey' }}> {time} mins</Text>
          </View>
          <Rating stars={rating} maxStars={5} size={25} color={'#dbc730'} />
          <View style={styles.description}>
            <Text style={{ color: 'grey', textAlign: 'justify' }}>{foodDescription}</Text>
          </View>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  );
}

export function HomeScreen({ navigation, searchQuery, filteredData, handlequery, search,setsearch, error,}) {
  const [loaders, setLoaders] = useState([]);

  const handleLoader = (index, isLoading) => {
  const updatedLoaders = [...loaders];
  updatedLoaders[index] = isLoading;
  setLoaders(updatedLoaders);
};


  const renderItem = useMemo(
    () => ({ item }) => (
      <View style={styles.listItemContainer}>
        <FoodCard
         onpress={() => {
          console.log("food item pressed")
          handleLoader(item.id, true);
          navigation.navigate('procedure', { food: item });
          navigation.addListener('transitionEnd', () => {
            handleLoader(item.id, false);
          });
        }}
        
          title={item.title}
          imageUri={item.imageuri}
          time={item.time}
          rating={item.rating}
          isVeg={item.isVeg}
          foodDescription={item.description}
          loader={loaders[item.id]}
          onPressIn={() => handleLoader(item.id, true)}
        />
      </View>
    ),
    [loaders, navigation]
  );
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.backgroundImg} imageStyle={{ opacity: 0.2 }} source={{ uri: 'https://img.freepik.com/free-vector/sketches-arabic-food-pattern_23-2147543047.jpg?w=740&t=st=1691477289~exp=1691477889~hmac=27bccfc79885fddb3f837c7a8f6b19035da84439a913e1e29f1edadb205b3da7' }}>
        { search?<Searchbar
          placeholder="Search Recipe"
          onChangeText={handlequery}
          value={searchQuery}
          onClearIconPress={()=>setsearch(!search)}
        />:null}
        {error&&<Text style={{textAlign:'center',fontWeight:'bold',fontSize:20,marginTop:20}}>No item found</Text>}
        <FlatList
          style={styles.flatListContainer}
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </ImageBackground>
    </View>
  );
}

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    backgroundImg: {
      height: '100%',
      width: '100%',
    },
    list: {
      marginTop: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'green',
    },
    pressable: {
      width: '100%',
    },
    Foodcard: {
      height: 170,
      width: '97%',
      backgroundColor: 'rgba(234, 215, 245, 1.0)',
      borderRadius: 10,
      borderBottomWidth: 1,
      borderColor: 'grey',
      opacity: 1,
      marginTop: 10,
      flexDirection: 'row',
      marginStart: 5,
    },
    loader:{
      position:'absolute',
      height: 170,
      width: '97%',
      backgroundColor: 'rgba(234, 215, 245, 0.7)',
      borderRadius: 10,
      borderBottomWidth: 1,
      borderColor: 'grey',
      alignItems:'center',
      justifyContent:'center',
      opacity: 1,
      marginTop: 10,
      marginStart: 5,
    },
    foodImgFrame: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '50%',
      height: '100%',
      borderRadius: 10,
      elevation: 10,
    },
    foodImg: {
      height: '97%',
      width: '90%',
      borderRadius: 10,
    },
    foodDetails: {
      margin: 7,
    },
    foodTitle: {
      fontStyle: 'bold',
      flexWrap: 'wrap',
    },
    category: {
      flexDirection: 'row',
    },
    flatListContainer: {
      flex: 1,
    },
    listItemContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    description: {
      height: 70,
      width: 165,
      borderTopWidth: 1,
    },
    foodcardOuter:{
      position:'relative'
    }
  });
  
  