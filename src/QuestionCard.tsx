// components/QuestionCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const QuestionCard = ({ options, selected, onSelect }) => {
  return (
    <View>
      {options.map((option, index) => {
        const isSelected = selected === option;

        return (
          <TouchableOpacity
            key={index}
            style={[styles.option, isSelected && styles.selectedOption]}
            onPress={() => onSelect(option)}
          >
            <View style={styles.leftContent}>
              {isSelected && (
                <View style={styles.checkIconContainer}>
                  <Icon name="check" size={16} color="#fff" />
                </View>
              )}
            </View>
            <Text style={[styles.optionText, isSelected && styles.selectedText]}>
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  option: {
    padding: 16,
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#B2E8CF',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  selectedText: {
    fontWeight: '600',
  },
  leftContent: {
    marginRight: 10,
    width: 24,
    alignItems: 'center',
  },
  checkIconContainer: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 3,
  },
});

export default QuestionCard;
