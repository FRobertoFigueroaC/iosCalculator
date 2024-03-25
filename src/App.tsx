import React from 'react';
import {
  StatusBar,
  View,
} from 'react-native';
import { CalculatorScreen } from './presentation/screens';
import { styles } from './presentation/theme/app-theme';



function App() {
  return (
    <View style={styles.background}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'black'}
      />
      <CalculatorScreen/>
    </View>
  );
}

export default App;
