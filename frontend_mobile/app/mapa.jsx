import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MapScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Praias');

  // Dados dos destinos
  const destinations = [
    {
      id: 1,
      name: 'Cruz das Almas',
      distance: '28 km (aprox 1h20 de)',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
      coordinates: { latitude: -9.6498, longitude: -35.7089 },
    },
    {
      id: 2,
      name: 'Pajuçara',
      distance: '36 km (1h50 de)',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
      coordinates: { latitude: -9.6698, longitude: -35.7189 },
    },
    {
      id: 3,
      name: 'Ponta Verde',
      distance: '15 km (45min de)',
      image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400',
      coordinates: { latitude: -9.6398, longitude: -35.6989 },
    },
  ];

  const handleLocalization = (destination) => {
    console.log('Navegar para:', destination.name);
    // Implementar navegação/direções
  };

  // Componente de mapa placeholder (funciona em todas plataformas)
  const MapPlaceholder = () => (
    <View style={styles.mapPlaceholder}>
      <Text style={styles.mapIcon}>🗺️</Text>
      <Text style={styles.mapTitle}>Mapa de Maceió</Text>
      <Text style={styles.mapSubtitle}>
        {Platform.OS === 'web' 
          ? 'Visualização interativa disponível nos apps iOS e Android'
          : 'Carregue react-native-maps para visualizar o mapa'}
      </Text>
      
      {/* Marcadores visuais */}
      <View style={styles.markersContainer}>
        {destinations.map((dest, index) => (
          <View key={dest.id} style={styles.markerBadge}>
            <Text style={styles.markerText}>📍 {dest.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Área do Mapa */}
      <View style={styles.mapContainer}>
        <MapPlaceholder />

        {/* Botões de Zoom */}
        <View style={styles.zoomControls}>
          <TouchableOpacity style={styles.zoomButton}>
            <Ionicons name="add-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomButton}>
            <Ionicons name="remove-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Botão de Localização */}
        <TouchableOpacity style={styles.locationButton}>
          <Ionicons name="information-circle-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Tabs de Categoria */}
      <View style={styles.tabsContainer}>
        {['Praias', 'Culture', 'Lazer'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && styles.tabActive,
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.tabTextActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de Destinos */}
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderIcon}>📍</Text>
        <Text style={styles.listHeaderText}>Destinos próximos</Text>
      </View>

      <ScrollView
        style={styles.destinationsList}
        showsVerticalScrollIndicator={false}
      >
        {destinations.map((destination) => (
          <View key={destination.id} style={styles.destinationCard}>
            <Image
              source={{ uri: destination.image }}
              style={styles.destinationImage}
              resizeMode="cover"
            />
            <View style={styles.destinationInfo}>
              <Text style={styles.destinationName}>{destination.name}</Text>
              <View style={styles.distanceContainer}>
                <Text style={styles.distanceIcon}>📍</Text>
                <Text style={styles.distanceText}>{destination.distance}</Text>
              </View>
              <TouchableOpacity
                style={styles.localizationButton}
                onPress={() => handleLocalization(destination)}
              >
                <Text style={styles.localizationIcon}>📍</Text>
                <Text style={styles.localizationText}>Localização</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    height: 280,
    position: 'relative',
    backgroundColor: '#E8F4F8',
  },
  mapPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F4F8',
    padding: 20,
  },
  mapIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  mapTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4A90E2',
    marginBottom: 8,
  },
  mapSubtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  markersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  markerBadge: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  markerText: {
    fontSize: 11,
    color: '#333',
  },
  zoomControls: {
    position: 'absolute',
    right: 20,
    top: '50%',
    marginTop: -50,
    gap: 10,
  },
  zoomButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  locationButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  locationIcon: {
    fontSize: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 10,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  tabActive: {
    backgroundColor: '#64B5F6',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#fff',
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  listHeaderIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  listHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  destinationsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  destinationCard: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  destinationImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  destinationInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  destinationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  distanceIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  distanceText: {
    fontSize: 12,
    color: '#999',
  },
  localizationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#64B5F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  localizationIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  localizationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default MapScreen;