import { User } from "../type";

const CHANGE_USER_INFO = 'USER/CHANGE_USER_INFO' as const;
const INIT_USER_INFO = 'USER/INIT_USER_INFO' as const;

export const change_user_info = (user: User) => ({ type: CHANGE_USER_INFO, payload: user });
export const init_user_info = () => ({ type: INIT_USER_INFO, payload: INIT_USER_INFO });

type UserAction = 
  | ReturnType<typeof change_user_info>
  | ReturnType<typeof init_user_info>;

const initalState: User | null = null;

const userInfo = (state: User | null = initalState, action: UserAction) => {
  switch (action.type) {
    case CHANGE_USER_INFO:
      return action.payload;
    case INIT_USER_INFO:
      return initalState;
    default: 
      return state;
  }
}

export default userInfo;