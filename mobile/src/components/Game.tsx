import {Button, HStack, Text, useTheme, VStack} from 'native-base';
import {X, Check} from 'phosphor-react-native';
import {getName} from 'country-list';
import dayjs from 'dayjs';
import ptBR from 'dayjs/locale/pt-br';

import {Team} from './Team';
import {useState} from 'react';

interface GuessProps {
  id: string;
  gameId: string;
  createdAt: string;
  participantId: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
}

export interface GameProps {
  id: string;
  date: Date;
  firstTeamCountryCode: string;
  secondTeamCountryCode: string;
  guess: null | GuessProps;
}

interface Props {
  data: GameProps;
  onGuessConfirm: (firstTeamPoints: string, secondTeamPoints: string) => void;
}

export function Game({data, onGuessConfirm}: Props) {
  const {colors, sizes} = useTheme();

  const [firstTeamPoints, setFirstTeamPoints] = useState(
    data.guess?.firstTeamPoints.toString() || ''
  );
  const [secondTeamPoints, setSecondTeamPoints] = useState(
    data.guess?.secondTeamPoints.toString() || ''
  );

  const gameDate = dayjs(data.date)
    .locale(ptBR)
    .format('DD [de] MMMM [de] YYYY [as] HH:00[h]');

  return (
    <VStack
      w="full"
      bgColor="gray.800"
      rounded="sm"
      alignItems="center"
      borderBottomWidth={3}
      borderBottomColor="yellow.500"
      mb={3}
      p={4}
    >
      <Text color="gray.100" fontFamily="heading" fontSize="sm">
        {getName(data.firstTeamCountryCode)} vs.{' '}
        {getName(data.secondTeamCountryCode)}
      </Text>

      <Text color="gray.200" fontSize="xs">
        {gameDate}
      </Text>

      <HStack
        mt={4}
        w="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <Team
          isoCode={data.firstTeamCountryCode}
          position="right"
          value={firstTeamPoints}
          onChangeText={setFirstTeamPoints}
          editable={!data.guess}
        />

        <X color={colors.gray[300]} size={sizes[6]} />

        <Team
          isoCode={data.secondTeamCountryCode}
          position="left"
          value={secondTeamPoints}
          onChangeText={setSecondTeamPoints}
          editable={!data.guess}
        />
      </HStack>

      {!data.guess && (
        <Button
          size="xs"
          w="full"
          bgColor="green.500"
          mt={4}
          _pressed={{
            bg: 'green.900',
          }}
          onPress={() => onGuessConfirm(firstTeamPoints, secondTeamPoints)}
        >
          <HStack alignItems="center">
            <Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
              CONFIRMAR PALPITE
            </Text>

            <Check color={colors.white} size={sizes[4]} />
          </HStack>
        </Button>
      )}
    </VStack>
  );
}
