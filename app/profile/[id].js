import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Profile() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    try {
      
      const userResponse = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      const userData = await userResponse.json();

      
      const postsResponse = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${id}`
      );
      const postsData = await postsResponse.json();

      setUser(userData);
      setPosts(postsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#2196F3"
          translucent={false}
        />
        
        <View style={styles.customHeader}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Loading...</Text>
            <Text style={styles.subtitle}>Please wait</Text>
          </View>
        </View>

        <View style={styles.loadingContainer}>
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color="#2196F3" />
            <Text style={styles.loadingText}>Loading profile...</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#2196F3"
          translucent={false}
        />

        <View style={styles.customHeader}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Error</Text>
            <Text style={styles.subtitle}>User not found</Text>
          </View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.errorContainer}>
          <View style={styles.errorCard}>
            <Text style={styles.errorIcon}>😵</Text>
            <Text style={styles.errorText}>User not found</Text>
            <Text style={styles.errorSubtext}>
              The requested user could not be loaded
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#2196F3"
        translucent={false}
      />

      <View style={styles.customHeader}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{user.name}</Text>
          <Text style={styles.subtitle}>
            @{user.username} • {posts.length} posts
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        
        <View style={styles.profileSection}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>
              {getInitials(user.name)}
            </Text>
          </View>
        </View>

        
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Contact Information</Text>

          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Text style={styles.iconText}>📧</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Text style={styles.iconText}>📱</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{user.phone}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Text style={styles.iconText}>🌐</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Website</Text>
              <Text style={styles.infoValue}>{user.website}</Text>
            </View>
          </View>
        </View>

       
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Address</Text>
          <View style={styles.addressContainer}>
            <Text style={styles.addressLine}>
              {user.address.street}, {user.address.suite}
            </Text>
            <Text style={styles.addressLine}>
              {user.address.city} - {user.address.zipcode}
            </Text>
            <View style={styles.geoContainer}>
              <Text style={styles.geoText}>
                📍 {user.address.geo.lat}, {user.address.geo.lng}
              </Text>
            </View>
          </View>
        </View>

        
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Company</Text>
          <View style={styles.companyContainer}>
            <Text style={styles.companyName}>{user.company.name}</Text>
            <Text style={styles.companyCatchPhrase}>
              "{user.company.catchPhrase}"
            </Text>
            <Text style={styles.companyBs}>{user.company.bs}</Text>
          </View>
        </View>

      
        <View style={styles.sectionCard}>
          <View style={styles.postsHeader}>
            <Text style={styles.sectionTitle}>Recent Posts</Text>
            <View style={styles.postsBadge}>
              <Text style={styles.postsBadgeText}>{posts.length}</Text>
            </View>
          </View>

          {posts.map((post, index) => (
            <View
              key={post.id}
              style={[
                styles.postCard,
                index === posts.length - 1 && styles.lastPostCard,
              ]}
            >
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postBody}>{post.body}</Text>
            </View>
          ))}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#2196F3",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginTop: -1,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#e3f2fd",
    opacity: 0.9,
  },
  // Profile Avatar Section
  profileSection: {
    alignItems: "center",
    paddingVertical: 20,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  profileAvatarText: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "700",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  infoIcon: {
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
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 2,
    textTransform: "uppercase",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    color: "#1e293b",
    fontWeight: "500",
  },
  addressContainer: {
    backgroundColor: "#f8fafc",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  addressLine: {
    fontSize: 16,
    color: "#334155",
    marginBottom: 4,
    fontWeight: "500",
  },
  geoContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  geoText: {
    fontSize: 14,
    color: "#64748b",
    fontFamily: "monospace",
  },
  companyContainer: {
    backgroundColor: "#f8fafc",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  companyName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 8,
  },
  companyCatchPhrase: {
    fontSize: 16,
    color: "#2196F3",
    fontStyle: "italic",
    marginBottom: 6,
    lineHeight: 22,
  },
  companyBs: {
    fontSize: 14,
    color: "#64748b",
    textTransform: "capitalize",
  },
  postsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  postsBadge: {
    backgroundColor: "#2196F3",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: "center",
  },
  postsBadgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  postCard: {
    backgroundColor: "#f8fafc",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  lastPostCard: {
    marginBottom: 0,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 8,
    textTransform: "capitalize",
    lineHeight: 22,
  },
  postBody: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    marginTop: 20,
  },
  loadingCard: {
    backgroundColor: "#ffffff",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#64748b",
    fontWeight: "500",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  errorCard: {
    backgroundColor: "#ffffff",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#dc2626",
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
  },
});
