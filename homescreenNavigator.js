import { StyleSheet, Text, Pressable, View, Image, TouchableHighlight, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectDropdown from 'react-native-select-dropdown';
import Procedure from './second';
import { useState, useEffect } from 'react';
import { HomeScreen } from './home';
import { useUserContext } from './userProvider';
import axios from 'axios';



const categories = ['All', 'veg', 'non-veg']


const Stack = createNativeStackNavigator();
export default function HomeScreenNavigator(){
    const [category, setCategory] = useState('All');
    const {setfooddata,fooddata} =useUserContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(fooddata);
    const [search, setsearch] = useState(false)
    const [err, seterr]=useState(false)
  
    const getFoodDetails = async () => {
      try {
        const response = await axios.get('http:192.168.1.5:5000/fooddata'); 
        setfooddata(response.data);
        setFilteredData(response.data); 
      } catch (error) {
        console.error('Error fetching food data:', error);
        seterr(true);
      }
    }
  
    useEffect(() => {
      getFoodDetails(); // Fetch food data when the component mounts
    }, []);
  
    const handleCategoryChange = (newCategory) => {
      setCategory(newCategory);
      if (searchQuery === '') {
        setFilteredData(
          newCategory === 'All'
            ? fooddata
            : fooddata.filter((item) => item.category === newCategory)
  
        );
      }
    };
  
    const handleQuery = (query) => {
      setSearchQuery(query);
      if (query === '') {
        setFilteredData(
          category === 'All'
            ? fooddata
            : fooddata.filter((item) => item.category === category)
        );
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
   return(
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            initialParams={{ category: category }}
            options={{
              title: 'Food Recipe',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerRight: () => (
                <View style={{ alignItems: 'center', flexDirection: 'row', gap: 10, }}>
                  <TouchableOpacity onPress={() => { {setsearch(!search);}}}>
                    <Image style={{ height: 22, width: 22 }} source={{ uri: 'https://w7.pngwing.com/pngs/582/430/png-transparent-search-magnifier-find-zoom-glass-seo-optimization-instagram-icon.png' }} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                  <SelectDropdown
                    defaultButtonText="All"
                    renderDropdownIcon={() => <Image style={{ height: 25, width: 25, alignItems: 'center', justifyContent: 'center' }} source={{ uri: 'https://e7.pngegg.com/pngimages/550/928/png-clipart-computer-icons-iconfinder-symbol-apple-icon-format-filter-icon-angle-text-thumbnail.png' }} />}
                    data={categories}
                    buttonStyle={{ width: 90, backgroundColor: 'transparent', borderRadius: 0 }}
                    onSelect={(selectedItem, index) => handleCategoryChange(selectedItem)}
                    buttonTextAfterSelection={(selectedItem) => selectedItem}
                    rowTextForSelection={(item, index) => item}
                  />
                  </TouchableOpacity>
                </View>
              ),
              headerBackground: () => (
                <ImageBackground
                  source={{ uri: 'https://img.freepik.com/free-vector/sketches-arabic-food-pattern_23-2147543047.jpg?w=740&t=st=1691477289~exp=1691477889~hmac=27bccfc79885fddb3f837c7a8f6b19035da84439a913e1e29f1edadb205b3da7' }}
                  style={{ flex: 1, opacity: 0.2 }}
                  resizeMode="cover"
                />
              ),
            }}
          >
            {({ navigation, route }) => (
              <HomeScreen navigation={navigation}
                route={route}
                category={category}
                handlequery={handleQuery}
                handleCategoryChange={handleCategoryChange}
                searchQuery={searchQuery}
                filteredData={filteredData}
                search={search}
                setsearch={setsearch}
                error={err}/>
            )}
          </Stack.Screen>
          <Stack.Screen
            name="procedure"
            component={Procedure}
            options={{
              headerBackground: () => (
                <ImageBackground
                  source={{ uri: 'https://img.freepik.com/free-vector/sketches-arabic-food-pattern_23-2147543047.jpg?w=740&t=st=1691477289~exp=1691477889~hmac=27bccfc79885fddb3f837c7a8f6b19035da84439a913e1e29f1edadb205b3da7' }}
                  style={{ flex: 1, opacity: 0.2 }}
                  resizeMode="cover"
                />
              ),
            }}
          />
        </Stack.Navigator>
   )
  };
  
  