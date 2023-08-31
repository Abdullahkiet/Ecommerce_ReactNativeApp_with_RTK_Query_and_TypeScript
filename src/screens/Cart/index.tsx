import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  getCart,
  removeFromCart,
} from '../../redux/features/productSlice';
import styles from './styles';
import {useState} from 'react';

const Cart = () => {
  interface ProductData {
    id: number;
    colour: string;
    name: string;
    price: number;
    img: string;
  }

  // State to track quantities for all items
  const [itemQuantities, setItemQuantities] = useState<number[]>([]);

  // Function to update quantity for a specific index
  const updateQuantity = (index: number, newQuantity: number) => {
    const newQuantities = [...itemQuantities];
    newQuantities[index] = newQuantity;
    setItemQuantities(newQuantities);
  };

  //render item quantity counter
  const renderQuantityCounter = (index: number) => {
    const itemQuantity = itemQuantities[index] || 1;

    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            const newQuantity = itemQuantity > 1 ? itemQuantity - 1 : 1;
            updateQuantity(index, newQuantity);
          }}>
          <Text>-</Text>
        </TouchableOpacity>
        <Text>{itemQuantity}</Text>
        <TouchableOpacity
          onPress={() => {
            const newQuantity = itemQuantity + 1;
            updateQuantity(index, newQuantity);
          }}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    );
  };

  //hooks
  const dispatch = useDispatch();
  const cart = useSelector(getCart);

  //handle add to cart and remove from cart logic
  const handleAddToCart = (item: ProductData) => {
    dispatch(addToCart(item));
  };

  const handleRemoveFromCart = (item: ProductData) => {
    dispatch(removeFromCart(item));
  };

  const renderProducts = (item: ProductData) => {
    return (
      <View style={{marginVertical: 15}}>
        <View style={{flexDirection: 'row'}}>
          <Image source={{uri: item.img}} style={styles.itemImage} />
          <View>
            <Text>{item.name}</Text>
            <Text>Colour: {item.colour}</Text>
            <Text>Price: {item.price} USD</Text>
            <TouchableOpacity
              style={{top: 5}}
              onPress={() =>
                cart.find((cartItem: ProductData) => cartItem.id === item.id)
                  ? handleRemoveFromCart(item)
                  : handleAddToCart(item)
              }>
              {cart.find((cartItem: ProductData) => cartItem.id === item.id) ? (
                <Text style={styles.removeFromCartButton}>
                  Remove from Cart
                </Text>
              ) : (
                <Text style={styles.addToCartButton}>Add to Cart</Text>
              )}
            </TouchableOpacity>
            {renderQuantityCounter(item.id)}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>My Cart</Text>
      <FlatList data={cart} renderItem={({item}) => renderProducts(item)} />
    </View>
  );
};

export default Cart;
