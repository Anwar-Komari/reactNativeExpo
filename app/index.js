import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const renderUser = ({ item }) => (
    <TouchableOpacity
      style={styles.userCard}
      onPress={() => router.push(`/profile/${item.id}`)}
      activeOpacity={0.8}
    >
      <View style={styles.userAvatar}>
        <Text style={styles.avatarText}>
          {item.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .substring(0, 2)}
        </Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <View style={styles.companyContainer}>
          <Text style={styles.companyLabel}>Company:</Text>
          <Text style={styles.userCompany}>{item.company.name}</Text>
        </View>
      </View>
      <View style={styles.chevron}>
        <Text style={styles.chevronText}>›</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#2196F3"
          translucent={false}
        />
        {/* Custom Header untuk Loading */}
        <View style={styles.customHeader}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Loading...</Text>
            <Text style={styles.subtitle}>Please wait</Text>
          </View>
        </View>

        <View style={styles.loadingContainer}>
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color="#2196F3" />
            <Text style={styles.loadingText}>Loading users...</Text>
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
          <Text style={styles.title}>Choose a User</Text>
          <Text style={styles.subtitle}>
            Select a user to view their profile
          </Text>
        </View>
        <TouchableOpacity
          style={styles.aboutButton}
          onPress={() => router.push("/about")}
          activeOpacity={0.8}
        >
          <Text style={styles.aboutButtonText}>About</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
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
  aboutButton: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  aboutButtonText: {
    color: "#2196F3",
    fontSize: 14,
    fontWeight: "600",
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
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  separator: {
    height: 12,
  },
  userCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 6,
  },
  companyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  companyLabel: {
    fontSize: 12,
    color: "#94a3b8",
    marginRight: 6,
  },
  userCompany: {
    fontSize: 13,
    color: "#2196F3",
    fontWeight: "500",
  },
  chevron: {
    marginLeft: 12,
  },
  chevronText: {
    fontSize: 24,
    color: "#cbd5e1",
    fontWeight: "300",
  },
});
