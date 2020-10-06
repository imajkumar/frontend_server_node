import { all, takeEvery, put, call } from 'redux-saga/effects'
import { notification } from 'antd'
import { history } from 'index'
import * as jwt from 'services/jwt'
import actions from './actions'


// UPDATE_PROFILE
export function* UPDATE_PROFILE( { payload } )
{
  const { usrEmail, usrName } = payload
  yield put( {
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  } )
  const success = yield call( jwt.updateProfle, usrEmail, usrName )
  if ( success )
  {
    yield put( {
      type: 'user/LOAD_CURRENT_ACCOUNT',
    } )
    yield history.push( '/settings/profile' )
    notification.success( {
      message: 'Profile Updated',
      description: 'You have successfully updated in!',
    } )
  }
  if ( !success )
  {
    yield put( {
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    } )
  }
}
// UPDATE_PROFILE//
export function* LOGIN( { payload } )
{
  const { email, password } = payload
  yield put( {
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  } )
  const success = yield call( jwt.login, email, password )
  if ( success )
  {
    yield put( {
      type: 'user/LOAD_CURRENT_ACCOUNT',
    } )
    yield history.push( '/' )
    notification.success( {
      message: 'Logged In',
      description: 'You have successfully logged in!',
    } )
  }
  if ( !success )
  {
    yield put( {
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    } )
  }
}

export function* REGISTER( { payload } )
{
  const { email, password, name } = payload
  yield put( {
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  } )

  const success = yield call( jwt.register, email, password, name )
  if ( success )
  {
    yield put( {
      type: 'user/LOAD_CURRENT_ACCOUNT',
    } )
    yield history.push( '/' )
    notification.success( {
      message: 'Succesful Registered',
      description: 'You have successfully registered!',
    } )
  }
  if ( !success )
  {
    yield put( {
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    } )
  }
}

export function* LOAD_CURRENT_ACCOUNT()
{
  yield put( {
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  } )

  const response = yield call( jwt.currentAccount )
  if ( response )
  {
    const { id, email, name, avatar, role } = response
    yield put( {
      type: 'user/SET_STATE',
      payload: {
        id,
        name,
        email,
        avatar,
        role,
        authorized: true,
      },
    } )
  }
  yield put( {
    type: 'user/SET_STATE',
    payload: {
      loading: false,
    },
  } )
}

export function* LOGOUT()
{

  yield call( jwt.logout )
  yield put( {
    type: 'user/SET_STATE',
    payload: {
      id: '',
      name: '',
      role: '',
      email: '',
      avatar: '',
      authorized: false,
      loading: false,
    },
  } )
}

export default function* rootSaga()
{
  yield all( [
    takeEvery( actions.LOGIN, LOGIN ),
    takeEvery( actions.REGISTER, REGISTER ),
    takeEvery( actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT ),
    takeEvery( actions.LOGOUT, LOGOUT ),
    takeEvery( actions.UPDATE_PROFILE, UPDATE_PROFILE ),
    LOAD_CURRENT_ACCOUNT(), // run once on app load to check user auth
  ] )
}
