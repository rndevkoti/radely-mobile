import React from 'react';
import { View, Text, StyleSheet,  TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type ChecklistItemProps = {
  icon: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonColor: string;
  iconBackground: string;
  onPress: () => void;
};

const ChecklistItem = ({
  icon,
  title,
  subtitle,
  buttonText,
  buttonColor,
  iconBackground,
  onPress,
}: ChecklistItemProps) => {
  return (
    <View style={styles.checklistItem}>
      <View style={[styles.iconContainer, { backgroundColor: iconBackground }]}>
        <Icon name={icon} size={20} color="#000" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemSubtitle}>{subtitle}</Text>
      </View>
      <TouchableOpacity style={[styles.actionButton, { backgroundColor: buttonColor }]}   onPress={onPress}
      >
        <Text style={[styles.buttonText, { color: buttonColor === '#F5F5F5' ? '#000' : '#fff' }]}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// RecentActivity Component
const RecentActivity = () => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <TouchableOpacity style={styles.activityItem}>
        <View style={[styles.iconContainer, { backgroundColor: '#E5EDFB' }]}>
          <Icon name="message" size={20} color="#487DFE" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.itemTitle}>Message from Dr. Johnson</Text>
          <Text style={styles.itemSubtitle}>15 minutes ago</Text>
        </View>
        <Icon name="chevron-right" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export { ChecklistItem, RecentActivity };

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  actionButton: {
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 70,
    marginLeft: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginVertical: 4,
  },
  todoPill: {
    backgroundColor: '#0C0C1E',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  todoText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
});
