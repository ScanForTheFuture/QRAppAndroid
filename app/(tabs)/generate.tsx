import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

type QRType = 'text' | 'url' | 'email' | 'phone' | 'wifi' | 'vcard';

export default function GenerateScreen() {
  const [qrType, setQrType] = useState<QRType>('text');
  const [qrValue, setQrValue] = useState('');

  const QRTypes: { type: QRType; label: string }[] = [
    { type: 'text', label: 'Text' },
    { type: 'url', label: 'URL' },
    { type: 'email', label: 'Email' },
    { type: 'phone', label: 'Phone' },
    { type: 'wifi', label: 'Wi-Fi' },
    { type: 'vcard', label: 'Contact' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Generate QR Code</Text>
        
        <View style={styles.typeSelector}>
          {QRTypes.map((item) => (
            <TouchableOpacity
              key={item.type}
              style={[
                styles.typeButton,
                qrType === item.type && styles.selectedType,
              ]}
              onPress={() => setQrType(item.type)}
            >
              <Text style={[
                styles.typeText,
                qrType === item.type && styles.selectedTypeText,
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter content for QR code"
          value={qrValue}
          onChangeText={setQrValue}
          multiline
        />

        {qrValue ? (
          <View style={styles.qrContainer}>
            <QRCode
              value={qrValue}
              size={200}
              backgroundColor="white"
              color="black"
            />
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  typeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  typeButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    margin: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedType: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  typeText: {
    color: '#333',
  },
  selectedTypeText: {
    color: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  qrContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
});