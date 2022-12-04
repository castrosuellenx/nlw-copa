import {HStack, IInputProps} from 'native-base';
import CountryFlag from 'react-native-country-flag';

import {Input} from './Input';

interface Props extends IInputProps {
  isoCode: string;
  position: 'left' | 'right';
}

export function Team({isoCode, position, ...rest}: Props) {
  return (
    <HStack alignItems="center">
      {position === 'left' && (
        <CountryFlag isoCode={isoCode} size={25} style={{marginRight: 12}} />
      )}

      <Input
        w={10}
        h={9}
        textAlign="center"
        fontSize="xs"
        keyboardType="numeric"
        {...rest}
      />

      {position === 'right' && (
        <CountryFlag isoCode={isoCode} size={25} style={{marginLeft: 12}} />
      )}
    </HStack>
  );
}
