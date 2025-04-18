type QRContentType = 'url' | 'vcard' | 'text' | 'location' | 'calendar' | 'unknown';

interface ParsedQRContent {
  type: QRContentType;
  data: any;
}

export function parseQRContent(content: string): ParsedQRContent {
  // URL detection
  if (content.match(/^(http|https):\/\//i)) {
    return {
      type: 'url',
      data: { url: content }
    };
  }

  // vCard detection
  if (content.startsWith('BEGIN:VCARD')) {
    const vCardData = parseVCard(content);
    return {
      type: 'vcard',
      data: vCardData
    };
  }

  // Location detection
  if (content.startsWith('geo:')) {
    const [lat, lon] = content.replace('geo:', '').split(',');
    return {
      type: 'location',
      data: { latitude: parseFloat(lat), longitude: parseFloat(lon) }
    };
  }

  // Calendar event detection
  if (content.startsWith('BEGIN:VEVENT')) {
    const eventData = parseCalendarEvent(content);
    return {
      type: 'calendar',
      data: eventData
    };
  }

  // Default to text
  return {
    type: 'text',
    data: { text: content }
  };
}

function parseVCard(vcard: string) {
  const lines = vcard.split('\n');
  const data: Record<string, string> = {};

  lines.forEach(line => {
    if (line.includes(':')) {
      const [key, value] = line.split(':');
      data[key] = value.trim();
    }
  });

  return {
    name: data['FN'] || '',
    email: data['EMAIL'] || '',
    phone: data['TEL'] || '',
    org: data['ORG'] || '',
  };
}

function parseCalendarEvent(event: string) {
  const lines = event.split('\n');
  const data: Record<string, string> = {};

  lines.forEach(line => {
    if (line.includes(':')) {
      const [key, value] = line.split(':');
      data[key] = value.trim();
    }
  });

  return {
    summary: data['SUMMARY'] || '',
    start: data['DTSTART'] || '',
    end: data['DTEND'] || '',
    location: data['LOCATION'] || '',
  };
}