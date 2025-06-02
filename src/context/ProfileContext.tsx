// ProfileContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { Asset } from 'react-native-image-picker';

interface ProfileData {
    firstName: string;
    lastName: string;
    dob: string | null;
    email: string;
    phone: string;
    countryCode: string;
    password: string;
    confirmPassword: string;
  }

  interface ProfileContinued {
    pronouns: string;
    language: string | null;
    education: string | null;
    emergencyContactName: string;
    emergencyContactPhone: string;
    relationship: string;
    streetAddress: string;
    city: string;
    state: string;
    occupation: string;
    maritalStatus: string;
    newOTP: string;
    photo: Asset | null;
}

interface ProfileContextType {
  profile: ProfileData;
  setProfile: (profile: ProfileData) => void;
  profileContinued: ProfileContinued;
  setProfileContinued: React.Dispatch<React.SetStateAction<ProfileContinued>>;
  Navstep: number; 
  setNavStep: React.Dispatch<React.SetStateAction<number>>; 
  questionnaire: { [key: string]: string };
  setQuestionnaire: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  answers: { [section: string]: string[] };
  setAnswers: React.Dispatch<React.SetStateAction<{ [section: string]: string[] }>>;
  healthPayloads: any[];
  setHealthPayloads: React.Dispatch<React.SetStateAction<any[]>>;
  lastVisitedQuestionStep: number | null;
  setLastVisitedQuestionStep: (step: number) => void;

}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    phone: '',
    countryCode: '',
    password: '',
    confirmPassword: '',
  });
  const [healthPayloads, setHealthPayloads] = useState<any[]>([]);

  const [profileContinued, setProfileContinued] = useState<ProfileContinued>({
    pronouns: '',
    language: '',
    education: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    relationship: '',
    streetAddress: '',
    city: '',
    state: '',
    occupation: '',
    maritalStatus: '',
    newOTP: '',
    photo: null,

  });
  const [Navstep, setNavStep] = useState(0);
  const [questionnaire, setQuestionnaire] = useState<{ [key: string]: string }>({});
  const [answers, setAnswers] = useState<{ [section: string]: string[] }>({});

  const [lastVisitedQuestionStep, setLastVisitedQuestionStep] = useState<number | null>(null);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, profileContinued, setProfileContinued, Navstep, setNavStep,    questionnaire,
        setQuestionnaire, answers, setAnswers,healthPayloads, setHealthPayloads,lastVisitedQuestionStep, setLastVisitedQuestionStep
     }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
