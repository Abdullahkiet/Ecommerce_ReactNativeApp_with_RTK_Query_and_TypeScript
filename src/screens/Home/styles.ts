import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  cartButton: {
    position: 'absolute',
    backgroundColor: 'red',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    borderRadius: 25,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  removeFromCartButton: {
    color: 'red',
  },
  addToCartButton: {
    color: 'green',
  },
  productContainer: {
    marginVertical: 15,
  },
  flexRow: {
    flexDirection: 'row',
  },
});

export default styles;
