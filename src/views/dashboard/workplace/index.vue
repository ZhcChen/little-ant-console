<template>
  <div class="container">
    <div style="width: 100%">
      <a-card :bordered="false" title="状态">
        <div class="flex-sc mgb-12">
          <div class="mgr-8 text-lc w-40">CPU</div>
          <div class="s-progress flex-sc">
            <a-progress
              :steps="100"
              size="small"
              :color="cpuColor"
              :percent="Number((computerResource.cpu() / 100).toFixed(4))"
            />
          </div>
        </div>
        <div class="flex-sc mgb-12">
          <div class="mgr-8 text-lc w-40">内存</div>
          <div class="s-progress flex-sc">
            <a-progress
              :steps="100"
              size="small"
              :color="memoryColor"
              :percent="Number((computerResource.memory() / 100).toFixed(4))"
            />
          </div>
        </div>
<!--        <div class="flex-sc mgb-12" v-for="">-->
<!--          <div class="mgr-8 text-lc w-40">内存</div>-->
<!--          <div class="s-progress flex-sc">-->
<!--            <a-progress-->
<!--                :steps="100"-->
<!--                size="small"-->
<!--                :color="memoryColor"-->
<!--                :percent="Number((computerResource.memory() / 100).toFixed(4))"-->
<!--            />-->
<!--          </div>-->
<!--        </div>-->
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import useComputerResourceStore from '@/store/modules/computer-resource';
  import { mapState } from 'pinia';
  import { computed } from 'vue';

  const computerResource = computed(() =>
    mapState(useComputerResourceStore, ['cpu', 'memory'])
  );

  const cpuColor = computed(() => {
    if (computerResource.value.cpu() > 80) {
      return 'rgb(var(--red-6))';
    }
    if (computerResource.value.cpu() > 60) {
      return 'rgb(var(--orange-6))';
    }
    return 'rgb(var(--green-6))';
  });

  const memoryColor = computed(() => {
    if (computerResource.value.memory() > 80) {
      return 'rgb(var(--red-6))';
    }
    if (computerResource.value.memory() > 60) {
      return 'rgb(var(--orange-6))';
    }
    return 'rgb(var(--green-6))';
  });
</script>

<script lang="ts">
  export default {
    name: 'Dashboard',
  };
</script>

<style lang="less" scoped>
  .container {
    background-color: var(--color-fill-2);
    padding: 16px 20px;
    display: flex;

    .s-progress :deep(.arco-progress-steps) {
      height: 18px !important;
    }
  }

  .container :deep(.arco-card) {
    border-radius: 8px !important;
  }

  .left-side {
    flex: 1;
    overflow: auto;
  }

  .right-side {
    width: 280px;
    margin-left: 16px;
  }

  .panel {
    background-color: var(--color-bg-2);
    border-radius: 4px;
    overflow: auto;
  }
  :deep(.panel-border) {
    margin-bottom: 0;
    border-bottom: 1px solid rgb(var(--gray-2));
  }
  .moduler-wrap {
    border-radius: 4px;
    background-color: var(--color-bg-2);
    :deep(.text) {
      font-size: 12px;
      text-align: center;
      color: rgb(var(--gray-8));
    }

    :deep(.wrapper) {
      margin-bottom: 8px;
      text-align: center;
      cursor: pointer;

      &:last-child {
        .text {
          margin-bottom: 0;
        }
      }
      &:hover {
        .icon {
          color: rgb(var(--arcoblue-6));
          background-color: #e8f3ff;
        }
        .text {
          color: rgb(var(--arcoblue-6));
        }
      }
    }

    :deep(.icon) {
      display: inline-block;
      width: 32px;
      height: 32px;
      margin-bottom: 4px;
      color: rgb(var(--dark-gray-1));
      line-height: 32px;
      font-size: 16px;
      text-align: center;
      background-color: rgb(var(--gray-1));
      border-radius: 4px;
    }
  }
</style>

<style lang="less" scoped>
  // responsive
  .mobile {
    .container {
      display: block;
    }
    .right-side {
      // display: none;
      width: 100%;
      margin-left: 0;
      margin-top: 16px;
    }
  }
</style>
