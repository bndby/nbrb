import React, {useContext, useEffect, useState} from 'react';
import {NavigationContext} from 'react-navigation';
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Content,
  Text,
  Subtitle,
  Spinner,
  List,
  ListItem,
  H1,
  View,
  H3,
} from 'native-base';
import store from '../../store';
import {ExRate} from 'store/ExRates';

/**
 *
 */
const ExRates = () => {
  /**
   *
   */
  const navigation = useContext(NavigationContext);

  /**
   * load today rates
   */
  useEffect(() => {
    fetch('https://www.nbrb.by/api/exrates/rates?periodicity=0')
      .then(rawData => rawData.json())
      .then(data => {
        console.log(data);
        store.exRates.initRates(data);
      });
  }, []);

  /**
   * render
   */
  return (
    <Container>
      <Header>
        <Left>
          <Button
            transparent
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Курсы валют</Title>
        </Body>
        <Right></Right>
      </Header>
      <Content padder>
        {store.exRates.rates.length > 0 ? (
          <List>
            {store.exRates.rates.map((rate: ExRate) => (
              <ListItem key={rate.Cur_ID}>
                <Left>
                  <Text>
                    {rate.Cur_Scale} {rate.Cur_Name}
                  </Text>
                </Left>
                <Body>
                  <Text>= {rate.Cur_OfficialRate} BYN</Text>
                </Body>
              </ListItem>
            ))}
          </List>
        ) : (
          <Spinner />
        )}
      </Content>
    </Container>
  );
};

/**
 *
 */
ExRates.navigationOptions = {
  title: 'Курсы валют',
};

export default ExRates;
