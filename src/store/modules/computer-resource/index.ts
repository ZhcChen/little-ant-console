import { defineStore } from 'pinia';
import { ComputerResourceState } from '@/store/modules/computer-resource/types';
import { UserState } from '@/store/modules/user/types';
import { state } from 'vue-tsc/out/shared';

const useComputerResourceStore = defineStore('computerResource', {
  state: (): ComputerResourceState => ({
    cpu: 0,
    memory: 0,
  }),

  getters: {
    computerResourceData(_state: ComputerResourceState): ComputerResourceState {
      return { ..._state };
    },
  },

  actions: {
    setData(data: ComputerResourceState) {
      this.cpu = data.cpu;
      this.memory = data.memory;
    },
  },
});

export default useComputerResourceStore;
