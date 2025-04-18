import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { ExternalLink, Copy, Share2, Bookmark } from 'lucide-react-native';

interface URLPreviewProps {
  url: string;
  onClose: () => void;
}

export default function URLPreview({ url, onClose }: URLPreviewProps) {
  const handleOpenURL = async () => {
    if (await Linking.canOpenURL(url)) {
      await Linking.openURL(url);
    }
  };

  const handleCopyURL = () => {
    // Clipboard.setString(url);
  };

  const handleShare = async () => {
    try {
      await Share.share({ url });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.url} numberOfLines={2}>{url}</Text>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleOpenURL}>
          <ExternalLink size={24} color="#007AFF" />
          <Text style={styles.actionText}>Open</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleCopyURL}>
          <Copy size={24} color="#007AFF" />
          <Text style={styles.actionText}>Copy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Share2 size={24} color="#007AFF" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onClose}>
          <Bookmark size={24} color="#007AFF" />
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    width: '90%',
    maxWidth: 400,
  },
  url: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 4,
    fontSize: 12,
    color: '#007AFF',
  },
});