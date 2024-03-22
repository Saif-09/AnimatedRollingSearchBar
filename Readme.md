
# Animated Rolling Search Bar for React Native


Add a dynamic and engaging search experience to your React Native app with this animated rolling search bar component.



## Features

- Smooth Animations: Captivating text scrolling animation.

- Fully Customizable: Control colors, fonts, animation speed, and search terms.

- Easy to Integrate: Simple to install and use in your React Native projects.




## Installation

```bash
npm install react-native-rolling-search-bar
```
    
## Usage/Examples

```javascript
import RollingSearchBar from 'react-native-rolling-search-bar';

<RollingSearchBar 
    backgroundColor="#F0F0F0"
    textColor="#333333"
    animatedTextColor="#007AFF"
    searchPhrases={['Restaurants', 'Cafes', 'Bars', 'Nightlife']}
    animationDuration={600}
    iconColor="#007AFF"
    fontSize={16}
    fontWeight="500"
/>
```


## Props
| Prop Name          | Type      | Default      | Description                                       |
|--------------------|-----------|--------------|---------------------------------------------------|
| backgroundColor    | string    | '#D8D8D8'    | Background color of the search bar                |
| textColor          | string    | '#888888'    | Color of the static "Search for" text             |
| animatedTextColor  | string    | '#73B1F4'    | Color of the animated search phrases              |
| searchPhrases      | string[]  | []           | An array of phrases for the animation             |
| animationDuration  | number    | 500          | Animation speed (in milliseconds)                 |
| iconColor          | string    | (Inherited)  | Color of the search icon                          |
| fontSize           | number    | 14           | Font size of the text                             |
| fontWeight         | string    | '400'        | Font weight of the text                           |

## License

This project is licensed under the MIT License.

## Demo

![](https://github.com/Saif-09/AnimatedRollingSearchBar/blob/master/assets/SearchBarGif.gif)
