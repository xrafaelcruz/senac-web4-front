// SAGA TESTE

// // React
// import { takeLatest, put } from 'redux-saga/effects'

// // Helpers
// import pdvService from 'services/PDV'

// // Redux
// import { ActionsX, TypesX } from './actions'
// import App from 'routes/App/redux/actions'

// export function* getGroups(action) {
//     try {

//         const result = yield pdvService.post(`GrupoProdutoEmpresa/listar`, params)
//         const groups = yield result.data.retorno.map((group) => new ProductGroup(group))

//         yield put(ActionsX.getGroupsSuccess())

//     } catch(e) {

//         yield put(App.error(e, { toast: texts.errorGetGroups }))
//         yield put(ActionsX.error(texts.errorGetGroups['pt-br']))

//     }
// }

// const saga = [
//     takeLatest(TypesX.getGroups, getGroups),
// ]

// export default saga
