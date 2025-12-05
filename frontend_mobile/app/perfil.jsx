import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const handleMenuPress = (menuItem) => {
    console.log('Menu selecionado:', menuItem);
    // Navegar para a tela correspondente
  };

  const menuItems = [
    {
      id: 1,
      title: 'Informações Pessoais',
      icon: 'person-outline',
      onPress: () => handleMenuPress('info'),
    },
    {
      id: 2,
      title: 'FAQ',
      icon: 'chatbox-outline',
      onPress: () => handleMenuPress('faq'),
    },
    {
      id: 3,
      title: 'Idioma',
      icon: 'globe-outline',
      onPress: () => handleMenuPress('idioma'),
    },
    {
      id: 4,
      title: 'Sair',
      icon: 'log-out-outline',
      onPress: () => handleMenuPress('sair'),
      isLast: true,
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Seu Perfil</Text>
        </View>

        {/* User Info Card */}
        <View style={styles.userCard}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Olá, Fulano</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                item.isLast && styles.menuItemLast,
              ]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Ionicons
                name={item.icon}
                size={22}
                color="#666"
                style={styles.menuItemIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
  },
  userCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 25,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0E0E0',
  },
  userInfo: {
    marginLeft: 15,
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  menuContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#fff',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
  },
  menuItemIcon: {
    marginLeft: 10,
  },
});

export default ProfileScreen;