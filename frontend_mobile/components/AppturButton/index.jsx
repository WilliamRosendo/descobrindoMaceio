import { Text, View, StyleSheet } from "react-native";
import { ActionButton } from "../ActionButton";

export const AppturButton = () => {
    return (
        <View style={styles.contexto}>
            <ActionButton colors={['#3873FF', '#38B4FF']}>
               <Text style={styles.contextoBotaoTexto}>
                Tábua das Marés
                </Text> 
            </ActionButton>

            <ActionButton colors={['#3873FF', '#38B4FF']}>
                <Text style={styles.contextoBotaoTexto}>
                Clima
                </Text>
            </ActionButton>

        <ActionButton colors={['#3873FF', '#38B4FF']}>
            <Text style={styles.contextoBotaoTexto}>
            Calendário
            </Text>
        </ActionButton>
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: "flex-start",
    backgroundColor: '#FFF',
  },
  contexto: {
    flexDirection: 'row',
    justifyContent: "space-around",
    width: "85%",
    paddingTop: 15,
    alignSelf: 'center',
  },
  botao: {
    borderRadius: 20,
    overflow: "hidden",
  },
  contextoBotaoTexto: {
    fontSize: 14,
    color: '#fff',
    fontWeight: "bold",
  },
  contextoBotaoAtivo: {

  }
})