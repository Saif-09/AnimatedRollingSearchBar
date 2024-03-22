import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';


interface AnimatedSearchBarProps {
    backgroundColor?: string;
    textColor?: string;
    animatedTextColor?: string;
    searchPhrases: string[];
    animationDuration?: number;
    fontSize?: number; // Add for font size customization
    icWidth?: number;
    icHeight?:number;
    
}


const AnimatedSearch: React.FC<AnimatedSearchBarProps> = ({
    backgroundColor = '#D8D8D8',
    textColor = '#888888',
    animatedTextColor = '#73B1F4',
    searchPhrases = ["'Food'", "'Market'", "'Places'", "'Attractions'"],
    animationDuration = 500,
    fontSize = 14,
    icWidth = 20,
    icHeight = 20,

}) => {
    const animation = useRef(new Animated.Value(0)).current;
    const [index, setIndex] = useState<number>(0);

    const animateText = () => {
        // Scroll text up
        Animated.timing(animation, {
            toValue: -30, // Adjust the Y-axis position for scroll out
            duration: animationDuration, // Duration of scroll out
            useNativeDriver: true,
        }).start(() => {
            // Update text when it's out of view and reset position instantly
            setIndex(prevIndex => (prevIndex + 1) % searchPhrases.length);
            animation.setValue(25); // Reset to below the view for scroll in

            // Scroll new text back into view
            Animated.timing(animation, {
                toValue: 0, // Back to original position
                duration: animationDuration, // Duration of scroll in
                useNativeDriver: true,
            }).start();
        });
    };

    useEffect(() => {
        animateText(); // Start the animation when the component mounts
        const timer = setInterval(animateText, 4000); // Repeat the animation every 4 seconds
        return () => clearInterval(timer); // Cleanup interval on unmount
    }, []);

    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: 20,
        },
        searchBar: {
            width: '100%',
            backgroundColor: backgroundColor,
            height: 40,
            alignSelf: 'center',
            borderRadius: 18,
            flexDirection: 'row',
            alignItems: 'center',
            overflow: 'hidden',
            paddingHorizontal: 12,
        },
        text: {
            fontSize: fontSize,
            fontWeight: "500",
            color: textColor,
        },
        animatedText: {
            color: animatedTextColor
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
            <Image source={require('../assets/SearchIcon.png')} style={{width:icWidth, height:icHeight, alignSelf: "center" }} />
                <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                    <Text style={styles.text}>Search for </Text>
                    <Animated.View style={{ transform: [{ translateY: animation }] }}>
                        <Text style={[styles.text, styles.animatedText]}>{searchPhrases[index]}</Text>
                    </Animated.View>
                </View>
            </View>
        </View>
    );
};

export default AnimatedSearch;