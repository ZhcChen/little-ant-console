<template>
  <a-config-provider :locale="locale">
    <router-view />
    <global-setting />
  </a-config-provider>
</template>

<script lang="ts" setup>
  import { computed, onMounted } from 'vue';
  import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
  import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
  import GlobalSetting from '@/components/global-setting/index.vue';
  import useLocale from '@/hooks/locale';
  import useComputerResourceStore from '@/store/modules/computer-resource';
  import { WsMessage } from '@/types/ws';
  import {ComputerResourceState} from "@/store/modules/computer-resource/types";

  const { currentLocale } = useLocale();
  const computerResourceStore = useComputerResourceStore();
  const locale = computed(() => {
    switch (currentLocale.value) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return enUS;
    }
  });
  let pingTimer: any = null;

  onMounted(() => {
    const socket = new WebSocket('ws://localhost:26888/api/v1/ws');

    socket.addEventListener('open', () => {
      pingTimer = setInterval(() => {
        const msg: WsMessage<string> = {
          type: 0,
          data: 'ping',
        };
        socket.send(JSON.stringify(msg));
      }, 5 * 1000);
    });

    socket.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data) as WsMessage<any>;
      if (msg.type === 1) {
        computerResourceStore.setData(msg.data as ComputerResourceState);
      }
    });

    socket.addEventListener('close', () => {
      clearInterval(pingTimer);
    });

    socket.addEventListener('error', () => {
      clearInterval(pingTimer);
    });
  });
</script>
