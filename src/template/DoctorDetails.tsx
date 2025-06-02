import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import MapView, { Marker } from 'react-native-maps';

interface DoctorDetailsProps {
  description: string;
  location: {
    displayName: string;
    fullAddress: string;
    latitude: number;
    longitude: number;
  };
}

const DoctorDetails: React.FC<DoctorDetailsProps> = ({ description, location }) => {
  const { t } = useTranslation();

  console.log('location -->',location);

  const clinicLocation = {
    latitude: location.latitude,
    longitude: location.longitude,
  };

  return (
    <>
      <Text style={styles.aboutTitle}>
        {t('doctorProfile.about')} <Text style={styles.emoji}>👩🏽‍⚕️</Text>
      </Text>

      <Text style={styles.description}>
        {description}
        <Text style={styles.seeMore}> {t('doctorProfile.seeMore')}</Text>
      </Text>

      {/* Location Map */}
      <View style={styles.mapContainer}>
        <Text style={styles.mapTitle}>{t('doctorProfile.location')}</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: clinicLocation.latitude,
            longitude: clinicLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={clinicLocation}
            title={location.displayName}
            description={location.fullAddress}
          />
        </MapView>
      </View>
    </>
  );
};

export default DoctorDetails;

const styles = StyleSheet.create({
  aboutTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 6,
  },
  emoji: {
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    color: '#6C6C70',
    lineHeight: 20,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  seeMore: {
    color: '#2DB3A6',
    fontWeight: '500',
  },
  mapContainer: {
    marginTop: 8,
    paddingHorizontal: 20,
  },
  mapTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  map: {
    height: 160,
    width: '100%',
    borderRadius: 12,
  },
});
