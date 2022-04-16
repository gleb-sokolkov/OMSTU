<script>
export default {};
</script>

<template>
  <nav class="nav">
    <div class="nav__logo-container">
      <img class="nav__logo" src="@/assets/logo.svg" alt="logo" />
    </div>
    <ul class="nav__link-list">
      <li
        v-for="{ name, path } in this.$router.getRoutes()"
        :key="name"
        class="nav__item"
      >
        <router-link :to="`${path}`" class="nav__link">{{ name }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.nav {
  display: flex;
  align-items: center;
  gap: var(--offset-xl);

  &__logo-container {
  }

  &__logo {
    width: 3.125rem;
    aspect-ratio: 1;
  }

  &__link-list {
    display: flex;
    flex: 0 0 auto;
    padding: 0;
    list-style: none;
    @media (max-width: $bp-sm) {
      flex-direction: row;
    }
    @media (min-width: $bp-sm + 1) {
      flex-direction: column;
    }
  }

  &__item {
  }

  &__link {
    display: block;
    font-weight: 900;
    text-align: center;
    padding: var(--offset-sm);
    font-family: "Roboto Mono", sans-serif;
    
    &:hover {
      background: var(--color);
      color: var(--bg-color);
    }
  }

  @media (max-width: $bp-sm) {
    flex-direction: row;
    justify-content: flex-start;
  }
  @media (min-width: $bp-sm + 1) {
    flex-direction: column;
    align-content: center;
  }
}
</style>
