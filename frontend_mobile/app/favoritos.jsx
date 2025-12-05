import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Favoritos({favorites}) {
  return (
    <View style={styles.container}>
      <View style={styles.containerTitulo}>
        <Text style={styles.titulo}>Favoritos</Text>

        <View style={styles.containerMensagem}>
          <Ionicons name="heart-outline" size={44} color="#000000ff" />
          <Text style={styles.mensagemFavoritos}>Você ainda não possui favoritos.</Text>
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: "flex-start",
    backgroundColor: '#FFF',
  }, 
  containerTitulo: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 60,
    padding: 20,
  },
  titulo: {
    fontSize: 30,
    color: '#2F2F2F',
    fontWeight: "bold",
    textAlign: 'left'
  },
  containerMensagem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  mensagemFavoritos: {
    fontSize: 20,
    color: '#2F2F2F',
    fontWeight: "bold",
    textAlign: 'center'
  }
})
