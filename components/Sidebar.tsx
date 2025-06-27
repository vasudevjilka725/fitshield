import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function Sidebar() {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  return (
    <Pressable
      onHoverIn={() => setExpanded(true)}
      onHoverOut={() => setExpanded(false)}
      style={[
        styles.sidebar,
        expanded ? styles.sidebarExpanded : styles.sidebarCollapsed,
      ]}
    >
      {/* Logo - always visible */}
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>🍽</Text>
        {expanded && <Text style={styles.logoText}>FitShield</Text>}
      </View>

      {/* Menu items */}
      <View style={styles.menuWrapper}>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/')}>
          <Ionicons name="home-outline" size={38} color="#333" />
          {expanded && <Text style={styles.menuText}>Dashboard</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/menu')}>
          <Ionicons name="restaurant-outline" size={38} color="#333" />
          {expanded && <Text style={styles.menuText}>Menu</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/wallet')}>
          <Ionicons name="wallet-outline" size={38} color="#333" />
          {expanded && <Text style={styles.menuText}>Wallet</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/support')}>
          <Ionicons name="help-circle-outline" size={38} color="#333" />
          {expanded && <Text style={styles.menuText}>Support</Text>}
        </TouchableOpacity>
      </View>

      {/* Push contact section to bottom */}
      <View style={styles.spacer} />

      {/* Contact Section */}
      <View style={styles.contactSection}>
        <View style={styles.contactRow}>
          <Ionicons name="call-outline" size={38} color="#333" />
          {expanded && <Text style={styles.contactText}>Contact Us</Text>}
        </View>

        {expanded && (
          <View style={styles.contactRow}>
            <Ionicons name="logo-whatsapp" size={38} color="#25D366" />
            <Text style={styles.contactText}>+91 9876543210</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#F8F8F8',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    paddingTop: 30,
    paddingHorizontal: 10,
    zIndex: 1000,
  },
  sidebarCollapsed: {
    width: 80, // ⬅️ Increased width when collapsed
    borderTopRightRadius: 16, // Rounded right corners
    borderBottomRightRadius: 16,
  },
  sidebarExpanded: {
    width: 200,
    borderTopRightRadius: 0, // No radius when expanded (optional)
    borderBottomRightRadius: 0,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    fontSize: 43,
    color: '#007AFF',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#007AFF',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  spacer: {
    flex: 1,
  },
  contactSection: {
    paddingBottom: 30,
    paddingLeft: 2,
    gap: 10,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  contactText: {
    fontSize: 14,
    color: '#333',
  },
});

