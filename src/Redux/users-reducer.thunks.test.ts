import { ResultCodeEnum } from './../api/resultCodesAPI';
import { ResponseType } from './../api/api';
import { followAPI } from './../api/users-api';
import { followToggleThunkCreator } from './users-reducer';
jest.mock('./../api/users-api')
const followAPIMock = followAPI as jest.Mocked<typeof followAPI>

const result: ResponseType<any> = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
}

//@ts-ignore
followAPIMock.postFollow.mockReturnValue(result)

test('', async () => {

    const thunk = followToggleThunkCreator(1)
    const dispatch = jest.fn()
    //const getStateMock = jest.fn()

    // await thunk(dispatch, getStateMock, {}) Для 1-го случая типизации Thunk
    await thunk(dispatch)

    expect(dispatch).toBeCalledTimes(3)
})