import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';

const charities = [
  {
    id: '1',
    name: 'UNICEF',
    description: 'Supporting children worldwide',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500',
  },
  {
    id: '2',
    name: 'Red Cross',
    description: 'Emergency response and humanitarian aid',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500',
  },
  {
    id: '3',
    name: 'Local Food Bank',
    description: 'Fighting hunger in your community',
    image: 'https://images.unsplash.com/photo-1488330890490-c291ecf62571?w=500',
  },
];

export default function DonateScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Make a Difference</Text>
        <Text style={styles.subtitle}>
          100% of your donation goes directly to these verified organizations
        </Text>
      </View>

      {charities.map((charity) => (
        <TouchableOpacity key={charity.id} style={styles.charityCard}>
          <Image
            source={{ uri: charity.image }}
            style={styles.charityImage}
          />
          <View style={styles.charityInfo}>
            <Text style={styles.charityName}>{charity.name}</Text>
            <Text style={styles.charityDescription}>{charity.description}</Text>
            <TouchableOpacity style={styles.donateButton}>
              <Text style={styles.donateButtonText}>Donate Now</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  charityCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  charityImage: {
    width: '100%',
    height: 200,
  },
  charityInfo: {
    padding: 15,
  },
  charityName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  charityDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  donateButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  donateButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});