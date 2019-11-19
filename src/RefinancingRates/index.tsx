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
import {RefinancingRate} from 'store/RefinancingRates';

/**
 *
 */
const RefinancingRates = () => {
  /**
   *
   */
  const navigation = useContext(NavigationContext);

  /**
   * carrent rate
   */
  const [refinancingRate, setRefinancingRate] = useState(null);

  /**
   * load today rate
   */
  useEffect(() => {
    //
    const today = new Date();
    const year = today.getFullYear().toString();
    const month = (today.getMonth() + 1).toString();
    const day = today.getDate().toString();

    console.log('Refinancing rates screen');

    //
    fetch(
      `https://www.nbrb.by/api/refinancingrate?ondate=${year}-${month}-${day}`,
    )
      .then(rawData => rawData.json())
      .then(data => {
        setRefinancingRate(data[0].Value);
        console.log(data[0].Value);
      });
  }, []);

  /**
   * load history rates
   */
  useEffect(() => {
    fetch('https://www.nbrb.by/api/refinancingrate')
      .then(rawData => rawData.json())
      .then(data => {
        console.log(data);
        const preparedData = data.reverse().map((i: RefinancingRate) => {
          const date = new Date(i.Date);
          return {
            Date: `${date.getDate()}.${date.getMonth() +
              1}.${date.getFullYear()}`,
            Value: i.Value,
          };
        });
        store.refinancingRates.initRates(preparedData);
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
          <Title>Ставка</Title>
          <Subtitle>рефинансирования</Subtitle>
        </Body>
        <Right></Right>
      </Header>
      <Content padder>
        {refinancingRate ? (
          <View style={{alignItems: 'center'}}>
            <H3>Сегодня ставка:</H3>
            <H1>{refinancingRate} %</H1>
          </View>
        ) : (
          <Spinner />
        )}
        {store.refinancingRates.rates.length > 0 ? (
          <List>
            {store.refinancingRates.rates.map(rate => (
              <ListItem key={rate.Date}>
                <Left>
                  <Text>{rate.Date}</Text>
                </Left>
                <Right>
                  <Text>{rate.Value} %</Text>
                </Right>
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
RefinancingRates.navigationOptions = {
  title: 'Ставка рефинансирования',
};

export default RefinancingRates;
