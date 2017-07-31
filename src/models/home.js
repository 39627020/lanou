import modelExtend from 'dva-model-extend';
import {model} from './common';

export default modelExtend(model, {
    namespace: 'home',
    state: {},
    subscriptions:
      {
        setup({dispatch}) {
        }
      },
  }
)
;
