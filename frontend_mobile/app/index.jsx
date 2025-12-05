import { Text, View, StyleSheet } from "react-native";
import { AppturButton } from "../components/AppturButton";
import { Busca } from "../components/Busca";
import { CategoriaSection } from "../components/CategoriaSection";

export default function Index() {
  const categorias = ["Praias", "Passeios Culturais", "Lazer"];

  return (
    <View style={styles.container}>
      <View style={styles.containerTitulo}>
        <Text style={styles.titulo}>Bem-vindo!</Text>
      </View>
    
      <Busca />

      <AppturButton />

      <View>
        <CategoriaSection categorias={categorias} />
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
  }
})