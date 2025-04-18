import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';

export default function ScanScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No access to camera</Text>
        <TouchableOpacity 
          style={styles.permissionButton} 
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    // Handle the scanned data here
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        barcodeScannerSettings={{
          barCodeTypes: ['qr'],
        }}
        onBarcodeScanned={handleBarCodeScanned}
      >
        <View style={styles.overlay}>
          <View style={styles.scanArea} />
          <TouchableOpacity
            style={styles.flipButton}
            onPress={() => setFacing(current => (current === 'back' ? 'front' : 'back'))}
          >
            <Text style={styles.flipButtonText}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'transparent',
  },
  flipButton: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    borderRadius: 25,
  },
  flipButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  message: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});