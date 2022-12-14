import {useEffect, useState} from 'react';
import {FlatList, useToast} from 'native-base';
import {api} from '../services/api';
import {Game, GameProps} from './Game';
import {Loading} from './Loading';
import {EmptyMyPollList} from './EmptyMyPollList';

interface Props {
  pollId: string;
  pollCode: string;
}

export function Guesses({pollId, pollCode}: Props) {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<GameProps[]>([]);

  async function fetchGames() {
    try {
      setIsLoading(true);

      const response = await api.get(`/polls/${pollId}/games`);

      setGames(response.data.games);
    } catch (error) {
      console.log(error);

      toast.show({
        title: 'Não foi possível carregar os jogos.',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGuessConfirm(
    gameId: string,
    firstTeamPoints: string,
    secondTeamPoints: string
  ) {
    try {
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: 'Informe o placar do palpite.',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      await api.post(`/polls/${pollId}/games/${gameId}/guess`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      });

      toast.show({
        title: 'Palpite realizado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });

      fetchGames();
    } catch (error) {
      console.log(error);

      toast.show({
        title: 'Não foi possível enviar o palpite.',
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }

  useEffect(() => {
    fetchGames();
  }, [pollId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <Game
          data={item}
          onGuessConfirm={(firstTeamPoints: string, secondTeamPoints: string) =>
            handleGuessConfirm(item.id, firstTeamPoints, secondTeamPoints)
          }
        />
      )}
      _contentContainerStyle={{pb: 10}}
      ListEmptyComponent={() => <EmptyMyPollList code={pollCode} />}
    />
  );
}
