import { useDispatch, useSelector } from 'react-redux';
import user, { change_user_info, init_user_info } from './user';
import { combineReducers } from '@reduxjs/toolkit';
import { User } from '../type';

const rootReducer = combineReducers({
  user,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export const useUserInfo = () => useSelector((state: RootState) => state.user);

export const useAction = () => {
  const dispatch = useDispatch();
  const removeUser = () => {
    dispatch(init_user_info());
  }
  const saveUser = (user: User) => {
    dispatch(change_user_info(user));
  }
  const bubbleCntUp = (user: User) => {
    const newUser: User = {
      id: user.id,
      endAt: user.endAt,
      bubbleCnt: user.bubbleCnt + 1
    }
    dispatch(change_user_info(newUser));
  }
  const bubbleCntReset = (user: User) => {
    const newUser: User = {
      id: user.id,
      endAt: user.endAt,
      bubbleCnt: user.bubbleCnt + 1
    }
    dispatch(change_user_info(newUser));
  }
  return { removeUser, saveUser, bubbleCntUp, bubbleCntReset };
}