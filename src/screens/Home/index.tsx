import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useFetchProductsQuery} from '../../services/products';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  getAllProducts,
  getCart,
  removeFromCart,
  setProducts,
} from '../../redux/features/productSlice';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';

const HomeScreen = () => {
  interface ProductData {
    id: number;
    colour: string;
    name: string;
    price: number;
    img: string;
  }

  //API Call using RTK Query
  const {data: productData, isLoading} = useFetchProductsQuery(null);

  //hooks
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const products = useSelector(getAllProducts);
  const cart = useSelector(getCart);
  dispatch(setProducts(productData));

  //handle add to cart and remove from cart logic
  const handleAddToCart = (item: ProductData) => {
    dispatch(addToCart(item));
  };

  const handleRemoveFromCart = (item: ProductData) => {
    dispatch(removeFromCart(item));
  };

  //render products
  const renderProducts = (item: ProductData) => {
    return (
      <View style={{marginVertical: 15}}>
        <View style={{flexDirection: 'row'}}>
          <Image source={{uri: item.img}} style={styles.itemImage} />
          <View>
            <Text>{item.name}</Text>
            <Text>Colour: {item.colour}</Text>
            <Text>Price: {item.price} USD </Text>
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
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text>Abdullah E-Commerce Store</Text>
      <FlatList data={products} renderItem={({item}) => renderProducts(item)} />
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate('Cart')}>
        <Text>Cart</Text>
      </TouchableOpacity>
      <ActivityIndicator animating={isLoading} size="large" color="red" />
    </View>
  );
};

export default HomeScreen;
