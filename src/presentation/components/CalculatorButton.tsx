import { Pressable, Text } from 'react-native';
import { colors, styles } from '../theme/app-theme';

interface CalculatorButtonProps {
  label: string;
  color?: string;
  large?: boolean;
  blackText: boolean;
  onPress: () => void;
}

export const CalculatorButton = ({
  label,
  color = colors.darkGray,
  large = false,
  blackText = false,
  onPress
}: CalculatorButtonProps) => {
  return (
    <Pressable 
    onPress={() => onPress()}
    style={ ( {pressed} ) => ({
      ...styles.button,
      width: (large) ? styles.button.width + 100 : styles.button.width,
      backgroundColor: color,
      opacity: (pressed) ? 0.8 : 1
    })}>
      <Text style={{
        ...styles.buttonText,
        color: (blackText) ? 'black' : 'white',
        }}>
        {label}
      </Text>
    </Pressable>
  )
}