<script>
import MainNav from "@/components/MainNav.vue";

export default {
  components: {
    MainNav,
  },
};
</script>

<template>
  <!-- <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <MainHeader />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView /> -->
  <div class="app lines lines_size_lg lines_rot_45 lines_theme_blue">
    <header class="app__header card card_b_md card_sh_sm">
      <MainNav />
    </header>
    <main class="app__main">
      <router-view class="app__container" />
    </main>
  </div>
</template>

<style lang="scss">
@import "@/assets/base.scss";
@import "@/assets/blocks";

.app {
  @extend .p-md;
  

  height: 100vh;

  display: flex;
  gap: var(--offset-md);

  font-size: var(--font-lg);
  box-shadow: var(--b-shadow-sm);

  &__header {
    flex: 0 0 6rem;

    padding: var(--offset-sm);

    @media (max-width: $bp-sm) {
      overflow: auto hidden;
      flex: 0 0 auto;
    }
    @media (min-width: $bp-sm + 1) {
      overflow: hidden auto;
    }
  }

  &__main {
    flex: 1 1 auto;
    padding: var(--offset-lg);
    overflow-y: auto;
  }

  &__container {
    max-width: $max-width;
    margin: 0 auto;
  }

  @media (max-width: $bp-sm) {
    flex-direction: column;
  }
  @media (min-width: $bp-sm + 1) {
    flex-direction: row;
  }
}
</style>
