import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

export default function About() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#2196F3"
        translucent={false}
      />

      <View style={styles.customHeader}>
        <View style={styles.appIconContainer}>
          <Text style={styles.appIcon}>📱</Text>
        </View>
        <Text style={styles.headerTitle}>User Browser</Text>
        <Text style={styles.headerSubtitle}>About this application</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        
        <View style={styles.versionCard}>
          <View style={styles.versionBadge}>
            <Text style={styles.versionText}>v1.0.0</Text>
          </View>
          <Text style={styles.versionDescription}>Latest stable version</Text>
        </View>

       
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Text style={styles.iconText}>📖</Text>
            </View>
            <Text style={styles.sectionTitle}>About This App</Text>
          </View>
          <Text style={styles.description}>
            User Browser adalah aplikasi sederhana yang menampilkan daftar
            pengguna dan informasi detail tentang mereka dari JSONPlaceholder
            API. Aplikasi ini dibuat menggunakan React Native dengan Expo Router
            untuk navigasi yang smooth dan modern.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Text style={styles.iconText}>🛠️</Text>
            </View>
            <Text style={styles.sectionTitle}>Technologies Used</Text>
          </View>
          <View style={styles.techGrid}>
            {[
              { name: "React Native", icon: "⚛️" },
              { name: "Expo Router", icon: "🧭" },
              { name: "JSONPlaceholder", icon: "🌐" },
              { name: "JavaScript ES6+", icon: "📜" },
            ].map((tech, index) => (
              <View key={index} style={styles.techItem}>
                <Text style={styles.techIcon}>{tech.icon}</Text>
                <Text style={styles.techName}>{tech.name}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Text style={styles.iconText}>🌐</Text>
            </View>
            <Text style={styles.sectionTitle}>API Information</Text>
          </View>
          <Text style={styles.apiDescription}>
            Data pengguna dan posts diambil dari JSONPlaceholder - sebuah fake
            REST API yang gratis untuk testing dan prototyping.
          </Text>
          <View style={styles.apiUrlContainer}>
            <Text style={styles.apiUrlLabel}>Endpoint:</Text>
            <Text style={styles.apiUrl}>jsonplaceholder.typicode.com</Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Text style={styles.iconText}>✨</Text>
            </View>
            <Text style={styles.sectionTitle}>Key Features</Text>
          </View>
          <View style={styles.featuresContainer}>
            {[
              {
                icon: "📋",
                title: "User List",
                desc: "Browse all registered users",
              },
              {
                icon: "👤",
                title: "Profile Details",
                desc: "Complete user information",
              },
              {
                icon: "📝",
                title: "User Posts",
                desc: "View posts from each user",
              },
              {
                icon: "🎨",
                title: "Modern UI",
                desc: "Responsive and elegant design",
              },
            ].map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Text style={styles.featureIconText}>{feature.icon}</Text>
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDesc}>{feature.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <View style={styles.backButtonContent}>
            <Text style={styles.backButtonText}>Back to Users</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Built with ❤️ using React Native & Expo
          </Text>
          <Text style={styles.footerDate}>2025</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  customHeader: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginTop: -1,
  },
  appIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  appIcon: {
    fontSize: 36,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#e3f2fd",
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  versionCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  versionBadge: {
    backgroundColor: "#10b981",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  versionText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  versionDescription: {
    fontSize: 14,
    color: "#64748b",
  },
  sectionCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: "#64748b",
    lineHeight: 24,
  },
  techGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  techItem: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    minWidth: "45%",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  techIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  techName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#334155",
    textAlign: "center",
  },
  apiDescription: {
    fontSize: 16,
    color: "#64748b",
    lineHeight: 24,
    marginBottom: 16,
  },
  apiUrlContainer: {
    backgroundColor: "#f1f5f9",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  apiUrlLabel: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 4,
    textTransform: "uppercase",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  apiUrl: {
    fontSize: 16,
    color: "#2196F3",
    fontWeight: "600",
    fontFamily: "monospace",
  },
  featuresContainer: {
    gap: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  featureIconText: {
    fontSize: 20,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 14,
    color: "#64748b",
  },
  backButton: {
    backgroundColor: "#2196F3",
    marginHorizontal: 16,
    marginTop: 30,
    borderRadius: 16,
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  backButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  backButtonIcon: {
    fontSize: 18,
    color: "#ffffff",
    marginRight: 8,
    fontWeight: "600",
  },
  backButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: 4,
  },
  footerDate: {
    fontSize: 12,
    color: "#cbd5e1",
    fontWeight: "500",
  },
});
