import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#2196F3" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Users List",
        }}
      />
      <Stack.Screen
        name="profile/[id]"
        options={{
          title: "User Profile",
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          title: "About App",
        }}
      />
      <StatusBar style="light" />
    </Stack>
  );
}
