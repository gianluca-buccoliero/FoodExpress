/** @format */

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Animated,
} from "react-native";

import { COLORS, icons, images, SIZES, FONTS } from "../constants";

const Restaurant = ({ route, navigation }) => {
  const [itemsInCart, setItemsInCart] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [restaurant, setRestaurant] = React.useState(null);
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [orderItems, setOrderItems] = React.useState([]);
  const scrollX = new Animated.Value(0);

  React.useEffect(() => {
    let { item, currentLocation } = route.params;

    setRestaurant(item);
    setCurrentLocation(currentLocation);
  });

  function editOrder(action, menuId, price) {
    let orderList = orderItems.slice();
    let item = orderList.filter(i => i.menuId === menuId);

    // ACTION +
    if (action === "+") {
      // SE ESISTE
      if (item.length > 0) {
        let newQuantity = item[0].quantity + 1;
        item[0].quantity = newQuantity;
        item[0].total = newQuantity * price;
      }
      // SE NON ESISTE
      else {
        const newItem = {
          menuId: menuId,
          quantity: 1,
          price: price,
          total: price,
        };
        orderList.push(newItem);
      }

      setOrderItems(orderList);
    } else {
      if (item.length > 0) {
        if (item[0].quantity > 0) {
          let newQuantity = item[0].quantity - 1;
          item[0].quantity = newQuantity;
          item[0].total = newQuantity * price;
        } else return;
      }
      setOrderItems(orderList);
    }
  }

  function getOrderQuantity(id) {
    let orderItem = orderItems.filter(i => i.menuId === id);

    if (orderItem.length > 0) return orderItem[0].quantity;
    else return 0;
  }

  function getItemsInCart() {
    let itemsInCart = 0;
    orderItems.map(i => {
      itemsInCart += i.quantity;
    });

    return itemsInCart;
  }

  function getTotalInCart() {
    let totalInCart = 0;
    orderItems.map(i => {
      totalInCart += i.total;
    });

    return totalInCart;
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
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Image
            source={icons.back}
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
            <Text style={{ ...FONTS.h3 }}>{restaurant?.name}</Text>
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
            source={icons.list}
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

  function renderFoodInfo() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {restaurant?.menu.map((item, index) => (
          <View
            key={`menu-${index}`}
            style={{ alignItems: "center", backgroundColor: COLORS.lightGray4 }}
          >
            <View style={{ height: SIZES.height * 0.35 }}>
              <Image
                source={item.photo}
                resizeMode="cover"
                style={{ width: SIZES.width, height: "100%" }}
              />

              {/* Quantity */}

              <View
                style={{
                  position: "absolute",
                  bottom: -20,
                  flexDirection: "row",
                  width: SIZES.width,
                  height: 50,
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopLeftRadius: 25,
                    borderBottomLeftRadius: 25,
                  }}
                  onPress={() => editOrder("-", item.menuId, item.price)}
                >
                  <Text
                    style={{
                      ...FONTS.body1,
                    }}
                  >
                    -
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.body1,
                    }}
                  >
                    {getOrderQuantity(item.menuId)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopRightRadius: 25,
                    borderBottomRightRadius: 25,
                  }}
                  onPress={() => editOrder("+", item.menuId, item.price)}
                >
                  <Text
                    style={{
                      ...FONTS.body1,
                    }}
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Name & Description */}

            <View
              style={{
                width: SIZES.width,
                marginTop: SIZES.padding * 4,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: SIZES.padding * 2,
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  marginTop: SIZES.padding,
                  borderRadius: SIZES.radius,
                  ...FONTS.h3,
                }}
              >
                ${item.price.toFixed(2)}
              </Text>
              <Text
                style={{
                  marginTop: SIZES.padding,
                  ...FONTS.body3,
                }}
              >
                {item.description}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: SIZES.padding * 2,
                }}
              >
                <Image
                  source={icons.fire}
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: SIZES.padding,
                    opacity: 0.5,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.darkgray,
                  }}
                >
                  {item.calories} cal
                </Text>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={{ height: 30 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: SIZES.padding,
          }}
        >
          {restaurant?.menu.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: "clamp",
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }

  function renderCart() {
    return (
      <View
        style={{
          backgroundColor: COLORS.white,
          height: SIZES.height * 0.25,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}
      >
        {/* ITEMS IN CART */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: SIZES.padding * 2.5,
            marginTop: 30,
          }}
        >
          <Text
            style={{
              ...FONTS.h3,
            }}
          >
            {getItemsInCart()} Items in Cart
          </Text>
          <Text
            style={{
              ...FONTS.h3,
            }}
          >
            ${getTotalInCart().toFixed(2)}
          </Text>
        </View>
        {/* ADDRESS & CART */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: SIZES.padding * 2.5,
            marginTop: 50,
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Image
              source={icons.pin}
              style={{
                width: 20,
                height: 20,
                marginRight: SIZES.padding,
                opacity: 0.5,
              }}
            />
            <Text
              style={{
                ...FONTS.h5,
              }}
            >
              745 Lincon PI
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Image
              source={icons.master_card}
              style={{
                width: 20,
                height: 20,
                marginRight: SIZES.padding,
                opacity: 0.5,
              }}
            />
            <Text
              style={{
                ...FONTS.h5,
              }}
            >
              ****1999
            </Text>
          </View>
        </View>

        {/* Button ORDER */}

        <View
          style={{
            width: SIZES.width,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: SIZES.width * 0.8,
              backgroundColor: COLORS.primary,
              height: 50,
              borderRadius: SIZES.radius,
              marginTop: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.white,
              }}
            >
              Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderFoodInfo()}
      {renderDots()}
      {renderCart()}
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

export default Restaurant;
