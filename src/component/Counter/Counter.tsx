import React, {useState} from 'react';
import {Button, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {decrement, increment} from '../../store/slices/counter';
import {RootState} from '../../store/store';

export const CounterComponent = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  console.log('pradeep');
  return (
    <>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => dispatch(increment())}>
        Increment (+)
      </Button>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => dispatch(decrement())}>
        Decrement (-)
      </Button>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => setShow(pState => !pState)}>
        {show ? <Text>Hide</Text> : <Text>Show</Text>}
      </Button>
      {show && <Text style={{textAlign: 'center'}}>{count}</Text>}
    </>
  );
};
