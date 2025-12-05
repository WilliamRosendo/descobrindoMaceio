import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, router } from "expo-router";

export function BottomNav() {
  const pathname = usePathname(); // pega a rota atual
  const [ativo, setAtivo] = useState("home");

  // sincroniza o ícone ativo com a rota atual
  useEffect(() => {
    if (pathname === "/") setAtivo("home");
    else if (pathname === "/mapa") setAtivo("mapa");
    else if (pathname === "/favoritos") setAtivo("favoritos");
    else if (pathname === "/perfil") setAtivo("perfil");
  }, [pathname]);

  const icones = [
    { nome: "home", componente: Ionicons, icone: "home", rota: "/" },
    { nome: "mapa", componente: Ionicons, icone: "map", rota: "/mapa" },
    { nome: "favoritos", componente: Ionicons, icone: "heart", rota: "/favoritos" },
    { nome: "perfil", componente: Ionicons, icone: "person", rota: "/perfil" },
  ];

  return (
    <View style={styles.container}>
      {icones.map((item) => {
        const IconComponent = item.componente;
        const selecionado = ativo === item.nome;

        return (
          <Pressable
            key={item.nome}
            onPress={() => router.push(item.rota)} // 🔹 Navega com expo-router
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          >
            <IconComponent
              name={item.icone}
              size={28}
              color={selecionado ? "#38B4FF" : "#888"}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});
