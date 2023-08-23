import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Pressable } from 'react-native';
import { Rating } from 'react-native-stock-star-rating';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import Unorderedlist from 'react-native-unordered-list';
import { useUserContext } from './userProvider';


export default function Procedure({ route }) {
    const { currentUser, addToFavorites,} = useUserContext();
    const { food } = route.params;
    const inc = food.ingredients;
    const proc = food.procedure;
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
      setIsFavorite(currentUser.favouriteItems.includes(food.id));
    }, [currentUser.favouriteItems, food.id]);
  
    const handleFavoriteToggle = () => {
      addToFavorites(currentUser.id, food.id);
      // No need to forceUpdate here
    };

    
    return (
        <View style={styles.container}>
            <ImageBackground style={{ width: '100%', height: '100%' }} imageStyle={{ opacity: 0.2 }} source={{ uri: 'https://img.freepik.com/free-vector/sketches-arabic-food-pattern_23-2147543047.jpg?w=740&t=st=1691477289~exp=1691477889~hmac=27bccfc79885fddb3f837c7a8f6b19035da84439a913e1e29f1edadb205b3da7' }}>
                <ScrollView>
                    <View style={styles.layout}>
                        <View style={styles.image}>
                            <Image style={styles.foodImg} source={{ uri: food.imageuri }} />
                        </View>
                        <View style={styles.title}>
                            <Text style={{ fontWeight: 'bold', fontSize: 30 }}>{food.title}</Text>
                        </View>
                        <View style={styles.rating}>
                            <View style={{}}>
                                <Rating stars={food.rating} maxStars={5} size={25} color={'#dbc730'} />
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                <Image style={{ height: 20, width: 20 }} source={{ uri: food.isVeg ? 'https://png.pngitem.com/pimgs/s/151-1515150_veg-icon-png-circle-transparent-png.png' : 'https://www.motherskitchennepal.com/wp-content/uploads/2018/06/nonveg_icon.png' }} />
                                <Text style={{ color: food.isVeg ? 'green' : 'red' }}>{food.isVeg ? ' Veg' : ' Non-Veg'}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                <MaterialIcons name="timer" size={20} color="grey" />
                                <Text style={{ color: 'grey' }}> {food.time} mins</Text>
                            </View>
                            <View style={styles.like}>
                                <Pressable onPress={handleFavoriteToggle}>
                                    <AntDesign
                                        name={currentUser?.favouriteItems?.includes(food.id) ? 'heart' : 'hearto'}
                                        size={24}
                                        marginTop={4}
                                        color={currentUser?.favouriteItems?.includes(food.id) ? 'red' : 'black'}
                                    />
                                </Pressable>
                            </View>
                        </View>
                        <View style={[styles.ingredientscontainer,]}>
                            <Text style={{ fontWeight: 'bold', textAlign: 'left', fontSize: 20, marginBottom: 10, }}>Ingredients:</Text>
                            {inc.map((val, index) => (
                                <Unorderedlist key={index}>
                                    <Text style={{ borderBottomWidth: 0.5, padding: 5, borderBottomColor: 'grey' }}>{val}</Text>
                                </Unorderedlist>
                            ))}
                        </View>
                        <View style={styles.procedure}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, }}>Procedure</Text>
                            {proc.map((val, index) => (
                                <View key={index} style={{ padding: 10 }}>
                                    <Text style={{ textAlign: 'justify', lineHeight: 15 }} key={index}>Step {index + 1}: {val}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    foodImg: {
        width: '90%',
        borderRadius: 10,
        height: 250,
    },
    title: {
        margin: 10,
    },
    layout: {
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'rgba(234, 215, 245, 0.1)',
    },
    ingredientscontainer: {
        backgroundColor: 'rgba(234, 215, 245, 0.7)',
        width: '97%',
        borderWidth: 0.2,
        borderRadius: 10,
        padding: 10,
    },
    ingredientsTitle: {
        alignItems: 'flex-start',
        height: 35,
        padding: 5,
        width: '100%',
    },
    procedure: {
        borderWidth: 0.5,
        borderRadius: 10,
        width: '97%',
        margin: 10,
        backgroundColor: 'rgba(234, 215, 245, 0.7)',
        padding: 10,
    },
    rating: {
        flexDirection: 'row',
        width: '97%',
        justifyContent: 'space-around',
        padding: 7,
    },
});
