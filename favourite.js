import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, ImageBackground } from 'react-native';
import { fooddata } from './food data';
import { FoodCard } from './home';
import { useUserContext } from './userProvider';
import { useIsFocused } from '@react-navigation/native';

export default function Favourite({ navigation }) {
  const { currentUser } = useUserContext();
  const [backgroundImage, setBackgroundImage] = useState(false);
  const isFocused = useIsFocused(); // Get the focused status of the screen

  const updateBackgroundImage = () => {
    setBackgroundImage(currentUser.favouriteItems.length === 0);
  };

  useEffect(() => {
    updateBackgroundImage();
  }, [currentUser.favouriteItems]);

  useEffect(() => {
    if (isFocused) {
      updateBackgroundImage();
    }
  }, [isFocused]);

  const favdata = currentUser?.favouriteItems
    ? fooddata.filter(data => {
        const isFavorite = currentUser.favouriteItems.includes(data.id);
        return isFavorite;
      })
    : [];

  return (
    <ImageBackground
      style={{ width: '100%', height: '100%' }}
      imageStyle={{ opacity: 0.2 }}
      source={{
        uri: 'https://img.freepik.com/free-vector/sketches-arabic-food-pattern_23-2147543047.jpg?w=740&t=st=1691477289~exp=1691477889~hmac=27bccfc79885fddb3f837c7a8f6b19035da84439a913e1e29f1edadb205b3da7',
      }}
    >
      {backgroundImage && (
        <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Image
            style={{ width: 300, height: 300 }}
            source={{
              uri: 'https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-3613108-3020773.png',
            }}
          />
          <Text style={{ fontWeight: 'bold' }}>Favourite list is empty</Text>
        </View>
      )}
      <FlatList
        data={favdata}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <FoodCard
              onpress={() => navigation.navigate('fooddetail', { food: item })}
              title={item.title}
              imageUri={item.imageuri}
              time={item.time}
              rating={item.rating}
              isVeg={item.isVeg}
              foodDescription={item.description}
            />
          </View>
        )}
      />
    </ImageBackground>
  );
}
