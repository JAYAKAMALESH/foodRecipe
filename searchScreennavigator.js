
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Procedure from './second';
import SearchScreen from './searchScreen';
import { ImageBackground } from 'react-native';

const Search = createNativeStackNavigator();

export default function SearchScreenNavigator(){
    return(
        <Search.Navigator 
        screenOptions={{
            headerBackground: () => (
              <ImageBackground
                source={{ uri: 'https://img.freepik.com/free-vector/sketches-arabic-food-pattern_23-2147543047.jpg?w=740&t=st=1691477289~exp=1691477889~hmac=27bccfc79885fddb3f837c7a8f6b19035da84439a913e1e29f1edadb205b3da7' }}
                style={{ flex: 1, opacity: 0.2 }}
                resizeMode="cover"
              />
            ),
          }}
        >
            <Search.Screen name='search' component={SearchScreen}/>
            <Search.Screen name='fooddetail' component={Procedure}/>
        </Search.Navigator>
    )
}