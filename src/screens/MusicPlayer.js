import React, {useState, useEffect} from 'react';
import {
    View,
    SafeAreaView,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import { Audio } from 'expo-av';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

import Icon from 'react-native-vector-icons/Feather';
import { Cart } from '../db/database';



const MusicPlayer = ({ album }) => {
    const [playing, setPlaying] = useState(false);
    const [sound, setSound] = useState(new Audio.Sound());
    const [status, setStatus] = useState(null);
    const handlePlaying = async () => {
        if (status === null) {
            setPlaying(!playing);
            return loadSound(album.songs[0]);
        }
        if (playing) {
            let current = await sound.pauseAsync();
            setPlaying(!playing);
            return setStatus(current);
        }
        else {
            let current = await sound.playAsync();
            setPlaying(!playing);
            return setStatus(current);
        }
    }
    const loadSound = async (song) => {
        let current = await sound.loadAsync(
            { uri: song.url },
            { shouldPlay: true }
        );
        await sound.setIsLoopingAsync(true);
        return setStatus(current);
    }

    return (
        <View style={{ marginTop: 20, flex: 1, backgroundColor: '#ecf0f1', }}>
        <View style={style.imageContainer}>
            <Image source={album.cover} style={style.image} resizeMode={'contain'} />
        </View >
        <View style={style.detailsContainer}>
            <View style={{alignItems: 'center', marginTop: -80}}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>
                    {album.songs[0].name}
                </Text>
            </View>
            <View style={{alignItems: 'center', marginTop: 10}}>
                <Text style={{fontSize: 20}}>
                    {album.artist}
                </Text>
                </View>
                <View>
                    <View style={{marginTop: 50, alignItems: 'center', justifyContent:'center'}  }>
                        <TouchableOpacity style={style.btn} onPress={() => { handlePlaying()}}>
                            <Icon name={playing ? 'pause' : 'play'} size={40} color='#F3A712' />
                        </TouchableOpacity>
                    </View>
                </View>    
        </View>
    </View>
    
  );
};

const style = StyleSheet.create({
    wrap: {
        width: WIDTH,
        height: HEIGHT * 0.45,
        
    },
    image: {
        width: 350,
        height: 350,
        borderRadius: 175, 
        shadowColor: '#202020',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 5,  
    },
    imageContainer: {
        marginTop: -50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
    },
    detailsContainer: {
        height: 300,
        marginBottom: 7,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingTop: 30,
    },
    btn: {
        backgroundColor: '#040F38',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: 150,
        height: 80,
    },
});

export default MusicPlayer;