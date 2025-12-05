import { StyleSheet, Pressable } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export const ActionButton = ({ children, colors, style}) => { 
    return(
        <Pressable
      style={({ pressed }) => [
        style,
        {
          opacity: pressed ? 0.7 : 1,
          transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1 }],
        },
      ]}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradienteBotao}
      >
        {children}
      </LinearGradient>
    </Pressable>
    )
}

const styles = StyleSheet.create({
  gradienteBotao: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});