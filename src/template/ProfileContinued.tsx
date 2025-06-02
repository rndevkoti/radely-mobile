import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import LinearGradient from 'react-native-linear-gradient';
import { OTPVERIFICATION } from '../appconstants';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeContext';
import { useProfile } from '../context/ProfileContext';
import sendOTP from '../networking/sendOTP';
import { Asset, CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';

const ProfileContinued = ({ step }: { step: number }) => {

  const { profileContinued, setProfileContinued } = useProfile(); // Access profileContinued and setProfileContinued
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [pronouns, setPronouns] = useState(profileContinued.pronouns);
  const [language, setLanguage] = useState(profileContinued.language);
  const [education, setEducation] = useState(profileContinued.education);
  const [newOTP, setNewOTP] = useState(profileContinued.newOTP);

  const [emergencyContactName, setEmergencyContactName] = useState(profileContinued.emergencyContactName);
  const [emergencyContactPhone, setEmergencyContactPhone] = useState(profileContinued.emergencyContactPhone);
  const [relationship, setRelationship] = useState(profileContinued.relationship);
  const [streetAddress, setStreetAddress] = useState(profileContinued.streetAddress);
  const [city, setCity] = useState(profileContinued.city);
  const [state, setState] = useState(profileContinued.state);
  const [occupation, setOccupation] = useState(profileContinued.occupation);
  const [maritalStatus, setMaritalStatus] = useState(profileContinued.maritalStatus);
  const [educationOpen, setEducationOpen] = useState(false);
  const [photo, setPhoto] = useState(profileContinued.photo);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdown2Open, setDropdown2Open] = useState(false);
  const navigation = useNavigation<any>();
  const { profile } = useProfile(); // Access the profileContinued data
  const [loading, setLoading] = useState<boolean>(false);

  const formatPronoun = (value: string) => {
    switch (value) {
      case 'He/Him':
        return 'HE_HIM';
      case 'She/Her':
        return 'SHE_HER';
      case 'They/Them':
        return 'THEY_THEM';
      case 'Prefer not to say':
        return 'PREFER_NOT_TO_SAY';
      default:
        return '';
    }
  };
  
  const formatEducation = (value: string) => {
    switch (value.toLowerCase()) {
      case 'high_school':
        return 'SECONDARY';
      case 'bachelors':
        return 'BACHELORS';
      case 'masters':
        return 'MASTERS';
      case 'doctorate':
        return 'DOCTORATE';
      default:
        return 'PREFER_NOT_TO_SAY';
    }
  };
  

  const handleContinue = async () => {
    // Save all values to the profileContinued context

    if (!pronouns || !language || !education || !emergencyContactName || !emergencyContactPhone || !relationship ||
      !streetAddress || !city || !state || !occupation || !maritalStatus) {
      Alert.alert(t('missing_fields'), t('please_fill_all_fields'));
      return;
    }

    setProfileContinued({
      pronouns: formatPronoun(pronouns),
      language,
      education: formatEducation(education),
      emergencyContactName,
      emergencyContactPhone,
      relationship,
      streetAddress,
      city,
      state,
      occupation,
      maritalStatus,
      newOTP,
      photo,
    });


    console.log('phone number -->', profile.phone);
    if (!profile.countryCode || !profile.phone) {
      Alert.alert('Error', 'Please enter both country code and phone number.');
      return;
    }
    setLoading(true);

    try {
      const response = await sendOTP(profile.countryCode, profile.phone);
      Alert.alert('Success', 'OTP received successfully');
      console.log('OTP Response:', response);
      setNewOTP(response.timestamp);
      setLoading(false);
      navigation.navigate(OTPVERIFICATION);
    } catch (error: any) {
      Alert.alert('OTP Failed', error.message || 'Something went wrong.');
      console.error('OTP Error:', error);
    } finally {
      setLoading(false);
    }
  }



  const handleAddPhoto = () => {
    Alert.alert(
      t('profile.upload_photo'), // title
      t('profile.choose_option'), // message
      [
        {
          text: t('profile.camera'),
          onPress: openCamera,
        },
        {
          text: t('profile.gallery'),
          onPress: openGallery,
        },
        {
          text: t('profile.cancel'),
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const openCamera = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 0.7,
      cameraType: 'front',
      saveToPhotos: true,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.error('Camera error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        // handleInputChange('photo', response.assets[0].uri);
        const uri = response.assets?.[0];
        setPhoto(uri);

      }
    });
  };

  const openGallery = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.7,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled gallery picker');
      } else if (response.errorCode) {
        console.error('Gallery picker error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        // handleInputChange('photo', response.assets[0].uri);
        const uri = response.assets?.[0];
        setPhoto(uri);
        console.log('photo -->', photo);
        // handleUpload(response.assets[0])
      }
    });
  };


  return loading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#3D43B8" />
      <Text style={styles.loadingText}>{t('loading')}...</Text>
    </View>
  ) : (
    <LinearGradient
      colors={theme.gradient}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <View style={styles.scrollContainer}>
        <Text style={[styles.title, { color: theme.title }]}>{t('profile_details')}</Text>

        <View style={styles.avatarContainer}>
          <Image
            source={
              photo?.uri
                ? { uri: photo.uri } 
                : require('../assets/profile_logo.png') 
            } style={[styles.avatarIcon, { backgroundColor: theme.cardText }]}
          />
          <TouchableOpacity style={[styles.addPhotoButton, { borderColor: theme.borderColor }]} onPress={handleAddPhoto}>
            <Text style={[styles.addPhotoText, { color: theme.buttonText }]}>+ {t('add_photo')}</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.label, { color: theme.subtitle }]}>{t('preferred_pronouns')}</Text>
        <DropDownPicker
          open={dropdownOpen}
          setOpen={setDropdownOpen}
          value={pronouns}
          setValue={setPronouns}
          items={[
            { label: t('prefer_not_to_say'), value: 'Prefer not to say' },
            { label: t('he_him'), value: 'He/Him' },
            { label: t('she_her'), value: 'She/Her' },
            { label: t('they_them'), value: 'They/Them' },
          ]}
          style={[styles.dropdown, { backgroundColor: theme.inputBackground, borderColor: theme.borderColor }]}
          dropDownContainerStyle={[styles.dropdownContainer, { backgroundColor: theme.inputBackground }]}
          textStyle={{ color: theme.inputText }}
        />

        <Text style={[styles.label, { color: theme.subtitle }]}>{t('emergency_contact')}</Text>
        <TextInput style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.inputText }]} placeholder={t('full_name')} placeholderTextColor={theme.placeholderText} value={emergencyContactName} onChangeText={setEmergencyContactName}/>
        <TextInput style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.inputText }]} placeholder={t('phone_number')} placeholderTextColor={theme.placeholderText} keyboardType="phone-pad" value={emergencyContactPhone} onChangeText={setEmergencyContactPhone}/>
        <TextInput style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.inputText }]} placeholder={t('relationship')} placeholderTextColor={theme.placeholderText} value={relationship} onChangeText={setRelationship}/>

        <Text style={[styles.label, { color: theme.subtitle }]}>{t('address')}</Text>
        <TextInput style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.inputText }]} placeholder={t('street_address')} placeholderTextColor={theme.placeholderText} value={streetAddress} onChangeText={setStreetAddress} />
        <TextInput style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.inputText }]} placeholder={t('city')} placeholderTextColor={theme.placeholderText} value={city} onChangeText={setCity} />
        <TextInput style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.inputText }]} placeholder={t('state')} placeholderTextColor={theme.placeholderText} value={state} onChangeText={setState} />

        <Text style={[styles.label, { color: theme.subtitle }]}>{t('preferred_language')}</Text>
        <DropDownPicker
          open={dropdown2Open}
          setOpen={setDropdown2Open}
          value={language}
          setValue={setLanguage}
          items={[
            { label: t('english'), value: 'english' },
            { label: t('spanish'), value: 'spanish' },
            { label: t('french'), value: 'french' },
          ]}
          style={[styles.dropdown, { backgroundColor: theme.inputBackground, borderColor: theme.borderColor }]}
          dropDownContainerStyle={[styles.dropdownContainer, { backgroundColor: theme.inputBackground }]}
          textStyle={{ color: theme.inputText }}
        />


        <Text style={[styles.label, { color: theme.subtitle }]}>{t('education_level')}</Text>
        <DropDownPicker
          open={educationOpen}
          setOpen={setEducationOpen}
          value={education}
          setValue={setEducation}
          items={[
            { label: t('no_formal_education'), value: 'no_formal_education' },
            { label: t('primary'), value: 'primary' },
            { label: t('high_school'), value: 'high_school' },
            { label: t('bachelors_degree'), value: 'bachelors' },
            { label: t('masters_degree'), value: 'masters' },
            { label: t('doctorate'), value: 'doctorate' },
            { label: t('prefer_not_to_say'), value: 'prefer_not_to_say' },
          ]}
          style={[styles.dropdown, { backgroundColor: theme.inputBackground, borderColor: theme.borderColor }]}
          dropDownContainerStyle={[styles.dropdownContainer, { backgroundColor: theme.inputBackground }]}
          textStyle={{ color: theme.inputText }}
        />

        <Text style={[styles.label, { color: theme.subtitle }]}>{t('occupation')}</Text>
        <TextInput style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.inputText }]} placeholder={t('occupation')} placeholderTextColor={theme.placeholderText} value={occupation} onChangeText={setOccupation} />

        <Text style={[styles.label, { color: theme.subtitle }]}>{t('marital_status')}</Text>
        <TextInput style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.inputText }]} placeholder={t('marital_status')} placeholderTextColor={theme.placeholderText} value={maritalStatus} onChangeText={setMaritalStatus} />

        <TouchableOpacity style={[styles.continueButton, { backgroundColor: theme.button }]} onPress={handleContinue}>
          <Text style={[styles.continueText, { color: theme.buttonText }]}>{t('continue')} →</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={[styles.skipText, { color: theme.subtitle }]}>{t('setup_later')}</Text>
        </TouchableOpacity>

        <View style={styles.dotsContainer}>
          {[0, 1, 2, 3].map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: step === index ? theme.dotActive : theme.dotInActive,
                  opacity: step === index ? 1 : theme.dotInactiveOpacity,
                },
              ]}
            />
          ))}
        </View>
      </View>
    </LinearGradient>
  );
};

export default ProfileContinued;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Optional: or theme background
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#3D43B8',
  },
  container: { flex: 1 },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Georgia',
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  addPhotoButton: {
    marginTop: 10,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  addPhotoText: {
    fontSize: 14,
  },
  label: {
    alignSelf: 'flex-start',
    marginTop: 14,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    marginBottom: 8,
  },
  dropdown: {
    width: '100%',
    borderRadius: 10,
    marginBottom: 8,
  },
  dropdownContainer: {
    width: '100%',
    borderRadius: 10,
  },
  continueButton: {
    paddingVertical: 16,
    borderRadius: 30,
    paddingHorizontal: 60,
    marginTop: 20,
  },
  continueText: {
    fontWeight: '600',
    fontSize: 16,
  },
  skipText: {
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
