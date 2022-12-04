import {useCallback, useEffect, useState} from 'react';
import {Icon, useToast, VStack, FlatList, Center} from 'native-base';
import {Octicons} from '@expo/vector-icons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import {api} from '../services/api';
import {Button} from '../components/Button';
import {Header} from '../components/Header';
import {Loading} from '../components/Loading';
import {PollCard, PollCardPros} from '../components/PollCard';
import {EmptyPollList} from '../components/EmptyPollList';

export function Polls() {
  const {navigate} = useNavigation();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [polls, setPolls] = useState<PollCardPros[]>([]);

  async function fetchPolls() {
    try {
      setIsLoading(true);

      const response = await api.get('/polls');

      setPolls(response.data.polls);
    } catch (error) {
      console.log(error);

      toast.show({
        title: 'Não foi possível carregar os bolões',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchPolls();
    }, [])
  );

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />

      <VStack
        mt={6}
        mx={5}
        mb={4}
        pb={4}
        borderBottomWidth={1}
        borderBottomColor="gray.600"
      >
        <Button
          title="Buscar bolão por código"
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
          onPress={() => navigate('findPoll')}
        />
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={polls}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <PollCard
              data={item}
              onPress={() => navigate('pollDetails', {id: item.id})}
            />
          )}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{pb: 100}}
          ListEmptyComponent={() => <EmptyPollList />}
        />
      )}
    </VStack>
  );
}
