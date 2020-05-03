import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback /* stay in memory even when the component is recreated */,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const [isFocused, setFocused] = useState(false);
  const [isFilled, setFilled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleOnBlur = useCallback(() => {
    setFocused(false);
    setFilled(!!inputRef.current?.value);
  }, []);

  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        defaultValue={defaultValue}
        {...rest}
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleOnBlur}
      />
      {error}
    </Container>
  );
};

export default Input;
