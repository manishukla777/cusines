import React, {useState} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import zomato from '../api/zomato'
import { FlatList } from 'react-native-gesture-handler';
import { bold } from 'ansi-colors';

const SearchScreen = () => {
    const [term, setTerm] = useState('');
    const [results, setResults] = useState([]);

    const searchApi = async () => {
        const response = await zomato.get('/geocode', {
            params: {
                lat: 28.4595,
                lon: 77.0266
            }
        });
        setResults(response.data.nearby_restaurants)
    }
    return (
        <View>
            <SearchBar 
                term={term} 
                onTermChange={(newTerm) => setTerm(newTerm)} 
                onTermSubmit={() => searchApi()}
            />
            <Text style={styles.textStyle}>{term}</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={restaurant => `${restaurant.restaurant.R.res_id}`}
                data={results}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <Image style={styles.imageStyle} source={{uri: `${item.restaurant.featured_image}`}} />
                            <Text style={styles.textStyle}>
                                {item.restaurant.name}
                            </Text>
                        </View>
                    )
                }}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    textStyle: {
        marginBottom: 15,
        fontSize: 20,
        fontWeight: 'bold'
    },
    imageStyle: {
        height: 200,
        width: 300
    }
});

export default SearchScreen;