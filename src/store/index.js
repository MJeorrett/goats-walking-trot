import { configureStore } from 'redux-starter-kit';

import * as givenSlice from './givenSlice';
import * as whenSlice from './whenSlice';
import * as thenSlice from './thenSlice';

const store = configureStore({
  reducer: {
    given: givenSlice.reducer,
    when: whenSlice.reducer,
    then: thenSlice.reducer,
  }
});

// JSON.parse("[{\"type\":\"addGiven\",\"payload\":{\"given\":{\"id\":\"c585c381-02bb-44fd-ad2e-a1c52562f868\",\"text\":\"\",\"whenIds\":[],\"andIds\":[]},\"prepend\":true}},{\"type\":\"addGiven\",\"payload\":{\"given\":{\"id\":\"c373d1f3-65e0-41df-8837-a5277e8fc6d5\",\"text\":\"\",\"whenIds\":[],\"andIds\":[]},\"prepend\":true}},{\"type\":\"addGiven\",\"payload\":{\"given\":{\"id\":\"007778d0-aeb6-4603-83ac-ac1c0e3f8803\",\"text\":\"\",\"whenIds\":[],\"andIds\":[]},\"prepend\":true}},{\"type\":\"addGiven\",\"payload\":{\"given\":{\"id\":\"7b457b76-b9e4-486f-8817-c8680d086ae0\",\"text\":\"\",\"whenIds\":[],\"andIds\":[]},\"prepend\":true}},{\"type\":\"addGiven\",\"payload\":{\"given\":{\"id\":\"1678d721-125a-4286-9270-ba3e710e1b9f\",\"text\":\"\",\"whenIds\":[],\"andIds\":[]},\"prepend\":true}},{\"type\":\"addGiven\",\"payload\":{\"given\":{\"id\":\"04ca89d7-9d19-4ec4-9513-49316dd135e2\",\"text\":\"\",\"whenIds\":[],\"andIds\":[]},\"prepend\":true}},{\"type\":\"addGiven\",\"payload\":{\"given\":{\"id\":\"7b3741d6-9758-48d9-bae3-2b85035b15f1\",\"text\":\"\",\"whenIds\":[],\"andIds\":[]},\"prepend\":true}},{\"type\":\"addGiven\",\"payload\":{\"given\":{\"id\":\"011c8494-1d82-4f09-b74c-86d1daf5956c\",\"text\":\"\",\"whenIds\":[],\"andIds\":[]},\"prepend\":true}},{\"type\":\"addAndToGiven\",\"payload\":{\"givenId\":\"011c8494-1d82-4f09-b74c-86d1daf5956c\",\"and\":{\"id\":\"a4aff776-b43b-414c-afe3-ebb158a23da0\",\"text\":\"\"}}},{\"type\":\"addAndToGiven\",\"payload\":{\"givenId\":\"011c8494-1d82-4f09-b74c-86d1daf5956c\",\"and\":{\"id\":\"c60f024f-b993-4631-897c-7ebec017b5ac\",\"text\":\"\"}}},{\"type\":\"addWhen\",\"payload\":{\"when\":{\"id\":\"2401deec-8e01-4d51-af1b-fc637b3d023e\",\"text\":\"\",\"thenIds\":[],\"andIds\":[]},\"prepend\":false}},{\"type\":\"addWhenIdToGiven\",\"payload\":{\"givenId\":\"011c8494-1d82-4f09-b74c-86d1daf5956c\",\"whenId\":\"2401deec-8e01-4d51-af1b-fc637b3d023e\"}},{\"type\":\"addWhen\",\"payload\":{\"when\":{\"id\":\"6c912fe1-4a34-43d5-9325-7ece9ead1592\",\"text\":\"\",\"thenIds\":[],\"andIds\":[]},\"prepend\":false}},{\"type\":\"addWhenIdToGiven\",\"payload\":{\"givenId\":\"011c8494-1d82-4f09-b74c-86d1daf5956c\",\"whenId\":\"6c912fe1-4a34-43d5-9325-7ece9ead1592\"}},{\"type\":\"addThen\",\"payload\":{\"then\":{\"id\":\"ef6c5420-a6ce-4c55-a0d1-b41eb0a07698\",\"text\":\"\",\"andIds\":[]},\"prepend\":false}},{\"type\":\"addThenIdToWhen\",\"payload\":{\"whenId\":\"2401deec-8e01-4d51-af1b-fc637b3d023e\",\"thenId\":\"ef6c5420-a6ce-4c55-a0d1-b41eb0a07698\"}},{\"type\":\"addThen\",\"payload\":{\"then\":{\"id\":\"84084d8a-82c9-4255-b075-05bb32eb50d0\",\"text\":\"\",\"andIds\":[]},\"prepend\":false}},{\"type\":\"addThenIdToWhen\",\"payload\":{\"whenId\":\"2401deec-8e01-4d51-af1b-fc637b3d023e\",\"thenId\":\"84084d8a-82c9-4255-b075-05bb32eb50d0\"}},{\"type\":\"addAndToThen\",\"payload\":{\"thenId\":\"ef6c5420-a6ce-4c55-a0d1-b41eb0a07698\",\"and\":{\"id\":\"7207fbd8-7a68-41d9-aabd-d419ccaad28f\",\"text\":\"\"}}},{\"type\":\"addAndToThen\",\"payload\":{\"thenId\":\"ef6c5420-a6ce-4c55-a0d1-b41eb0a07698\",\"and\":{\"id\":\"8fa07229-4714-43e1-90b6-28e7e8ddc42e\",\"text\":\"\"}}},{\"type\":\"addAndToWhen\",\"payload\":{\"whenId\":\"2401deec-8e01-4d51-af1b-fc637b3d023e\",\"and\":{\"id\":\"82d28a1d-c707-43d5-8a47-0fbf8377691e\",\"text\":\"\"}}},{\"type\":\"addWhen\",\"payload\":{\"when\":{\"id\":\"52c30ede-97d7-4af7-8335-aae963df8acd\",\"text\":\"\",\"thenIds\":[],\"andIds\":[]},\"prepend\":false}},{\"type\":\"addWhenIdToGiven\",\"payload\":{\"givenId\":\"7b3741d6-9758-48d9-bae3-2b85035b15f1\",\"whenId\":\"52c30ede-97d7-4af7-8335-aae963df8acd\"}},{\"type\":\"addThen\",\"payload\":{\"then\":{\"id\":\"6e5c763d-79f6-42fc-b48c-ebe9f90dd543\",\"text\":\"\",\"andIds\":[]},\"prepend\":false}},{\"type\":\"addThenIdToWhen\",\"payload\":{\"whenId\":\"52c30ede-97d7-4af7-8335-aae963df8acd\",\"thenId\":\"6e5c763d-79f6-42fc-b48c-ebe9f90dd543\"}},{\"type\":\"addThen\",\"payload\":{\"then\":{\"id\":\"8bf7056b-f023-467b-93d7-acd6143f67cc\",\"text\":\"\",\"andIds\":[]},\"prepend\":false}},{\"type\":\"addThenIdToWhen\",\"payload\":{\"whenId\":\"52c30ede-97d7-4af7-8335-aae963df8acd\",\"thenId\":\"8bf7056b-f023-467b-93d7-acd6143f67cc\"}},{\"type\":\"addThen\",\"payload\":{\"then\":{\"id\":\"1a1454b6-2514-4bad-b739-be3a21a13e36\",\"text\":\"\",\"andIds\":[]},\"prepend\":false}},{\"type\":\"addThenIdToWhen\",\"payload\":{\"whenId\":\"52c30ede-97d7-4af7-8335-aae963df8acd\",\"thenId\":\"1a1454b6-2514-4bad-b739-be3a21a13e36\"}}]").forEach(action => store.dispatch(action));

export const actions = {
  given: givenSlice.actions,
  when: whenSlice.actions,
  then: thenSlice.actions,
};

export const selectors = {
  given: givenSlice.selectors,
  when: whenSlice.selectors,
  then: thenSlice.selectors,
};

export default store;