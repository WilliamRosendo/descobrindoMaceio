import React from 'react';
import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function Busca({ placeholder = "Buscar..." }) {
    const [texto, setTexto] = React.useState("");

    const limparTexto = () => setTexto("");

    return (
        <View style={styles.container}>
            <Ionicons name="search" size={20} color="#888" style={styles.icone} />
            <TextInput
                style={[styles.input, { borderWidth: 0 }]}
                placeholder={placeholder}
                placeholderTextColor="#aaa"
                value={texto}
                onChangeText={setTexto}
            />
            {texto.length > 0 && (
                <Pressable onPress={limparTexto}>
                    <Ionicons name="close-circle" size={20} color="#888" />
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 15,
        height: 50,
        marginVertical: 10,
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3, // sombra no Android
    },
    icone: {
        marginRight: 10
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
});
