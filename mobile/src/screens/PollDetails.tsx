import {useNavigation, useRoute} from '@react-navigation/native';
import {Center, HStack, Text, useToast, VStack} from 'native-base';
import {useEffect, useState} from 'react';
import {Share} from 'react-native';

import {api} from '../services/api';
import {EmptyMyPollList} from '../components/EmptyMyPollList';
import {Guesses} from '../components/Guesses';
import {Header} from '../components/Header';
import {Loading} from '../components/Loading';
import {PollCardPros} from '../components/PollCard';
import {PollHeader} from '../components/PollHeader';

interface RouteParams {
  id: string;
}

export function PollDetails() {
  const {navigate} = useNavigation();
  const route = useRoute();
  const toast = useToast();

  const {id} = route.params as RouteParams;

  const [isLoading, setIsLoading] = useState(true);
  const [pollDetails, setPollDetails] = useState<PollCardPros>(
    {} as PollCardPros
  );
  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>(
    'guesses'
  );

  async function fetchPollDetails() {
    try {
      setIsLoading(true);

      const response = await api.get(`/polls/${id}`);

      setPollDetails(response.data.poll);
    } catch (error) {
      console.log(error);

      toast.show({
        title: 'Não foi possível carregar os detalhes do bolão',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCodeShare() {
    await Share.share({
      message: pollDetails.code,
    });
  }

  useEffect(() => {
    fetchPollDetails();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={pollDetails.title}
        showBackButton
        showShareButton
        onBack={() => navigate('polls')}
        onShare={handleCodeShare}
      />

      {pollDetails._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PollHeader data={pollDetails} />

          <Center h={8} w="full" rounded="sm" bgColor="gray.800" p={1} mb={5}>
            <Text color="gray.100" fontFamily="heading" fontSize="xs">
              Seus palpites
            </Text>
          </Center>

          <Guesses pollId={pollDetails.id} pollCode={pollDetails.code} />
        </VStack>
      ) : (
        <EmptyMyPollList code={pollDetails.code} />
      )}
    </VStack>
  );
}
