import {useNavigation} from '@react-navigation/native';
import {Row, Text, Pressable, Center} from 'native-base';

export function EmptyPollList() {
  const {navigate} = useNavigation();

  return (
    <Center>
      <Text color="white" fontSize="sm" textAlign="center">
        Você ainda não está participando de {'\n'} nenhum bolão, que tal
      </Text>

      <Row>
        <Pressable onPress={() => navigate('findPoll')}>
          <Text
            textDecorationLine="underline"
            color="yellow.500"
            textDecoration="underline"
          >
            buscar um por código
          </Text>
        </Pressable>

        <Text color="white" fontSize="sm" textAlign="center" mx={1}>
          ou
        </Text>

        <Pressable onPress={() => navigate('newPoll')}>
          <Text textDecorationLine="underline" color="yellow.500">
            criar um novo
          </Text>
        </Pressable>

        <Text color="white" fontSize="sm" textAlign="center">
          ?
        </Text>
      </Row>
    </Center>
  );
}
