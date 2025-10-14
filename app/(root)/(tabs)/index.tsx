import seed from "@/lib/seed";
import React from "react";
import { Alert, Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const handleSeed = async () => {
    try {
      await seed();
      Alert.alert("✅ Success", "Data seeded successfully!");
    } catch (error) {
      console.error("Error seeding data:", error);
      Alert.alert("❌ Error", "Failed to seed data. Check console for details.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <View>
        <Button title="Seed Data" onPress={handleSeed} />
      </View>
    </SafeAreaView>
  );
}
