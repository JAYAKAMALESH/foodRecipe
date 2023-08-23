import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ImageBackground, Image } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { fooddata } from './food data';
import { FoodCard } from './home';
import { styles } from './home';

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState();
  const [search, setsearch] = useState(false);
  const [err, seterr] = useState(false);

  const handleQuery = (query) => {
    setSearchQuery(query);
    if (query === '') {
      seterr(true)
      setFilteredData(null)
    } else {
      const filteredItems = fooddata.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredData(filteredItems);
      seterr(filteredItems.length === 0);
    }
  };

  useEffect(() => {
    seterr(searchQuery.length === 0 || filteredData.length !== 0 ? false : true);
  }, [searchQuery, filteredData]);

  return (
      <ImageBackground
      style={{ width: '100%', height: '100%' }}
      imageStyle={{ opacity: 0.2 }}
      source={{
        uri: 'https://img.freepik.com/free-vector/sketches-arabic-food-pattern_23-2147543047.jpg?w=740&t=st=1691477289~exp=1691477889~hmac=27bccfc79885fddb3f837c7a8f6b19035da84439a913e1e29f1edadb205b3da7',
      }}
    >
      <Searchbar
        placeholder="Search Recipe"
        onChangeText={handleQuery}
        value={searchQuery}
        onClearIconPress={() => setsearch(!search)}
      />
     
      {err && (
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginTop: 20 }}>
          No item found
        </Text>
      )}
        {searchQuery.length === 0 && (
        <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontWeight: 'bold' ,marginTop:20 }}>Search your Favourite Foods</Text>
          <Image
            style={{ width: 360, height: 300 }}
            source={{
              uri: 'https://static.vecteezy.com/system/resources/previews/019/607/567/original/fast-food-vector-clipart-design-graphic-clipart-design-free-png.png',
            }}
          />
          
        </View>
      )}
      <View>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
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
      </View>
    </ImageBackground>
  );
}
