import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import SvgXml from 'react-native-svg';

interface AnimatedSearchBarProps {
    backgroundColor?: string;
    textColor?: string;
    animatedTextColor?: string;
    searchPhrases: string[];
    animationDuration?: number;
    iconColor?: string;
    fontSize?: number; // Add for font size customization
    fontWeight?: string; // Add for font weight customization
}

const SearchIcon = ({ color = '#73B1F4' }) => (
    <SvgXml
        xml={`
      <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.0057 8.80503H9.37336L9.14923 8.58891C9.96079 7.64759 10.4068 6.44584 10.4059 5.20297C10.4059 4.17392 10.1008 3.16798 9.52909 2.31236C8.95738 1.45673 8.14478 0.789856 7.19407 0.396055C6.24335 0.00225437 5.1972 -0.100782 4.18792 0.099976C3.17865 0.300734 2.25157 0.796269 1.52392 1.52392C0.796269 2.25157 0.300734 3.17865 0.099976 4.18792C-0.100782 5.1972 0.00225437 6.24335 0.396055 7.19407C0.789856 8.14478 1.45673 8.95738 2.31236 9.52909C3.16798 10.1008 4.17392 10.4059 5.20297 10.4059C6.49171 10.4059 7.67639 9.93368 8.58891 9.14923L8.80503 9.37336V10.0057L12.8073 14L14 12.8073L10.0057 8.80503ZM5.20297 8.80503C3.20984 8.80503 1.60092 7.19611 1.60092 5.20297C1.60092 3.20984 3.20984 1.60092 5.20297 1.60092C7.19611 1.60092 8.80503 3.20984 8.80503 5.20297C8.80503 7.19611 7.19611 8.80503 5.20297 8.80503Z" fill="${color}"/>
  </svg>
      `}
    />
);

const AnimatedSearchBar: React.FC<AnimatedSearchBarProps> = ({
    backgroundColor = '#D8D8D8',
    textColor = '#888888',
    animatedTextColor = '#73B1F4',
    searchPhrases = ["'Food'", "'Market'", "'Places'", "'Attractions'"],
    animationDuration = 500,
    iconColor,
    fontSize = 14,
    fontWeight = '400'
}) => {
    const animation = useRef(new Animated.Value(0)).current;
    const [index, setIndex] = useState<number>(0);

    const animateText = () => {
        // Scroll text up
        Animated.timing(animation, {
            toValue: -30, // Adjust the Y-axis position for scroll out
            duration: 500, // Duration of scroll out
            useNativeDriver: true,
        }).start(() => {
            // Update text when it's out of view and reset position instantly
            setIndex(prevIndex => (prevIndex + 1) % searchPhrases.length);
            animation.setValue(25); // Reset to below the view for scroll in

            // Scroll new text back into view
            Animated.timing(animation, {
                toValue: 0, // Back to original position
                duration: 500, // Duration of scroll in
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
            height: 35,
            alignSelf: 'center',
            marginTop: 24,
            borderRadius: 18,
            flexDirection: 'row',
            alignItems: 'center',
            overflow: 'hidden',
            paddingHorizontal: 12,
        },
        text: {
            fontSize: fontSize,
            fontWeight: '700',
            lineHeight: 14.4, // Adjust as needed
            color: textColor,
        },
        animatedText: {
            color: animatedTextColor
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <SearchIcon color={iconColor} />
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

export default AnimatedSearchBar;