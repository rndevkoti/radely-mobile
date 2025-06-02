// Profile.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeContext';
import DropDownPicker from 'react-native-dropdown-picker';
import { useProfile } from '../context/ProfileContext'; // Import the context


const Profile = ({ onContinue, step }: { onContinue: () => void; step: number }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { profile, setProfile } = useProfile(); // Access and set profile from context
  const [gender, setGender] = useState(profile.email);
  const [genderOpen, setGenderOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  // const [email, setEmail] = useState(profile.email);
  // const [phoneNumber, setPhoneNumber] = useState(profile.phone);

  const formatDate = (date: Date): string => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const generateRandomIndianNumber = () => {
    const firstDigit = ['6', '7', '8', '9'][Math.floor(Math.random() * 4)];
    const remainingDigits = Math.floor(100000000 + Math.random() * 900000000).toString();
    return firstDigit + remainingDigits;
  };

  const handleInputChange = (field: keyof typeof profile, value: string | Date | null) => {
    setProfile((prevProfile: any) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  const countryCodes = [
    { code: '+1', name: 'US' },
    { code: '+91', name: 'IN' },
    { code: '+44', name: 'UK' },
    { code: '+61', name: 'AU' },
  ];
 

  return (
    <LinearGradient colors={theme.gradient} style={styles.container}>
      <View style={styles.scrollContainer}>
        <Text style={[styles.title, { color: theme.title }]}>{t('profile.title')}</Text>

        <View style={styles.avatarContainer}>
          <Image
            source={
              require('../assets/profile_logo.png')
            } style={styles.avatar}
          />
          <TouchableOpacity style={styles.addPhotoButton} >
            <Text style={[styles.addPhotoText, { color: theme.title }]}>
              + {t('profile.add_photo')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.title }]}>{t('profile.first_name')}</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.inputText }]}
            placeholder={t('profile.first_name')}
            value={profile.firstName}
            onChangeText={(text) => handleInputChange('firstName', text)}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.title }]}>{t('profile.last_name')}</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.inputText }]}
            placeholder={t('profile.last_name')}
            value={profile.lastName}
            onChangeText={(text) => handleInputChange('lastName', text)}
            placeholderTextColor="#999"
          />
        </View>
        <View style={styles.field}>
      <Text style={[styles.label, { color: theme.subtitle }]}>{t('gender')}</Text>
        <DropDownPicker
          open={genderOpen}
          setOpen={setGenderOpen}
          value={gender}
          setValue={setGender}
          items={[
            { label: t('female'), value: 'female' },
            { label: t('male'), value: 'male' },
            { label: t('others'), value: 'others' },
          ]}
          style={[styles.dropdown, { backgroundColor: theme.inputBackground, borderColor: theme.borderColor }]}
          dropDownContainerStyle={[styles.dropdownContainer, { backgroundColor: theme.inputBackground }]}
          textStyle={{ color: theme.inputText }}
        />
        </View>
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.title }]}>{t('profile.dob')}</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={[styles.dateInputWrapper, { backgroundColor: theme.inputBackground }]}>
            <TextInput
              style={[styles.dateInput, { color: theme.inputText }]}
              value={profile.dob ? formatDate(new Date(profile.dob)) : ''}
              placeholder={t('profile.dob_placeholder')}
              editable={false}
              pointerEvents="none"
              placeholderTextColor="#999"
            />
            <Ionicons name="calendar-outline" size={20} color="#333" />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={showDatePicker}
            mode="date"
            onConfirm={(date) => {
              handleInputChange('dob', date.toISOString());
              setShowDatePicker(false);
            }}
            onCancel={() => setShowDatePicker(false)}
            maximumDate={new Date()}
          />
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.title }]}>{t('profile.phone')}</Text>
          <View style={[styles.phoneContainer, { backgroundColor: theme.inputBackground }]}>
            <TouchableOpacity onPress={() => setShowCountryModal(true)} style={styles.countryCode}>
              <Text style={{ color: theme.inputText }}>{profile.countryCode}</Text>
              <Ionicons name="chevron-down-outline" size={16} color={theme.inputText} />
            </TouchableOpacity>
            <TextInput
              style={[styles.phoneInput, { color: theme.inputText }]}
              value={profile.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
              keyboardType="phone-pad"
              placeholder={t('profile.phone')}
              placeholderTextColor="#999"
            />
          </View>

          {/* Country Code Modal */}
          {showCountryModal && (
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                {countryCodes.map((item) => (
                  <TouchableOpacity
                    key={item.code}
                    style={styles.modalItem}
                    onPress={() => {
                      handleInputChange('countryCode', item.code);
                      setShowCountryModal(false);
                    }}
                  >
                    <Text style={styles.modalText}>{`${item.name} (${item.code})`}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.title }]}>{t('profile.email')}</Text>
          <View style={[styles.passwordContainer, { backgroundColor: theme.inputBackground }]}>
            <TextInput
              style={[styles.passwordInput, { color: theme.inputText }]}
              value={profile.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
              // secureTextEntry={!showEmail}
              autoCapitalize="none"
              placeholder={t('profile.email')}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowEmail(!showEmail)}>
              <Ionicons name={showEmail ? 'mail-outline' : 'mail-outline'} size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.title }]}>{t('profile.password')}</Text>
          <View style={[styles.passwordContainer, { backgroundColor: theme.inputBackground }]}>
            <TextInput
              style={[styles.passwordInput, { color: theme.inputText }]}
              value={profile.password}
              onChangeText={(text) => handleInputChange('password', text)}
              secureTextEntry={!showPassword}
              placeholder={t('profile.password')}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.title }]}>{t('profile.confirm_password')}</Text>
          <View style={[styles.passwordContainer, { backgroundColor: theme.inputBackground }]}>
            <TextInput
              style={[styles.passwordInput, { color: theme.inputText }]}
              value={profile.confirmPassword}
              onChangeText={(text) => handleInputChange('confirmPassword', text)}
              secureTextEntry={!showConfirmPassword}
              placeholder={t('profile.confirm_password')}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={[styles.continueButton, { backgroundColor: theme.button }]}
          onPress={() => {
            if (!profile.firstName?.trim()) {
              Alert.alert('Validation Error', 'First Name is required.');
              return;
            }
            if (!profile.lastName?.trim()) {
              Alert.alert('Validation Error', 'Last Name is required.');
              return;
            }
            if (!profile.dob) {
              Alert.alert('Validation Error', 'Date of Birth is required.');
              return;
            }
            if (!profile.phone?.trim()) {
              Alert.alert('Validation Error', 'Phone Number is required.');
              return;
            }
            if (!profile.email?.trim()) {
              Alert.alert('Validation Error', 'Email is required.');
              return;
            }
            if (!profile.password?.trim()) {
              Alert.alert('Validation Error', 'Password is required.');
              return;
            }
            if (!profile.confirmPassword?.trim()) {
              Alert.alert('Validation Error', 'Confirm Password is required.');
              return;
            }
            if (profile.password !== profile.confirmPassword) {
              Alert.alert('Validation Error', 'Passwords do not match.');
              return;
            }
            onContinue();
          }}>
          <Text style={[styles.continueText, { color: theme.buttonText }]}>{t('profile.continue')}</Text>
        </TouchableOpacity>

        <View style={styles.dotsContainer}>
          {[0, 1, 2, 3].map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    step === index ? theme.dotActive : theme.dotInActive,
                },
              ]}
            />
          ))}
        </View>
      </View>
    </LinearGradient>
  );
};

export default Profile;




const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'Georgia',
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3a4d45',
  },
  addPhotoButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
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
  addPhotoText: {
    color: '#fff',
    fontSize: 14,
  },
  field: {
    width: '100%',
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    fontSize: 15,
  },
  dateInputWrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  dateInput: {
    fontSize: 15,
    flex: 1,
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: '#000',
  },
  continueButton: {
    backgroundColor: '#1b2c2d',
    paddingVertical: 16,
    borderRadius: 30,
    paddingHorizontal: 60,
    marginTop: 10,
  },
  continueText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 4,
  },
  dotInactive: {
    opacity: 0.3,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    fontSize: 15,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    width: 250,
  },
  modalItem: {
    paddingVertical: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#000',
  },

});
