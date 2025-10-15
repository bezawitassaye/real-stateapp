import { router, useLocalSearchParams } from "expo-router";
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Comment from "@/components/Comment";
import { facilities } from "@/constants/data";
import icons from "@/constants/icons";
import images from "@/constants/images";

import { getPropertyById } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";

const Property = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const windowHeight = Dimensions.get("window").height;

  const { data: property } = useAppwrite({
    fn: getPropertyById,
    params: { id: id! },
  });

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32"
      >
        {/* Hero Image */}
        <View className="relative w-full" style={{ height: windowHeight / 2 }}>
          <Image
            source={property?.image ? { uri: property.image } : images.placeholder}
            className="size-full"
            resizeMode="cover"
          />
          <Image
            source={images.whiteGradient}
            className="absolute top-0 w-full z-40"
          />

          {/* Top Buttons */}
          <View
            className="z-50 absolute inset-x-7"
            style={{ top: Platform.OS === "ios" ? 70 : 20 }}
          >
            <View className="flex flex-row items-center w-full justify-between">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>

              <View className="flex flex-row items-center gap-3">
                <Image source={icons.heart} className="size-7" tintColor="#191D31" />
                <Image source={icons.send} className="size-7" />
              </View>
            </View>
          </View>
        </View>

        {/* Property Details */}
        <View className="px-5 mt-7 flex gap-2">
          <Text className="text-2xl font-rubik-extrabold">{property?.name || "No Name"}</Text>

          {/* Type + Rating */}
          <View className="flex flex-row items-center gap-3">
            {property?.type && (
              <View className="flex flex-row items-center px-4 py-2 bg-primary-100 rounded-full">
                <Text className="text-xs font-rubik-bold text-primary-300">{property.type}</Text>
              </View>
            )}

            <View className="flex flex-row items-center gap-2">
              <Image source={icons.star} className="size-5" />
              <Text className="text-black-200 text-sm mt-1 font-rubik-medium">
                {property?.rating || 0} ({property?.reviews?.length || 0} reviews)
              </Text>
            </View>
          </View>

          {/* Bedrooms, Bathrooms, Area */}
          <View className="flex flex-row items-center mt-5 gap-7">
            <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10">
              <Image source={icons.bed} className="size-4" />
            </View>
            <Text className="text-black-300 text-sm font-rubik-medium">{property?.bedrooms || 0} Beds</Text>

            <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10">
              <Image source={icons.bath} className="size-4" />
            </View>
            <Text className="text-black-300 text-sm font-rubik-medium">{property?.bathrooms || 0} Baths</Text>

            <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10">
              <Image source={icons.area} className="size-4" />
            </View>
            <Text className="text-black-300 text-sm font-rubik-medium">{property?.area || 0} sqft</Text>
          </View>

          {/* Agent Info */}
          {property?.agent && (
            <View className="w-full border-t border-primary-200 pt-7 mt-5">
              <Text className="text-black-300 text-xl font-rubik-bold">Agent</Text>

              <View className="flex flex-row items-center justify-between mt-4">
                <View className="flex flex-row items-center">
                  <Image
                    source={property.agent.avatar ? { uri: property.agent.avatar } : images.avatarPlaceholder}
                    className="size-14 rounded-full"
                  />
                  <View className="flex flex-col items-start justify-center ml-3">
                    <Text className="text-lg text-black-300 text-start font-rubik-bold">
                      {property.agent.name || "No Name"}
                    </Text>
                    <Text className="text-sm text-black-200 text-start font-rubik-medium">
                      {property.agent.email || "No Email"}
                    </Text>
                  </View>
                </View>

                <View className="flex flex-row items-center gap-3">
                  <Image source={icons.chat} className="size-7" />
                  <Image source={icons.phone} className="size-7" />
                </View>
              </View>
            </View>
          )}

          {/* Overview */}
          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">Overview</Text>
            <Text className="text-black-200 text-base font-rubik mt-2">
              {property?.description || "No description available."}
            </Text>
          </View>

          {/* Facilities */}
          {property?.facilities?.length > 0 && (
            <View className="mt-7">
              <Text className="text-black-300 text-xl font-rubik-bold">Facilities</Text>
              <View className="flex flex-row flex-wrap items-start justify-start mt-2 gap-5">
                {property.facilities.map((facilityName: string, index: number) => {
                  const facility = facilities.find(
                    (f) => f.title.toLowerCase() === facilityName.toLowerCase()
                  );
                  const iconSource = facility?.icon || icons.info;
                  return (
                    <View key={index} className="flex flex-col items-center min-w-16 max-w-20">
                      <View className="size-14 bg-primary-100 rounded-full flex items-center justify-center">
                        <Image source={iconSource} className="size-6" />
                      </View>
                      <Text numberOfLines={1} ellipsizeMode="tail" className="text-black-300 text-sm text-center font-rubik mt-1.5">
                        {facilityName}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {/* Gallery */}
          {property?.gallery?.length > 0 && (
            <View className="mt-7">
              <Text className="text-black-300 text-xl font-rubik-bold">Gallery</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={property.gallery}
                keyExtractor={(item) => item.$id}
                contentContainerStyle={{ paddingRight: 20 }}
                renderItem={({ item }) => (
                  <Image
                    source={item.image ? { uri: item.image } : images.placeholder}
                    className="size-40 rounded-xl"
                  />
                )}
              />
            </View>
          )}

          {/* Location */}
          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">Location</Text>
            <View className="flex flex-row items-center justify-start mt-4 gap-2">
              <Image source={icons.location} className="w-7 h-7" />
              <Text className="text-black-200 text-sm font-rubik-medium">{property?.address || "No address"}</Text>
            </View>
            <Image source={images.map} className="h-52 w-full mt-5 rounded-xl" />
          </View>

          {/* Reviews */}
          {property?.reviews?.length > 0 && (
            <View className="mt-7">
              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-center">
                  <Image source={icons.star} className="size-6" />
                  <Text className="text-black-300 text-xl font-rubik-bold ml-2">
                    {property.rating || 0} ({property.reviews.length} reviews)
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text className="text-primary-300 text-base font-rubik-bold">View All</Text>
                </TouchableOpacity>
              </View>
              <View className="mt-5">
                <Comment item={property.reviews[0]} />
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Book Now */}
      <View className="absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-r border-l border-primary-200 p-7">
        <View className="flex flex-row items-center justify-between gap-10">
          <View className="flex flex-col items-start">
            <Text className="text-black-200 text-xs font-rubik-medium">Price</Text>
            <Text numberOfLines={1} className="text-primary-300 text-start text-2xl font-rubik-bold">
              ${property?.price || 0}
            </Text>
          </View>

          <TouchableOpacity className="flex-1 flex flex-row items-center justify-center bg-primary-300 py-3 rounded-full shadow-md shadow-zinc-400">
            <Text className="text-white text-lg text-center font-rubik-bold">Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Property;
