import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  flexRow: {
    flexDirection: 'row',
  },
  productContainer: {
    marginVertical: 15,
  },
});

export default styles;
