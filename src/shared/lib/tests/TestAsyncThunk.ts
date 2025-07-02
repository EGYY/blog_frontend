import { AsyncThunkAction, DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

type ActionCreatorType<Return, Arg, RejectedValue, Extra> = (
  arg: Arg
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue; extra: Extra }>;

export class TestAsyncThunk<Return, Arg, RejectedValue, Extra = undefined> {
  dispatch: jest.MockedFn<any>;

  getState: () => StateSchema;

  actionCreator: ActionCreatorType<Return, Arg, RejectedValue, Extra>;

  extra: Extra;

  constructor(
    actionCreator: ActionCreatorType<Return, Arg, RejectedValue, Extra>,
    options?: {
      state?: DeepPartial<StateSchema>;
      extra?: Extra;
    },
  ) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn();
    this.getState = jest.fn(() => options?.state as StateSchema);
    this.extra = options?.extra as Extra;
  }

  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg);
    const result = await action(this.dispatch, this.getState, {
      extra: this.extra,
      rejectValue: undefined,
    } as any); // можно уточнить тип при необходимости
    return result;
  }
}
