/** @format */

import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Input } from "react-native-elements";
import { COLORS, icons, images, SIZES, FONTS } from "../constants";
import {
  initialCurrentLocation,
  affordable,
  fairPrice,
  expensive,
  categoryData,
  restaurantData,
} from "../restaurantAPI";

const Search = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = React.useState(
    initialCurrentLocation
  );
  const [categories, setCategories] = React.useState(categoryData);
  const [restaurants, setRestaurants] = React.useState(restaurantData);
  const [value, onChangeText] = React.useState("Cerca un ristorante");

  function getCategoryNameById(categoryId) {
    let category = categories.filter(c => c.id == categoryId);

    if (category.length > 0) return category[0].name;

    return "";
  }

  function onChangeFilter(text) {
    //filter restaurant
    let textToUpperCase = text.toUpperCase();
    let restaurantList = restaurantData.filter(rest => {
      let restToUpperCase = rest.name.toUpperCase();
      return restToUpperCase.includes(textToUpperCase);
    });
    console.warn("text " + textToUpperCase);
    console.warn("restaurantList: " + restaurantList);

    setRestaurants(restaurantList);
  }

  function renderHeader() {
    return (
      <View style={{ flexDirection: "row", height: 50 }}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: "center",
          }}
        >
          <Image
            source={icons.nearby}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "70%",
              height: "100%",
              backgroundColor: COLORS.lightGray3,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: SIZES.radius,
            }}
          >
            <Text style={{ ...FONTS.h3 }}>{currentLocation.streetName}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: "center",
          }}
        >
          <Image
            source={icons.basket}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderSearchTab() {
    return (
      <View style={{ flexDirection: "row", height: 50, marginTop: 20 }}>
        <Input
          onChangeText={text => {
            onChangeText(text);
            onChangeFilter(text);
          }}
          placeholder="Cerca un ristorante"
        />
      </View>
    );
  }

  function renderRestaurantList() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{ marginBottom: SIZES.padding * 2 }}
        onPress={() =>
          navigation.navigate("Restaurant", { item, currentLocation })
        }
      >
        <View
          style={{ marginBottom: SIZES.padding, marginTop: SIZES.padding * 3 }}
        >
          <Image
            source={item.photo}
            resizeMode="cover"
            style={{
              width: "100%",
              height: 200,
              borderRadius: SIZES.radius,
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 0,
              height: 50,
              width: SIZES.width * 0.3,
              backgroundColor: COLORS.white,
              borderTopRightRadius: SIZES.radius,
              borderBottomLeftRadius: SIZES.radius,
              alignItems: "center",
              justifyContent: "center",
              ...styles.shadow,
            }}
          >
            <Text
              style={{
                ...FONTS.h5,
              }}
            >
              {item.duration}
            </Text>
          </View>
        </View>

        {/* RESTAURANT INFOOO */}

        <Text
          style={{
            ...FONTS.body2,
          }}
        >
          {item.name}
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.padding,
          }}
        >
          {/* RATING */}

          <Image
            source={icons.star}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.primary,
              marginRight: 10,
            }}
          />

          <Text
            style={{
              marginRight: 10,
              ...FONTS.body3,
            }}
          >
            {item.rating}
          </Text>

          {/* CATEGORY */}

          <View
            style={{
              flexDirection: "row",
              marginRight: 10,
            }}
          >
            {item.categories.map(categoryId => {
              return (
                <View
                  key={categoryId}
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      marginLeft: 10,
                      ...FONTS.body3,
                    }}
                  >
                    {getCategoryNameById(categoryId)}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* PRICE */}

          {[1, 2, 3].map(priceRating => (
            <Text
              key={priceRating}
              style={{
                ...FONTS.body3,
                color:
                  priceRating <= item.priceRating
                    ? COLORS.black
                    : COLORS.darkgray,
              }}
            >
              $
            </Text>
          ))}
        </View>
      </TouchableOpacity>
    );

    return (
      <FlatList
        data={restaurants}
        vertical
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderSearchTab()}
      {renderRestaurantList()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});

export default Search;
