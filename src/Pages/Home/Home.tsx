import React from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  $dark01,
  $dark03,
  $dark04,
  $dark05,
  $dark06,
  $dark07,
  $dark08,
  $domagaBlack,
  $green02,
  $heading_font_size,
  $white,
  OLX_TextColor,
} from 'utils/globalStyles';
import {RNInput} from 'component/Common/Input';
import CommonHeader from 'component/Header/CommonHeader';

const HomeSearch = () => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15,
        justifyContent: 'space-between',
        backgroundColor: $dark06,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
      }}>
      <RNInput
        placeholder={'Search for Book, Guitar and more...'}
        style={{
          paddingLeft: 20,
        }}
      />
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingRight: 20,
        }}>
        <AntDesign name="search1" size={24} />
      </View>
    </View>
  );
};

const ProductsHeader = ({title1, title2}: {title1: string; title2: string}) => {
  return (
    <View
      style={{
        paddingTop: 10,
        paddingBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 18, color: OLX_TextColor, fontWeight: '900'}}>
        {title1}
      </Text>
      <Text style={{color: 'grey', fontSize: 12}}>{title2}</Text>
    </View>
  );
};
const Product = ({info}: any) => {
  return (
    <View
      style={{
        width: 200,
        marginRight: 15,
      }}>
      <View style={{borderTopLeftRadius: 10}}>
        <Image
          style={{resizeMode: 'stretch', width: 200}}
          source={require('assets/productthumbnail.png')}
        />
        <View
          style={{
            position: 'absolute',
            right: 10,
            bottom: 10,
            backgroundColor: 'white',
            padding: 5,
            borderRadius: 20,
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <AntDesign name="hearto" color={'red'} size={24} />
        </View>
      </View>
      <View
        style={{
          shadowColor: '#171717',
          shadowOpacity: 0.2,
          shadowRadius: 3,
          backgroundColor: 'white',
          borderBottomEndRadius: 10,
          borderBottomLeftRadius: 10,
          paddingHorizontal: 5,
          paddingVertical: 10,

          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 14,
              flex: 1,
              color: OLX_TextColor,
              fontWeight: '700',
              paddingRight: 5,
            }}>
            {info.name}
          </Text>
          <Text style={{fontSize: 10, flex: 1, color: '#C1839F'}}>
            {info.info}
          </Text>
        </View>
        <View style={{display: 'flex', justifyContent: 'center'}}>
          <Text style={{fontSize: 14, color: OLX_TextColor, fontWeight: '900'}}>
            {info.price}
          </Text>
        </View>
      </View>
    </View>
  );
};

const ProductList = ({list}: any) => {
  return (
    <ScrollView horizontal>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        {list?.map((d: any) => (
          <Product key={d.id} info={d} />
        ))}
      </View>
    </ScrollView>
  );
};
const NewArrivalProducts = () => {
  const RAW_DATA = [
    {
      id: '2',
      name: 'Superman Toy qeuwoi qweoi uqweui ',
      price: 'Rs. 630',
      info: '2013 ! Skull',
    },
    {
      id: '3',
      name: 'Batman Toy',
      price: 'Rs. 830',
      info: '2018 ! FunSkull',
    },
    {
      id: '4',
      name: 'Superman Toy',
      price: 'Rs. 630',
      info: '2013 ! Skull',
    },
    {
      id: '5',
      name: 'Batman Toy',
      price: 'Rs. 830',
      info: '2018 ! FunSkull',
    },
    {
      id: '6',
      name: 'Superman Toy',
      price: 'Rs. 630',
      info: '2013 ! Skull',
    },
    {
      id: '1',
      name: 'Batman Toy',
      price: 'Rs. 830',
      info: '2018 ! FunSkull',
    },
  ];
  return (
    <View>
      <ProductsHeader title1="New arrivals" title2="View more" />
      <ProductList list={RAW_DATA} />
    </View>
  );
};

const RecentlyViewsProducts = () => {
  const RAW_DATA = [
    {
      id: '1',
      name: 'Batman Toy',
      price: 'Rs. 830',
      info: '2018 ! FunSkull',
    },
    {
      id: '2',
      name: 'Superman Toy',
      price: 'Rs. 630',
      info: '2013 ! Skull',
    },
    {
      id: '3',
      name: 'Batman Toy',
      price: 'Rs. 830',
      info: '2018 ! FunSkull',
    },
    {
      id: '4',
      name: 'Superman Toy',
      price: 'Rs. 630',
      info: '2013 ! Skull',
    },
    {
      id: '5',
      name: 'Batman Toy',
      price: 'Rs. 830',
      info: '2018 ! FunSkull',
    },
    {
      id: '6',
      name: 'Superman Toy',
      price: 'Rs. 630',
      info: '2013 ! Skull',
    },
  ];
  return (
    <View>
      <ProductsHeader title1="Recently viewed" title2="View more" />
      <ProductList list={RAW_DATA} />
    </View>
  );
};

const HomeComponent = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader redirectPath="SideBar" navigation={navigation} />
      <HomeSearch />
      <ScrollView>
        <NewArrivalProducts />
        <RecentlyViewsProducts />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop: 0, //StatusBar.currentHeight
  },
  title: {
    fontSize: 18,
  },
});

export const Home = HomeComponent;
