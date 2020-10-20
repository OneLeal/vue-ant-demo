<template>
  <div class="demo">
    <a-menu mode="horizontal" theme="dark" v-model="menuCur" @click="clickNav">
      <template v-for="item in nav">
        <a-menu-item v-if="!item.children" :key="item.key">
          <a-icon :type="item.icon" />
          <span>{{ item.label }}</span>
        </a-menu-item>

        <sub-menu v-else :key="item.key" :menu-info="item" />
      </template>
    </a-menu>

    <div class="demo-content mt-20 ml-20">
      <router-view :goodsInfo="goodsInfo" :goodsCard="goodsInfo" />
    </div>
  </div>
</template>

<script>
  import { Menu } from 'ant-design-vue';
  import { demoNav } from '@common/utils/menu';
  // 单文件递归菜单
  const SubMenu = {
    template: `
      <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners">
        <template slot="title">
            <a-icon :type="menuInfo.icon" />
            <span>{{ menuInfo.label }}</span>
        </template>

        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="!item.children" :key="item.key">
            <a-icon :type="item.icon" />
            <span>{{ item.label }}</span>
          </a-menu-item>
        </template>
      </a-sub-menu>
    `,
    name: 'SubMenu',
    isSubMenu: true,
    props: {
      ...Menu.SubMenu.props,
      menuInfo: {
        type: Object,
        default: () => ({}),
      },
    },
  };

  export default {
    components: { 'sub-menu': SubMenu },
    data() {
      return {
        menuCur: [],
        nav: demoNav(),
        goodsInfo: {}
      };
    },
    watch: {
      menuCur(value) {
        // 选择 mall 时，当前窗口路由不改变，需禁止 mall 选项渲染
        if (value.includes('/mall')) {
          this.menuCur = [location.pathname];
        }
      }
    },
    methods: {
      clickNav({ key }) {
        if (key === '/mall') {
          // 选则 mall 时，新建窗口并跳转
          const routeData = this.$router.resolve({ path: key });
          window.open(routeData.href, '_blank');
        } else {
          // 选择的路由与当前路由不一致时才跳转
          location.pathname !== key && this.$router.push({ path: key });
        }
      },

      fetchGoodsInfo() {
        this.$axios.get('/mall/goodsInfo').then(res => {
          this.goodsInfo = res.data.data[0];
        });
      }
    },
    created() {
      this.fetchGoodsInfo()
    },
    mounted() {
      this.$nextTick(() => {
        // 初始化时，默认添加一条 nav
        this.menuCur.length === 0 && this.menuCur.push(location.pathname);
      });
    }
  };
</script>

<style lang="less" scoped>
  .demo {
    /deep/ li.ant-menu-item {
      cursor: pointer;
    }

    /deep/ div.ant-menu-submenu-title {
      cursor: default;
    }
  }
</style>
