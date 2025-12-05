import { Text, View, StyleSheet } from "react-native";

export const CategoriaSection = ({categorias}) => {
    return ( 
        <View style={styles.containerSubtitulo}>
           {categorias.map((cat, index) => (
                <Text key={index} style={styles.subtitulo}>
                    {cat}
                </Text>
            ))}
        </View> 
    );
};

const styles = StyleSheet.create({
    containerSubtitulo: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 15,
        padding: 20,
    }, 
    subtitulo: {
    fontSize: 30,
    color: '#2F2F2F',
    fontWeight: "bold",
    textAlign: 'left'
  },
})