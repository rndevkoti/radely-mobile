import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { getDoctorReviewsById } from '../networking/providerReivewbyId';
 
interface DoctorReviewProps {
  doctorId: string;
}

const DoctorReview: React.FC<DoctorReviewProps> = ({ doctorId }) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getDoctorReviewsById(doctorId);
        setReviews(data?.data || []);
      } catch (err) {
        console.error('Failed to load reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [doctorId]);

  const renderReview = ({ item }: { item: any }) => {
    const formattedDate = new Date(item.createdAt).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const stars = '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating);

    return (
      <View style={styles.reviewCard}>
        <Image
          source={item?.userProfilePicture ? { uri: item.userProfilePicture } : require('../assets/profilePic.png')}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <View style={styles.row}>
            <Text style={styles.name}>{item.userName || 'Anonymous'}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
          <Text style={styles.stars}>{stars}</Text>
          <Text numberOfLines={3} style={styles.comment}>
            {item.review}
          </Text>
          <Text style={styles.seeMore}>See More</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return <Text style={{ padding: 16 }}>Loading reviews...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Reviews ({reviews.length})</Text>
      <FlatList
        data={reviews}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={renderReview}
        scrollEnabled={false}
      />
    </View>
  );
};

export default DoctorReview;


const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 12,
  },
  reviewCard: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  stars: {
    fontSize: 14,
    marginVertical: 4,
    color: '#FFA000',
  },
  comment: {
    fontSize: 13,
    color: '#333',
  },
  seeMore: {
    color: '#2DB3A6',
    fontWeight: '500',
    marginTop: 6,
    fontSize: 13,
  },
});
